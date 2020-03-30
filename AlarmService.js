var AlarmProcessorModule = require('./Alarm/AlarmProcessor.js');
var alarmProcessor = new AlarmProcessorModule.AlarmProcessor();

var AlarmManagerModule = require('./Alarm/AlarmManager.js');
var alarmManager = new AlarmManagerModule.AlarmManager();

var thirdPartyRequestValidationModule = require('./ThirdPartyRequestValidation.js')
var ThirdPartyRequestValidationLimit = thirdPartyRequestValidationModule.ThirdPartyRequestValidation()

var ThirdPartyUserJSONModule = require('./ThirdPartyUser/ThirdPartyUserJSON.js')
var thirdPartyUserJSON = new ThirdPartyUserJSONModule.thirdPartyUserJSON()

console.log('starting alarm service server ');

var interval = setInterval(function () {

    var date = new Date()

    console.log("date   ", date.getHours(), date.getMinutes(), typeof (date.getHours()), typeof (date.getMinutes()))

    if (date.getHours() == 00 && (date.getMinutes() == 00 || date.getMinutes() == 01)) { // for IST midnight
        console.log("reseting at midnight")
        thirdPartyUserJSON.resetCounter();
    }

    console.log("processing alarms");
    alarmProcessor.process(function () {

        console.log("processing completed");
    })

}, 15000);

