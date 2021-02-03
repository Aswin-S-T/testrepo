import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { deviceDetails, getDeviceLastData, getDeviceLastHourAQI } from '@controllers';
import mongoose from "mongoose";

/**
 * 
 *
 * @param
 */
export const dashboardStatistics = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const response: any = {
        aqi: -1,
        pollutants: {},
        weather: {},
        device_details: {}
    }
    const device: any = await deviceDetails({ _id: mongoose.Types.ObjectId(req.params.deviceId), isDeleted: false, activated: true });
    if (device) {
        const deviceLastData: any = await getDeviceLastHourAQI(req.params.deviceId);
        if (deviceLastData) {
            response.aqi = Math.round(deviceLastData.aqi)
            response.pollutants = {
                PM2p5: deviceLastData.data.PM2p5,
                PM10: deviceLastData.data.PM10,
                CO: deviceLastData.data.CO,
                NO2: deviceLastData.data.NO2,
                SO2: deviceLastData.data.SO2,
                O3: deviceLastData.data.O3,
                prominentPollutant: deviceLastData.prominentPollutant
            }
            response.weather = {
                temperature: deviceLastData.data.temperature,
                humidity: deviceLastData.data.humidity,
                UV: deviceLastData.data.UV,
                rain: deviceLastData.data.rain
            }
            const aqiParams = ['PM2p5', 'PM10', 'CO', 'NO2', 'SO2', 'O3'];
            aqiParams.forEach(param => {
                const paramIndex = device.paramDefinitions.findIndex((e: { paramName: string; }) => { return e.paramName === param })
                if (response.pollutants[param] === 0) {
                    response.pollutants[param] == '0'
                }
                if (paramIndex == -1) {
                    delete response.pollutants[param]
                }
            });
        }
        response.device_details = {
            _id: device._id,
            city: device.location.city,
            landMark: device.location.landMark,
            lastDataReceiveTime: device.dateTime
        }
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Data successfully retrieved",
        statistics: response
    });
}