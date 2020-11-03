import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { AlarmRule } from 'src/models/AlarmRule';
import { getPagination } from '@utils';
import { validationResult } from 'express-validator';

// Alarm Rule - List
export const listAlarmRule = (req: Request, res: Response) => {
    const queryParams: any = req.query;
    const dataSkip = parseInt(queryParams.skip) || 0;
    const dataLimit = parseInt(queryParams.limit) || 25;

    let query = [
        { $match: { isDeleted: false } },
        {
            '$facet': {
                metadata: [{ $count: "total" }],
                data: [{ $skip: dataSkip }, { $limit: dataLimit }]
            }
        }
    ]
    let filter: any = {}
    if (queryParams.key && queryParams.key != '') {
        const keyword = queryParams.key;
        filter['$match'] = {
            $or: [
                { 'info.deviceIds': { '$regex': keyword, '$options': 'i' } },
                { 'ruleName': { '$regex': keyword, '$options': 'i' } }
            ],
        }
        query.unshift(filter);
    }
    AlarmRule.aggregate(query, async function (err: any, data: any) {
        console.log(data)
        let response = {
            status: "success",
            message: "",
            alarm_list: [],
            pagination: await getPagination(0, dataSkip, dataLimit)

        };
        if (data[0]) {
            if (data[0].metadata[0]) {
                response.pagination = await getPagination(data[0].metadata[0].total, dataSkip, dataLimit)
            }
            response.alarm_list = data[0].data
        }

        if (!err) {
            return res.status(200).json(response);
        }
        if (err) {
            console.log(err);
        }
    })
}

//Alarm Rule - Details
export const getAlarmRuleDetails = (req: Request, res: Response) => {
    AlarmRule.findById(req.params.id, function (err: any, rule: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Alarm Rule details",
            rule_details: rule
        });
    })
}

//Alarm Rule - Add
export const addAlarmRule = (req: Request, res: Response) => {
    console.log("RULE ADD", req.body)
    let query = { ruleName: req.body.rule_name };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            "status": 'UNPROCESSABLE_ENTITY', "errors": errors.array({ onlyFirstError: true })
        });
    }
    const { rule_name, description, clearing_mode, time_interval, deviceIDs } = req.body;
    const alarm = new AlarmRule({
        ruleName: rule_name,
        description: description,
        clearingMode: clearing_mode,
        timeInterval: time_interval,
        deviceIDs: deviceIDs,
        //info: info
    })
    AlarmRule.findOne(query, (err, existingRule: any) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "BAD REQUEST",
                message: "",
                error: err
            });
        }
        if (existingRule) {
            if (existingRule.isDeleted == 0) {
                return res.status(StatusCodes.CONFLICT).json({
                    status: "RECORD_CONFLICT",
                    message: "Oh!, it's strange. Rule is already there"
                });
            }
            else {
                AlarmRule.findOneAndDelete(query, (err, data) => {
                    if (!err) {
                        console.log("Deleted existing one")
                    }
                })
            }
        }

        alarm.save(function (err: any, rule: any) {
            if (err) {
                console.log(err);
                return err
            }
            return res.status(StatusCodes.CREATED).json({
                status: "success",
                message: "Document created",
                alarm_details: rule
            });
        })
    })
    
}

//Alarm Rule - Edit
export const editAlarmRule = (req: Request, res: Response) => {
    const { rule_name, description, clearing_mode, time_interval, info } = req.body;
    let updateData: any = {
        ruleName: '', description: '', clearingMode: '', timeInterval: '',
        info: ''
    };
    rule_name ? updateData.ruleName = rule_name : '';
    description ? updateData.description = description : '';
    clearing_mode ? updateData.clearingMode = clearing_mode : '';
    time_interval ? updateData.timeInterval = time_interval : '';
    info? updateData.info = info:''

    AlarmRule.findByIdAndUpdate(req.params.id, updateData, { new: true }, function (err, rule) {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "BAD REQUEST",
                message: "Some Error Occured",
                error: err
            });
        }
        return res.status(StatusCodes.OK).json({
            status: "success",
            message: "Successfully updated alarm rule",
            data: {
                alarm_details: rule
            }
        });
    })
}

//Alarm Rule - Delete
export const deleteAlarmRule = (req: Request, res: Response) => {
    AlarmRule.findByIdAndUpdate(req.params.id, { isDeleted: true }, function (err: any, rule: any) {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Error"
            })
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted alarm rule"
        });
    })
}