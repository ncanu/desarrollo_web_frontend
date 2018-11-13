'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', ['$scope','$rootScope','$http','$location', function($scope, $rootScope, $http,$location) {
       if( localStorage.getItem("token") === null || localStorage.getItem("token")===undefined)
       {
           $location.path( '/login' );
       }

        $http.defaults.headers.common.Authorization = "Bearer "+ localStorage.getItem("token");

        $scope.userPublicatons = [];
        $scope.getTimeLine = function () {

            $http.get("http://localhost:8080/api/images/images").then
            (
                function(response)
                {
                    $scope.userPublicatons = response.data.data;

                },
                function(error){

                    $scope.errorsFounded = error.data.message;
                    alert($scope.errorsFounded);

                }
            );


        };

        $scope.getTimeLine();

    }]);