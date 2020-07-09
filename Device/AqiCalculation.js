var DeviceManagerModule = require('../Device/DeviceManager.js');
var deviceManager = new  DeviceManagerModule.DeviceManager();

var StatisticsManagerModule = require('../Calc/StatisticsManager.js');
var statManager = new StatisticsManagerModule.StatisticsManager();

var UnitConverterModule = require('../Utils/UnitConverter.js');
var unitConverter = new UnitConverterModule.UnitConverter();

var SensorManagerModule = require('../Device/SensorManager.js');
var sensorManager = new SensorManagerModule.SensorManager();

var _ = require('lodash');

async function intilaizeAqiCalculation() {
    deviceManager.getDeviceCount(null , function (err, count)
    {
        if (err !== null)
        {
            console.log(err);
        }
        else
        {
            for (let i = 0; i < count; i++) {
                deviceManager.getDeviceAt(null, i, async function(device)
				{  
					if (device !== null)
					{
                        var utcToHour = new Date();
                        let aqiParamValues = await getAQIParam(device, utcToHour);
                        let aqiValue = findAQI(aqiParamValues);
                        utcToHour.setHours(utcToHour.getHours() - 1);
                        if(aqiValue >= 0) {
                            sensorManager.updateStatistics(utcToHour, device.logicalDeviceId + '_stat', {AQI: aqiValue}, device, function (err, res){
                                if (err) {
                                    reject();
                                }
                            });
                        }
					}
				});
            }
        }
    });
}

function getAQIParam(device, utcToHour) {
    
    var toHour = statManager.dateToHourlyUsageKey(utcToHour);
    var from24Hour = new Date(toHour.valueOf() - 60 * 60 * 24 * 1000); 
    var from8Hour = new Date(toHour.valueOf() - 60 * 60 * 8 * 1000);
    const aqiCalculationParam = ["PM2p5", "PM10", "SO2", "NO2", "CO", "O3", "NH3"];

    return new Promise(function(resolve, reject) {
        statManager.getStatParamHourly(device.logicalDeviceId + '_stat_hourly' , 
            aqiCalculationParam, from24Hour.valueOf(), toHour.valueOf(), 1000, 0,function (err, res)
        {
            if (err) {
                reject();
            } else {
                let aqiParamvalues = _.zipObject(aqiCalculationParam, [...aqiCalculationParam].fill(0));
                _.forEach(res, function  (hourlyData) {
                    if(hourlyData.paramName === 'O3' || hourlyData.paramName === "CO") {
                        if(hourlyData.key >= from8Hour.valueOf()) {
                            //*8hr Avg
                            if(aqiParamvalues[hourlyData.paramName] !== 0) {
                                aqiParamvalues[hourlyData.paramName] =  (aqiParamvalues[hourlyData.paramName] + 
                                (hourlyData.statParams.sum / hourlyData.statParams.count)) / 2;
                            } else {
                                aqiParamvalues[hourlyData.paramName] =  aqiParamvalues[hourlyData.paramName] + 
                                (hourlyData.statParams.sum/hourlyData.statParams.count);
                            }
                        }
                    } else {
                        //24hr Avg
                        if(aqiParamvalues[hourlyData.paramName] !== 0) {
                            aqiParamvalues[hourlyData.paramName] =  (aqiParamvalues[hourlyData.paramName] + 
                            (hourlyData.statParams.sum / hourlyData.statParams.count)) / 2;
                        } else {
                            aqiParamvalues[hourlyData.paramName] =  aqiParamvalues[hourlyData.paramName] + 
                            (hourlyData.statParams.sum/hourlyData.statParams.count);
                        }
                    }
                })
                resolve(aqiParamvalues)
            }
        });
    });
}

function findAQI(aqiParamValues) {

    var resAqi = -1;
    var count = 0;
    var aqiValue = -9999999999;

    _.forOwn(aqiParamValues, function(value, key) {
        var subIndexValue = unitConverter.convertUgM3ToAqi(key, value);
        if(subIndexValue) {
            aqiValue = Math.max(aqiValue, subIndexValue);
            (key === "PM2p5" || key == "PM10") ? count++ : '';   
        }
    });

    return (count >= 1) ? aqiValue : resAqi;
}

module.exports =
{
    intilaizeAqiCalculation
};
