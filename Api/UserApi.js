var responseModule = require('../HubResponse.js')
var requestValidationModule = require('../RequestValidation.js');
var requestValidation = new requestValidationModule.RequestValidation();

var UserManagerModule = require('../User/UserManager.js')
var userManager = new UserManagerModule.UserManager()



function UserApi(express) {


	express.post('/user', function (req, res) {

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
			if (result == null) {
				response = hubResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);

			} else {
				if (req.body != null) {

					userManager.saveUser(req.body, function (result) {
						var hubResponse = new responseModule.HubResponse();
						var response = null;

						if (result == 'success') {

							res.end(hubResponse.getOkResponse());
						}
						else {

							res.end(hubResponse.getErrorResponse(-1, "A project with same id already exist"));

						}
					});
				} else {
					res.end(hubResponse.getErrorResponse(-1, "Invalid request"));
				}
			}
		});

	});

	express.get('/user/count', function (req, res) {

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
			if (result == null) {
				response = hubResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);
			} else {
				response = hubResponse.getOkResponse();
				var userSub = null;
				if (req.query.substring != null) {
					userSub = req.query.substring;
				}
				userManager.getUserCount(userSub, function (err, count) {
					if (err != null) {
						response = hubResponse.getErrorResponse(-1, "Invalid request from client");
						res.end(response);
					} else {
						hubResponse = new responseModule.HubResponse();
						var response = null;
						
						hubResponse.data = { userCount: count };
						response = hubResponse.getOkResponse();
						res.end(response);
					}
				});
			}
		});
	});

	express.get('/user/:index/', function (req, res) {
		
		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function(result) {
			if(result == 'failed'){
				response = hubResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);
			} else{
				userManager.getUserAt(req.query, req.params.index, function (result) {
					var hubResponse = new responseModule.HubResponse();
					var response = null;
					if(result != null) {
						hubResponse.data = result;
						response = hubResponse.getOkResponse();
					} else {
						response = hubResponse.getErrorResponse(-1, "Not found");
					}
					res.end(response);
				});
			}
		});
	});

	express.get('/user', function (req, res) {
		
		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function(result) {
			if(result == 'failed'){
				response = hubResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);
			} else{
				var numberOfRecords = 10;
				var offset = 0;
				var query = {}
				if (req.query.limit != null)
					numberOfRecords = parseInt(req.query.limit);
				if (req.query.offset != null)
					offset = parseInt(req.query.offset);
				if (req.query.type != null)
					query.role = req.query.type;
				userManager.getAllUsers(query, numberOfRecords, offset, function (result) {
					var hubResponse = new responseModule.HubResponse();
					var response = null;
					if(result != null) {
						hubResponse.data = result;
						response = hubResponse.getOkResponse();
					} else {
						response = hubResponse.getErrorResponse(-1, "Not found");
					}
					res.end(response);
				});
			}
		});
	});

	express.put('/user', function (req, res) {

		var hubResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
			if (result == null) {
				response = hubResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);

			}
			else {
				{
					userManager.updateUser(req.body, function (err, msg) {

						if (!err) {
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


	express.delete('/user', function (req, res) {

		var slpResponse = new responseModule.HubResponse();
		var response = null;
		requestValidation.isValidUser(req.query.userId, req.query.authPassword, function (result) {
			if (result == null) {
				response = slpResponse.getErrorResponse(-1, "Invalid request from client");
				res.end(response);

			}
			else {
				userManager.removeUser(req.query.uName, function (err) {
					var slpResponse = new responseModule.HubResponse();
					var response = null;
					if (err) {
						response = slpResponse.getErrorResponse(-1, "Error occured in deleting user");
					}
					else {
						response = slpResponse.getOkResponse();
					}
					res.end(response);
				})
			}
		});

	});

}


module.exports = {
	UserApi
}