
var  responseModule =  require('../HubResponse');

var  requestValidationModule =  require('../RequestValidation.js');
var requestValidation = new  requestValidationModule.RequestValidation();

var AfmDevSpecModule = require('../DeviceSpec/AfmEthernetDeviceSpec.js');

var AfmSensorAClassDeviceSpecModule = require('../DeviceSpec/AfmSensorAClassDeviceSpec.js');


var AHUOTDR001SpecModule = require('../DeviceSpec/AHUOTDR001Spec.js');
var AHUINDR001SpecModule = require('../DeviceSpec/AHUINDR001Spec.js');
var SPB001SpecModule = require('../DeviceSpec/SPB001Spec.js');
var ESJHA001SpecModule = require('../DeviceSpec/ESJHA001Spec.js');
var CHNLNT001SpecModule = require('../DeviceSpec/CHNLNT001Spec.js');


function DeviceSpecApi(express)
{
    express.get('/device/spec', function (req, res) 
	{
		

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req, res,function(result)
		{
			
			if(result == null)
			{
				response  = hubResponse.getErrorResponse(-10,"Invalid request from client");
				res.end(response);
				
			}
			else
			{
				let deviceType =  req.query.type || process.env.DEFAULT_DEVICE_TYPE;
			    if (deviceType == "AFMEthernet")
			    {
			        var devSpec = new AfmDevSpecModule.AfmEthernetDeviceSpec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
			    }
			    else if (deviceType == "EnvSensorDevice") {
			        var devSpec = new AfmSensorAClassDeviceSpecModule.AfmSensorAClassDeviceSpec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				}
				
				else if (deviceType == "AHUOTDR001") {
			        var devSpec = new AHUOTDR001SpecModule.AHUOTDR001Spec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				}

				else if (deviceType == "AHUINDR001") {
			        var devSpec = new AHUINDR001SpecModule.AHUINDR001Spec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				}

				else if (deviceType == "SPB001") {
			        var devSpec = new SPB001SpecModule.SPB001Spec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				}

				else if (deviceType == "ESJHA001") {
			        var devSpec = new ESJHA001SpecModule.ESJHA001Spec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				}

				else if (deviceType == "CHNLNT001") {
			        var devSpec = new CHNLNT001SpecModule.CHNLNT001Spec();
			        hubResponse.data = devSpec;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				}

			    
			}
		});
	
	  });
	  
	express.get('/device/summary/spec', function (req, res) 
	{
		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req, res,function(result)
		{
			
			if(result == null)
			{
				response  = hubResponse.getErrorResponse(-10,"Invalid request from client");
				res.end(response);
				
			}
			else
			{
			    let deviceType =  req.query.type || process.env.DEFAULT_DEVICE_TYPE;
				if (deviceType == "SPB001") {
			        var devSpec = new SPB001SpecModule.SPB001Spec();
			        hubResponse.data = devSpec.summaryDefinitions;
			        response = hubResponse.getOkResponse();
			        res.end(response);
				} else {
					response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
					res.end(response);
				}

			    
			}
		});
	
  	});
}

// export the class
module.exports =
 {
     DeviceSpecApi
 };
