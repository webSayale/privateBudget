function UserListCtrl($scope, $resource, routeService) {
    routeService.updateNavigation();
    var User = $resource('/users/:userId', {userId:'@id'});
    $scope.users = User.query();

}

UserListCtrl.$inject = ['$scope', '$resource', 'routeService'];

function UserDetailCtrl($scope, $routeParams, $resource, $location) {
    /**
     * Declaration of the User Resource Object
     */
    var User = $resource('/users/:userId', {userId:'@id'},
        {
            'update':{
                method:'PUT'
            }
        }
    );

    $scope.isEdit = false;

    if ($routeParams.userId == "new") {
        $scope.user = new User();
        $scope.isEdit = false;
    } else {
        $scope.user = User.get({userId:$routeParams.userId}, function (user) {
            if (user._id == undefined || user._id == null) {
                $location.path('/users');
            }
            else {
                $scope.user = user;
                $scope.isEdit = true;
            }
        });
    }

    $scope.saveOrUpdate = function () {
        if (!$scope.userForm.$invalid) {
            if ($scope.user._id == undefined || $scope.user._id == null) {
                User.save($scope.user, function () {
                    $location.path('/users');
                });
            }
            else {
                User.update({'id':$scope.user._id, 'user':$scope.user}, function () {
                    $location.path('/users');
                });
            }
        }
    };

    $scope.delete = function () {
        if (confirm("Löschen?")) {
            User.delete({ userId:$scope.user._id }, function () {
                $location.path('/users');
            });
        }
    }
}


UserDetailCtrl.$inject = ['$scope', '$routeParams', '$resource', '$location'];