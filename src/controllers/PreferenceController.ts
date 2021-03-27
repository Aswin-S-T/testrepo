import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { Preferences } from "../models/Preferences";
import { validationResult } from 'express-validator';

/**
 * 
 * @method getPreferences
 * @param
 */
export const getPreferences = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    Preferences.findOne({ type: req.query.type }, function (err: any, data: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Data successfully retrieved",
            preference: data
        });
    })
}


/**
 * 
 * @method addPreferences
 * @param
 */
export const addPreferences = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const { type, preference } = req.body;
    const preferenceModel = new Preferences({
        type: type,
        data: preference
    })
    preferenceModel.save(function (err: any, data: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Preference successfully added",
            preference_details: preferenceModel
        });
    })
}

/**
 * 
 * @method addPreferences
 * @param
 */
export const updatePreferences = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
}