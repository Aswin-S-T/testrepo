var AfmSensorDeviceModule = require('./AfmSensorDevice.js');

var AHUOTDR001SpecModule = require('../DeviceSpec/AHUOTDR001Spec.js');

function AHUINDR001() {
    this.getDefaultParamDefinitions = function () {

        var specModule = new  AHUOTDR001SpecModule.AHUOTDR001Spec();
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
}

AHUINDR001.prototype = new AfmSensorDeviceModule.AfmSensorDevice();
AHUINDR001.prototype.constructor = AHUINDR001;
AHUINDR001.prototype.parent = AfmSensorDeviceModule.AfmSensorDevice.prototype;


// export the class
module.exports =
{
    AHUINDR001
};
