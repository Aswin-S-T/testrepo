import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

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
