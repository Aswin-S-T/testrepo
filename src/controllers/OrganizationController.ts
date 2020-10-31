import { getPagination } from '@utils';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { Organization } from '../models/Organization';

/**
 * Add new device
 *
 * @param
 */
export const addOrganization = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const { name, description } = req.body;
    const organization = new Organization({
        name: name,
        description: description,
        createdBy: Types.ObjectId(req.body.user_id)
    })
    organization.save(function (err: any, org: any) {
        if (err) { return }
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Document created successflly",
            org_details: org
        });
    })
}


/**
 * List device
 *
 * @param
 */
export const listOrganization = (req: Request, res: Response) => {
    const { skip, limit } = req.query;
    const pageSkip: any = skip || 0;
    const pageLimit: any = limit || 10;
    const match: any = { isDeleted: false };
    Organization.aggregate([
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
            response.list = data[0].data
        }
        return res.status(StatusCodes.OK).json({
            ssuccess: true,
            message: "Successfully retrived data",
            organizations: response.list,
            pagination: response.pagination
        });
    })
}

/**
 * Update device
 *
 * @param
 */
export const updateOrganization = async (req: Request, res: Response) => {
    const { name, description, is_default } = req.body;
    let updateData: any = {};
    name ? updateData.name = name : '';
    description ? updateData.description = description : '';
    if (is_default != undefined && (is_default || !is_default)) {
        updateData.isDefault = is_default
        if (is_default) {
            await Organization.updateMany({ isDeleted: false, isDefault: true }, { isDefault: false }, function (err: any, data: any) { })
        }
    }

    Organization.findByIdAndUpdate(req.params.id, updateData, { new: true }, function (err: any, org: any) {
        if (err) { }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated organization details",
            org_details: org
        });
    })
}


/**
 * Update device
 *
 * @param
 */
export const getOrganizationDetails = (req: Request, res: Response) => {
    Organization.findById(req.params.id, function (err: any, org: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Organization details",
            org_details: org
        });
    })
}


/**
 * Update device
 *
 * @param
 */
export const deleteOrganization = (req: Request, res: Response) => {
    Organization.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true }, function (err: any, org: any) {
        if (err) { }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted organization"
        });
    })
}