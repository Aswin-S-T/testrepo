/*globals  require, exports, global, process */

const mongoose = require("mongoose");

// Function to establish connection for the Database
exports.createConn = function() {
	return new Promise(function (resolve, reject) {
		mongoose.Promise = global.Promise;
		mongoose.set('useFindAndModify', false);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useUnifiedTopology', true);
		// If the connection is already established, Then don't create one more connection
		if (mongoose.connection.readyState) {
			resolve({code: 200, status: "SUCCESS", message: "DB connection established"});
			return;
		}

		// Establish the DB connection
		mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, poolSize: 20});

		// Event for successfully connecting database
		mongoose.connection.on("connected", function () {
			resolve({code: 200, status: "SUCCESS", message: "DB connection established"});
		});
        
		// Event when there is an error connecting for database
		mongoose.connection.on("error",function (error) { // err
			reject({code: 500, status: "INTERNAL_SERVER_ERROR", message: "connection failed", error: error});
		});
	});
};