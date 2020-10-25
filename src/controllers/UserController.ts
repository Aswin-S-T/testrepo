import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { User } from "../models/Users";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

/**
 * List -  User
 *
 * @method  userstList
 * 
 * @param   req
 * @param   res
 */

export const userstList = (req: Request, res: Response) => {
}


/**
 * Add -  User
 *
 * @method  addUser
 * 
 * @param   req
 * @param   res
 */
export const addUser = (req: Request, res: Response) => {
}

/**
 * Edit -  User by id
 *
 * @method  editUser
 * 
 * @param   req
 * @param   res
 */
export const editUser = async (req: Request, res: Response) => {
}


/**
 * Update -  User details, auth user
 *
 * @method  updateUserDetails
 * 
 * @param   req
 * @param   res
 */
export const updateUserDetails = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const { name } = req.body;
    const update: any = {
        name: name
    }
    User.findByIdAndUpdate(req.body.user_id, update, { new: true }, function (err: any, data: any) {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong! Please try later",
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated",
            user_details: data
        });
    })
}

/**
* Get -  User details
*
* @method  getUserDetails
* 
* @param   req
* @param   res
*/
export const getUserDetails = (req: Request, res: Response) => {
    User.findById(req.body.user_id, function (err: any, data: any) {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Data successfully retrived",
            user_details: data
        });
    })
}

/**
* Get -  Password hash value
*
* @method  passwordHash
* 
* @param   req
* @param   res
*/
const passwordHash = (password: any) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err: any, hash: string) => {
                resolve(hash)
            });
        });
    })
}

/**
* Update user password
*
* @method  updateUserPassword
* 
* @param   req
* @param   res
*/
export const updateUserPassword = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const { current_password, confirm_password, password } = req.body;
    if (confirm_password != password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Your password and confirmation password do not match",
        });
    }
    User.findById(req.body.user_id, (err, user) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong! Please try later",
            });
        }
        if (user) {
            bcrypt.compare(current_password, user.password, async function (err, userAuth) {
                if (userAuth) {
                    if (current_password == password) {
                        return res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            message: "Password already in use",
                        });
                    } else {
                        const hash = await passwordHash(password)
                        const update: any = {
                            password: hash
                        }
                        User.findByIdAndUpdate(req.body.user_id, update, { new: true }, function (err: any, data: any) {
                            if (err) {
                                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                    success: false,
                                    message: "Something went wrong! Please try later",
                                });
                            }
                            return res.status(StatusCodes.OK).json({
                                success: true,
                                message: "Successfully updated",
                                user_details: data
                            });
                        })
                    }
                } else {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: "Invalid Password",
                    });
                }
            });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Account not found"
            });
        }
    });
}

/**
* Fetch user details by id
*
* @method  getUserDetailsById
* 
* @param   req
* @param   res
*/
export const getUserDetailsById = (req: Request, res: Response) => {
    User.findById(req.params.id, function (err: any, data: any) {
        if (err) { }
        if (data) {
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Data successfully retrived",
                user_details: data
            });
        } else {
            return res.status(StatusCodes.OK).json({
                success: false,
                message: "User account not found"
            });
        }
    })
}