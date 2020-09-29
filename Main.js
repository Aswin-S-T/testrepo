var path = require('path');
var express = new require('express');
var fs = require('fs');
var https = require('https');
var cron = require('node-cron');
var AqiCalculation = require('./Device/AqiCalculation.js');
var SensorManagerModule = require('./Device/SensorManager.js');
var sensorManager = new SensorManagerModule.SensorManager();

const cert = fs.readFileSync('./cert/cert.pem');
const key = fs.readFileSync('./cert/key.pem');

const helmet = new require('helmet')

function InitExpress(expObj) {

    var bodyParser = require('body-parser')
    // express.use(bodyParser.json())
    expObj.use(bodyParser.json({ limit: '50mb' }))

    console.log(process.env.NODE_ENV);
    console.log(process.env.FRONT_END_APP_ADDR);
    if (process.env.NODE_ENV === "development") {
        expObj.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", '*');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
            next();
        });
    }

    // routing registration.
    expObj.use('/app/', express.static(path.join(__dirname, 'public')));
    expObj.use(express.static(path.join(__dirname, 'public/build')));

    //expObj.use( apiLimiter);
    var deviceSpecApi = new require('./Api/DeviceSpecApi').DeviceSpecApi(expObj);
    var sensorApi = new require('./Api/SensorApi').SensorApi(expObj);
    var deviceApi = new require('./Api/DeviceApi').DeviceApi(expObj);
    var reportApi = new require('./Api/ReportApi').ReportApi(expObj);
    var alarmApi = new require('./Api/AlarmApi').AlarmApi(expObj);
    var userApi = new require('./Api/UserApi').UserApi(expObj);
    var thirdPartyUserApi = new require('./Api/ThirdPartyUserApi').ThirdPartyUserApi(expObj);
    var loginApi = new require('./Api/loginApi').LoginApi(expObj);
    var travelApi = new require('./Api/TravelApi').TravelApi(expObj);

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
    });

    expObj.get('/shutdown', function (req, res) {

        process.exit()

    });


}

cron.schedule('30 * * * *', () => {
    AqiCalculation.intilaizeAqiCalculation();
});
sensorManager.processIncomingData();

var app = new require('express')();
InitExpress(app);
const port = Number(process.env.PORT || 3000);
if (process.env.HTTPS == 'true') {
    https.createServer({
        key: key,
        cert: cert
    }, app).listen(port, () => {
        console.log("Clean Air India server listening at port:" + port)
    });

} else {
    app.listen(port, function () {
        console.log("Clean Air India server listening at port:" + port)
    });
}