import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { getPagination } from '@utils';
import { validationResult } from 'express-validator';
import { Webhook } from '../models/Webhooks';
import { Types } from 'mongoose';
import axios from 'axios';

export const addWebhook = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            "status": 'UNPROCESSABLE_ENTITY', "errors": errors.array({ onlyFirstError: true })
        });
    }
    const { customer_name, url, sensor_data, alerts } = req.body;
    const webhook = new Webhook({
        customerName: customer_name,
        url: url,
        sensorData: sensor_data,
        alerts: alerts,
        createdBy: Types.ObjectId(req.body.user_id)
    })
    webhook.save(function (err: any, data: any) {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Document with same name already exists",
            });
        }
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Document created successflly",
            webhook_details: data
        });
    })
}

export const deleteWebhook = (req: Request, res: Response) => {
    Webhook.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true }, function (err: any, data: any) {
        if (err) { }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted webhook"
        });
    })
}

export const listWebhook = (req: Request, res: Response) => {
    const { skip, limit, status } = req.query;
    const pageSkip: any = skip || 0;
    const pageLimit: any = limit || 10;
    const match: any = { isDeleted: false };
    status == 'enabled' ? match.activated = true : status == 'disabled' ? match.activated = false : ''
    Webhook.aggregate([
        { $match: match },
        { '$sort': { 'createdAt': -1 } },
        {
            '$facet': {
                metadata: [{ $count: "total" }],
                data: [{ $skip: parseInt(pageSkip) }, { $limit: parseInt(pageLimit) }]
            }
        }
    ], async function (err: any, data: any) {
        const response: any = {
            pagination: {},
            list: []
        }
        if (data[0]) {
            if (data[0].metadata[0]) {
                response.pagination = await getPagination(data[0].metadata[0].total, parseInt(pageSkip), parseInt(pageLimit))
            }
            for (let i = 0; i < data[0].data.length; i++) {
                if (data[0].data[i].sensorData == true)
                    data[0].data[i].sensorData = "Yes";
                else
                    data[0].data[i].sensorData = "No"
                if (data[0].data[i].alerts == true)
                    data[0].data[i].alerts = "Yes";
                else
                    data[0].data[i].alerts = "No";
            }
            response.list = data[0].data
        }
        return res.status(StatusCodes.OK).json({
            ssuccess: true,
            message: "Successfully retrived data",
            webhook_list: response.list,
            pagination: response.pagination
        });
    })
}

export const postSensorDatatoUrls = async (postData: any) => {
    let sensorArray: any = [];
    Webhook.find({ sensorData: true, isDeleted: false }, function (err: any, data: any) {
        if (err)
            console.log(err)
        else {
            for (let i = 0; i < data.length; i++) {
                sensorArray.push(data[i].url)
            }
            if (sensorArray.length > 0) {
                postJsonToUrl(sensorArray, postData);
            }
        }
    })
}

export const postAlertsToUrls = async (postData: any) => {
    let alertsArray: any = [];
    Webhook.find({ alerts: true, isDeleted: false }, function (err: any, data: any) {
        if (err)
            console.log(err)
        else {
            for (let i = 0; i < data.length; i++) {
                alertsArray.push(data[i].url)
            }
            if (alertsArray.length > 0) {
                postJsonToUrl(alertsArray, postData);
            }
        }
    })
}

export const postJsonToUrl = (urls: any, data: any) => {

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        axios.post(url, data)
            .then((res) => {
                console.log(`Status: ${res.status}`);
            }).catch((err) => {
                console.error(err);
            });
    }
} 