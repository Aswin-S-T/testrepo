
var DeviceModule = require('./Device.js');
var AfmSensorDeviceModule = require('./AfmSensorDevice.js');
var AfmSensorAClassDeviceModule = require('./AfmSensorAClassDevice.js');


var AHUINDR001Module = require('./AHUINDR001.js'); 
var AHUOTDR001Module = require('./AHUOTDR001.js'); 
var SPB001Module = require('./SPB001.js'); 
var ESJHA001Module = require('./ESJHA001.js'); 



function DeviceFactory() {

    this.createDeviceInstanceFromSubType = function (subType) {
        var result = null;
        if (subType == "AFMEthernet") {
            result = new AfmSensorDeviceModule.AfmSensorDevice();
        }
        else if (subType == "EnvSensorDevice") {
            result = new AfmSensorAClassDeviceModule.AfmSensorAClassDevice();
            
        }
       
        else if (subType == "AHUINDR001") {
            result = new AHUINDR001Module.AHUINDR001();
        }

        else if (subType == "AHUOTDR001") {
            result = new AHUOTDR001Module.AHUOTDR001();
        }

        else if (subType == "SPB001") {
            result = new SPB001Module.SPB001();
        }

        else if (subType == "ESJHA001") {
            result = new ESJHA001Module.ESJHA001();
        }
        
        

        else {
            result = new DeviceModule.Device();

        }

        return result;

    }
    
}


// export the class
module.exports =
 {
     DeviceFactory
 };
