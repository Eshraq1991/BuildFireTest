
window.loginApp = angular.module('loginApp', []).config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            request: function (config) {
                if (window.localStorage.getItem("token")) {
                    var token = window.localStorage.getItem("token");
                    config.headers['x-access-token'] = token;
                }
                return config;
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (result) {
                return result;
            },
            responseError: function (response) {
                return $q.reject(response);
            }
        }
    });
})


