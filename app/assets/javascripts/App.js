var App = angular.module('app', ['ngResource', 'ngCookies']).
    config(function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/',
            {
                controller:ApplicationCtrl,
                templateUrl:'partials/welcome.html'
            }).
            when('/login',
            {
                controller:ApplicationCtrl,
                templateUrl:'partials/login.html'
            }).
            when('/users',
            {
                controller:UserListCtrl,
                templateUrl:'partials/user/users.html'
            }).
            when('/users/:userId',
            {
                controller:UserDetailCtrl,
                templateUrl:'partials/user/user.html'}).
            when('/account/:type',
            {
                controller:AccountCtrl,
                templateUrl:'partials/account.html'}).
            otherwise({
                redirectTo:'/'
            });

        var token = $("meta[name='csrf-token']").attr("content");
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;

        $httpProvider.responseInterceptors.push(function ($q, $location) {
            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;
                if (status == 401) {
                    var deferred = $q.defer();
                    var req = {
                        config:response.config,
                        deferred:deferred
                    }
                    $location.path('/#/');
                    return deferred.promise;
                }
                // otherwise
                return $q.reject(response);
            }

            return function (promise) {
                return promise.then(success, error);
            }
        });
    });







