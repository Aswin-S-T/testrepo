import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { SensorRawData } from '../models/SensorRawData';
import { Types } from 'mongoose';
import { getPagination } from '@utils';
import { StatusCodes } from 'http-status-codes';
import { SensorSpec } from '@helpers';

/**
 * Get device rawdata
 * @method getRawData
 * @param
 */
export const getRawData = (req: Request, res: Response) => {
    const { devs, skip, limit, startdate, enddate } = req.query;
    const devices: any = devs;
    const start: any = startdate; const end: any = enddate;
    const pageSkip: any = skip || 0;
    const pageLimit: any = limit || 10;

    let rawdata:any = [];
    const devParams: any = SensorSpec;

    for (var i = 0; i < devParams.length; i++) {
        if(devParams[i].valueType !== 'date') {
            rawdata.push({
                paramName: devParams[i].paramName,
                displayName: devParams[i].displayName,
                displayImage: devParams[i].displayImage,
                unit: devParams[i].unit,
                value: "$data." + devParams[i].paramName,
                precision: devParams[i].valuePrecision
            });
        }
    }

    const pageQuery = (pageSkip === 'null' && pageLimit ==='null') ? [] : [
        { $skip: parseInt(pageSkip) }, { $limit: parseInt(pageLimit) }
    ]

    devices.split(',').forEach((device: any) => {
        SensorRawData.aggregate([
            { $match: {
                $and: [
                    {
                        deviceId: Types.ObjectId(device)
                    },
                    {
                        receivedAt: { $gte: new Date(start) }
                    },
                    {
                        receivedAt: { $lt: new Date(end) }
                    }
                ]
            } },
            { '$sort': { 'createdAt': -1 } },
            {
                '$facet': {
                    metadata: [{ $count: "total" }],
                    data: [...pageQuery, ...[{ $addFields: { parameters: rawdata } },
                        { $unset: "data" }]
                    ]
                }
            }
        ], async function (err: any, data: any) {
            const response: any = {
                pagination: await getPagination(0, parseInt(pageSkip), parseInt(pageLimit)),
                list: []
            }
            if (data[0]) {
                if (data[0].metadata[0]) {
                    response.pagination = await getPagination(data[0].metadata[0].total, parseInt(pageSkip), parseInt(pageLimit))
                }
                response.list = data[0].data
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully retrived data",
                rawdata: response.list,
                pagination: response.pagination
            });
        })
    });
    
}