import { getPagination } from '@utils';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { DeviceErrors } from '../models/DeviceErrors';

/**
 * Get device errors
 * @method getDeviceErrors
 * @param
 */
export const getDeviceErrors = (req: Request, res: Response) => {
    const { skip, limit, error_type } = req.query;
    const pageSkip: any = skip || 0;
    const pageLimit: any = limit || 10;
    const match: any = { isDeleted: false, deviceId: Types.ObjectId(req.params.id) };
    error_type ? match.errorType = error_type : ''
    DeviceErrors.aggregate([
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
            ssuccess: true,
            message: "Successfully retrived data",
            device_errors: response.list,
            pagination: response.pagination
        });
    })
}

/**
 * Check device errors
 * @method handleDeviceErrors
 * @param
 */
export const handleDeviceErrors = (deviceDetails: any, sensorData: any) => {

}