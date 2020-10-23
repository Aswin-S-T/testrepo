import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtService } from '@utils';

const jwtService = new JwtService();

// Middleware to verify if user is an admin
export const auth = (...allowed: String[]) => {
    const isAllowed = (role: String) => allowed.indexOf(role) > -1;
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            // Get json-web-token
            let token: any;
            if (!req.headers.authorization) {
                throw Error('JWT not present in authorization header');
            }
            token = req.headers.authorization.split(" ");
            // Make sure user role is an admin
            const userData = await jwtService.decodeJwt(token[1]);
            if (isAllowed(userData.user_role)) {
                req.body.user_id = userData.user_id;
                req.body.user_role = userData.user_role;
                next();
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    status: 'failed',
                    message: "Authentication failed",
                    error: "Permission denied",
                });
            }
        } catch (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'failed',
                message: "Authentication failed",
                error: "Invalid authorization token"
            });
        }
    }
};