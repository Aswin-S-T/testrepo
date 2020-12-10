import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Calibration } from '../models/Calibration';
import { Types } from 'mongoose';
import { getPagination } from '@utils';

export const addCalibCert = (req: Request, res: Response) => {
console.log("REQ", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const { certId, expDate } = req.body;
    const calibCert = new Calibration({
        certId: certId,
        expiry: expDate,
        createdBy: Types.ObjectId(req.body.user_id)
    })
    calibCert.save(function (err: any, calib: any) {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Document with same name already exists",
            });
        }
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Document created successflly",
            calib_details: calib
        });
    })
}

export const listCalibCert = (req: Request, res: Response) => {
    const { skip, limit, status } = req.query;
    const pageSkip: any = skip || 0;
    const pageLimit: any = limit || 10;
    const match: any = { isDeleted: false };
    status == 'enabled' ? match.activated = true : status == 'disabled' ? match.activated = false : ''

    Calibration.aggregate([
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
                if (data[0].data[i].activated == true) {
                    let expiry = data[0].data[i].expiry;
                    let currentDate = new Date();
                    let expiryDate = new Date(expiry);
                    if (currentDate.getTime() > expiryDate.getTime()) {
                        data[0].data[i].activated = false;
                    }
                }
            }
            response.list = data[0].data;
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully retrived data",
            calib_list: response.list,
            pagination: response.pagination
        });
    })
}
