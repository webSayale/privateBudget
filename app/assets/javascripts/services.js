App.factory('authService', function ($cookies, $rootScope) {
    var service = {};

    service.authenticate = function (response) {
        if (response != null) {
            if (response.$oid != undefined) {
                if (response.$oid.length == 24) {
                    $cookies['auth_key'] = response.$oid;
                }
            }
            else {
                $cookies['auth_key'] = "";
            }
        }
        var authenticationKey = $cookies.auth_key;
        var authenticated = false;
        if (authenticationKey != null && authenticationKey.length > 0) {
            authenticated = true;
        }
        else {
            authenticated = false;
        }
        $rootScope.$broadcast('authenticated', authenticated);
        return authenticated;
    }

    return service;
});

App.factory('routeService', function ($location, $routeParams) {
    var service = {};

    service.updateNavigation = function () {
        if ($location.url().indexOf("account") != -1) {
            $('.nav').find("li").find('a').removeClass("active");
            $("#nav-account").find('a').addClass("active");
        }
        else if ($location.url() == "/login") {
            $('.nav').find("li").find('a').removeClass("active");
            $("#nav-login").find('a').addClass("active");
        }
        else {
            $('.nav').find("li").find('a').removeClass("active");
            $("#nav-home").find('a').addClass("active");
        }

    }

    service.updateParam = function (paramName, paramValue) {
        $location.search(paramName, paramValue);
    }

    return service;
});