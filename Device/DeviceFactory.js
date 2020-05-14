
var DeviceModule = require('./Device.js');
var AfmSensorDeviceModule = require('./AfmSensorDevice.js');
var AfmSensorAClassDeviceModule = require('./AfmSensorAClassDevice.js');


var ESBHA001Module = require('./ESBHA001.js'); 
var SPB001Module = require('./SPB001.js'); 



function DeviceFactory() {

    this.createDeviceInstanceFromSubType = function (subType) {
        var result = null;
        if (subType == "AFMEthernet") {
            result = new AfmSensorDeviceModule.AfmSensorDevice();
        }
        else if (subType == "EnvSensorDevice") {
            result = new AfmSensorAClassDeviceModule.AfmSensorAClassDevice();
            
        }
       
        else if (subType == "ESBHA001") {
            result = new ESBHA001Module.ESBHA001();
        }

        else if (subType == "SPB001") {
            result = new SPB001Module.SPB001();
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
