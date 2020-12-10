
angular.module('F1FeederApp.controllers').

    controller('diagnosticsController', function ($scope, $routeParams, $location, ergastAPIservice) {

        var isRefreshLiveDatacompleted = true;
        //var isRefreshStatDataTablecompleted = true;
        //var isRefreshStatChartDataCompleted = true;

        var devices = [];
        $scope.devices = devices;

        var initLiveDataLineChartVariables = function () {
            $scope.liveChartData = new ChartData();
            $scope.labels = [];
            $scope.data = [];
            $scope.series = ['Series A'];
            $scope.options = {
                responsive: true
            };
            $scope.colors = [{
                pointBackgroundColor: '#0062ff',
                pointHoverBackgroundColor: '#0062ff',
                borderColor: '#0062ff',
                pointBorderColor: '#0062ff',
                pointHoverBorderColor: '#0062ff',
                fill: true
            }];
        }

        var initStatDataLineChartVariables = function () {
            $scope.selectedStatChartItem = "[ALL]";
            $scope.statChartData = new ChartData();
            $scope.statLineChartlabels = [];
            $scope.statLineChartData = [];
            $scope.statLineChartSeries = null;
            $scope.statLineChartOptions = {
                responsive: true
            };
            $scope.selectedStatChartItem = "[ALL]";
            $scope.statChartingParams = [];
        }

        $scope.startDateForDownload = new Date().toISOString().substring(0, 10); //"2017-03-10";//new Date();
        $scope.endDateForDownload = null;//new Date().toISOString().substring(0, 10);;

        $scope.selectedChartItem = null;
        $scope.id = $routeParams.id;
        $scope.races = [];
        $scope.driver = null;
        $scope.liveDataTimeStart = null;
        $scope.liveDataTimeEnd = null;
        $scope.liveTablePageSize = 50;
        $scope.liveTableOffset = 0;
        $scope.liveTableTotalCount = 0;
        $scope.devices = [];

        $scope.statTableOffset = 0;
        $scope.statDataTimeStart = null;
        $scope.statDataTimeEnd = null;

        $scope.statTablePageSize = 50;

        $scope.statChartPageSize = 50;
        $scope.statChartDataOffset = 0;
        $scope.statTableTotalCount = 0;
        $scope.statChartTotalCount = 0;

        $('.collapse').on('shown.bs.collapse', function () {
            $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
        }).on('hidden.bs.collapse', function () {
            $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
        });

        $scope.isStatDownloadFileProcessingFinished = false;
        $scope.isLiveDataDownloadFileProcessingFinished = false;
        $scope.isLiveDataDownloadFileProcessingOngoing = false;
        $scope.isStatDataDownloadFileProcessingOngoing = false;
        $scope.isLiveDataPagerVisible = true;

        $scope.isLiveDataDownloadOngoing = function () {
            return $scope.isLiveDataDownloadFileProcessingOngoing;
        }
        $scope.isStatDataDownloadOngoing = function () {
            return $scope.isStatDataDownloadFileProcessingOngoing;
        }

        //$scope.selectedDeviceLiveData = null;
        $scope.selectedStatChartParamNameForDisplay = "";
        $scope.selectedStatTableSelectionParamList = [];
        $scope.selectStatParameterForTableview = function (param) {
            var i = 0;
            for (; i < $scope.selectedStatTableSelectionParamList.length; i++) {
                if ($scope.selectedStatTableSelectionParamList[i].paramName == param.paramName)
                    break;
            }
            if (i >= $scope.selectedStatTableSelectionParamList.length) {
                i = -1;
            }
            var idx = i;//$scope.selectedStatTableSelectionParamList.indexOf(param);

            // Is currently selected
            if (idx > -1) {
                $scope.selectedStatTableSelectionParamList.splice(idx, 1);
            }
            // Is newly selected
            else {
                $scope.selectedStatTableSelectionParamList.push(param);
            }

            $scope.statSelectedParams = getStatSelectedTableViewParams();
            reloadStatDataTableComplete();

        }

        var getStatSelectedTableViewParams = function () {
            var res = "";
            if ($scope.selectedStatTableSelectionParamList.length > 0) {
                res += $scope.selectedStatTableSelectionParamList[0].paramName;
            }
            for (var i = 1; i < $scope.selectedStatTableSelectionParamList.length; i++) {
                res += "," + $scope.selectedStatTableSelectionParamList[i].paramName;
            }
            return res;
        }
        $scope.statSelectedParamsForChart = null;

        $scope.selectStatChartParameter = function (param) {
            $scope.selectedStatChartParamNameForDisplay = param.displayName;

            $scope.statSelectedParamsForChart = param.paramName;

            reloadStatDataChartComplete();
        }

        var getParamNameFromDispName = function (dispName) {

            var paramName = null;
            var devInfo = $scope.selectedDeviceInfo.tag;

            if (devInfo != null && $scope.selectedDeviceSpec.paramDefinitions != null) {
                for (var j = 0; j < $scope.selectedDeviceSpec.paramDefinitions.length; j++) {
                    if (dispName == $scope.selectedDeviceSpec.paramDefinitions[j].displayName) {

                        paramName = $scope.selectedDeviceSpec.paramDefinitions[j].paramName;
                        break;;
                    }
                }
            }
            return paramName;
        }

        $scope.getDeviceSubTypeString = function (subType) {
            if (subType == "ESBHA001")
                return "ESBHA001";
            return subType;
        }

        initLiveDataLineChartVariables();
        initStatDataLineChartVariables();
        $scope.selectedDeviceLiveDataHeader = []
        $scope.selectedDeviceStatParamSelection = []
        $scope.statDataTableHeader = [];//["Parameter","Average","Min","Max","Total Samples"]
        $scope.statSelectedParams = null;

        var createStatDataSelectionOptions = function (data, deviceSpec) {

            var listHeader = [];
            for (var name in data) {

                var findParamItem = deviceSpec.paramDefinitions.find(function (obj) { return obj.paramName == name; });
                if (findParamItem != null && findParamItem.isDisplayEnabled) {

                    if (findParamItem.paramName == "receivedTime") {
                        continue;
                    }

                    listHeader.push({ displayName: findParamItem.displayName, paramName: findParamItem.paramName });
                }
            }
            return listHeader;
        }

        var createLiveDataTableHeader = function (data) {

            listHeader = [];
            var devInfo = $scope.selectedDeviceInfo.tag;

            if (devInfo != null && $scope.selectedDeviceSpec.paramDefinitions != null) {
                for (var j = 0; j < $scope.selectedDeviceSpec.paramDefinitions.length; j++) {
                    if (data[$scope.selectedDeviceSpec.paramDefinitions[j].paramName] != null && $scope.selectedDeviceSpec.paramDefinitions[j].isDisplayEnabled) {
                        listHeader.push($scope.selectedDeviceSpec.paramDefinitions[j].displayName + " (" + $scope.selectedDeviceSpec.paramDefinitions[j].unit + ")");
                    }
                }
            }
            return listHeader;
        }

        var createLiveDataParamList = function (data) {

            listHeader = [];
            var devInfo = $scope.selectedDeviceInfo.tag;

            if (devInfo != null && $scope.selectedDeviceSpec.paramDefinitions != null) {
                for (var j = 0; j < $scope.selectedDeviceSpec.paramDefinitions.length; j++) {
                    if (data[$scope.selectedDeviceSpec.paramDefinitions[j].paramName] != null && $scope.selectedDeviceSpec.paramDefinitions[j].isDisplayEnabled) {
                        listHeader.push($scope.selectedDeviceSpec.paramDefinitions[j].displayName);
                    }
                }
            }
            return listHeader;
        }

        $scope.selectedDeviceLiveDataTableContent = [];
        $scope.selectedDeviceReadDataTableContent = [];
        $scope.selectedDeviceStatTableContent = [];
        $scope.selectedDeviceSignalStrength = [];
        $scope.selectedDeviceVersion = [];
        $scope.lastItem = null;

        $scope.tab = 2;
        $scope.statTab = 1;

        $scope.setTab = function (newTab) {
            $scope.tab = newTab;
            $scope.isLiveDataPagerVisible = newTab != 3;

        };
        $scope.setStatTab = function (newTab) {
            $scope.statTab = newTab;
        };
        $scope.isStatDataTabSelected = function (tabNum) {
            return $scope.statTab === tabNum;
        };


        $scope.isSet = function (tabNum) {
            return $scope.tab === tabNum;
        };

        //   $scope.isLiveDataLoadingOngoing = function () {
        //       return !isRefreshLiveDatacompleted;
        //   }

        var addSingleStatDataParamsToChart = function (dataObject) {

            for (var name in dataObject.statParams) {

                paramVal = dataObject.statParams[name].toFixed(2);

                // $scope.statChartData.addParamValueEx(name, dataObject.statParams[name], dataObject.key);
                $scope.statChartData.addParamValueEx(name, paramVal, dataObject.key);
            }
        }

        $scope.statTimeFrameForDisplay = "Daily";
        $scope.statTimeFrame = "daily";
        $scope.selectStatTimeFrame = function (statTimeFrame) {
            if (statTimeFrame == "daily")
                $scope.statTimeFrameForDisplay = "Daily";
            else if (statTimeFrame == "monthly")
                $scope.statTimeFrameForDisplay = "Monthly";
            else if (statTimeFrame == "yearly")
                $scope.statTimeFrameForDisplay = "Yearly";

            $scope.statTimeFrame = statTimeFrame;

            reloadStatDataTableComplete();
            //refreshStatChartData();
        }


        var addRowToLiveDataTableAndChart = function (dataObject) {

            if (dataObject.sig_strength != null) {
                var signalStrength = (dataObject.sig_strength);
                $scope.selectedDeviceSignalStrength.push(signalStrength);
                var len = $scope.selectedDeviceSignalStrength.length;
                $scope.lastItem = $scope.selectedDeviceSignalStrength[len-1];
               
            }
            if (dataObject.build_ver != null) {
                $scope.selectedDeviceVersion = (dataObject.build_ver);
               
            }
            if (dataObject.er_init_sensor != null) {

                var temp = createBinaryString(dataObject.er_init_sensor);

                function createBinaryString(nMask) {

                    for (var nFlag = 0, nShifted = nMask, sMask = ''; nFlag < 32;
                        nFlag++ , sMask += String(nShifted >>> 31), nShifted <<= 1);
                    return sMask;
                }

               
                var bitArray = [];
                for (var i = 0; i < 32; i++) {
                    let lsb = parseInt(temp) & 1;
                    bitArray[i] = lsb;
                    temp = parseInt(temp / 10);

                }
                

                var listRow = [];
                var devInfo = $scope.selectedDeviceInfo.tag;
                var init_er = bitArray;
                for (var i = 0; i < 14; i++) {
                    var paramVal = init_er[i];
                    
                    $scope.liveChartData.addParamValue(null, paramVal, dataObject.receivedTime);
                    listRow.push(paramVal);
                    
                }
                for (var j = 0; j < 16; j++) {
                    var paramDefItem = devInfo.paramDefinitions[j];
                   

                    

                    if (paramDefItem.paramName == "time") {
                       
                        listRow.push(dataObject.time);
                        continue;
                    }
                }
            }
            $scope.selectedDeviceLiveDataTableContent.push(listRow);

        }

        var addRowToLiveDataTableAndChart1 = function (dataObject1) {
            
            if (dataObject1.er_read_sensor != null) {

                var temp1 = createBinaryString(dataObject1.er_read_sensor);

                function createBinaryString(nMask1) {

                    for (var nFlag1 = 0, nShifted1 = nMask1, sMask1 = ''; nFlag1 < 32;
                        nFlag1++ , sMask1 += String(nShifted1 >>> 31), nShifted1 <<= 1);
                    return sMask1;
                }

                
                var bitArray1 = [];
                for (var i = 0; i < 32; i++) {
                    let lsb1 = parseInt(temp1) & 1;
                    bitArray1[i] = lsb1;
                    temp1 = parseInt(temp1 / 10);

                }
                

                var listRow1 = [];
                var devInfo = $scope.selectedDeviceInfo.tag;
                
                var init_er = bitArray1;
                for (var k = 0; k < 14; k++) {
                    var paramVal1 = init_er[k];
                   
                    $scope.liveChartData.addParamValue(null, paramVal1, dataObject1.receivedTime);
                    listRow1.push(paramVal1);
                    
                }
                for (var m = 0; m < 16; m++) {
                    var paramDefItem1 = devInfo.paramDefinitions[m];
                    
                    if (paramDefItem1.paramName == "time") {
                        listRow1.push(dataObject1.time);
                        continue;
                    }
                    /*
                    if (paramDefItem1.paramName == "receivedTime"){
                        var utcSeconds = dataObject1[paramDefItem1.paramName];
                        var d = new Date(utcSeconds); 
                        listRow1.push( d.getFullYear()+"/"+(d.getMonth()+1)+"/"+ d.getDate() + " " + d.getHours()+":" + d.getMinutes() + ":" + d.getSeconds());
                        //console.log("EXECUTED", listRow1);
                        continue;
                    } */
                }
            }
            $scope.selectedDeviceReadDataTableContent.push(listRow1);
        }

        $scope.ceil = function (v) {
            return Math.ceil(v);
        }
        $scope.showPrevPageDataToLiveDataTable = function () {
            if (($scope.liveTableOffset - $scope.liveTablePageSize) >= 0)
                $scope.liveTableOffset -= $scope.liveTablePageSize;
            else
                $scope.liveTableOffset = 0;

            refreshLiveData();
        }

        $scope.showNextPageDataToLiveDataTable = function () {
            if (($scope.liveTableOffset + $scope.liveTablePageSize) < $scope.liveTableTotalCount)
                $scope.liveTableOffset += $scope.liveTablePageSize;
            refreshLiveData();
        }

        $scope.showPrevPageDataToStatDataChart = function () {
            if (($scope.statChartDataOffset - $scope.statChartPageSize) >= 0)
                $scope.statChartDataOffset -= $scope.statChartPageSize;
            else
                $scope.statChartDataOffset = 0;

            refreshStatChartData();
        }
        $scope.showNextPageDataToStatDataChart = function () {
            if (($scope.statChartDataOffset + $scope.statChartPageSize) < $scope.statChartTotalCount)
                $scope.statChartDataOffset += $scope.statChartPageSize;
            refreshStatChartData();
        }

        $scope.showPrevPageDataToStatDataTable = function () {
            if (($scope.statTableOffset - $scope.statTablePageSize) >= 0)
                $scope.statTableOffset -= $scope.statTablePageSize;
            else
                $scope.statTableOffset = 0;

            refreshStatDataTablePage();
        }
        $scope.showNextPageDataToStatDataTable = function () {
            if (($scope.statTableOffset + $scope.statTablePageSize) < $scope.statTableTotalCount)
                $scope.statTableOffset += $scope.statTablePageSize;
            refreshStatDataTablePage();
        }

        $scope.tableSelectItemDevice = function (row, deviceInfo) {
            $scope.selectedRow = row;
            $scope.selectedDeviceInfo = deviceInfo;
            $scope.selectedDeviceLiveDataTableContent = [];
            $scope.selectedDeviceReadDataTableContent = [];
            $scope.selectedDeviceLiveDataHeader = null;

            $scope.selectedDeviceStatTableContent = [];
            $scope.statDataTableHeader = null;
            $scope.selectedDeviceSpec = null;

            //showDeviceInMap(deviceInfo.tag);

            ergastAPIservice.getDeviceSpec($scope.selectedDeviceInfo.subType, function (err, spec) {

                if (!err) {
                    $scope.selectedDeviceSpec = spec;
                    reloadLiveDataAll();

                }

            });
        }
        var reloadLiveDataAll = function () {

            $scope.liveTableOffset = 0;
            getLiveDataCount($scope.selectedDeviceInfo, function (err, count) {

                if (!err) {

                    $scope.liveTableTotalCount = count;
                    refreshLiveData();
                }
            });
        }

        var getLiveDataCount = function (deviceInfo, callBack) {
            ergastAPIservice.getLiveDataCount([deviceInfo.logicalDeviceId], $scope.liveTablePageSize, $scope.liveTableOffset, null, $scope.liveDataTimeEnd, function (liveDataList) {
                var isSuccess = false;
                if (liveDataList.liveDataCountPerDeviceId != null) {
                    var i = 0;
                    for (; i < liveDataList.liveDataCountPerDeviceId.length; i++) {

                        if (liveDataList.liveDataCountPerDeviceId[i].deviceId == $scope.selectedDeviceInfo.logicalDeviceId) {
                            callBack(null, liveDataList.liveDataCountPerDeviceId[i].count);

                            break;
                        }
                    }
                    isSuccess = (i < liveDataList.liveDataCountPerDeviceId.length)
                }
                if (!isSuccess)
                    callBack(null, null);
            });
        }

        $scope.isStatItemSelectedForTableView = function (statItem) {
            var res = $scope.selectedStatTableSelectionParamList.find(function (obj) {
                return obj.paramName == statItem.paramName;
            });

            return res != null;
        }

        var refreshLiveData = function () {
            var deviceInfo = $scope.selectedDeviceInfo;
            $scope.selectedDeviceLiveDataTableContent = [];
            $scope.selectedDeviceReadDataTableContent = [];
            $scope.liveChartData.clear();
            //$scope.selectedChartItem = null;
            $scope.labels = [];
            $scope.data = [];
            $scope.series = [];

            isRefreshLiveDatacompleted = false;
            ergastAPIservice.getLiveData([deviceInfo.logicalDeviceId], $scope.liveTablePageSize, $scope.liveTableOffset, $scope.liveDataTimeStart, $scope.liveDataTimeEnd, function (liveDataList) {

                if (liveDataList.liveDataPerDeviceId != null) {
                   
                    for (var i = 0; i < liveDataList.liveDataPerDeviceId.length; i++) {

                        if (liveDataList.liveDataPerDeviceId[i].deviceId == $scope.selectedDeviceInfo.logicalDeviceId) {
                            var tempList = liveDataList.liveDataPerDeviceId[i].dataList;

                            if (tempList != null && tempList.length > 0) {
                                for (var j = 0; j < tempList.length; j++) {
                                   
                                    addRowToLiveDataTableAndChart(tempList[j].data);
                                    addRowToLiveDataTableAndChart1(tempList[j].data);

                                    if ($scope.selectedDeviceLiveDataHeader == null) {
                                        
                                        $scope.selectedDeviceLiveDataHeader = createLiveDataTableHeader(tempList[j].data);

                                        let receivedTime = tempList[j].data.receivedTime;

                                        delete tempList[j].data.receivedTime;

                                       
                                        $scope.selectedLiveDataParameterList = createLiveDataParamList(tempList[j].data);

                                        tempList[j].data.receivedTime = receivedTime;

                                        
                                        $scope.selectedDeviceStatParamSelection = createStatDataSelectionOptions(tempList[j].data, $scope.selectedDeviceSpec);
                                        
                                        $scope.selectedStatTableSelectionParamList = createStatDataSelectionOptions(tempList[j].data, $scope.selectedDeviceSpec);
                                        
                                    }
                                }

                                if ($scope.selectedDeviceLiveDataHeader.length > 0 && $scope.selectedChartItem == null) {
                                    if ($scope.selectedChartItem == null)
                                        $scope.selectedChartItem = $scope.selectedLiveDataParameterList[0];
                                }
                                $scope.showLiveDataChartForParam($scope.selectedChartItem);
                                isRefreshLiveDatacompleted = true;
                                break;
                            }
                        }


                    }
                }
            });
        }

        var processStatData = function (statObject) {
            
            if (statObject.statParams.sum != null && statObject.statParams.count != null) {
                
                statObject.statParams.average = statObject.statParams.sum / statObject.statParams.count;
                
                delete statObject.statParams.sum;
            }
        }

        var refreshStatDataTablePage = function () {
            var deviceInfo = $scope.selectedDeviceInfo;
            $scope.selectedDeviceStatTableContent = [];
            isRefreshStatDataTablecompleted = false;
            // isRefreshLiveDatacompleted = false;
            //deviceIdList, limit, offset, timeStart, timeEnd, timeFrame, paramsList, callBack
            ergastAPIservice.getStatDataForDevice([deviceInfo.deviceId], $scope.statTablePageSize,
                $scope.statTableOffset, $scope.statDataTimeStart, $scope.statDataTimeEnd, $scope.statTimeFrame, $scope.statSelectedParams, function (statDataList) {

                    if (statDataList.statPerDeviceId != null) {
                        for (var i = 0; i < statDataList.statPerDeviceId.length; i++) {
                            var tempList = statDataList.statPerDeviceId[i];
                            if (tempList.deviceId == $scope.selectedDeviceInfo.deviceId) {
                                var selectedStatList = null;
                                if ($scope.statTimeFrame == "daily")
                                    selectedStatList = tempList.stat.dailyStat;
                                else if ($scope.statTimeFrame == "monthly")
                                    selectedStatList = tempList.stat.monthlyStat;
                                else if ($scope.statTimeFrame == "yearly")
                                    selectedStatList = tempList.stat.yearlyStat;

                                if (selectedStatList != null && selectedStatList.length > 0) {
                                    for (var j = 0; j < selectedStatList.length; j++) {
                                        processStatData(selectedStatList[j]);
                                        addRowToStatDataTable(selectedStatList[j]);

                                        if ($scope.statDataTableHeader == null) {
                                            $scope.statDataTableHeader = createStatDataTableHeader(selectedStatList[j]);

                                            $scope.statChartingParams = createStatChartingItems(selectedStatList[j])
                                        }
                                        //addSingleStatDataParamsToChart(selectedStatList[j]);
                                    }


                                    isRefreshStatDataTablecompleted = true;
                                    //$scope.showStatDataChartForParam($scope.selectedStatChartItem);
                                    //isRefreshLiveDatacompleted = true;
                                    break;
                                }
                            }
                        }
                    }
                });
        }


        $scope.getDeviceTableLoadedPercent = function () {
            if ($scope.devices == null || $scope.deviceCount == null)
                return 0;

            var progress = ($scope.devices.length / $scope.deviceCount) * 100;
            //alert(progress);

            return progress;
        }

        var loadStatusIndicator = function (deviceInfo) {
            ergastAPIservice.getLiveData([deviceInfo.logicalDeviceId], 1, 0, null, null, function (liveDataList) {

                if (liveDataList.liveDataPerDeviceId != null) {
                    for (var i = 0; i < liveDataList.liveDataPerDeviceId.length; i++) {

                        if (liveDataList.liveDataPerDeviceId[i].deviceId == deviceInfo.logicalDeviceId) {
                            var tempList = liveDataList.liveDataPerDeviceId[i].dataList;
                            deviceInfo.liveStatus = 0;
                            if (tempList != null && tempList.length > 0) {
                                var currentTime = new Date().valueOf();
                                // if any data retrieved within given period show a good status indicator
                                //Math.abs(tempList[0].data.receivedTime - currentTime) < 1000 * 60 * 10) old code
                                if (Math.abs(tempList[0].data.receivedTime - currentTime) < 1000 * 60 * 20) {
                                    deviceInfo.liveStatus = 1; //good
                                }
                                else {
                                    deviceInfo.liveStatus = -1; // bad
                                }

                                break;
                            }
                        }


                    }
                }
            });

        }

        var initPage = function () {
            // load all devices
            ergastAPIservice.getDeviceCount("", function (count) {
                $scope.isDeviceLoadingOngoing = true;
                $scope.deviceCount = count;
                var isFirstDeviceselected = false;
                // for (var i = 0; i < count; i++)
                var i = 0;
                var fetchDevice = function () {

                    ergastAPIservice.getDeviceAt(null, i, function (deviceInfo) {
                        if (deviceInfo != null) {

                            var uiInfo = {
                                deviceId: deviceInfo.deviceId,
                                logicalDeviceId: deviceInfo.logicalDeviceId,
                                devFamily: deviceInfo.devFamily,
                                subType: deviceInfo.subType,
                                tag: deviceInfo,
                                city: deviceInfo.location != null ? deviceInfo.location.city : "",
                                customerName: deviceInfo.customerName,
                                liveStatus: 0
                            }
                            $scope.devices.push(uiInfo);

                            loadStatusIndicator(uiInfo);
                            if (!isFirstDeviceselected) {
                                //$scope.selectedDeviceInfo = $scope.devices[0];
                                $scope.tableSelectItemDevice(0, $scope.devices[0]);

                                isFirstDeviceselected = true;
                            }
                            //addMarkerToMap(deviceInfo);
                        }


                        i++;
                        if (i < count) {
                            fetchDevice();

                        }
                        else {
                            $scope.isDeviceLoadingOngoing = false;
                        }
                    });

                }
                if (i < count)
                    fetchDevice();

            });
        }


        $scope.refreshLiveDataAsSelectedTime = function (days) {

            // refresh data from today to selected previous days.
            var today = new Date();
            var yesterday = new Date();
            yesterday.setDate(today.getDate() - days);

            $scope.liveDataTimeStart = yesterday.valueOf();
            $scope.liveDataTimeEnd = today.valueOf()


            reloadLiveDataAll();
        }


        initPage();


        $('.list-group.checked-list-box .list-group-item').each(function () {

            // Settings
            var $widget = $(this),
                $checkbox = $('<input type="checkbox" class="hidden" />'),
                color = ($widget.data('color') ? $widget.data('color') : "primary"),
                style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
                settings = {
                    on: {
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
                    }
                };

            $widget.css('cursor', 'pointer')
            $widget.append($checkbox);

            // Event Handlers
            $widget.on('click', function () {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
                updateDisplay();
            });
            $checkbox.on('change', function () {
                updateDisplay();
            });


            // Actions
            function updateDisplay() {
                var isChecked = $checkbox.is(':checked');

                // Set the button's state
                $widget.data('state', (isChecked) ? "on" : "off");

                // Set the button's icon
                $widget.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$widget.data('state')].icon);

                // Update the button's color
                if (isChecked) {
                    $widget.addClass(style + color + ' active');
                } else {
                    $widget.removeClass(style + color + ' active');
                }
            }

            // Initialization
            function init() {

                if ($widget.data('checked') == true) {
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                }

                updateDisplay();

                // Inject the icon if applicable
                if ($widget.find('.state-icon').length == 0) {
                    $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
                }
            }
            init();
        });


        $('#get-checked-data').on('click', function (event) {
            event.preventDefault();
            var checkedItems = {}, counter = 0;
            $("#check-list-box li.active").each(function (idx, li) {
                checkedItems[counter] = $(li).text();
                counter++;
            });
            $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
        });

    });






