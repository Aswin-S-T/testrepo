var deviceModule = require('./Device.js');

var DatabaseHandlerModule = require('../DatabaseHandler.js');
var dbInstance = new  DatabaseHandlerModule.DatabaseHandler();

var DeviceManagerModule = require('../Device/DeviceManager.js');
var deviceManager = new DeviceManagerModule.DeviceManager();

var StatisticsManagerModule = require('../Calc/StatisticsManager.js');
var statManager = new StatisticsManagerModule.StatisticsManager();

var DateUtilsModule = require('../Utils/DateUtils.js');
var dateUtils = new DateUtilsModule.DateUtils();


var DeviceFactoryModule = require('./DeviceFactory.js');
var devFactory = new DeviceFactoryModule.DeviceFactory();
var fs=require("fs")

var UnitConverterModule = require('../Utils/UnitConverter.js');
var unitConverter = new UnitConverterModule.UnitConverter();

var SensorLiveDataHandlerModule = require('../Device/SensorLiveDataHandler.js')
var sensorLiveDataHandler = new SensorLiveDataHandlerModule.SensorLiveDataHandler();
var request=require('request');
var _ = require('lodash');

function SensorManager()
{
    var myInstance = this;
	
	this.incomingDataQueue = [];
   
    
    this.getReceivedTimeQueryJson = function (timeStart, timeEnd)
    {
        var res = null;
        if (timeStart != null && timeEnd != null) {
            res = [
                               { "data.receivedTime": { $gte: parseInt(timeStart) } },
                               { "data.receivedTime": { $lte: parseInt(timeEnd) } }
            ]
        }
        else if(timeStart!= null)
        {
            res = [
                               { "data.receivedTime": { $gte: parseInt(timeStart) } }
            ]
        }
        else if (timeEnd!= null) {
            res = [
                               { "data.receivedTime": { $lte: parseInt(timeEnd) } }
            ]
        }

        return res;

    }


    this.getLiveDataFromDeviceId = function (sensorId, limit, offset, timeStart, timeEnd, callBack) {

        deviceManager.getDeviceFromId(sensorId, function (device) {

            if (device != null) {
                sensorLiveDataHandler.getLiveData(device.logicalDeviceId, limit, offset, timeStart, timeEnd, function (err, sensorIdLogical, value) {
                    callBack(err, sensorId, value);
                });

            }
            else
                callBack(1, sensorId, null);
        });

        

    };


    // timeStart and timeEnd are nunmbers (for epoch values).
    this.getLiveData = function (sensorIdLogical, limit,offset, timeStart,timeEnd,callBack)
    {
        //deviceManager.getDeviceFromId(sensorId, function (device) {

           // if (device!= null)
            {
                sensorLiveDataHandler.getLiveData(sensorIdLogical, limit, offset, timeStart, timeEnd, callBack);

            }

    };


    this.getLiveDataCountFromDeviceId = function (deviceId, timeStart, timeEnd, callBack) {
       
        var myInstance = this;

         deviceManager.getDeviceFromId(deviceId, function (device) {
             if (device != null)
             {
                 var logicalSensorId = device.logicalDeviceId;
                var collectionName = logicalSensorId;
                var timeCond = myInstance.getReceivedTimeQueryJson(timeStart, timeEnd);

                var deviceQuery =
                {
                    logicalDeviceId: logicalSensorId,
                    $and: myInstance.getReceivedTimeQueryJson(timeStart, timeEnd)
                };
                if (timeCond == null) {
                    delete deviceQuery.$and;
                }

                
                var excludeFields = { '_id': false, 'deviceId': false };

                dbInstance.getDocumentCountByCriteria(collectionName, deviceQuery, function (err, result) {

                    if (err) {
                        callBack(1, deviceId, null);
                    }
                    else {
                        callBack(null, deviceId, result);
                    }

                });

                return;
                
             }
             else
                 callBack(1, deviceId, null);
        });

    };


    this.getLiveDataCount = function (logicalSensorId, timeStart, timeEnd, callBack) {


        var deviceId = logicalSensorId;
        var myInstance = this;
       // deviceManager.getDeviceFromId(deviceId, function (device) {
        // if (device != null)
        {
            //   if (device != null && device.devFamily) 
            {
                var collectionName = logicalSensorId;

                    var timeCond = myInstance.getReceivedTimeQueryJson(timeStart, timeEnd);

                    var deviceQuery =
       	            {
       	                logicalDeviceId: logicalSensorId,
       	                $and: myInstance.getReceivedTimeQueryJson(timeStart, timeEnd)
       	            };
                    if (timeCond == null) {
                        delete deviceQuery.$and;
                    }

                   
                    var excludeFields = { '_id': false, 'deviceId': false };

                    dbInstance.getDocumentCountByCriteria(collectionName, deviceQuery,function (err, result) {

                        if (err) {
                            callBack(1, logicalSensorId, null);
                        }
                        else {
                            callBack(null, logicalSensorId, result);
                        }

                    });

                    return;
                }
            }
            callBack(1, logicalSensorId, null);
        //});

    };

    this.updateStatistics = function (date, collectionNamePrefix, dataObj,device,cb) {
		var paramNameList = [];
		for (var propFieldItem in dataObj)
		{
			paramNameList.push(propFieldItem);
		}
		
		var k = 0;
		var updateStatItem = function(){
		
			
            var propField = paramNameList[k];
            statManager.updateHourlyStats(collectionNamePrefix+"_hourly", propField, dataObj[propField], date, function (err)
			{
                statManager.updateDailyStats(collectionNamePrefix+"_daily", propField, dataObj[propField], date,function (err)
                {
                    // ignore error.
                    statManager.updateMonthlyStats(collectionNamePrefix + "_monthly", propField, dataObj[propField], date, function (err)
                    {
                        // ignore error.
                        statManager.updateYearlyStats(collectionNamePrefix + "_yearly", propField, dataObj[propField], date,  function (err)
                        {
                            // ignore error.
                            k++;
                            if (k < paramNameList.length)
                            {
                                
                                updateStatItem();
                            }
                            else
                            {
                                cb();
                            }
                        });
                
                    
                    });
                });
            });
		}
		
		if (k < paramNameList.length)
			updateStatItem();
		else
			cb();
        
    }


    this.updateDerivedParams = function (date, collectionNamePrefix, dataObj, device) {

        var specificDevice = devFactory.createDeviceInstanceFromSubType(device.subType);
        specificDevice.parse(device);

        if (device.subType == "AFMEthernet") {
            // AQI calculation is needed and is baed on daily statistics.

            var currentDate = dateUtils.convertDateToTimeZone(date, device.timeZone);

            this.getSensorStats(device.deviceId, null, currentDate.valueOf(), currentDate.valueOf(), false, true, false, false, 100, 0, function (err, res) {
                if (!err && res.dailyStat != null) {

                    specificDevice.updateDerivedStats(res.dailyStat, collectionNamePrefix, date);
                }
            });
        }
    }


    this.getSensorStats = function (deviceId, paramList, timeFrom, timeTo, includeHourly, includeDaily, includeMonthly, includeYearly, numberOfRecords, offset, callBack) {


        var result = {};

        var funcs = [];
        var funcsStatTimePeriodArg = [];
        if (includeHourly) {
            funcs.push(this.getSensorStatsInfo);
            funcsStatTimePeriodArg.push("_hourly")
        }
        if (includeDaily) {
            funcs.push(this.getSensorStatsInfo);
            funcsStatTimePeriodArg.push("_daily")
        }
        if (includeMonthly) {
            funcs.push(this.getSensorStatsInfo);
            funcsStatTimePeriodArg.push("_monthly")
        }
        if (includeYearly) {
            funcs.push(this.getSensorStatsInfo);
            funcsStatTimePeriodArg.push("_yearly")

        }
        var i = 0;
        if (funcs.length > 0)
        {
            var resCallBack = function (err, res) {

                if (!err)
                {
                    if (funcsStatTimePeriodArg[i] == "_hourly")
                        result.hourlyStat = res;
                    if (funcsStatTimePeriodArg[i] == "_daily")
                        result.dailyStat = res;
                    if (funcsStatTimePeriodArg[i] == "_monthly")
                        result.monthlyStat = res;
                    if (funcsStatTimePeriodArg[i] == "_yearly")
                        result.yearlyStat = res;
                }

                i++;
                if (i < funcs.length)
                {
                    
                    funcs[i](deviceId, paramList, timeFrom, timeTo, numberOfRecords, offset,funcsStatTimePeriodArg[i], resCallBack);
                }
                else
                {
                    

                    callBack(null, result);
                }
            }

            funcs[i](deviceId, paramList, timeFrom, timeTo, numberOfRecords, offset, funcsStatTimePeriodArg[i],resCallBack);
        }

    }



    this.getSensorStatsCount = function (deviceId, paramList, timeFrom, timeTo, includeHourly, includeDaily, includeMonthly, includeYearly, callBack) {


        var result = {};

        var funcs = [];
        var funcsStatTimePeriodArg = [];
        if (includeHourly) {
            funcs.push(this.getSensorStatsInfoCount);
            funcsStatTimePeriodArg.push("_hourly")
        }
        if (includeDaily) {
            funcs.push(this.getSensorStatsInfoCount);
            funcsStatTimePeriodArg.push("_daily")
        }
        if (includeMonthly) {
            funcs.push(this.getSensorStatsInfoCount);
            funcsStatTimePeriodArg.push("_monthly")
        }
        if (includeYearly) {
            funcs.push(this.getSensorStatsInfoCount);
            funcsStatTimePeriodArg.push("_yearly")

        }
        var i = 0;
        if (funcs.length > 0) {
            var resCallBack = function (err, res) {

                if (!err) {
                    if (funcsStatTimePeriodArg[i] == "_hourly")
                        result.hourlyStat = res;
                    if (funcsStatTimePeriodArg[i] == "_daily")
                        result.dailyStat = res;
                    if (funcsStatTimePeriodArg[i] == "_monthly")
                        result.monthlyStat = res;
                    if (funcsStatTimePeriodArg[i] == "_yearly")
                        result.yearlyStat = res;
                }

                i++;
                if (i < funcs.length) {

                    funcs[i](deviceId, paramList, timeFrom, timeTo,  funcsStatTimePeriodArg[i], resCallBack);
                }
                else {


                    callBack(null, result);
                }
            }

            funcs[i](deviceId, paramList, timeFrom, timeTo,  funcsStatTimePeriodArg[i], resCallBack);
        }

    }


    this.getSensorStatsInfo = function (deviceId, paramList, timeFrom, timeTo, limit, offset,dbSuffix, callBack)
    {
       
        deviceManager.getDeviceFromId(deviceId, function (device)
        {
         
            if (device!=null)
            {
                var collectionName = myInstance.getStatCollectionPrefixFromDeviceLogicalId(device.logicalDeviceId) + dbSuffix;
                statManager.getStatParam(collectionName, paramList, timeFrom,timeTo,limit,offset,function (err, res)
                {

                    if (err)
                    {
                        callBack(1, null);
                    }
                    else {
                        callBack(null, res);
                    }

                });
            }
            else
                callBack(1, null);
        });
    }


    this.getSensorStatsInfoCount = function (deviceId, paramList, timeFrom, timeTo, dbSuffix, callBack) {

        deviceManager.getDeviceFromId(deviceId, function (device) {

            if (device != null) {
                var collectionName = myInstance.getStatCollectionPrefixFromDeviceLogicalId(device.logicalDeviceId) + dbSuffix;

                statManager.getStatParamCount(collectionName, paramList, timeFrom, timeTo, function (err, res) {

                    if (err) {
                        callBack(1, null);
                    }
                    else {
                        callBack(null, res);
                    }

                });
            }
            else
                callBack(1, null);
        });
    }

    this.getStatCollectionPrefixFromDeviceLogicalId = function (logicalId) {
    
        return logicalId + "_stat";
        
    }

    this.getRawDataCollectionName = function (logicalDeviceID) {

        return logicalDeviceID + "_raw";
    }

    this.getAllSensorFilteredData = function (groupByField) {
        return new Promise(function(resolve, reject) {
            if(groupByField) {
                return dbInstance.GetDocumentsGroupBy('devices_data', groupByField, function (err, result) {
                    (result)  ? resolve(result) : reject(err);
                });
            } else {
                return dbInstance.GetDocuments('devices_data', function (err, result) {
                    (result)  ? resolve(result) : reject(err);
                });
            }    
        });
    }

    this.updateSummary = async function (date, device) {

        if (device.subType == "SPB001") {
            var summary = {updatedTime: date.valueOf()};
            var specificDevice = devFactory.createDeviceInstanceFromSubType(device.subType);
            var summaryDef = specificDevice.getSummaryDefinitions();
            _.forEach(summaryDef, (sumParamdef) => {
                summary[sumParamdef.paramName] = 0;
            });
            var filteredDeviceData = await this.getAllSensorFilteredData();
            _.forEach(filteredDeviceData, (filteredData) => {
                if(filteredData) {
                    _.forEach(summaryDef, (sumParamdef) => {
                        let perctOfOneDevice = (1 / (filteredDeviceData.length * sumParamdef.calculationParam.length)) * 100;
                        _.forEach(sumParamdef.calculationParam, (param) => {
                            if(filteredData.data[param] !== undefined && eval(filteredData.data[param] + sumParamdef.calculationCond) ) {
                                if(summary[sumParamdef.paramName]) {
                                    summary[sumParamdef.paramName] += perctOfOneDevice;
                                } else {
                                    summary[sumParamdef.paramName] = perctOfOneDevice;
                                }
                            }
                        });
                    });
                }
            });

            dbInstance.insertDocument("summary", summary, function(err){
                (err) ? console.error("Unable to update summary collection") : '';
            });
        }
    }

    this.updateDeviceLatestEntry = function (device, data, callBack)
    {
        if (device.subType == "SPB001") { 
            var collectionName = "devices_data"
            var deviceQuery =
            {
                "deviceId": device.deviceId
            }
            delete data._id;
            data.locId = device.location.locId;
			dbInstance.createUniqueIndex( collectionName,{ deviceId: 1 }, function(){			
				dbInstance.insertOrUpdateDocument(collectionName, deviceQuery, data, function(err){
                    (err) ? console.error("Unable to update deivce latest entry collection") : callBack();
                });
			});
            
        } 
    }

    this.getSummary = function (callBack) {
       
        dbInstance.GetFilteredDocumentSorted("summary", null, { "_id": false }, { "updatedTime": -1 }, 1, 0, function (err, result) {

            if (err) {
                callBack(1, null);
            }
            else {
                callBack(null, result);
            }

        });

        return;

    };

    this.pushSensorData = function (sensorId,data1,callBack){
        
        this.incomingDataQueue.push( { sensorId : sensorId, data:data1, cb : callBack} );

    }	
    this.processIncomingData = function ()
    {
		var myInstance = this;
	    var processFunc = function(){
			if (myInstance.incomingDataQueue.length <= 0 ){
				return setTimeout(processFunc,2000);
			}
				
			var processSingleItem = function(){
				var pushItem = myInstance.incomingDataQueue[0];
				myInstance.incomingDataQueue.splice(0,1);
				
				var sensorId = pushItem.sensorId;
				var deviceId = pushItem.sensorId;
                var data1 = pushItem.data;
                
				var callBack = pushItem.cb;
				
				var processNextItem = function(){
					if ( myInstance.incomingDataQueue.length > 0){
						processSingleItem();
					}
					else{
						return setTimeout(processFunc,2000);
					}
				}

				deviceManager.getDeviceFromId(deviceId, function (device)
				{
					if (device != null)
					{
						var specificDevice = devFactory.createDeviceInstanceFromSubType(device.subType);
                        specificDevice.parse(device);
						if (device != null && device.logicalDeviceId!= null)
						{
							var collectionName = device.logicalDeviceId;
							// use time of server for this live data.
							var currentdate = new Date();
                            data1["receivedTime"] = currentdate.valueOf();
                            //when no lat and long not posted

                            if (device.location != null ) {
                                if ( (data1["latitude"] == null || data1["latitude"] == "") || (data1["longitude"] == null || data1["longitude"] == "" )   ) {
                                    data1["latitude"] = device.location.latitude;
                                    data1["longitude"] = device.location.longitude;
                                }
                            }						
                            
                            specificDevice.ProcessSensorData(data1, function (ferr, filteredData) {
								if (filteredData != null) {

									var insetRowFiltered = {
										deviceId: sensorId,
										logicalDeviceId: device.logicalDeviceId,
										data: filteredData
                                    };
									dbInstance.insertDocument(collectionName, insetRowFiltered);
									// update stat(based on filtered data) for this sensor params.
									var collectionNamePrefix = myInstance.getStatCollectionPrefixFromDeviceLogicalId(device.logicalDeviceId);
									myInstance.updateStatistics(currentdate, collectionNamePrefix,filteredData, device,function(){
									
                                        myInstance.updateDerivedParams(currentdate, collectionNamePrefix, filteredData, device);
                                        
                                        myInstance.updateDeviceLatestEntry(device, insetRowFiltered, function() {
                                            myInstance.updateSummary(currentdate, device);
                                        });

										callBack(null);
										processNextItem();
									});
								}
								var insetRowRaw = {
									deviceId: sensorId,
									logicalDeviceId: device.logicalDeviceId,
									data: data1
								};
								dbInstance.insertDocument(myInstance.getRawDataCollectionName(device.logicalDeviceId), insetRowRaw);
							});
							return;
						}
					}
					callBack(1);
					processNextItem();
				});
			}	
			var j = 0;
			if ( myInstance.incomingDataQueue.length > 0){
				processSingleItem();
			}
		}
		setTimeout(processFunc,2000);
    }
	this.processIncomingData(); 
}


// export the class
module.exports =
{
    SensorManager
};

