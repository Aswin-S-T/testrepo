angular.module('F1FeederApp.controllers').
  
  controller('navigationController', function($scope, $routeParams, $location, $rootScope, $sessionStorage,ergastAPIservice) {
    $scope.id = $routeParams.id;
	$rootScope.check1=[]
	$scope.check2
	$scope.isDeviceTypePB	

	$scope.openNav = function() {
		document.getElementById("mySidenav").style.width = "250px";
		$scope.isDeviceTypePB = sessionStorage.getItem("deviceType") === "Postbox";
		ergastAPIservice.loginprivilegehide([$sessionStorage.userName],function(err){
			
			$rootScope.check1=err.data
			$scope.check2=err.data[1]
			
		})
		//$scope.check=check1

	}
	$scope.check1func=function(n){
		
		return $rootScope.check1[n]
		
	}

	
	$scope.closeNav = function () {
		document.getElementById("mySidenav").style.width = "0";
	}

	$scope.home = function () {
	    $location.path('/dashboard');
	}

	$scope.dashboard = function()
	{
		$location.path('/dashboard');
	}
	$scope.heatmap = function () {
	    $location.path('/heatmap');
	}
    $scope.logout = function()
	 {
		$location.path('/');
		//delete $sessionStorage.loggedIn;
		sessionStorage.removeItem("isLoggedIn");
		sessionStorage.removeItem("ngStorage-loggedIn");
	}

//	$scope.check1=function(){
//		ergastAPIservice.loginprivilegehide(null,function(err){
//		console.log("navigation val",err)

		

		
//	})
//	}
  });