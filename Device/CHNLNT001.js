var AfmSensorDeviceModule = require('./AfmSensorDevice.js');

var CHNLNT001SpecModule = require('../DeviceSpec/CHNLNT001Spec.js')

function CHNLNT001() {
    this.getDefaultParamDefinitions = function () {

        var specModule = new  CHNLNT001SpecModule.CHNLNT001Spec();
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

CHNLNT001.prototype = new AfmSensorDeviceModule.AfmSensorDevice();
CHNLNT001.prototype.constructor = CHNLNT001;
CHNLNT001.prototype.parent = AfmSensorDeviceModule.AfmSensorDevice.prototype;


// export the class
module.exports =
{
    CHNLNT001
};
