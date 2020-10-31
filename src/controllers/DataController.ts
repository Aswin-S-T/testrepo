import { Request, Response } from 'express';
import { seedData } from '@utils';
import request from 'request';
import { Double } from 'mongodb';

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
        console.log(sensorData)
        request.post(
            'https://159.89.163.128:7003/device/sensor/livedata',
            {
                json: sensorData,
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(body)
            }
        )
    });
}