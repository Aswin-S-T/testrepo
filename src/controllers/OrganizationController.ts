import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';


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
}


/**
 * List device
 *
 * @param
 */
export const listOrganization = (req: Request, res: Response) => {
}

/**
 * Update device
 *
 * @param
 */
export const updateOrganization = (req: Request, res: Response) => {
}


/**
 * Update device
 *
 * @param
 */
export const getOrganizationDetails = (req: Request, res: Response) => {
}


/**
 * Update device
 *
 * @param
 */
export const deleteOrganization = (req: Request, res: Response) => {
}