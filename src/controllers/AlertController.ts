import { Request, Response } from 'express';
import { getRules } from './AlarmRuleController';
import { Alert } from 'src/models/Alerts';
import { getPagination } from '@utils';
import { socketEmit } from 'src/utils/SocketService';
import { StatusCodes } from 'http-status-codes';

/**
 * Check parameters and generate alerts
 * @method generateAlerts
 * @param
 */
export const generateAlerts = async (deviceId: any, sensorData: any) => {
    const devRules: any = await getRules(deviceId);
    for (let i = 0; i < devRules.length; i++) {
        for (let j = 0; j < devRules[i].info.length; j++) {
            let pname = devRules[i].info[j].parameter;
            if (devRules[i].info[j].function == 'gt') {
                if (devRules[i].info[j].limit < sensorData[pname]) {
                    const alert = new Alert({
                        deviceId: deviceId,
                        ruleName: devRules[i].ruleName,
                        status: "Active",
                        log: devRules[i].info[j].parameter + ' greater than ' + devRules[i].info[j].limit
                    })
                    Alert.countDocuments({
                        status: "Active", deviceId: devRules[i].deviceIds[0],
                        ruleName: devRules[i].ruleName
                    }, function (err: any, data: any) {

                        if (data == 0) {
                            alert.save(function (err: any, alert: any) {
                                if (devRules[0].type == 'Time') {
                                    timeBasedAlert(devRules, alert._id);
                                }
                                alertPlatformUpdate('New alert - ' + deviceId, devRules[i].info[j].parameter + ' greater than ' + devRules[i].info[j].limit, alert)
                                return ({
                                    status: "success",
                                    message: "Document created",
                                    alert_details: alert
                                });

                            })
                        }

                    })
                }
            }
            else if (devRules[i].info[j].function == 'lt') {
                if (devRules[i].info[j].limit > sensorData[pname]) {
                    const alert = new Alert({
                        deviceId: deviceId,
                        ruleName: devRules[i].ruleName,
                        status: "Active",
                        log: devRules[i].info[j].parameter + ' less than ' + devRules[i].info[j].limit
                    })
                    Alert.countDocuments({
                        status: "Active", deviceId: devRules[i].deviceIds[0],
                        ruleName: devRules[i].ruleName
                    }, function (err: any, data: any) {

                        if (data == 0) {
                            alert.save(function (err: any, alert: any) {
                                if (devRules[0].type == 'Time') {
                                    timeBasedAlert(devRules, alert._id);
                                }
                                alertPlatformUpdate('New alert - ' + deviceId, devRules[i].info[j].parameter + ' less than ' + devRules[i].info[j].limit, alert)
                                return ({
                                    status: "success",
                                    message: "Document created",
                                    alert_details: alert
                                });

                            })
                        }

                    })
                }
            }
            else {
                if (devRules[i].info[j].limit == sensorData[pname]) {
                    const alert = new Alert({
                        deviceId: deviceId,
                        ruleName: devRules[i].ruleName,
                        status: "Active",
                        log: devRules[i].info[j].parameter + ' greater than ' + devRules[i].info[j].limit
                    })
                    Alert.countDocuments({
                        status: "Active", deviceId: devRules[i].deviceIds[0],
                        ruleName: devRules[i].ruleName
                    }, function (err: any, data: any) {

                        if (data == 0) {
                            alert.save(function (err: any, alert: any) {
                                if (devRules[0].type == 'Time') {
                                    timeBasedAlert(devRules, alert._id);
                                }
                                alertPlatformUpdate('New alert - ' + deviceId, devRules[i].info[j].parameter + ' equal to ' + devRules[i].info[j].limit, alert)
                                return ({
                                    status: "success",
                                    message: "Document created",
                                    alert_details: alert
                                });

                            })
                        }

                    })
                }
            }
        }
    }
}

/**
 * Clear time based alerts
 * @method timeBasedAlert
 * @param
 */
const timeBasedAlert = (alarmRules: any, id: any) => {

    var timer = alarmRules[0].timeInterval * 60000;
    var rule = alarmRules[0].ruleName;
    setTimeout(() => {
        Alert.findByIdAndUpdate(id, { status: "Inactive" }, { new: true }, function (err, alert) {
            if (err) {
                return ({
                    status: "BAD REQUEST",
                    message: "Some Error Occured",
                    error: err
                });
            }
            return ({
                status: "success",
                message: "Successfully updated alarm rule",
                data: {
                    alert_status: alert,
                }
            });
        })
    }, timer);
}

/**
 * Active alarms - List
 * @method getActiveAlarms
 * @param
 */
export const getActiveAlarms = async (req: Request, res: Response) => {

    const queryParams: any = req.query;
    const dataSkip = parseInt(queryParams.skip) || 0;
    const dataLimit = parseInt(queryParams.limit) || 25;

    let sort: any = { _id: -1 };

    let query = [
        { $match: { status: "Active" } },
        {
            '$facet': {
                metadata: [{ $count: "total" }],
                data: [{ $sort: sort }, { $skip: dataSkip }, { $limit: dataLimit }]
            }
        }
    ]

    let filter: any = {}
    if (req.query.search && req.query.search != '' && req.query.search != 'null') {
        const keyword = req.query.search;
        filter['$match'] = {
            $or: [
                { 'deviceId': { '$regex': keyword, '$options': 'i' } },
                { 'ruleName': { '$regex': keyword, '$options': 'i' } }
            ],
        }
        query.unshift(filter);
    }
    const response = await new Promise(resolve => {
        Alert.aggregate(query, async function (err: any, data: any) {

            if (req.query.search && req.query.search != '') {
                filter = filter['$match']
            }
            let response = {
                status: "success",
                message: "",
                active_alerts: data,
                pagination: await getPagination(0, dataSkip, dataLimit)
            };
            if (data[0]) {
                if (data[0].metadata[0]) {
                    response.pagination = await getPagination(data[0].metadata[0].total, dataSkip, dataLimit)
                }
                response.active_alerts = data[0].data
            }

            if (!err) {
                return res.status(200).json(response);
            }
            if (err) {
                console.log(err);
            }
        })
    });
    return response
}

/**
 * Active alarms - Clear
 * @method alertPlatformUpdate
 * @param
 */

const alertPlatformUpdate = async (title: string, message: string, alertInfo: any) => {
    const alert = {
        alerts: [
            {
                title: title,
                message: message,
                alert: alertInfo
            }
        ]
    }
    socketEmit('new-alert', JSON.stringify(alert));
}

/**
 * Active alarms - Clear
 * @method updateAlert
 * @param
 */
export const updateAlert = async (req: Request, res: Response) => {

    const { status } = req.body;
    let updateData: any = {};
    status ? updateData.status = status : '';

    Alert.findByIdAndUpdate(req.params.id, updateData, { new: true }, function (err, alert) {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "BAD REQUEST",
                message: "Some Error Occured",
                error: err
            });
        }
        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "Successfully cleared alarm",
            data: {
                alert_status: alert,
            }
        });
    })
}

/**
 * Alarm History - List
 * @method getAlarmHistory
 * @param
 */
export const getAlarmHistory = async (req: Request, res: Response) => {

    const queryParams: any = req.query;
    const dataSkip = parseInt(queryParams.skip) || 0;
    const dataLimit = parseInt(queryParams.limit) || 25;

    let sort: any = { _id: -1 };

    let query = [
        { $match: { status: "Inactive" } },
        {
            '$facet': {
                metadata: [{ $count: "total" }],
                data: [{ $sort: sort }, { $skip: dataSkip }, { $limit: dataLimit }]
            }
        }
    ]

    let filter: any = {}
    if (req.query.search && req.query.search != '' && req.query.search != 'null') {
        const keyword = req.query.search;
        filter['$match'] = {
            $or: [
                { 'deviceId': { '$regex': keyword, '$options': 'i' } },
                { 'ruleName': { '$regex': keyword, '$options': 'i' } }
            ],
        }
        query.unshift(filter);
    }
    const response = await new Promise(resolve => {
        Alert.aggregate(query, async function (err: any, data: any) {

            if (req.query.search && req.query.search != '') {
                filter = filter['$match']
            }
            let response = {
                status: "success",
                message: "",
                alert_history: data,
                pagination: await getPagination(0, dataSkip, dataLimit)
            };
            if (data[0]) {
                if (data[0].metadata[0]) {
                    response.pagination = await getPagination(data[0].metadata[0].total, dataSkip, dataLimit)
                }
                response.alert_history = data[0].data
            }

            if (!err) {
                return res.status(200).json(response);
            }
            if (err) {
                console.log(err);
            }
        })
    });
    return response
}

export const clearAllAlerts = async (req: Request, res: Response) => {

    Alert.updateMany({ status: "Active" }, { status: "Inactive" }, function (err, alert) {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "BAD REQUEST",
                message: "Some Error Occured",
                error: err
            });
        }
        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "Successfully cleared alarms",
            data: {
                alert_status: alert,
            }
        });
    })
}
