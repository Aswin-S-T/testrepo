var responseModule = require('../HubResponse.js')
var requestValidationModule = require('../RequestValidation.js');
var requestValidation = new requestValidationModule.RequestValidation();
var TravelManagerModule = require('../Device/TravelManager.js');
var travelManager = new TravelManagerModule.TravelManager();

function TravelApi(express){

    express.get('/travel/direction', function(req, res){
        var hubResponse = new responseModule.HubResponse();
        var response = null;
        requestValidation.isValidUser(req.query.userId, req.query.authPassword, function(result){
            if(result == null){
                response = hubResponse.getErrorResponse(-1,"Invalid request");
                res.end(response);
            }
            else{
                response = hubResponse.getOkResponse();
                travelManager.getDirection(req.query.lat, req.query.lon, function(err, info){
                    if (err != null) {
                        response = hubResponse.getErrorResponse(-1, "Error in Request");
                        res.end(response);
                    }
                    else {
                        hubResponse = new responseModule.HubResponse();
                        hubResponse.data = info;
                        res.end(hubResponse.getOkResponse());
                    }
                });
            }
        });
    });

}

module.exports = {
    TravelApi
}