console.log('starting server ');

var path = require('path');
var express = new require('express');
var fs = require('fs');
var https = require('https');
//const csrf = require('csurf');


/*
const rateLimit = new require("express-rate-limit");
 
const apiLimiter = rateLimit({
   
    windowMs:1000*60*60,
    max:100,

});
*/
var config = require('./ServerSettings.json');
const helmet= new require('helmet')

function InitExpress(expObj){

    var bodyParser = require('body-parser')
    // express.use(bodyParser.json())
    expObj.use(bodyParser.json({limit: '50mb'}))

    expObj.use(function(req, res, next){ 
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods",  "GET,HEAD,POST,PUT,DELETE");
        next();
    });

    // routing registration.
    expObj.use(express.static(path.join(__dirname, 'public')));
  //expObj.use( apiLimiter);
    var deviceSpecApi = new require('./Api/DeviceSpecApi').DeviceSpecApi(expObj);
    var sensorApi = new require('./Api/SensorApi').SensorApi(expObj);
    var deviceApi = new require('./Api/DeviceApi').DeviceApi(expObj);
    var reportApi = new require('./Api/ReportApi').ReportApi(expObj);
    var alarmApi = new require('./Api/AlarmApi').AlarmApi(expObj);
    var userApi = new require('./Api/UserApi').UserApi(expObj);
    var thirdPartyUserApi=new require('./Api/ThirdPartyUserApi').ThirdPartyUserApi(expObj);
    var loginApi=new require('./Api/loginApi').LoginApi(expObj)

   // expObj.use(function(req, res, next){ 
        // Expose variable to templates via locals
   //     res.locals.csrftoken = req.csrfToken(); 
   //     next();
   //    });
   
    app.get('*', function(req, res) {
            res.sendFile('index.html', {root: path.join(__dirname, 'public')});
    });

    expObj.get('/shutdown', function (req, res)
    {

        process.exit()

    });

    
}
	
	  
// var app = new require('express')();
// InitExpress(app);
// app.use(helmet());
//app.use(csrf());


//app.use(apiLimiter);
//var limiter = new require('express-limiter')(app, MongoClient);



// https.createServer({
//     key: fs.readFileSync('cert/key.pem'),
//     cert: fs.readFileSync('cert/cert.pem')
// }, app).listen(8001, function () {



// });



// app.use(function(req, res, next){ 
    
//     res.locals.csrftoken = req.csrfToken(); 
//     next();
//    });

// limiter({
//     path:'*',
//     method:'all',
//     lookup: ['192.168.2.29 '],
//     total: 2,
//     expire: 1000 * 60 * 60,
//     onRateLimited: function (req, res, next) {
//         next({ message: 'Rate limit exceeded', status: 429 })
//     }
//   })

var app = new require('express')();
InitExpress(app);
var port = parseInt(config.GeneralSettings.ServerPort, 10);
console.log('port',port);
var server = app.listen(7001, function () 
{
	var host = server.address().address
	var port = server.address().port

	console.log("Clean Air India server listening at http://%s:%s", host, port)
});

