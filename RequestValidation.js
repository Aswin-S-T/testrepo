
var DatabaseHandlerModule = require('./DatabaseHandler.js');
var dbInstance = new  DatabaseHandlerModule.DatabaseHandler();

var jwtService = require('./jwtService.js');
const bcrypt = require('bcrypt');

function RequestValidation()
{

	this.isValidUser = async function(req, res, callBack)
    { 	
		try {
			let token;
			if (!req.headers.authorization) {
				callBack(null);
			}
			token = req.headers.authorization.split(" ");
			const isValid = await jwtService.decodeJwt(token[1]);

			if (isValid == 'Not Valid')
			{
				callBack(null);
			} else {
				callBack("success");
			}
		} catch (err) {
            callBack(null);
        }
		
	}
	
	this.checkUser = function(ssoId,password,callBack)
    {
		var query = {};
		query['userName'] = ssoId;
		dbInstance.GetDocumentByName('users', query, function(err, result)
		{
			if(result) {
				bcrypt.compare(password, result.password, async function(err, res) {
					if(res === true) {
						const token = await jwtService.getJwt({
							user_id: ssoId
						});
						callBack({"token": token});
					} else {
						callBack(null);
					}
				});
			} else {
				callBack(null);
			}
		});
    }
}
// export the class
module.exports =
 {
    RequestValidation
 };
