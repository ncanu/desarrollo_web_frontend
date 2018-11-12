'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope','$rootScope','$http','$location', function($scope, $rootScope, $http,$location) {

        $scope.user = {};


        $scope.login = function () {

            $http.post("http://localhost:8080/api/user/login", $scope.user).then
            (
                function(response)
                {

                    var token = response.data.data.token;
                    localStorage.setItem("token", token);
                    $http.defaults.headers.common.Authorization = "Bearer "+ localStorage.getItem("token");

                    $location.path( '/dashboard' );



                },
                function(error){
                    // console.log($scope.trialCompany);
                    $rootScope.allow = false;
                    $scope.errorsFounded = error.data.message;
                    alert($scope.errorsFounded);

                }
            );


        };


    }]);