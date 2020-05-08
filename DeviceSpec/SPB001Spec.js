var DeviceSpecModule = require('./DeviceSpec.js');

function SPB001Spec() {

    this.id = "SPB001";
   

    this.getParamDefinitions = function () {

        var paramDefinitions = [
           {
               paramName: "data_1",
               displayName: "Compartment_1",
               displayNameHtml: "Compartment_1",
               unit: '%',
               unitDisplayHtml: '%',
               isDisplayEnabled: true,
               displayImage: "param.png",
               isPrimary: false, // for display purpose in heatmap
               needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
               valuePrecision: 1,
                maxRanges: {
                    min: 0,
                    max: 100
                },
                limits: [
                    {
                        max: 30,
                        color: "00B050",
                        description: "Low"
                    },
                    {
                        min: 30,
                        max: 70,
                        color: "92D050",
                        description: "Medium"
                    },
                    {
                        min: 70,
                        max: 100,
                        color: "FFFF00",
                        description: "High"
                    }
               ]
            },
            {
                paramName: "data_2",
                displayName: "Compartment_2",
                displayNameHtml: "Compartment_2",
                unit: '%',
                unitDisplayHtml: '%',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                maxRanges: {
                    min: 0,
                    max: 100
                },
                limits: [
                    {
                        max: 30,
                        color: "00B050",
                        description: "Low"
                    },
                    {
                        min: 30,
                        max: 70,
                        color: "92D050",
                        description: "Medium"
                    },
                    {
                        min: 70,
                        max: 100,
                        color: "FFFF00",
                        description: "High"
                    }
                ]
            },
            {
                paramName: "ledstat_1",
                displayName: "LED Stat_1",
                displayNameHtml: "LED Stat_1",
                unit: '',
                unitDisplayHtml: '',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                maxRanges: {
                    min: 0,
                    max: 1
                },
                limits: [
                    {
                        max: 0,
                        color: "00B050",
                        description: "Low"
                    },
                    { 
                        max: 1,
                        color: "92D050",
                        description: "High"
                    }
                ]
            },
            {
                paramName: "ledstat_2",
                displayName: "LED Stat_2",
                displayNameHtml: "LED Stat_2",
                unit: '',
                unitDisplayHtml: '',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                maxRanges: {
                    min: 0,
                    max: 1
                },
                limits: [
                    {
                        max: 0,
                        color: "00B050",
                        description: "Low"
                    },
                    {
                        max: 1,
                        color: "92D050",
                        description: "High"
                    }
                ]
            },
            {
                paramName: "bat_volt",
                displayName: "Battery",
                displayNameHtml: "Battery",
                unit: 'V',
                unitDisplayHtml: 'V',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false,
                needsLiveData: false,
                valuePrecision: 2,
                maxRanges: {
                    min: 0,
                    max: 100
                },
                limits: [
                    {
                        max: 30,
                        color: "00B050",
                        description: "Low"
                    },
                    {
                        min: 30,
                        max: 70,
                        color: "92D050",
                        description: "Medium"
                    },
                    {
                        min: 70,
                        max: 100,
                        color: "FFFF00",
                        description: "High"
                    }
                ]
            },
            {
                paramName: "uptime",
                displayName: "Up-Time",
                displayNameHtml: "Up-Time",
                unit: 's',
                unitDisplayHtml: 's',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null
            },
            {
                paramName: "receivedTime",
                displayName: "Received Time",
                displayNameHtml: "Received Time",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null
            },
            {
                paramName: "time",
                displayName: "Time",
                displayNameHtml: "Time",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null
            }          
        ];

        return paramDefinitions;
    }
    
    this.paramDefinitions = this.getParamDefinitions();
}

SPB001Spec.prototype = new DeviceSpecModule.DeviceSpec();
SPB001Spec.prototype.constructor = SPB001Spec;
SPB001Spec.prototype.parent = DeviceSpecModule.DeviceSpec.prototype;


// export the class
module.exports =
{
    SPB001Spec
};
