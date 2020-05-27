var DeviceModule = require('./Device.js');

var SPB001SpecModule = require('../DeviceSpec/SPB001Spec.js');

var GenUtilsModule = require('../Utils/GenUtils.js');
var genUtils = new GenUtilsModule.GenUtils();

function SPB001() {
    this.getDefaultParamDefinitions = function () {
        var specModule = new  SPB001SpecModule.SPB001Spec();
        var temp = specModule.getParamDefinitions();
        var newParamList = [
            {
                filteringMethod: null,
                filteringMethodDef: null,
                paramName: "latitude",
            },
            {
                filteringMethod: null,
                filteringMethodDef: null,
                paramName: "longitude",
            },
            {
                filteringMethod: null,
                filteringMethodDef: null,
                paramName: "er_init_sensor",
            },
            {
                filteringMethod: null,
                filteringMethodDef: null,
                paramName: "er_read_sensor",
            },
            {
                filteringMethod: null,
                filteringMethodDef: null,
                paramName: "sig_strength",
            },
            {
                filteringMethod: null,
                filteringMethodDef: null,
                paramName: "build_ver",
            }

        ];

        for (var i = 0; i < newParamList.length; i++) {
            temp.push(newParamList[i]);
        }
        return temp;
    }
    this.parse = function (jsonObject) {
        this.parent.parse.call(this, jsonObject);
        this.paramDefinitions = this.getDefaultParamDefinitions();
        if (jsonObject.paramDefinitions != null) {

            for (var i = 0; i < this.paramDefinitions.length; i++) {

                for (var j = 0; j < jsonObject.paramDefinitions.length; j++) {
                    if (this.paramDefinitions[i].paramName == jsonObject.paramDefinitions[j].paramName) {

                        this.paramDefinitions[i].filteringMethod = jsonObject.paramDefinitions[j].filteringMethod;
                        this.paramDefinitions[i].filteringMethodDef = jsonObject.paramDefinitions[j].filteringMethodDef;
                        this.paramDefinitions[i].maxRanges = jsonObject.paramDefinitions[j].maxRanges;
                        if (this.paramDefinitions[i].maxRanges != null) {

                            if (this.paramDefinitions[i].maxRanges.min != null && !genUtils.isNumber(this.paramDefinitions[i].maxRanges.min)) {
                                this.paramDefinitions[i].maxRanges.min = null;
                            }
                            if (this.paramDefinitions[i].maxRanges.max != null && !genUtils.isNumber(this.paramDefinitions[i].maxRanges.max)) {
                                this.paramDefinitions[i].maxRanges.max = null;
                            }

                            if (this.paramDefinitions[i].maxRanges.max == null && this.paramDefinitions[i].maxRanges.min == null) {
                                this.paramDefinitions[i].maxRanges = null;
                            }


                        }

                        this.paramDefinitions[i].calibration = jsonObject.paramDefinitions[j].calibration;

                        break;
                    }
                }
            }
        }

    }

    this.ProcessSensorData = function (currentData, callBack) {

        var filterResult = {}
        var paramDefs = this.paramDefinitions;
        var i = 0;
        var myInstance = this;
        var filterFunc = function () {
            filterResult[paramDefs[i].paramName] = currentData[paramDefs[i].paramName];

            // check if data is within limits, otherwise bound to limits.
            var boundValueToLimits = function (value) {
                if (paramDefs[i].maxRanges != null) {
                    if (paramDefs[i].maxRanges.max != null && value > paramDefs[i].maxRanges.max) {
                        value = paramDefs[i].maxRanges.max;

                    }
                    if (paramDefs[i].maxRanges.min != null && value < paramDefs[i].maxRanges.min) {
                        value = paramDefs[i].maxRanges.min;
                    }
                }
                return value;
            }

            var originalVal = filterResult[paramDefs[i].paramName];
            filterResult[paramDefs[i].paramName] = processCalibration(boundValueToLimits(filterResult[paramDefs[i].paramName]), paramDefs[i]);

            if (paramDefs[i].isDerived) {
                filterResult[paramDefs[i].paramName] = eval(filterResult[paramDefs[i].derivedParam] + paramDefs[i].calculationCond) ? "Yes" : "No";
            }

            if (paramDefs[i].filteringMethod == "WMAFilter") {

                sensorLiveDataHandler.getLiveData(myInstance.logicalDeviceId, 1, 0, null, null, function (err, sensorId, resultList) {
                    if (!err && resultList != null && resultList.length > 0) {
                        var result = resultList[0];
                        if (result.data != null && result.data[paramDefs[i].paramName] != null) {

                            filteringWMA.parse(paramDefs[i].filteringMethodDef);
                            var oldValue = boundValueToLimits(result.data[paramDefs[i].paramName]);
                            var newValue = processCalibration(originalVal, paramDefs[i]);;
                           

                            var res = filteringWMA.filter(oldValue, newValue);

                            filterResult[paramDefs[i].paramName] = boundValueToLimits(res);
                            //                            filterResult[paramDefs[i].paramName] = processCalibration(boundValueToLimits(res), paramDefs[i]);
                        }

                    }

                    i++;
                    if (i < paramDefs.length) {
                        filterFunc();
                    }
                    else {
                        callBack(null, filterResult);
                    }
                });
            }
            else {
                i++;
                if (i < paramDefs.length) {
                    filterFunc();
                }
                else {
                    callBack(null, filterResult);
                }
            }

        }

        if (paramDefs != null && paramDefs.length > 0)
            filterFunc();
        else {
            callBack(1, null);
        }
    }
    var processCalibration = function (val, paramDefItem) {

        if (paramDefItem.calibration != null) {
            if (paramDefItem.calibration.type == "curve") {
                for (var i = 0; i < paramDefItem.calibration.data.length; i++) {

                    var calibItem = paramDefItem.calibration.data[i];
                    if (val >= calibItem.min && val <= calibItem.max) {
                        if (calibItem.funct == null || calibItem.funct == "translate") {
                            val = val + calibItem.offset;

                        }else if (calibItem.funct == "scale") {
                            val = val * calibItem.offset;

                        }
                        break;
                    }
                }
            }
        }
        return val;
    }

    
}

SPB001.prototype = new DeviceModule.Device();
SPB001.prototype.constructor = SPB001;
SPB001.prototype.parent = DeviceModule.Device.prototype;

SPB001.prototype.getDefaultParamDefinitions = function () {
    var specModule = new  SPB001SpecModule.SPB001Spec();
    return specModule.getParamDefinitions();
}

SPB001.prototype.getSummaryDefinitions = function () {
    var specModule = new  SPB001SpecModule.SPB001Spec();
    return specModule.getSummaryDefinitions();
}


// export the class
module.exports = {
    SPB001
};
