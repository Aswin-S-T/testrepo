import { Request, Response } from 'express';
import { getRules } from './AlarmRuleController';
import { Alert } from 'src/models/Alerts';
import { getPagination } from '@utils';

/**
 * Check parameters and generate alerts
 * @method generateAlerts
 * @param
 */
export const generateAlerts = async (deviceId: any, sensorData: any) => {
    const devRules: any = await getRules(deviceId)
    for (let i = 0; i < devRules.length; i++) {
        for (let j = 0; j < devRules[i].info.length; j++) {
            let pname = devRules[i].info[j].paramName;
            for (let k = 0; k < devRules[i].info[j].rules.data.length; k++) {
                if (devRules[i].info[j].rules.data[k].funct == 'greater') {

                    if (devRules[i].info[j].rules.data[k].value < sensorData[pname]) {

                        const alert = new Alert({
                            deviceId: deviceId,
                            ruleName: devRules[i].ruleName,
                            status: "Active",
                            log: devRules[i].info[j].paramName + ' greater than ' + devRules[i].info[j].rules.data[k].value
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
                else if (devRules[i].info[j].rules.data[k].funct == 'lesser') {
                    if (devRules[i].info[j].rules.data[k].value > sensorData[pname]) {
                        const alert = new Alert({
                            deviceId: deviceId,
                            ruleName: devRules[i].ruleName,
                            status: "Active",
                            log: devRules[i].info[j].paramName
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
                    if (devRules[i].info[j].rules.data[k].value == sensorData[pname]) {
                        const alert = new Alert({
                            deviceId: deviceId,
                            ruleName: devRules[i].ruleName,
                            status: "Active",
                            log: devRules[i].info[j].paramName
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
    if (req.query.key && req.query.key != '' && req.query.key != 'null') {
        const keyword = req.query.key;
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

            if (req.query.key && req.query.key != '') {
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