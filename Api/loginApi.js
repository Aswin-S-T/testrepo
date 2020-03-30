var responseModule = require('../HubResponse.js')
var requestValidationModule = require('../RequestValidation.js');
var requestValidation = new requestValidationModule.RequestValidation();

var DatabaseHandlerModule = require('../DatabaseHandler.js');
var dbInstance = new DatabaseHandlerModule.DatabaseHandler();

function LoginApi(express) {
    console.log("loginApi")
    var loggedname
    var path
    express.post('/login', function (req, res) {
        console.log("in login api")
        var hubResponse = new responseModule.HubResponse();
        var response = null;
        //loggedname=req.query.userName
        //loggedname={'userName':loggedname}
        //console.log(req.query,req.query.userName,req.query.password)
        requestValidation.isValidUser(req.query.userName, req.query.password, function (result) {
            

            if (result == null) {
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);
              
            } else {
                hubResponse.data = result;
                response = hubResponse.getOkResponse();
                res.end(response)
                
            }
        })
    })
    express.post('/loginprivilegehide', function (req, res) {
        var hubResponse = new responseModule.HubResponse();

        var response = null;
        var response1 = null
        var arr = []
        var loggedname = { 'userName': req.query['0'] }

        dbInstance.GetDocumentByName('users', loggedname, function (err, result) {

            if (result == null) {
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);
            }
            else {
                result = result['role']
                if (result == 'Super Admin') {
                    //response= 12345
                    arr = [true, true, true, true, true]
                    response = arr
                    //1 = alarm manage
                    //2 = active alarm
                    //3 = device admin
                    //4 = third party user
                    //5 = user management 
                }
                else if (result == 'Administrator') {
                  
                    //response= 1235
                    arr = [true, true, true, false, true]
                    response = arr

                }
                else if (result == 'Supervisor') {
                    
                    //response= 3
                    arr = [false, true, true, false, false]
                    response = arr
                }
                else if (result == 'Operator') {
                    
                    //response= 2
                    arr = [false, true, false, false, false]
                    response = arr
                }
                else {
                    arr = [false, false, false, false, false]
                    response = arr
                }
                hubResponse.data = response;
                //console.log("role is as follows",result)
                response1 = hubResponse.getOkResponse();
                res.end(response1)
               
            }
        })
    })

    express.post('/loginprivilege', function (req, res) {

        var hubResponse = new responseModule.HubResponse();
        var response = null;
        var path1 = ''
        var response1 = null

        //loggedname={'userName':loggedname}
        dbInstance.GetDocumentByName('users', { 'userName': req.query['1'] }, function (err, result) {
            if (result == null) {
                response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                res.end(response);
            }
            else {
                result = result['role']
                path = req.query['0']
                for (x in path) {
                    path1 = path1 + path[x]
                }

                if (result == null) {
                    response = hubResponse.getErrorResponse(-1, "Invalid request from client");
                    res.end(response);
                } else {

                    if (result == 'Super Admin') {
                        response = true
                    }
                    else if (result == 'Administrator') {
                        console.log("admin")
                        if (path1 != '/thirdpartyuser') {
                            response = true
                        }
                        else
                            response = false
                    }
                    else if (result == 'Supervisor') {
                        console.log("serv")
                        if (path1 != '/alarm_manage' && path1 != '/active_alarms' && path1 != '/thirdpartyuser' && path1 != '/user_management') {
                            console.log("inside serv if ")
                            response = true
                        }
                        else {
                            console.log("inside serv else")
                            response = false
                        }
                    }
                    else if (result == 'Operator') {
                       
                        if (path1 != '/alarm_manage' || path1 != '/thirdpartyuser' || path1 != '/user_management' || path1 != '/device_admin') {
                            response = true
                        }
                        else
                            response = false
                    }
                    else {
                        response = false
                    }
                    hubResponse.data = response;
                   
                    response1 = hubResponse.getOkResponse();
                    res.end(response1)

                }
            }
        })
    })
}


module.exports = {
    LoginApi
}
