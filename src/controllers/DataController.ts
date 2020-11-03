import { Request, Response } from 'express';
import request from 'request';
import { seedData } from '@utils';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { deviceDetails } from '@controllers';
import { SensorData } from '../models/SensorData';
import { SensorRawData } from '../models/SensorRawData';
import mongoose from 'src/database/db';
import { SensorSpec, SensorSpecExclude } from '@helpers';
import { handleDeviceErrors, generateAlerts } from '@controllers';

//  Sensor data calibration process
const processCalibration = (val: any, paramDefinitions: any) => {
    if (val != undefined) {
        if (paramDefinitions.calibration != null) {
            if (paramDefinitions.calibration.type == "curve") {

                for (let i = 0; i < paramDefinitions.calibration.data.length; i++) {
                    const calibItem = paramDefinitions.calibration.data[i];
                    if (calibItem.offset == undefined) {
                        calibItem.offset = 0;
                    }

                    if (val >= calibItem.min && val <= calibItem.max) {
                        if (calibItem.funct == null || calibItem.funct == "translate") {
                            val = val + calibItem.offset;
                        }
                        else if (calibItem.funct == "scale") {
                            val = val * calibItem.offset;
                        }
                        break;

                    }
                }
            }
        }
    }

    return val;
}

// Parameter conversions
const doParamConversion = function (param: string, value: number | null) {
    if (param === 'NO2' && value != null) {
        value = (value * 0.0409 * 46.01) * 1000;
    } else if (param === 'SO2' && value != null) {
        value = (value * 0.0409 * 64.06) * 1000;
    } else if (param === 'O3' && value != null) {
        value = (value * 0.0409 * 48) * 1000;
    } else if (param === 'CO' && value != null) {
        value = (value * 0.0409 * 28.01);
    } else if (param === 'NH3' && value != null) {
        value = (value * 0.0409 * 17.031) * 1000;
    }
    return value;
}

// AQMS parameter conversions
const getAqmsConversion = function (data: any) {
    if (data.NO2 != null) {
        data.NO2 = (data.NO2 * 0.0409 * 46.01) * 1000;
    }
    if (data.SO2 != null) {
        data.SO2 = (data.SO2 * 0.0409 * 64.06) * 1000;
    }
    if (data.O3 != null) {
        data.O3 = (data.O3 * 0.0409 * 48) * 1000;
    }
    if (data.CO != null) {
        data.CO = (data.CO * 0.0409 * 28.01);
    }
    if (data.NH3 != null) {
        data.NH3 = (data.NH3 * 0.0409 * 17.031) * 1000;
    }
    const currentdate = new Date();
    data.receivedTime = currentdate.valueOf();
    return [data];
}

// Hashed conversion for multiple data post
const getHashedConversion = function (data: any) {
    const firstParam = data[Object.keys(data)[0]].toString().split("#");
    let returnData: any = Array(firstParam.length).fill({});
    for (const key of Object.keys(data)) {
        if (key !== 'time' && key !== 'samplingInterval') {
            let paramVals = data[key].toString().split("#");
            paramVals.forEach((val: any, count: string | number) => {
                val = doParamConversion(key, parseInt(val));
                returnData[count] = { ...returnData[count], ...{ [key]: parseInt(val) } }
            });
        } else if (key === 'time') {
            const latestDate = new Date(data.time).valueOf();
            for (let index = 0; index < firstParam.length; index++) {
                const datasetTime = latestDate - ((firstParam.length - (index + 1)) * data.samplingInterval * 1000);
                returnData[index] = { ...returnData[index], ...{ receivedTime: datasetTime } }
            }
        }
    }
    return returnData;
}

/**
 * Handle and Process post data from device
 *
 * @param
 */
export const processDeviceData = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ "success": false, "errors": errors.array({ onlyFirstError: true }) });
    }
    const { deviceId, data } = req.body;
    const deviceDeatails = await deviceDetails({ "deviceId": deviceId });
    if (deviceDeatails) {
        let sensorData = {};
        //  Convert data parameters
        switch (process.env.PROJECT_TYPE) {
            case 'AQMS':
                if (process.env.SINGLET_POST === "false") {
                    sensorData = getHashedConversion(data)
                } else {
                    sensorData = getAqmsConversion(data)
                }
                break;
            default:
                sensorData = data
                break;
        }
        //  Device error handler
        handleDeviceErrors(deviceDeatails, sensorData)
        //  Parse incoming data
        parseInComingData(deviceDeatails, sensorData)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Data has been processed successfully"
        });
    } else {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: "Device not found"
        });
    }
}

// Parse incoming data
const parseInComingData = async (deviceDeatails: any, sensorData: any) => {
    const rawData = {
        deviceId: mongoose.Types.ObjectId(deviceDeatails._id),
        latitude: deviceDeatails.location.latitude,
        longitude: deviceDeatails.location.longitude,
        data: sensorData,
        receivedAt: new Date(sensorData.time)
    }
    const rawDataDetails: any = await saveRawDataAndGetId(rawData);
    if (rawDataDetails) {
        const processedData: any = await parseData(sensorData, deviceDeatails, SensorSpec);
        processedData.receivedAt = new Date(sensorData.time)
        generateAlerts(deviceDeatails, sensorData);

        // to do raw aqi calculation
        //

        const sensorDataModel = new SensorData({
            deviceId: mongoose.Types.ObjectId(deviceDeatails._id),
            rawDataId: mongoose.Types.ObjectId(rawDataDetails._id),
            data: processedData,
            receivedAt: new Date(sensorData.time)
        })
        sensorDataModel.save(function (err: any, result: any) {

        })
    }
}

// WMAFilter
const WMAFilter = (oldValue: any, newValue: any, filter: any) => {
    return oldValue * filter.weightT0 + newValue * filter.weightT1;
}

// Parse Data
const parseData = (data: any, device: any, paramDefinitions: any) => {
    return new Promise(async (resolve, reject) => {
        let filterResult: any = {};

        for (var i = 0; i < paramDefinitions.length; i++) {
            filterResult[paramDefinitions[i].paramName] = data[paramDefinitions[i].paramName];
            if (!SensorSpecExclude.includes(paramDefinitions[i].paramName)) {
                if (filterResult[paramDefinitions[i].paramName]) {
                    filterResult[paramDefinitions[i].paramName] = parseFloat(filterResult[paramDefinitions[i].paramName].toFixed(2))
                }
            }
            filterResult[paramDefinitions[i].paramName] = processCalibration(filterResult[paramDefinitions[i].paramName], paramDefinitions[i]);

            if (paramDefinitions[i].filteringMethod == "WMAFilter") {
                const originalVal = filterResult[paramDefinitions[i].paramName];
                SensorData.findOne({ deviceId: mongoose.Types.ObjectId(device._id), isDeleted: 0 }, { sort: { 'createdAt': -1 } }, function (err: any, oldData: any) {
                    if (oldData && oldData[paramDefinitions[i].paramName] != null) {
                        var oldValue = data[paramDefinitions[i].paramName];
                        var newValue = processCalibration(originalVal, paramDefinitions[i]);;
                        var res = WMAFilter(oldValue, newValue, paramDefinitions[i].filteringMethodDef);
                        filterResult[paramDefinitions[i].paramName] = res;
                    }
                })
            }
            resolve(filterResult);
        }

    });
}

//  Save and get raw data id
const saveRawDataAndGetId = (data: any) => {
    return new Promise((resolve, reject) => {
        const rawData = new SensorRawData(data);
        rawData.save(function (err: any, data: any) {
            if (err) { reject(null) }
            resolve(data)
        })
    });
}

/**
 * Device dummy data seed
 *
 * @param
 */
export const dummyDataSeed = () => {
    seedData.devices.forEach(deviceId => {
        const data: any = {}
        seedData.params.forEach(param => {
            if (param == 'receivedTime') {
                data['time'] = new Date()
            } else {
                data[param] = Math.floor(Math.random() * 100);
            }
        });
        const sensorData: any = {
            deviceId: deviceId,
            data: data
        }
        request.post(
            'http://localhost:3200/v1.0/device/sensor/livedata',
            {
                json: sensorData,
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
            }
        )
    });
}