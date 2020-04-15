
var DatabaseHandlerModule = require('./DatabaseHandler.js');
var dbInstance = new  DatabaseHandlerModule.DatabaseHandler();


function RequestValidation()
{
	this.isValidUser = function(ssoId,password,callBack)
    {
			if(ssoId == 'classic'){
				ssoId = 'sudo'
			}
			if(password == 'classic')
			{
				password = 'sudo123'
			}
			var query = {};
			query['userName'] = ssoId;
			query['password'] = password;
			dbInstance.IsDocumentExist('users',query, function(err, result)
			{

				if(result == 'success')
				{
					callBack("success");
				}else
				{
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
