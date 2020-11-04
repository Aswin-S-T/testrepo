import { getPagination } from '@utils';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { DeviceErrors } from '../models/DeviceErrors';
import { Errors, typeOneErr, systemErr } from '@helpers';
import mongoose from 'src/database/db';

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
export const handleDeviceErrors = (deviceDetails: any, sensorData: any, sensorDataResult: any) => {
    Errors.forEach(error => {
        const errorDescription: any = [];
        if(sensorData[error]) {
            const errorDecoded = decode(sensorData[error]);
            errorDecoded.forEach((err: any, count: any) => {
                if(err === '1') {
                    if(error === 'er_system') { errorDescription.push(systemErr[count]) }
                    else { errorDescription.push(typeOneErr[count]) }
                }
            })
        }
        const DeviceErrorsModel = new DeviceErrors({
            deviceId: mongoose.Types.ObjectId(deviceDetails._id),
            sensorDataId: mongoose.Types.ObjectId(sensorDataResult._id),
            errorType: error,
            errorDetails: (errorDescription.length > 0) ? errorDescription.join(', ') : 'No Errors',
            receivedAt: new Date(sensorData.time)
        })
        DeviceErrorsModel.save(function (err: any, result: any) { })
    })
}

const decode = (code: any) => {
    let binary = parseInt(code, 10).toString(2);
    binary = Array(33).join("0").substr(binary.length) + binary;
    const binaryArr = binary.split("");
    binaryArr.reverse();
    return binaryArr;
}