var DeviceSpecModule = require('./DeviceSpec.js');

function ESBHA001Spec() {

    this.id = "ESBHA001";


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
                        min: 11,
                        max: 15,
                        color: "92D050",
                        description: "Cool"
                    },
                    {
                        min: 16,
                        max: 25,
                        color: "FFFF00",
                        description: "Warm"
                    },
                    {
                        min: 26,
                        max: 37,
                        color: "FF9A00",
                        description: "Hot"
                    },
                    {
                        min: 38,
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
            //to be decided
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

            //to be decided
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
                        min: 51,
                        max: 100,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 101,
                        max: 150,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 251,
                        max: 350,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 351,
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
                        min: 31,
                        max: 60,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 61,
                        max: 90,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 91,
                        max: 120,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 121,
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
                paramName: "PM1",
                displayName: "PM1",
                displayNameHtml: "PM<sub>1</sub>",
                unit: 'µg/m3',
                unitDisplayHtml: '&mu;g/m<sup>3</sup>',
                isDisplayEnabled: true,
                needsLiveData: true,
                isPrimary: false,
                displayImage: "param.png",
                valuePrecision: 2,
                maxRanges: {
                    min: 0,
                    max: 100
                },
                limits: [
                    {
                        max: 30,
                        color: "00B050",
                        description: "Good"
                    },
                    {
                        min: 31,
                        max: 60,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 61,
                        max: 90,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 91,
                        max: 120,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 121,
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
                        min: 501,
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
                        min: 1501,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2001,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2501,
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
                        min: 501,
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
                        min: 1501,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2001,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2501,
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
                        min: 501,
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
                        min: 1501,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2001,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2501,
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
                valuePrecision: 3,
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
                        min: 351,
                        max: 1000,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 1001,
                        max: 2000,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 2001,
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
                paramName: "O3",
                displayName: "O3",
                displayNameHtml: "O<sub>3</sub>",
                unit: 'ug/m3',
                unitDisplayHtml: 'ug/m3',
                needsLiveData: true,
                displayImage: "param.png",
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 3,
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
                        min: 501,
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
                        min: 1501,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2001,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2501,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },

            {
                paramName: "NH3",
                displayName: "NH3",
                displayNameHtml: "NH<sup>3</sup>",
                unit: 'ug/m3',
                unitDisplayHtml: 'ug/m3',
                needsLiveData: true,
                displayImage: "param.png",
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 3,
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
                        min: 501,
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
                        min: 1501,
                        max: 2000,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 2001,
                        max: 2500,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 2501,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            },

            {
                paramName: "noise",
                displayName: "Noise",
                displayNameHtml: "Noise",
                unit: 'dBA',
                unitDisplayHtml: 'dBA',
                isDisplayEnabled: true,
                needsLiveData: false,
                isPrimary: false,
                displayImage: "humidity.png",
                valuePrecision: 2,
                maxRanges: {
                    min: 1,
                    max: 135
                },
                limits: [
                    {
                        max: 40,
                        color: "00B050",
                        description: "Faint"
                    },
                    {
                        min: 41,
                        max: 80,
                        color: "92D050",
                        description: "Moderate"
                    },
                    {
                        min: 81,
                        max: 110,
                        color: "FFFF00",
                        description: "Loud"
                    },
                    {
                        min: 111,
                        max: 140,
                        color: "FF9A00",
                        description: "Pain"
                    },
                    {
                        min: 140,
                        color: "ff0000",
                        description: "Intolerable"
                    }
                ]
            },

            {
                paramName: "rain",
                displayName: "Rain",
                displayNameHtml: "Rain",
                unit: 'mm',
                unitDisplayHtml: 'mm',
                isDisplayEnabled: true,
                needsLiveData: false,
                isPrimary: false,
                displayImage: "raingrey.png",
                valuePrecision: 2,
                maxRanges: {
                    min: 0,
                    max: 999.8
                },
                limits: [
                    {
                        max: 2.5,
                        color: "92D050",
                        description: "Light Rain"
                    },
                    {
                        min: 2.5,
                        max: 9.99,
                        color: "FFFF00",
                        description: "Moderate Rain"
                    },
                    {
                        min: 10,
                        max: 50,
                        color: "FF9A00",
                        description: "Heavy Rain"
                    },
                    {
                        min: 50,
                        color: "ff0000",
                        description: "Violent"
                    }
                ]
            },

            {
                paramName: "receivedTime",
                displayName: "receivedTime",
                displayNameHtml: "receivedTime",
               // unit : "hms",
               unit: '',
              unitDisplayHtml: '',

                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
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
                isDisplayEnabled: false,
                isPrimary: false,
                valuePrecision: 0,
                maxRanges: null
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
                isPrimary: true,
                valuePrecision: 0,
                isDerivedParam: true,

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
                        min: 51,
                        max: 100,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 101,
                        max: 200,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 201,
                        max: 301,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 301,
                        max: 400,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 401,
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
                        min: 51,
                        max: 100,
                        color: "92D050",
                        description: "Satisfactory"
                    },
                    {
                        min: 101,
                        max: 200,
                        color: "FFFF00",
                        description: "Moderate"
                    },
                    {
                        min: 201,
                        max: 301,
                        color: "FF9A00",
                        description: "Poor"
                    },
                    {
                        min: 301,
                        max: 400,
                        color: "FF0000",
                        description: "Very Poor"
                    },
                    {
                        min: 401,
                        //   max:500,
                        color: "800000",
                        description: "Severe"
                    }
                ]
            }

        ];

        return paramDefinitions;
    }

    this.paramDefinitions = this.getParamDefinitions();
}

ESBHA001Spec.prototype = new DeviceSpecModule.DeviceSpec();
ESBHA001Spec.prototype.constructor = ESBHA001Spec;
ESBHA001Spec.prototype.parent = DeviceSpecModule.DeviceSpec.prototype;


// export the class
module.exports =
    {
        ESBHA001Spec
    };




