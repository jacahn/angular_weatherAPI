//MODULE
var weatherApp=angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){
  $routeProvider

  .when('/',{
    templateUrl: 'pages/home.htm',
    controller: 'homeController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastController'
  })

  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.htm',
    controller: 'forecastController'
  })
})

//SERVICES for sharing data tween home/forecastng-model
weatherApp.service('cityService', function(){
  this.city = "Washington, DC";
})

//CONTROLLERS
weatherApp.controller('homeController',  ['$scope','cityService', function($scope, cityService){
  $scope.city = cityService.city;

  $scope.$watch('city', function(){
    cityService.city=$scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService){

  $scope.city = cityService.city;

  $scope.days =$routeParams.days || '2';
  //SET RESOURCE
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=ad60e900afa29b5d61392c0458e5da83", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

  //GET RESULT
  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

  $scope.convertToFahrenheit = function(degK){

    return Math.round((1.8 * (degK-273)) + 32);
  }
  $scope.convertToDate = function(dt){
    return new Date(dt*1000);
  }
  // console.log($scope.weatherResult);
}]);
