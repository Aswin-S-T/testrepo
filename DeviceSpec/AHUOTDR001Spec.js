var DeviceSpecModule = require('./DeviceSpec.js');

function AHUOTDR001Spec() {

    this.id = "AHUOTDR001";


    this.getParamDefinitions = function () {

        var paramDefinitions = [
            {
                paramName: "temperature",
                displayName: "Temperature",
                displayNameHtml: "Temperature",
                unit: 'oC',
                unitDisplayHtml: '<sup>o</sup>C',
                isDisplayEnabled: true,
                displayImage: "temperature.png",
                isPrimary: false, // for display purpose in heatmap
                needsLiveData: false, // for display purpose in heatmap (as graph in selection pane)
                valuePrecision: 1,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayLive: true,
                maxRanges: {
                    min: -10,
                    max: 60
                },
                limits: [
                    {
                        max: 10,
                        color: "00B050",
                        description: "Cold"
                    },
                    {
                        min: 10,
                        max: 15,
                        color: "92D050",
                        description: "Cool"
                    },
                    {
                        min: 15,
                        max: 25,
                        color: "FFFF00",
                        description: "Warm"
                    },
                    {
                        min: 25,
                        max: 37,
                        color: "FF9A00",
                        description: "Hot"
                    },
                    {
                        min: 37,
                        max: 40,
                        color: "FF0000",
                        description: "Very Hot"
                    },
                    {
                        min: 40,
                        color: "800000",
                        description: "Extremely Hot"
                    }
                ]
            },
            {
                paramName: "pressure",
                displayName: "Pressure",
                displayNameHtml: "Pressure",
                unit: 'mb',
                unitDisplayHtml: 'mb',
                displayImage: "pressure.png",
                isDisplayEnabled: true,
                needsLiveData: false,
                isPrimary: false,
                valuePrecision: 2,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayLive: true,
                maxRanges: {
                    min: 540,
                    max: 1100
                },
                limits: [
                    {
                        max: 980,
                        color: "e4e9ed",
                        description: "Low"
                    },
                    {
                        min: 980,
                        max: 1050,
                        color: "00B050",
                        description: "Normal"
                    },
                    {
                        min: 1050,
                        color: "800000",
                        description: "High"
                    }
                ]
            },
            {
                paramName: "humidity",
                displayName: "Humidity",
                displayNameHtml: "Humidity",
                unit: '%RH',
                unitDisplayHtml: '%RH',
                isDisplayEnabled: true,
                needsLiveData: false,
                isPrimary: false,
                displayImage: "humidity.png",
                valuePrecision: 2,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayLive: true,
                maxRanges: {
                    min: 0,
                    max: 90
                },
                limits: [
                    {
                        max: 25,
                        color: "00B050",
                        description: "Dry"
                    },
                    {
                        min: 25,
                        max: 60,
                        color: "92D050",
                        description: "Normal"
                    },
                    {
                        min: 60,
                        color: "FFFF00",
                        description: "Moist"
                    }
                ]
            },

            {
                paramName: "PM10",
                displayName: "PM10",
                displayNameHtml: "PM<sub>10</sub>",
                unit: 'µg/m3',
                unitDisplayHtml: '&mu;g/m<sup>3</sup>',
                isDisplayEnabled: true,
                needsLiveData: true,
                isPrimary: false,
                displayImage: "param.png",
                valuePrecision: 2,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayStat: true,
                maxRanges: {
                    min: 0,
                    max: 450
                },
                limits: [
                    {
                        max: 50,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 50,
                        max: 100,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 100,
                        max: 250,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 250,
                        max: 350,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 350,
                        max: 430,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 430,

                        color: "800000",
                        description: "Severe"
                    }
                ]
            },

            {
                paramName: "PM2p5",
                displayName: "PM2.5",
                displayNameHtml: "PM<sub>2.5</sub>",
                unit: 'µg/m3',
                unitDisplayHtml: '&mu;g/m<sup>3</sup>',
                isDisplayEnabled: true,
                needsLiveData: true,
                isPrimary: false,
                displayImage: "param.png",
                valuePrecision: 2,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayStat: true,
                maxRanges: {
                    min: 0,
                    max: 230
                },
                limits: [
                    {
                        max: 30,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 30,
                        max: 60,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 60,
                        max: 90,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 90,
                        max: 120,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 120,
                        max: 250,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 250,

                        color: "800000",
                        description: "Severe"
                    }
                ]
            },
            {
                paramName: "CO",
                displayName: "CO",
                displayNameHtml: "CO",
                unit: 'mg/m3',
                unitDisplayHtml: 'mg/m3',
                displayImage: "param.png",
                isFilteringEnabled: false,
                needsLiveData: true,
                isPrimary: false,
                filteringMethod: null,
                isDisplayEnabled: true,
                valuePrecision: 3,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayStat: true,
                maxRanges: {
                    min: 0,
                    max: 5000
                },

                limits: [
                    {
                        max: 500,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 500,
                        max: 1000,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 1000,
                        max: 1500,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 1500,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2000,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2500,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },
            {
                paramName: "NO2",
                displayName: "NO2",
                displayNameHtml: "NO<sub>2</sub>",
                unit: 'ug/m3',
                unitDisplayHtml: 'ug/m3',
                needsLiveData: true,
                displayImage: "param.png",
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 3,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayStat: true,
                maxRanges: {
                    min: 0,
                    max: 2000
                },
                limits: [
                    {
                        max: 500,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 500,
                        max: 1000,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 1000,
                        max: 1500,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 1500,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2000,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2500,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },
            {
                paramName: "SO2",
                displayName: "SO2",
                displayNameHtml: "SO<sub>2</sub>",
                unit: 'ug/m3',
                unitDisplayHtml: 'ug/m3',
                displayImage: "param.png",
                needsLiveData: true,
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 3,
                isCsvParam: true,
                isFilterable: true,
                signageDisplayStat: true,
                maxRanges: {
                    min: 0,
                    max: 3000
                },
                limits: [
                    {
                        max: 500,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 500,
                        max: 1000,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 1000,
                        max: 1500,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 1500,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2000,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2500,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },
            {
                paramName: "CO2",
                displayName: "CO2",
                displayNameHtml: "CO<sub>2</sub>",
                unit: 'PPM',
                unitDisplayHtml: 'PPM',
                displayImage: "param.png",
                needsLiveData: true,
                isDisplayEnabled: true,
                isPrimary: false,
                isCsvParam: true,
                isFilterable: true,
                valuePrecision: 3,
                signageDisplayStat: true,
                maxRanges: {
                    min: 0,
                    max: 5000
                },
                limits: [
                    {
                        max: 350,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 350,
                        max: 1000,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 1000,
                        max: 2000,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 2000,
                        max: 5000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {

                        max: 5000,
                        color: "FF0000",
                        description: "Very Poor"
                    }
                ]
            },
            {
                paramName: "receivedTime",
                displayName: "receivedTime",
                displayNameHtml: "receivedTime",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isCsvParam: false,
                isFilterable: false,
                signageDisplayLive: true,
                valueType: "date"
            },
            {
                paramName: "rawAQI",
                displayName: "Raw AQI",
                displayNameHtml: "Raw AQI",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 0,
                isDerivedParam: true,
                isCsvParam: true,
                isFilterable: false,
                maxRanges: {
                    min: 0,
                    max: 500
                },
                limits: [
                    {
                        max: 50,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 50,
                        max: 100,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 100,
                        max: 200,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 200,
                        max: 300,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 300,
                        max: 400,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 400,
                        //   max:500,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },
            {
                paramName: "AQI",
                displayName: "AQI",
                displayNameHtml: "AQI",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                isPrimary: true,
                valuePrecision: 0,
                isDerivedParam: true,
                isCsvParam: true,
                isFilterable: false,
                signageDisplayAqiParam: true,
                maxRanges: {
                    min: 0,
                    max: 500
                },
                limits: [
                    {
                        max: 50,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 50,
                        max: 100,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 100,
                        max: 200,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 200,
                        max: 300,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 300,
                        max: 400,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 400,
                        //   max:500,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },
            {
                paramName: "prominentPollutant",
                displayName: "Prominent Pollutant",
                displayNameHtml: "Prominent Pollutant",
                unit: '',
                unitDisplayHtml: '',
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges:null,
                isCsvParam: true,
                isFilterable: false,
                signageDisplayAqiParam: true,
                isDerived: true,
                valueType: "string"
            }

        ];

        return paramDefinitions;
    }

    this.paramDefinitions = this.getParamDefinitions();
}

AHUOTDR001Spec.prototype = new DeviceSpecModule.DeviceSpec();
AHUOTDR001Spec.prototype.constructor = AHUOTDR001Spec;
AHUOTDR001Spec.prototype.parent = DeviceSpecModule.DeviceSpec.prototype;


// export the class
module.exports =
{
    AHUOTDR001Spec
};




