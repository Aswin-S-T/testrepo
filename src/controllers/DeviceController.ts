import { getPagination } from '@utils';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import mongoose from 'src/database/db';
import { Devices } from "../models/Devices";
import { userDetails } from '@controllers';

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
export const listDevice = async (req: Request, res: Response) => {
    let sort: any = { _id: -1 }
    const queryParams: any = req.query;
    const match: any = { $and: [] }

    switch (queryParams.status) {
        case 'enabled':
            match['$and'].push({ isDeleted: false })
            match['$and'].push({ activated: true })
            break;
        case 'disabled':
            match['$and'].push({ isDeleted: false })
            match['$and'].push({ activated: false })
            break;
        case 'deleted':
            match['$and'].push({ isDeleted: true })
            break;
        case 'online':
            var now = new Date();
            now.setMinutes(now.getMinutes() - 10); // timestamp
            match['$and'].push({ isDeleted: false })
            match['$and'].push({ activated: true })
            match['$and'].push({ lastDataReceiveTime: { $gte: new Date(now) } })
            break;
        default:
            match['$and'].push({ isDeleted: false })
            break;
    }
    if (queryParams.organization_id && queryParams.organization_id != 'all') {
        match['$and'].push({ organizationId: Types.ObjectId(queryParams.organization_id) })
    } else if (queryParams.organization_id == 'all') {

    } else {
        const user: any = await userDetails(req.body.user_id);
        match['$and'].push({ organizationId: { $in: user.organization } })
    }

    if (queryParams.family && queryParams.family != 'all') {
        match['$and'].push({ devFamily: queryParams.family })
    }

    if (queryParams.search && queryParams.search != '') {
        match['$and'].push({
            $or: [
                { 'deviceId': { '$regex': queryParams.search, '$options': 'i' } },
                { 'location.city': { '$regex': queryParams.search, '$options': 'i' } },
                { 'location.landMark': { '$regex': queryParams.search, '$options': 'i' } }
            ],
        })
    }

    const dataSkip = parseInt(queryParams.skip) || 0;
    const dataLimit = parseInt(queryParams.limit) || 25;
    let pipeline = [
        { $match: match },
        {
            '$facet': {
                metadata: [{ $count: "total" }],
                data: [{ $sort: sort }, { $skip: dataSkip }, { $limit: dataLimit }]
            }
        }
    ]

    Devices.aggregate(pipeline, async function (err: any, data: any) {
        const response: any = {
            success: true,
            message: "Data successfull retrieved",
            device_list: [],
            pagination: await getPagination(0, dataSkip, dataLimit)
        };
        if (data[0]) {
            if (data[0].metadata[0]) {
                response.pagination = await getPagination(data[0].metadata[0].total, dataSkip, dataLimit)
            }
            response.device_list = data[0].data
        }

        if (!err) {
            return res.status(200).json(response);
        }
        if (err) {
            console.log(err);
        }
    })
}

/**
 * Update device
 *
 * @param
 */
export const updateDevice = (req: Request, res: Response) => {
}


/**
 * Get device details by id
 *
 * @param
 */
export const getDeviceDetails = (req: Request, res: Response) => {
    Devices.findById(req.params.id, function (err: any, data: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Data successfully retrieved",
            device_details: data
        });
    })
}


/**
 * Update device
 *
 * @param
 */
export const deleteDevice = (req: Request, res: Response) => {
    Devices.findByIdAndUpdate(req.params.id, { isDeleted: true, activated: false }, { new: true }, function (err: any, data: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Device successfully deleted",
            device_details: data
        });
    })
}

/**
 * Get device statistics
 * @method getDeviceStatistics
 * @param
 */
export const getDeviceStatistics = async (req: Request, res: Response) => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - 10); // timestamp
    const dateTime = new Date(now);
    const user: any = await userDetails(req.body.user_id);
    const pipeline: any = [
        { $match: { isDeleted: false, organizationId: { $in: user.organization } } },
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
                        "$cond": [{ $and: [{ "$gte": ["$lastDataReceiveTime", dateTime] }, { "$eq": ["$activated", true] }] }, 1, 0]
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


/**
* Fetch active device ids
*
* @method  getDeviceIds
* 
* @param   req
* @param   res
*/
export const getDeviceIds = (req: Request, res: Response) => {
    let filter: any = { activated: true, isDeleted: false };
    const query: any = { ...req.query };
    if (query.type) {
        switch (query.type) {
            case 'organization':
                filter['$or'] = []
                const pushItem: any = {
                    organizationId: {}
                }
                pushItem['organizationId']['$' + query.operation] = mongoose.Types.ObjectId(query.value)
                filter['$or'].push(pushItem)
                filter['$or'].push({ 'organizationId': { '$eq': null } })
                break;
            case 'organization-add':
                filter['organizationId'] = { '$eq': null };
                break;
            default:
                break;
        }
    }
    Devices.find(filter, { _id: 1, deviceId: 1 }, function (err: any, ids: any) {
        console.log(err)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Data successfully retrieved",
            device_ids: ids
        });
    })
}

// Fetch Device details
export const deviceDetails = (query: object) => {
    return new Promise((resolve, reject) => {
        Devices.findOne(query)
            .then((device) => {
                resolve(device);
            })
            .catch(() => {
                reject(null);
            });
    });
}

/**
 * Restore device
 *
 * @param
 */
export const restoreDevice = (req: Request, res: Response) => {
    Devices.findByIdAndUpdate(req.params.id, { isDeleted: false, activated: true }, { new: true }, function (err: any, data: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Device successfully restored",
            device_details: data
        });
    })
}