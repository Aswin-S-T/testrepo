
var  responseModule =  require('../HubResponse');

var  requestValidationModule =  require('../RequestValidation.js');
var requestValidation = new  requestValidationModule.RequestValidation();

var DeviceManagerModule = require('../Device/DeviceManager.js');
var deviceManager = new  DeviceManagerModule.DeviceManager();
//deviceManager.getDeviceFromId("f3e22c7fcf5c",function(res){
//    if (res!=null)
//    {

//    }

//});

function DeviceApi(express)
{

    express.get('/device/deployment', function (req, resHttp) {


        var hubResponse = new responseModule.HubResponse();
        var response = null;
        requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {

            if (result == null) {
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                resHttp.end(response);

            } else {

                var depolymentInfo = [];
                var city = req.query.city;
                var zone = req.query.zone;

                if (city == null && zone!=null) {
                    response = hubResponse.getErrorResponse(-2, "Invalid request from client,Not enough parameters");
                    resHttp.end(response);

                }
                else {

                    
                    var depolymentInfo_Find = function (city, zone) {
                        var indexFound = -1;
                        for (var j = 0; j < depolymentInfo.length; j++) {
                            if (depolymentInfo[j].city == city && depolymentInfo[j].zone == zone) {
                                indexFound = j;
                                break;

                            }
                        }
                        return indexFound;
                    }

                    deviceManager.getDeviceCountMatchWithCityZone(city, zone, function (err, count)
                    {

                        var i = 0;

                        var fetchDeviceInfo = function () {

                            deviceManager.getDeviceAtMatchWithCityZone(city, zone,i, function (err, res) {

                                
                                if (!err) {
                                    
                                    var tcity = null;
                                    var tzone = null;
                                    if (res.location != null) {
                                        tcity = res.location.city == null ? "" : res.location.city;
                                        tzone = res.location.zone == null ? "" : res.location.zone;
                                    }

                                    var fd = depolymentInfo_Find(tcity, tzone);
                                    if (fd == -1) {
                                        depolymentInfo.push({
                                            "city": tcity,
                                            "zone": tzone,
                                            "devices": [{ "deviceId": res.deviceId, "devFamily": res.devFamily,"subType":res.subType }]
                                        });
                                       

                                    }
                                    else
                                    {
                                        var devList = depolymentInfo[fd].devices;
                                        devList.push({ "deviceId": res.deviceId, "devFamily": res.devFamily, "subType": res.subType });
                                       
                                    }
                                }

                                i++;
                                if (i < count)
                                    fetchDeviceInfo();
                                else {
                                    
                                    hubResponse = new responseModule.HubResponse();
                                    hubResponse.data = { "deploymentInfo": depolymentInfo };
                                    var response = hubResponse.getOkResponse();
                                    resHttp.end(response);
                                }

                            });

                            
                        }

                        if (i < count)
                            fetchDeviceInfo();
                    });

                    
                }
            }
        });




    });

    express.get('/device/count', function (req, res) 
	{
		

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId,req.query.authPassword,function(result)
		{
			
			if(result == null)
			{
				response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
				res.end(response);
				
			}else
			{
			    response = hubResponse.getOkResponse();
			    var filterFamily = null;
			    if (req.query.substring != null)
			        filterFamily = req.query.substring;
				deviceManager.getDeviceCount(filterFamily , function (err, count)
				{
				    if (err!=null)
				    {
				        response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
				        res.end(response);
				    }
				    else
				    {
				        hubResponse = new responseModule.HubResponse();
				        var response = null;
				       
				        hubResponse.data = { deviceCount: count };
				        response = hubResponse.getOkResponse();
				        res.end(response);
				    }
				});
				
			}
		});
	
  });
  
   
  express.get('/device/:index/', function (req, res)
  {
	
		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result)
		{
			if(result == 'failed')
			{
				response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
				res.end(response);
				
			}else
			{
				deviceManager.getDeviceAt(req.query,req.params.index,function(result)
				{
					var hubResponse = new responseModule.HubResponse();
					var response = null;
					if (result!=null)
					{
						hubResponse.data = result;
						response  = hubResponse.getOkResponse();
					}
					else
					{
						response  = hubResponse.getErrorResponse(-1,"Not found");
					}
					res.end(response);
				});
			}
		});

  });
  

  express.post('/device', function (req, res)
  {

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result)
		{
			if(result == null)
			{
				response  = hubResponse.getErrorResponse(-1,"Invalid request from client");
				res.end(response);
				
			}else
			{
				if (req.body!= null)
				{
					
					deviceManager.registerDevice(req.body, function (result)
					{
						var hubResponse = new responseModule.HubResponse();
						var response = null;
						
						if (result == 'success')
						{

							res.end(hubResponse.getOkResponse());
						}
						else
						{

							res.end(hubResponse.getErrorResponse(-1,"A project with same id already exist"));
							
						}
					});
				}else
				{
					res.end(hubResponse.getErrorResponse(-1,"Invalid request"));
				}
			}
		});
     
  });
  
  
  
  express.put('/device', function (req, res)
  {

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result)
		{
			if(result == null)
			{
			    response = hubResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);
				
			}
			else
			{
			    {
			        deviceManager.updateDevice(req.body, function (err, msg) {

			            if (!err){
			                res.end(hubResponse.getOkResponse());

			            }
			            else {

			                response = hubResponse.getErrorResponse(-1, msg);
			                res.end(response);

			            }

			        });
			    }
			}
		});
		
      
  });


  express.delete('/device', function (req, res)
  {
		
		var slpResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result)
		{
			if(result == null)
			{
				response  = slpResponse.getErrorResponse(-1,"Invalid request from client");
				res.end(response);
				
			}
			else
			{
			    deviceManager.removeDevice(req.query.deviceId, function (err) {
			        var slpResponse = new responseModule.HubResponse();
			        var response = null;
			        if (err) {
			            response = slpResponse.getErrorResponse(-1, "Error occured in deleting device");
			        }
			        else
			        {
			            response = slpResponse.getOkResponse();
			        }
			        res.end(response);
			    })
			}
		});
	
  });

  

}

// export the class
module.exports =
 {
    DeviceApi
 };
