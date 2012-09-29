function ApplicationCtrl($http, $location, $scope, authService, routeService) {

    $scope.error = false;
    $scope.loggedIn = authService.authenticate(null);
    routeService.updateNavigation();



    $scope.$on('authenticated', function(event, authenticated) {
        $scope.loggedIn = authenticated;
        $scope.error = !authenticated;
    });

    $scope.login =  function () {
        if (!$scope.loginForm.$invalid) {
            $http.post('/login',
                {
                    'email':$scope.loginForm.email.$modelValue,
                    'password':$scope.loginForm.password.$modelValue
                }).success(function (response) {
                    if(authService.authenticate(response))
                    {
                        $location.path('/#/');
                    }
                });
        }
    };

    $scope.logout = function () {
        $http.get('/logout').success(function (response) {
            authService.authenticate(response);
            $location.path('/');
        });
    }
}

ApplicationCtrl.$inject = ['$http', '$location', '$scope', 'authService', 'routeService'];