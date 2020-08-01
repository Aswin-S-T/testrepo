var AfmSensorDeviceModule = require('./AfmSensorDevice.js');

var ESJHA001SpecModule = require('../DeviceSpec/ESJHA001Spec.js')

function ESJHA001() {
    this.getDefaultParamDefinitions = function () {

        var specModule = new  ESJHA001SpecModule.ESJHA001Spec();
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

ESJHA001.prototype = new AfmSensorDeviceModule.AfmSensorDevice();
ESJHA001.prototype.constructor = ESJHA001;
ESJHA001.prototype.parent = AfmSensorDeviceModule.AfmSensorDevice.prototype;


// export the class
module.exports =
{
    ESJHA001
};
