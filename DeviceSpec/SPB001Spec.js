var DeviceSpecModule = require('./DeviceSpec.js');

function SPB001Spec() {

    this.id = "SPB001";
   

    this.getParamDefinitions = function () {

        var paramDefinitions = [
           {
               paramName: "pb1Status",
               displayName: "Compartment 1 Details",
               displayNameHtml: "Compartment 1 Details",
               displayTableHead: "Current filled level",
               graphDisplayName: "Filled percentage",
               paramDescription: "",
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
                displayName: "Compartment 2 Details",
                displayNameHtml: "Compartment 2 Details",
                displayTableHead: "Current filled level",
                graphDisplayName: "Filled percentage",
                paramDescription: "",
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
                displayNameHtml: "No of letters 1",
                displayTableHead: "No of letters 1",
                paramDescription: "",
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
                displayNameHtml: "No of letters 2",
                displayTableHead: "No of letters 2",
                paramDescription: "",
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
                displayTableHead: "LED status 1",
                paramDescription: "",
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
                displayTableHead: "LED status 1",
                paramDescription: "",
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
                displayTableHead: "Battery",
                paramDescription: "",
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
                displayTableHead: "Signal strength",
                paramDescription: "",
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
                displayTableHead: "Current pickup required",
                paramDescription: "",
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
                displayTableHead: "Current pickup required",
                paramDescription: "",
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
                displayTableHead: "Battery replacement required",
                paramDescription: "",
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
                displayTableHead: "Last pickup required time",
                paramDescription: "Most recent time which postbox is filled above 75%",
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
                displayTableHead: "Last pickup required time",
                paramDescription: "Most recent Time which postbox is filled above 75%",
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
                displayTableHead: "Last week pickup required time",
                paramDescription: "Time at which postbox is filled above 75% on the same day, last week",
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
                valueType: "date",
                isPrevWeekCheck: true,
                isFilterable: false
            },
            {
                paramName: "expected_time_fill_75_2",
                displayName: "Time Filled 75% on Last Week",
                displayNameHtml: "Time Filled 75&#37; on Last Week",
                displayTableHead: "Last week pickup required time",
                paramDescription: "Time at which postbox is filled above 75% on the same day, last week",
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
                valueType: "date",
                isPrevWeekCheck: true,
                isFilterable: false
            },
            {
                paramName: "assigned_to",
                displayName: "Assigned To",
                displayNameHtml: "Assigned To",
                displayTableHead: "Assign Pickup to",
                paramDescription: "",
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
                displayTableHead: "Pickup made",
                paramDescription: "",
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
                displayTableHead: "Pickup made",
                paramDescription: "",
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
                displayTableHead: "Pickup done by",
                paramDescription: "",
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
                displayTableHead: "Pickup done by",
                paramDescription: "",
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
                displayTableHead: "Pickup done time",
                paramDescription: "",
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
                displayTableHead: "Pickup done time",
                paramDescription: "",
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
                displayTableHead: "Pickup done type",
                paramDescription: "",
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
                displayTableHead: "Pickup done type",
                paramDescription: "",
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
                displayTableHead: "Last Week filled level",
                paramDescription: "The percentage that filled in the postbox on the same time(Filled Status Updated time), last week",
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
                displayTableHead: "Last Week filled level",
                paramDescription: "The percentage that filled in the postbox on the same time(Filled Status Updated time), last week",
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
                paramName: "1st_time_filled_75_1",
                displayName: "1st 75% filled time",
                displayNameHtml: "1st 75&#37; filled time",
                displayTableHead: "1st pickup required time",
                paramDescription: "1st time which postbox is filled above 75%",
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
                isFilterable: false,
                isDailyReportField: true,
                fetchParam: "1st_time_filled_75_1",
                DailyReportHead: "1st time Compartment one goes above 75%",
                firstValueParam: true
            },
            {
                paramName: "1st_serverd_by_1",
                displayName: "1st Served By",
                displayNameHtml: "1st Served By",
                displayTableHead: "First Pickup done by",
                paramDescription: "",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                updateParam: "serverd_by_1",
                fetchParam: "1st_serverd_by_1",
                isFilterable: false,
                isDailyReportField: true,
                DailyReportHead: "1st time Compartment one Served by",
                firstValueParam: true
            },
            {
                paramName: "2nd_time_filled_75_1",
                displayName: "2nd 75% filled time",
                displayNameHtml: "2nd 75&#37; filled time",
                displayTableHead: "2nd pickup required time",
                paramDescription: "Second time which postbox is filled above 75%",
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
                isFilterable: false,
                isDailyReportField: true,
                fetchParam: "2nd_time_filled_75_1",
                DailyReportHead: "2nd time Compartment one goes above 75%",
                secondValueParam: true,
                firstValueParamName: "1st_time_filled_75_1"
            },
            {
                paramName: "2nd_serverd_by_1",
                displayName: "2nd Served By",
                displayNameHtml: "2nd Served By",
                displayTableHead: "Second time compartment one Pickup done by",
                paramDescription: "",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                updateParam: "serverd_by_1",
                fetchParam: "2nd_serverd_by_1",
                isFilterable: false,
                isDailyReportField: true,
                DailyReportHead: "2nd time Compartment one Served by",
                secondValueParam: true,
                firstValueParamName: "1st_serverd_by_1"
            },
            {
                paramName: "1st_time_filled_75_2",
                displayName: "1st 75% filled time",
                displayNameHtml: "1st 75&#37; filled time",
                displayTableHead: "1st pickup required time",
                paramDescription: "First Time which postbox is filled above 75%",
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
                isFilterable: false,
                isDailyReportField: true,
                fetchParam: "1st_time_filled_75_2",
                DailyReportHead: "1st time Compartment two goes above 75%",
                firstValueParam: true  
            },
            {
                paramName: "1st_serverd_by_2",
                displayName: "1st Served By",
                displayNameHtml: "1st Served By",
                displayTableHead: "First Pickup done by",
                paramDescription: "",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                updateParam: "serverd_by_2",
                fetchParam: "1st_serverd_by_2",
                isFilterable: false,
                isDailyReportField: true,
                DailyReportHead: "1st time Compartment two Served by",
                firstValueParam: true  
            },
            {
                paramName: "2nd_time_filled_75_2",
                displayName: "2nd 75% filled time",
                displayNameHtml: "2nd 75&#37; filled time",
                displayTableHead: "2nd pickup required time",
                paramDescription: "Second Time which postbox is filled above 75%",
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
                isFilterable: false,
                isDailyReportField: true,
                fetchParam: "2nd_time_filled_75_2",
                DailyReportHead: "2nd time Compartment two goes above 75%",
                secondValueParam: true,
                firstValueParamName: "1st_time_filled_75_2"  
            },
            {
                paramName: "2nd_serverd_by_2",
                displayName: "2nd Served By",
                displayNameHtml: "2nd Served By",
                displayTableHead: "Second time compartment one Pickup done by",
                paramDescription: "",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isDerived: true,
                updateParam: "serverd_by_2",
                fetchParam: "2nd_serverd_by_2",
                isFilterable: false,
                isDailyReportField: true,
                DailyReportHead: "2nd time Compartment two Served by",
                secondValueParam: true,
                firstValueParamName: "1st_serverd_by_2"  
            },
            {
                paramName: "receivedTime",
                displayName: "Last Updated At",
                displayNameHtml: "Last Updated At",
                displayTableHead: "Filled Status Updated at",
                paramDescription: "Time at which device provided lastest data",
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
                displayTableHead: "Updated at",
                paramDescription: "",
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
                paramDescription: "",
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
                paramDescription: "",
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
                paramDescription: "",
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
                paramDescription: "",
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
