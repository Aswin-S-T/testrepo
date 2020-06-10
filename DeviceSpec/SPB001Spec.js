var DeviceSpecModule = require('./DeviceSpec.js');

function SPB001Spec() {

    this.id = "SPB001";
   

    this.getParamDefinitions = function () {

        var paramDefinitions = [
           {
               paramName: "pb1Status",
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
                paramName: "pb2Status",
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
                paramName: "pb1LetterCount",
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
                    max: 99999
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
                paramName: "pb2LetterCount",
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
                    max: 99999
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
                paramName: "ledstat1",
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
                paramName: "ledstat2",
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
                paramName: "battery",
                displayName: "Battery",
                displayNameHtml: "Battery",
                unit: '%',
                unitDisplayHtml: '%',
                isDisplayEnabled: true,
                isPrimary: false,
                needsLiveData: false,
                valuePrecision: 2,
                isFilterable: true,
                displayImage: "battery",
                maxRanges: {
                    min: 0,
                    max: 100
                },
                limits: [
                    {
                        max: 25,
                        color: "00B050",
                        description: "Low"
                    },
                    {
                        min: 25,
                        max: 50,
                        color: "92D050",
                        description: "Fair"
                    },
                    {
                        min: 50,
                        max: 75,
                        color: "92D050",
                        description: "Good"
                    },
                    {
                        min: 75,
                        max: 100,
                        color: "FFFF00",
                        description: "Excellent"
                    }
                ]
            },
            {
                paramName: "signal",
                displayName: "Signal Strength",
                displayNameHtml: "Signal Strength",
                unit: 'dBm',
                unitDisplayHtml: 'dBm',
                isDisplayEnabled: true,
                isPrimary: false,
                needsLiveData: false,
                valuePrecision: 2,
                isFilterable: true,
                displayImage: "signal",
                maxRanges: {
                    min: -110,
                    max: -70
                },
                limits: [
                    {
                        max: -110,
                        color: "00B050",
                        description: "No Signal"
                    },
                    {
                        min: -110,
                        max: -100,
                        color: "92D050",
                        description: "Poor"
                    },
                    {
                        min: -100,
                        max: -86,
                        color: "92D050",
                        description: "Fair"
                    },
                    {
                        min: -86,
                        max: -69,
                        color: "92D050",
                        description: "Good"
                    },
                    {
                        min: -70,
                        color: "FFFF00",
                        description: "Excellent"
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
                derivedParam: ["pb1Status"],
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
                derivedParam: ["pb2Status"],
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
                derivedParam: ["battery"],
                calculationCond: " <= 30",
                isFilterable: false
            },
            {
                paramName: "time_filled_75_1",
                displayName: "Last 75% filled time",
                displayNameHtml: "Last 75&#37; filled time",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                calculationCond: " >= 75",
                valueType: "date",
                isPreValCheck: true,
                isFilterable: false
            },
            {
                paramName: "time_filled_75_2",
                displayName: "Last 75% filled time",
                displayNameHtml: "Last 75&#37; filled time",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                calculationCond: " >= 75",
                valueType: "date",
                isPreValCheck: true,
                isFilterable: false
            },
            {
                paramName: "expected_time_fill_75_1",
                displayName: "Time Filled 75% on Last Week",
                displayNameHtml: "Time Filled 75&#37; on Last Week",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                fetchParam: "time_filled_75_1",
                calculationCond: " >= 75",
                valueType: "time",
                isPrevWeekCheck: true,
                isFilterable: false
            },
            {
                paramName: "expected_time_fill_75_2",
                displayName: "Time Filled 75% on Last Week",
                displayNameHtml: "Time Filled 75&#37; on Last Week",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                fetchParam: "time_filled_75_2",
                calculationCond: " >= 75",
                valueType: "time",
                isPrevWeekCheck: true,
                isFilterable: false
            },
            {
                paramName: "assigned_to",
                displayName: "Assigned To",
                displayNameHtml: "Assigned To",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status", "pb2Status"],
                fetchParam: "assigned_to",
                isDailyValueCheck: true,
                isFilterable: false,
                showUserAssignButton: true
            },
            {
                paramName: "is_serverd_1",
                displayName: "Served",
                displayNameHtml: "Served",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                fetchParam: "is_serverd_1",
                isDailyValueCheck: true,
                isFilterable: false
            },
            {
                paramName: "is_serverd_2",
                displayName: "Served",
                displayNameHtml: "Served",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                fetchParam: "is_serverd_2",
                isDailyValueCheck: true,
                isFilterable: false
            },
            {
                paramName: "serverd_by_1",
                displayName: "Served By",
                displayNameHtml: "Served By",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                fetchParam: "serverd_by_1",
                isDailyValueCheck: true,
                isFilterable: false
            },
            {
                paramName: "serverd_by_2",
                displayName: "Served By",
                displayNameHtml: "Served By",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                fetchParam: "serverd_by_2",
                isDailyValueCheck: true,
                isFilterable: false
            },
            {
                paramName: "serverd_at_1",
                displayName: "Served At",
                displayNameHtml: "Served At",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                fetchParam: "serverd_at_2",
                isDailyValueCheck: true,
                valueType: "date",
                isFilterable: false
            },
            {
                paramName: "serverd_at_2",
                displayName: "Served At",
                displayNameHtml: "Served At",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                fetchParam: "serverd_by_2",
                isDailyValueCheck: true,
                valueType: "date",
                isFilterable: false
            },
            {
                paramName: "serve_status_1",
                displayName: "Served Status",
                displayNameHtml: "Served Status",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                fetchParam: "serve_status_1",
                isDailyValueCheck: true,
                isFilterable: false
            },
            {
                paramName: "serve_status_2",
                displayName: "Served Status",
                displayNameHtml: "Served Status",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                fetchParam: "serve_status_2",
                isDailyValueCheck: true,
                isFilterable: false
            },
            {
                paramName: "expected_volume_1",
                displayName: "Volume at last week",
                displayNameHtml: "Volume at last week",
                unit: '%',
                unitDisplayHtml: '&#37',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb1Status"],
                fetchParam: "pb1Status",
                valueType: "number",
                isPrevWeekCheckHourly: true,
                isFilterable: false
            },
            {
                paramName: "expected_volume_2",
                displayName: "Volume at last week",
                displayNameHtml: "Volume at last week",
                unit: '%',
                unitDisplayHtml: '&#37',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                derivedParam: ["pb2Status"],
                fetchParam: "pb1Status",
                valueType: "number",
                isPrevWeekCheckHourly: true,
                isFilterable: false
            },
            {
                paramName: "receivedTime",
                displayName: "Last Updated At",
                displayNameHtml: "Last Updated At",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                showWithAllParam: true,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                valueType: "date",
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
                calculationParam: ["pb1LetterCount", "pb2LetterCount"],
                calculationCond: " === 0",
                displayImage: "emptyMailBox",
                 maxRanges: {
                     min: 0,
                     max: 100
                 },
                 limits: [
                     {
                         max: 30,
                         color: "95B0B7",
                         description: "Low"
                     },
                     {
                         min: 30,
                         max: 70,
                         color: "95B0B7",
                         description: "Medium"
                     },
                     {
                         min: 70,
                         max: 100,
                         color: "95B0B7",
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
                calculationParam: ["battery"],
                calculationCond: " <= 30",
                displayImage: "battery",
                 maxRanges: {
                     min: 0,
                     max: 100
                 },
                 limits: [
                     {
                         max: 30,
                         color: "9CDDEE",
                         description: "Low"
                     },
                     {
                         min: 30,
                         max: 70,
                         color: "9CDDEE",
                         description: "Medium"
                     },
                     {
                         min: 70,
                         max: 100,
                         color: "9CDDEE",
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
                calculationParam: ["signal"],
                calculationCond: " >= -86",
                displayImage: "signal",
                 maxRanges: {
                     min: 0,
                     max: 100
                 },
                 limits: [
                     {
                         max: 30,
                         color: "64C586",
                         description: "Low"
                     },
                     {
                         min: 30,
                         max: 70,
                         color: "64C586",
                         description: "Medium"
                     },
                     {
                         min: 70,
                         max: 100,
                         color: "64C586",
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
                calculationParam: ["pb1Status", "pb2Status"],
                calculationCond: " >= 75",
                displayImage: "filledMailBox",
                 maxRanges: {
                     min: 0,
                     max: 100
                 },
                 limits: [
                     {
                         max: 30,
                         color: "196271",
                         description: "Low"
                     },
                     {
                         min: 30,
                         max: 70,
                         color: "196271",
                         description: "Medium"
                     },
                     {
                         min: 70,
                         max: 100,
                         color: "196271",
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
