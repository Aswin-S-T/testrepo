var DeviceSpecModule = require('./DeviceSpec.js');

function SPB001Spec() {

    this.id = "SPB001";
   

    this.getParamDefinitions = function () {

        var paramDefinitions = [
           {
               paramName: "data_1",
               displayName: "Compartment 1",
               displayNameHtml: "Compartment 1",
               unit: '%',
               unitDisplayHtml: '%',
               isDisplayEnabled: true,
               displayImage: "param.png",
               isPrimary: false, // for display purpose in heatmap
               needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
               valuePrecision: 1,
               isFilterable: true,
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
                displayName: "Compartment 2",
                displayNameHtml: "Compartment 2",
                unit: '%',
                unitDisplayHtml: '%',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                isFilterable: true,
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
                paramName: "letter_no_1",
                displayName: "No of Letters 1",
                displayNameHtml: "No of Letters 1",
                unit: '',
                unitDisplayHtml: '',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                isFilterable: true,
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
                paramName: "letter_no_2",
                displayName: "No of Letters 2",
                displayNameHtml: "No of Letters 2",
                unit: '',
                unitDisplayHtml: '',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                isFilterable: true,
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
                displayName: "LED Stat 1",
                displayNameHtml: "LED Stat 1",
                unit: '',
                unitDisplayHtml: '',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                isFilterable: true,
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
                displayName: "LED Stat 2",
                displayNameHtml: "LED Stat 2",
                unit: '',
                unitDisplayHtml: '',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                isFilterable: true,
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
                isFilterable: true,
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
                paramName: "signal_strength",
                displayName: "Signal Strength",
                displayNameHtml: "Signal Strength",
                unit: '%',
                unitDisplayHtml: '%',
                isDisplayEnabled: true,
                displayImage: "param.png",
                isPrimary: false,
                needsLiveData: false,
                valuePrecision: 2,
                isFilterable: true,
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
                paramName: "need_service_1",
                displayName: "Need Service",
                displayNameHtml: "Need Service",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: "data_1",
                calculationCond: " >= 75",
                isFilterable: false
            },
            {
                paramName: "need_service_2",
                displayName: "Need Service",
                displayNameHtml: "Need Service",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: "data_2",
                calculationCond: " >= 75",
                isFilterable: false
            },
            {
                paramName: "need_bat_replcmt",
                displayName: "Need Battery Replacement",
                displayNameHtml: "Need Battery Replacement",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: "bat_volt",
                calculationCond: " <= 30",
                isFilterable: false
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
                maxRanges:null,
                isFilterable: false
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
                maxRanges:null,
                isFilterable: false
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
                maxRanges:null,
                isFilterable: false
            }          
        ];

        return paramDefinitions;
    }

    this.getSummaryDefinitions = function () {

        var summaryDefinitions = [
            {
                paramName: "no_of_empty_box",
                displayName: "No of Empty Box",
                displayNameHtml: "No of Empty Box",
                unit: '%',
                unitDisplayHtml: '%',
                calculationType: 'percentage',
                calculationParam: ["letter_no_1", "letter_no_2"],
                calculationCond: " === 0",
                displayImage: "emptyMailBox",
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
                paramName: "battery_need_replacement",
                displayName: "Battery Need Replacement",
                displayNameHtml: "Battery Need Replacement",
                unit: '%',
                unitDisplayHtml: '%',
                calculationType: 'percentage',
                calculationParam: ["bat_volt"],
                calculationCond: " <= 30",
                displayImage: "battery",
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
                paramName: "signal_strength",
                displayName: "Signal Strength",
                displayNameHtml: "Signal Strength",
                unit: '%',
                unitDisplayHtml: '%',
                calculationType: 'percentage',
                calculationParam: ["signal_strength"],
                calculationCond: " >= 75",
                displayImage: "signal",
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
                paramName: "no_of_box_filledup75",
                displayName: "No of Box Filledup By 75%",
                displayNameHtml: "No of Box Filledup By 75%",
                unit: '%',
                unitDisplayHtml: '%',
                calculationType: 'percentage',
                calculationParam: ["data_1", "data_2"],
                calculationCond: " >= 75",
                displayImage: "filledMailBox",
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
            }         
        ];

        return summaryDefinitions;
    }
    
    this.summaryDefinitions = this.getSummaryDefinitions();
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
