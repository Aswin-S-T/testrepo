const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const cron = require('node-cron');
const AqiCalculation = require('./Device/AqiCalculation.js');
const SensorManagerModule = require('./Device/SensorManager.js');
const sensorManager = new SensorManagerModule.SensorManager();
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))

// routing registration.
app.use('/app/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

var deviceSpecApi = new require('./Api/DeviceSpecApi').DeviceSpecApi(app);
var sensorApi = new require('./Api/SensorApi').SensorApi(app);
var deviceApi = new require('./Api/DeviceApi').DeviceApi(app);
var reportApi = new require('./Api/ReportApi').ReportApi(app);
var alarmApi = new require('./Api/AlarmApi').AlarmApi(app);
var userApi = new require('./Api/UserApi').UserApi(app);
var thirdPartyUserApi = new require('./Api/ThirdPartyUserApi').ThirdPartyUserApi(app);
var loginApi = new require('./Api/loginApi').LoginApi(app);
var travelApi = new require('./Api/TravelApi').TravelApi(app);


// listen server
const port = Number(process.env.PORT || 3000);
if (process.env.HTTPS == 'true') {
    const cert = fs.readFileSync('./cert/cert.pem');
    const key = fs.readFileSync('./cert/key.pem');
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


cron.schedule('30 * * * *', () => {
    console.log('AQI Calculated at: ', new Date().toUTCString())
    AqiCalculation.intilaizeAqiCalculation();
});
sensorManager.processIncomingData();