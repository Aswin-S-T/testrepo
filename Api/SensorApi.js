
var responseModule = require('../HubResponse.js');

var requestValidationModule = require('../RequestValidation.js');
var requestValidation = new requestValidationModule.RequestValidation();

var SensorManagerModule = require('../Device/SensorManager.js');
var sensorManager = new SensorManagerModule.SensorManager();

var thirdpartyrequestValidationModule = require('../ThirdPartyRequestValidation.js')
var thirdpartyrequestValidation = new thirdpartyrequestValidationModule.ThirdPartyRequestValidation();



const rateLimit = new require("express-rate-limit");

const apiLimiter = rateLimit({

    windowMs: 1000 * 60 * 60,
    max: 100,


});

function SensorApi(express) {

    //express.use(apiLimiter);
    express.get('/device/sensor/livedata/v1/count', function (req, res) {
        // device id will not be logical for this API
        express.use(apiLimiter);
        var hubResponse = new responseModule.HubResponse();
        thirdpartyrequestValidation.isValidThirdPartyuser(req.query.apikey, 1, function (result) {
            if (result == "limit") {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Limit Exceeded");
                res.end(response);

            }
            else {
                // getLiveDataCount(req, res, false);
                if (req.query != null && req.query.deviceIds != null) {


                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');

                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    
                    var i = 0;

                    var funcName = 'getLiveDataCountFromDeviceId';



                    var fetchSensor = function (err, sensorId, value) {
                        if (err == null) {
                            var resultPerDevice = { deviceId: sensorId, count: value };
                            listResult.push(resultPerDevice);

                        }
                        i++;
                        if (lastDevId == sensorId) {
                            hubResponse.data = { liveDataCountPerDeviceId: listResult };
                            response = hubResponse.getOkResponse();

                            res.end(response);
                        }
                        else {
                            sensorManager[funcName](listDevIds[i], timeStart, timeEnd, fetchSensor);
                        }
                    };

                    sensorManager[funcName](listDevIds[i], timeStart, timeEnd, fetchSensor);


                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });
    }
    )



    var getLiveDataCount = function (req, res, isLogicalDeviceId) {

        var hubResponse = new responseModule.HubResponse();
        requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
            if (result == null) {

                var response = null;
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);

            }
            else {

                if (req.query != null && req.query.deviceIds != null) {

                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;

                    var funcName = 'getLiveDataCount';

                    if (!isLogicalDeviceId) {
                        funcName = 'getLiveDataCountFromDeviceId';
                    }

                    var fetchSensor = function (err, sensorId, value) {
                        if (err == null) {
                            var resultPerDevice = { deviceId: sensorId, count: value };
                            listResult.push(resultPerDevice);

                        }
                        i++;
                        if (lastDevId == sensorId) {

                            hubResponse.data = { liveDataCountPerDeviceId: listResult };
                            response = hubResponse.getOkResponse();
                            res.end(response);
                        }
                        else {

                            sensorManager[funcName](listDevIds[i], timeStart, timeEnd, fetchSensor);
                        }
                    };

                    sensorManager[funcName](listDevIds[i], timeStart, timeEnd, fetchSensor);
                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });

    }

    express.get('/device/sensor/livedata/count', function (req, res) {

        getLiveDataCount(req, res, true);

    });

    express.get('/device/sensor/livedata/v1', function (req, res) {
        // getLiveData(req, res, false);
        express.use(apiLimiter);
        var hubResponse = new responseModule.HubResponse();

        thirdpartyrequestValidation.isValidThirdPartyuser(req.query.apikey, 2, function (result) {
            if (result == "limit") {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Limit Exceeded");
                res.end(response);
            }
            else {

                if (req.query != null && req.query.deviceIds != null) {
                    
                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;
                    var numberOfRecords = 10;
                    var offset = 0;
                    if (req.query.limit != null)
                        numberOfRecords = parseInt(req.query.limit);
                    if (req.query.offset != null)
                        offset = parseInt(req.query.offset);

                    var fetchSensorLiveData = function () {

                        sensorManager.getLiveDataFromDeviceId(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);
                    };

                    var fetchSensor = function (err, sensorId, value) {
                        if (err == null) {
                            if (value[0] != null || value[0] != undefined) {
                                
                                delete value[0].data.er_init_sensor;
                                delete value[0].data.er_read_sensor;
                                delete value[0].data.build_ver;
                                delete value[0].data.sig_strength;

                                // for(var m=0; m<1; m++){

                                //     for(z in value[0].data){
                                        
                                //         value[0].data[z] = value[0].data[z].toFixed(3);

                                //     }
                                   
                                // }
                                var resultPerDevice = { deviceId: listDevIds[i], dataList: value };
                                listResult.push(resultPerDevice);
                            }
                        }
                        i++;
                        if (i >= listDevIds.length) {
                            hubResponse.data = { liveDataPerDeviceId: listResult };
                            response = hubResponse.getOkResponse();

                            res.end(response);
                        }
                        else {
                            fetchSensorLiveData();
                            //sensorManager.getLiveData(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);
                        }
                    };

                    fetchSensorLiveData();
                    //sensorManager.getLiveData(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);
                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });
    });

    var getLiveData = function (req, res, isLogicalDeviceId) {

        var hubResponse = new responseModule.HubResponse();

        requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
            if (result == null) {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);
            }
            else {

                if (req.query != null && req.query.deviceIds != null) {
                   
                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;
                    var numberOfRecords = 10;
                    var offset = 0;
                    if (req.query.limit != null)
                        numberOfRecords = parseInt(req.query.limit);
                    if (req.query.offset != null)
                        offset = parseInt(req.query.offset);

                    var fetchSensorLiveData = function () {
                        if (isLogicalDeviceId)
                            sensorManager.getLiveData(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);
                        else
                            sensorManager.getLiveDataFromDeviceId(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);
                    };

                    var fetchSensor = function (err, sensorId, value) {
                        if (err == null) {
                            var resultPerDevice = { deviceId: listDevIds[i], dataList: value };
                            listResult.push(resultPerDevice);

                        }
                        i++;
                        if (i >= listDevIds.length) {
                            hubResponse.data = { liveDataPerDeviceId: listResult };
                            response = hubResponse.getOkResponse();

                            res.end(response);
                        }
                        else {
                            fetchSensorLiveData();
                            //sensorManager.getLiveData(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);
                        }
                    };

                    fetchSensorLiveData();
                    //sensorManager.getLiveData(listDevIds[i], numberOfRecords, offset, timeStart, timeEnd, fetchSensor);


                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });


    }

    express.get('/device/sensor/livedata', function (req, res) {


        getLiveData(req, res, true);


    });


    express.post('/device/sensor/livedata', function (req, res) {


        var hubResponse = new responseModule.HubResponse();

        if (req.body != null) {
            if (req.body.data.NO2 != null) {

                req.body.data.NO2 = (req.body.data.NO2 * 0.0409 * 46.01) * 1000;
            }
            if (req.body.data.SO2 != null) {

                req.body.data.SO2 = (req.body.data.SO2 * 0.0409 * 64.06) * 1000;
            }
            if (req.body.data.O3 != null) {

                req.body.data.O3 = (req.body.data.O3 * 0.0409 * 48) * 1000;
            }
            if (req.body.data.CO != null) {

                req.body.data.CO = (req.body.data.CO * 0.0409 * 28.01);
            }
            if (req.body.data.NH3 != null) {

                req.body.data.NH3 = (req.body.data.NH3 * 0.0409 * 17.031)*1000;
            }
            var dataOfRequest = {
                "temperature": Number((req.body.data.temperature).toFixed(2)),
                "pressure": Number((req.body.data.pressure).toFixed(2)),
                "humidity": Number((req.body.data.humidity).toFixed(2)),
                "noise": Number((req.body.data.noise).toFixed(2)),
                "rain": Number((req.body.data.rain).toFixed(3)),
                "PM10": Number((req.body.data.PM10).toFixed(0)),
                "PM2p5": Number((req.body.data.PM2p5).toFixed(0)),
                "PM1": Number((req.body.data.PM1).toFixed(0)),
                "CO": Number((req.body.data.CO).toFixed(3)),
                "CO2": Number((req.body.data.CO2).toFixed(0)),
                "NO2": Number((req.body.data.NO2).toFixed(3)),
                "SO2": Number((req.body.data.SO2).toFixed(3)),
                "O3": Number((req.body.data.O3).toFixed(3)),
                "NH3": Number((req.body.data.NH3).toFixed(3)),
                "time": req.body.data.time,
                "er_init_sensor": req.body.data.er_init_sensor,
                "er_read_sensor": req.body.data.er_read_sensor,
                "sig_strength":req.body.data.sig_strength,
                "build_ver":req.body.data.build_ver
            }
            sensorManager.pushSensorData(req.body.deviceId, dataOfRequest, function (err) {

                if (err == null) {
                    response = hubResponse.getOkResponse();
                }
                else
                    response = hubResponse.getErrorResponse(-2, "Failed to update DB in server");

                res.end(response);
            });
        }
        else {
            res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
        }
    });


    var convertFromOldToNewFormat = function (oldJsonData) {
        var result = null;

        if (oldJsonData.deviceId != null && oldJsonData.payload != null && oldJsonData.payload.d != null) {
            var newData = oldJsonData.payload.d;
            if (newData.deviceId != null)
                delete newData.deviceId;

            if (newData.deviceType != null)
                delete newData.deviceType;

            if (newData.uptime != null)
                delete newData.uptime;

            result = { deviceId: oldJsonData.deviceId, data: newData };
        }
        return result;
    }
    express.post('/device/sensor/livedata/oldformat', function (req, res) {


        var hubResponse = new responseModule.HubResponse();

        if (req.body != null) {
            var newFormat = convertFromOldToNewFormat(req.body);
            if (newFormat != null) {
                sensorManager.pushSensorData(newFormat.deviceId, newFormat.data, function (err) {
                    if (err != null) {
                        response = hubResponse.getOkResponse();
                        res.end(response);
                    }

                });
            }
            else
                res.end(hubResponse.getErrorResponse(-2, "Invalid Format"));
        }
        else {
            res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
        }



    });

    var includeHourlyStats = function (optionList) {
        return optionList.indexOf('hourly') >= 0;
    };
    var includeDailyStats = function (optionList) {
        return optionList.indexOf('daily') >= 0;
    };
    var includeMonthlyStats = function (optionList) {
        return optionList.indexOf('monthly') >= 0;
    };
    var includeYearlyStats = function (optionList) {
        return optionList.indexOf('yearly') >= 0;
    };



    express.get('/device/sensor/stats/v1', function (req, res) {

        express.use(apiLimiter);

        var hubResponse = new responseModule.HubResponse();

        thirdpartyrequestValidation.isValidThirdPartyuser(req.query.apikey, 3, function (result) {
            if (result == "limit") {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Limit Exceeded");
                res.end(response);

            }
            else {

                if (req.query != null && req.query.deviceIds != null && req.query.timeFrame != null) {
                    var options = req.query.timeFrame.split(',');
                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var paramList = null;//req.query.params.split(',');
                    if (req.query.params != null)
                        paramList = req.query.params.split(',');

                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;
                    var numberOfRecords = 100;
                    var offset = 0;



                    if (req.query.limit != null)
                        numberOfRecords = parseInt(req.query.limit);
                    if (req.query.offset != null)
                        offset = parseInt(req.query.offset);

                    {
                        var devId = listDevIds[i];

                        var fetchSensor = function (err, value) {
                            if (err == null) {
                                var resultPerDevice = { deviceId: listDevIds[i], stat: value };
                                listResult.push(resultPerDevice);


                            }
                            i++;
                            if (i >= listDevIds.length) {

                                hubResponse.data = { statPerDeviceId: listResult };
                                response = hubResponse.getOkResponse();

                                res.end(response);
                            }
                            else {
                                sensorManager.getSensorStats(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                                    (options), includeYearlyStats(options), numberOfRecords, offset, fetchSensor);
                            }
                        };
                        sensorManager.getSensorStats(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                            (options), includeYearlyStats(options), numberOfRecords, offset, fetchSensor);
                    }

                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });

    });

    express.get('/device/sensor/stats', function (req, res) {


        var hubResponse = new responseModule.HubResponse();

        requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
            if (result == null) {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);
            }
            else {

                if (req.query != null && req.query.deviceIds != null && req.query.timeFrame != null) {
                    var options = req.query.timeFrame.split(',');
                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var paramList = null;//req.query.params.split(',');
                    if (req.query.params != null)
                        paramList = req.query.params.split(',');

                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;
                    var numberOfRecords = 100;
                    var offset = 0;



                    if (req.query.limit != null)
                        numberOfRecords = parseInt(req.query.limit);
                    if (req.query.offset != null)
                        offset = parseInt(req.query.offset);

                    {
                        var devId = listDevIds[i];

                        var fetchSensor = function (err, value) {
                            if (err == null) {
                                var resultPerDevice = { deviceId: listDevIds[i], stat: value };
                                listResult.push(resultPerDevice);


                            }
                            i++;
                            if (i >= listDevIds.length) {

                                hubResponse.data = { statPerDeviceId: listResult };
                                response = hubResponse.getOkResponse();

                                res.end(response);
                            }
                            else {
                                sensorManager.getSensorStats(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                                    (options), includeYearlyStats(options), numberOfRecords, offset, fetchSensor);
                            }
                        };
                        sensorManager.getSensorStats(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                            (options), includeYearlyStats(options), numberOfRecords, offset, fetchSensor);
                    }

                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });

    });


    express.get('/device/sensor/stats/v1/count', function (req, res) {
        express.use(apiLimiter);
        var hubResponse = new responseModule.HubResponse();

        thirdpartyrequestValidation.isValidThirdPartyuser(req.query.apikey, 4, function (result) {
            if (result == "limit") {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Limit Exceeded");
                res.end(response);

            }
            else {

                if (req.query.params == null)
                    req.query.params = null;
                if (req.query != null && req.query.deviceIds != null && req.query.timeFrame != null) {
                    var options = req.query.timeFrame.split(',');
                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var paramList = null;
                    if (req.query.params != null)
                        paramList = req.query.params.split(',');
                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;
                    var numberOfRecords = 10;
                    var offset = 0;

                    if (req.query.limit != null)
                        numberOfRecords = parseInt(req.query.limit);
                    if (req.query.offset != null)
                        offset = parseInt(req.query.offset);

                    {
                        var devId = listDevIds[i];

                        var fetchSensor = function (err, value) {
                            if (err == null) {
                                var resultPerDevice = { deviceId: listDevIds[i], stat: value };
                                listResult.push(resultPerDevice);


                            }
                            i++;
                            if (i >= listDevIds.length) {

                                hubResponse.data = { statCountPerDeviceId: listResult };
                                response = hubResponse.getOkResponse();

                                res.end(response);
                            }
                            else {
                                sensorManager.getSensorStatsCount(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                                    (options), includeYearlyStats(options), fetchSensor);
                            }
                        };
                        sensorManager.getSensorStatsCount(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                            (options), includeYearlyStats(options), fetchSensor);
                    }

                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });

    });


    express.get('/device/sensor/stats/count', function (req, res) {

        var hubResponse = new responseModule.HubResponse();

        requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
            if (result == null) {
                var response = null;
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);
            }
            else {

                if (req.query.params == null)
                    req.query.params = null;
                if (req.query != null && req.query.deviceIds != null && req.query.timeFrame != null) {
                    var options = req.query.timeFrame.split(',');
                    var timeStart = req.query.timeStart;
                    var timeEnd = req.query.timeEnd;
                    var listDevIds = req.query.deviceIds.split(',');
                    var paramList = null;
                    if (req.query.params != null)
                        paramList = req.query.params.split(',');
                    var listResult = [];
                    var lastDevId = listDevIds[listDevIds.length - 1];
                    var i = 0;
                    var numberOfRecords = 10;
                    var offset = 0;

                    if (req.query.limit != null)
                        numberOfRecords = parseInt(req.query.limit);
                    if (req.query.offset != null)
                        offset = parseInt(req.query.offset);

                    {
                        var devId = listDevIds[i];

                        var fetchSensor = function (err, value) {
                            if (err == null) {
                                var resultPerDevice = { deviceId: listDevIds[i], stat: value };
                                listResult.push(resultPerDevice);
                            }
                            i++;
                            if (i >= listDevIds.length) {

                                hubResponse.data = { statCountPerDeviceId: listResult };
                                response = hubResponse.getOkResponse();

                                res.end(response);
                            }
                            else {
                                sensorManager.getSensorStatsCount(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                                    (options), includeYearlyStats(options), fetchSensor);
                            }
                        };
                        sensorManager.getSensorStatsCount(listDevIds[i], paramList, timeStart, timeEnd, includeHourlyStats(options), includeDailyStats(options), includeMonthlyStats
                            (options), includeYearlyStats(options), fetchSensor);
                    }

                }
                else {
                    res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
                }
            }
        });

    });


}

// export the class
module.exports =
    {
        SensorApi
    };
