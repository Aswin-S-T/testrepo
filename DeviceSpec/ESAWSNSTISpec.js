var DeviceSpecModule = require('./DeviceSpec.js');

function ESAWSNSTISpec() {

    this.id = "ESAWSNSTI";


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
                    min: 0,
                    max: 100
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
                unit: 'KPa',
                unitDisplayHtml: 'Kpa',
                displayImage: "pressure.png",
                isDisplayEnabled: true,
                needsLiveData: false,
                isPrimary: false,
                valuePrecision: 2,
                maxRanges: {
                    min: 15,
                    max: 115
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
                    min: 5,
                    max: 95
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

            // {
            //     paramName: "PM10",
            //     displayName: "PM10",
            //     displayNameHtml: "PM<sub>10</sub>",
            //     unit: 'µg/m3',
            //     unitDisplayHtml: '&mu;g/m<sup>3</sup>',
            //     isDisplayEnabled: true,
            //     needsLiveData: true,
            //     isPrimary: false,
            //     displayImage: "param.png",
            //     valuePrecision: 2,
            //     maxRanges: {
            //         min: 0,
            //         max: 450
            //     },
            //     limits: [
            //         {
            //             max: 50,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 51,
            //             max: 100,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 101,
            //             max: 150,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 251,
            //             max: 350,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 351,
            //             max: 430,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 430,

            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },

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
                    min: 10,
                    max: 500
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
            // {
            //     paramName: "PM1",
            //     displayName: "PM1",
            //     displayNameHtml: "PM<sub>1</sub>",
            //     unit: 'µg/m3',
            //     unitDisplayHtml: '&mu;g/m<sup>3</sup>',
            //     isDisplayEnabled: true,
            //     needsLiveData: true,
            //     isPrimary: false,
            //     displayImage: "param.png",
            //     valuePrecision: 2,
            //     maxRanges: {
            //         min: 0,
            //         max: 100
            //     },
            //     limits: [
            //         {
            //             max: 30,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 31,
            //             max: 60,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 61,
            //             max: 90,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 91,
            //             max: 120,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 121,
            //             max: 250,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 250,

            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },

            // {
            //     paramName: "CO",
            //     displayName: "CO",
            //     displayNameHtml: "CO",
            //     unit: 'mg/m3',
            //     unitDisplayHtml: 'mg/m3',
            //     displayImage: "param.png",
            //     isFilteringEnabled: false,
            //     needsLiveData: true,
            //     isPrimary: false,
            //     filteringMethod: null,
            //     isDisplayEnabled: true,
            //     valuePrecision: 3,
            //     maxRanges: {
            //         min: 0,
            //         max: 1145
            //     },
            //     limits: [
            //         {
            //             max: 0.811,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 0.812,
            //             max: 1.62,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 1.63,
            //             max: 8.11,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 8.12,
            //             max: 13.8,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 13.9,
            //             max: 27.6,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 27.6,

            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },


            // {
            //     paramName: "NO2",
            //     displayName: "NO2",
            //     displayNameHtml: "NO<sub>2</sub>",
            //     unit: 'ug/m3',
            //     unitDisplayHtml: 'ug/m3',
            //     needsLiveData: true,
            //     displayImage: "param.png",
            //     isDisplayEnabled: true,
            //     isPrimary: false,
            //     valuePrecision: 3,
            //     maxRanges: {
            //         min: 0,
            //         max: 1880
            //     },
            //     limits: [
            //         {
            //             max: 0.0212,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 0.0213,
            //             max: 0.042,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 0.043,
            //             max: 0.095,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 0.096,
            //             max: 0.148,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 0.149,
            //             max: 0.21,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 0.21,
            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },



            // {
            //     paramName: "SO2",
            //     displayName: "SO2",
            //     displayNameHtml: "SO<sub>2</sub>",
            //     unit: 'ug/m3',
            //     unitDisplayHtml: 'ug/m3',
            //     displayImage: "param.png",
            //     needsLiveData: true,
            //     isDisplayEnabled: true,
            //     isPrimary: false,
            //     valuePrecision: 3,
            //     maxRanges: {
            //         min: 0,
            //         max: 2620
            //     },
            //     limits: [
            //         {
            //             max: 0.0142,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 0.0142,
            //             max: 0.0284,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 0.0285,
            //             max: 0.135,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 0.136,
            //             max: 0.284,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 0.285,
            //             max: 0.567,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 0.567,

            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },

            // {
            //     paramName: "CO2",
            //     displayName: "CO2",
            //     displayNameHtml: "CO<sub>2</sub>",
            //     unit: 'PPM',
            //     unitDisplayHtml: 'PPM',
            //     displayImage: "param.png",
            //     needsLiveData: true,
            //     isDisplayEnabled: true,
            //     isPrimary: false,
            //     valuePrecision: 3,
            //     maxRanges: {
            //         min: 0,
            //         max: 5000
            //     },
            //     limits: [
            //         {
            //             max: 350,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 351,
            //             max: 1000,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 1001,
            //             max: 2000,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 2001,
            //             max: 5000,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {

            //             max: 5000,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         }
            //     ]
            // },
            // {
            //     paramName: "O3",
            //     displayName: "O3",
            //     displayNameHtml: "O<sub>3</sub>",
            //     unit: 'ug/m3',
            //     unitDisplayHtml: 'ug/m3',
            //     needsLiveData: true,
            //     displayImage: "param.png",
            //     isDisplayEnabled: true,
            //     isPrimary: false,
            //     valuePrecision: 3,
            //     maxRanges: {
            //         min: 0,
            //         max: 2000
            //     },
            //     limits: [
            //         {
            //             max: 0.0237,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 0.0238,
            //             max: 0.0473,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 0.0474,
            //             max: 0.0795,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 0.0796,
            //             max: 0.0984,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 0.0985,
            //             max: 0.354,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 0.354,
            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },

            // {
            //     paramName: "NH3",
            //     displayName: "NH3",
            //     displayNameHtml: "NH<sup>3</sup>",
            //     unit: 'ug/m3',
            //     unitDisplayHtml: 'ug/m3',
            //     needsLiveData: true,
            //     displayImage: "param.png",
            //     isDisplayEnabled: true,
            //     isPrimary: false,
            //     valuePrecision: 3,
            //     maxRanges: {
            //         min: 0,
            //         max: 3483
            //     },
            //     limits: [
            //         {
            //             max: 0.267,
            //             color: "00B050",
            //             description: "Good"
            //         },
            //         {
            //             min: 0.268,
            //             max: 0.533,
            //             color: "92D050",
            //             description: "Satisfactory"
            //         },
            //         {
            //             min: 0.534,
            //             max: 1.07,
            //             color: "FFFF00",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 1.08,
            //             max: 1.60,
            //             color: "FF9A00",
            //             description: "Poor"
            //         },
            //         {
            //             min: 1.61,
            //             max: 2.40,
            //             color: "FF0000",
            //             description: "Very Poor"
            //         },
            //         {
            //             min: 2.40,
            //             color: "800000",
            //             description: "Severe"
            //         }
            //     ]
            // },

            // {
            //     paramName: "noise",
            //     displayName: "Noise",
            //     displayNameHtml: "Noise",
            //     unit: 'dBA',
            //     unitDisplayHtml: 'dBA',
            //     isDisplayEnabled: true,
            //     needsLiveData: false,
            //     isPrimary: false,
            //     displayImage: "humidity.png",
            //     valuePrecision: 2,
            //     maxRanges: {
            //         min: 1,
            //         max: 135
            //     },
            //     limits: [
            //         {
            //             max: 40,
            //             color: "00B050",
            //             description: "Faint"
            //         },
            //         {
            //             min: 41,
            //             max: 80,
            //             color: "92D050",
            //             description: "Moderate"
            //         },
            //         {
            //             min: 81,
            //             max: 110,
            //             color: "FFFF00",
            //             description: "Loud"
            //         },
            //         {
            //             min: 111,
            //             max: 140,
            //             color: "FF9A00",
            //             description: "Pain"
            //         },
            //         {
            //             min: 140,
            //             color: "ff0000",
            //             description: "Intolerable"
            //         }
            //     ]
            // },

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
                paramName: "solarRadiation",
                displayName: "Solar Radiation",
                displayNameHtml: "Solar Radiation",
                unit: 'W/m²',
                unitDisplayHtml: 'W/m<sup>2</sup>',
                isDisplayEnabled: true,
                needsLiveData: false,
                isPrimary: false,
                displayImage: "SOLARRADIATIONgrey.png",
                valuePrecision: 2,
                maxRanges: {
                    min: 0,
                    max: 2000
                },
                limits: [
                    {
                        max: 33,
                        color: "ffff00",
                        description: "Low"
                    },
                    {
                        min: 33,
                        max: 66,
                        color: "00ff00",
                        description: "Moderate"
                    },
                     {
                         min: 66,
                         color: "ff0000",
                         description: "High"
                     }
                ]
            },

            {
                paramName: "UV",
                displayName: "UV",
                displayNameHtml: "UV",
                unit: "nm",
                unitDisplayHtml: "nm",
                displayImage: "param.png",
                needsLiveData: false,
                isDisplayEnabled: true,
                isPrimary: false,
                valuePrecision: 2,
                maxRanges: {
                    min: 200,
                    max: 370
                }
            },

            {
                paramName: "windSpeed",
               displayName: "Wind Speed",
               displayNameHtml: "Wind Speed",
               unit: 'm/s',
               unitDisplayHtml: 'm/s',
               isDisplayEnabled: true,
               needsLiveData: false,
               isPrimary: false,
               displayImage: "windgrey.png",
               valuePrecision: 2,
               maxRanges: {
                   min: 0,
                   max: 20
               },
               limits: [
                   {
                       max: 11,
                       color: "00B050",
                       description: "Calm Light Breeze"
                   },
                   {
                       min: 12,
                       max: 30,
                       color: "92D050",
                       description: "Gentle Moderate Breeze"
                   },
                   {
                       min: 31,
                       max: 50,
                       color: "FFFF00",
                       description: "Strong Breeze"
                   },
                   {
                       min: 51,
                       max: 61,
                       color: "FF9A00",
                       description: "Moderate Storm"
                   },
                   {
                       min: 62,
                       max: 87,
                       color: "ff0000",
                       description: "Strong Storm"
                   },
                    {
                        min: 87,
                        color: "800000",
                        description: "Cyclone"
                    }
               ]
            },

            {
                paramName: "windDirection",
               displayName: "Wind Direction",
               displayNameHtml: "Wind Direction",
               unit: 'deg',
               unitDisplayHtml: '<sup>o</sup>',
               isDisplayEnabled: true,
               needsLiveData: false,
               isPrimary: false,
               displayImage: "windDIRECTIONgrey.png",
               valuePrecision: 2,
               maxRanges: {
                   min: 0,
                   max: 360
               },
               limits: [
                   {
                       max: 33,
                       color: "ffff00",
                       description: "Low"
                   },
                   {
                       min: 33,
                       max: 66,
                       color: "00ff00",
                       description: "Moderate"
                   },
                    {
                        min: 66,
                        color: "ff0000",
                        description: "High"
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

ESAWSNSTISpec.prototype = new DeviceSpecModule.DeviceSpec();
ESAWSNSTISpec.prototype.constructor = ESAWSNSTISpec;
ESAWSNSTISpec.prototype.parent = DeviceSpecModule.DeviceSpec.prototype;


// export the class
module.exports =
    {
        ESAWSNSTISpec
    };




