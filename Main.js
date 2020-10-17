const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const cron = require('node-cron');
const AqiCalculation = require('./Device/AqiCalculation.js');
const SensorManagerModule = require('./Device/SensorManager.js');
const sensorManager = new SensorManagerModule.SensorManager();
const bodyParser = require('body-parser');
const connection = require("./src/database/connection");
const session = require('express-session');
const request = require('request');
const cookieParser = require('cookie-parser');

// Use Passport with OpenId Connect strategy to
// authenticate users
var passport = require('passport')
var OneLoginStrategy = require('passport-openidconnect').Strategy

//  acr_values: 'onelogin:nist:level:1:re-auth'
const baseUri = `https://${process.env.SUBDOMAIN}.onelogin.com/oidc/2`

// Configure the OpenId Connect Strategy
// with credentials obtained from OneLogin
passport.use(new OneLoginStrategy({
    issuer: baseUri,
    clientID: process.env.OIDC_CLIENT_ID,
    clientSecret: process.env.OIDC_CLIENT_SECRET,
    authorizationURL: `${baseUri}/auth`,
    userInfoURL: `${baseUri}/me`,
    tokenURL: `${baseUri}/token`,
    callbackURL: process.env.OIDC_REDIRECT_URI,
    passReqToCallback: true
},
    function (req, issuer, userId, profile, accessToken, refreshToken, params, cb) {
        req.session.accessToken = accessToken;
        return cb(null, profile);
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Establish the DB Connection
connection.createConn()
    .then((success) => {
        console.log("DB Connection Established", success);
    })
    .catch((error) => {
        console.log("Error Connection DB", error);
    });

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// Passport requires session to persist the authentication
// so were using express-session for this example
app.use(session({
    secret: 'secret squirrel',
    resave: false,
    saveUninitialized: true
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// routing registration.
app.use('/app/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/build')));

const routes = require('./src/routes');
Object.keys(routes).forEach(routeName => {
    app.use(`/v1.0/${routeName}`, routes[routeName])
})

var deviceSpecApi = new require('./Api/DeviceSpecApi').DeviceSpecApi(app);
var sensorApi = new require('./Api/SensorApi').SensorApi(app);
var deviceApi = new require('./Api/DeviceApi').DeviceApi(app);
var reportApi = new require('./Api/ReportApi').ReportApi(app);
var alarmApi = new require('./Api/AlarmApi').AlarmApi(app);
var userApi = new require('./Api/UserApi').UserApi(app);
var thirdPartyUserApi = new require('./Api/ThirdPartyUserApi').ThirdPartyUserApi(app);
var loginApi = new require('./Api/loginApi').LoginApi(app);
var travelApi = new require('./Api/TravelApi').TravelApi(app);

// Initiates an authentication request with OneLogin
// The user will be redirect to OneLogin and once authenticated
// they will be returned to the callback handler below
app.get('/login', passport.authenticate('openidconnect', {
    successReturnToOrRedirect: "/",
    scope: 'profile'
}));

// Callback handler that OneLogin will redirect back to
// after successfully authenticating the user
app.get('/oauth/callback', passport.authenticate('openidconnect', {
    callback: true,
    successReturnToOrRedirect: '/dashboard',
    failureRedirect: '/'
}))

app.get('/auth', function (req, res) {
    if (req.isAuthenticated()) {
        res.json({
            success: true,
            message: 'Valid session found'
        })
    } else {
        res.json({
            success: false,
            message: 'Invalid session'
        })
    }
});

// Destroy both the local session and
// revoke the access_token
app.get('/logout', function (req, res) {

    request.post(`${baseUri}/token/revocation`, {
        'form': {
            'client_id': process.env.OIDC_CLIENT_ID,
            'client_secret': process.env.OIDC_CLIENT_SECRET,
            'token': req.session.accessToken,
            'token_type_hint': 'access_token'
        }
    }, function (err, respose, body) {
        req.logout();
        res.json({
            success: true,
            message: 'Successfully Singout'
        })
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});

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