import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Devices } from "../models/Devices";

/**
 * Add new device
 *
 * @param
 */
export const addDevice = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
}


/**
 * List device
 *
 * @param
 */
export const listDevice = (req: Request, res: Response) => {
}

/**
 * Update device
 *
 * @param
 */
export const updateDevice = (req: Request, res: Response) => {
}


/**
 * Update device
 *
 * @param
 */
export const getDeviceDetails = (req: Request, res: Response) => {
}


/**
 * Update device
 *
 * @param
 */
export const deleteDevice = (req: Request, res: Response) => {
}

/**
 * Get device statistics
 * @method getDeviceStatistics
 * @param
 */
export const getDeviceStatistics = (req: Request, res: Response) => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - 10); // timestamp
    const timeStamp = new Date(now).getTime();
    const pipeline: any = [
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: "$isDeleted",
                devices_total: { $sum: 1 },
                devices_enabled: {
                    "$sum": {
                        "$cond": [{ "$eq": ["$activated", true] }, 1, 0]
                    }
                },
                devices_disabled: {
                    "$sum": {
                        "$cond": [{ "$eq": ["$activated", false] }, 1, 0]
                    }
                },
                devices_online: {
                    "$sum": {
                        "$cond": [{ "$gte": ["$lastDataReceiveTime", timeStamp] }, 1, 0]
                    }
                }
            }
        },
        {
            $project: {
                devices_total: 1,
                devices_enabled: 1,
                devices_disabled: 1,
                devices_online: 1
            }
        },
    ]
    Devices.aggregate(pipeline, function (err: any, data: any) {
        let statistics: any = {
            devices_total: 0,
            devices_enabled: 0,
            devices_disabled: 0,
            devices_online: 0
        }
        if (data && data[0]) {
            statistics = {
                ...data[0]
            }
            delete (statistics._id)
        }
        return res.status(StatusCodes.OK).json({
            ssuccess: true,
            message: "Successfully retrieved data",
            device_statistics: statistics
        });
    })
}