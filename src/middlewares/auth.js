const mongoose = require('mongoose')
const httpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'devmode'
const User = require("../models/user.model.js");

// API middleware auth
module.exports = function (...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    return function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: httpStatus.UNAUTHORIZED,
                message: 'Not authorized'
            })
        }
        let token = req.headers.authorization.split(" ");
        try {
            let decodedIdAndToken = jwt.verify(token[1], secret)
            const query = {
                "_id": mongoose.Types.ObjectId(decodedIdAndToken.user_id)
            };
            User.findOne(query)
                .then((userInfo) => {
                    req['user_id'] = userInfo._id;
                    req['role'] = userInfo.userRole;
                    if (isAllowed(userInfo.userRole)) {
                        req['user_role'] = userInfo.userRole;
                        next()
                    } else {
                        return res.status(httpStatus.UNAUTHORIZED).json({
                            message: 'Not authorized',
                            error: {
                                "Message": 'Permission denied'
                            }
                        })
                    }
                })
                .catch(() => {
                    return res.status(httpStatus.UNAUTHORIZED).json({
                        message: 'Not authorized'
                    })
                });
        } catch (e) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: 'Not authorized'
            })
        }
    }
}