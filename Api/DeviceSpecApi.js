
var  responseModule =  require('../HubResponse');

var  requestValidationModule =  require('../RequestValidation.js');
var requestValidation = new  requestValidationModule.RequestValidation();

var AfmDevSpecModule = require('../DeviceSpec/AfmEthernetDeviceSpec.js');

var AfmSensorAClassDeviceSpecModule = require('../DeviceSpec/AfmSensorAClassDeviceSpec.js');


var ESBHA001SpecModule = require('../DeviceSpec/ESBHA001Spec.js');
var SPB001SpecModule = require('../DeviceSpec/SPB001Spec.js');


function DeviceSpecApi(express)
{
    express.get('/device/spec', function (req, res) 
	{
		

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId,req.query.authPassword,function(result)
		{
			
			if(result == null)
			{
				response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
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
				
				else if (deviceType == "ESBHA001") {
			        var devSpec = new ESBHA001SpecModule.ESBHA001Spec();
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

			    
			}
		});
	
	  });
	  
	express.get('/device/summary/spec', function (req, res) 
	{
		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId,req.query.authPassword,function(result)
		{
			
			if(result == null)
			{
				response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
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
