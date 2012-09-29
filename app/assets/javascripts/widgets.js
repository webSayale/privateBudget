App.directive('ngEnter', function () {
    return function (scope, elm, attrs) {
        elm.bind('keypress', function (e) {
            if (e.charCode === 13) scope.$apply(attrs.ngEnter);
        });
    };
});

App.directive('inlineEdit', function ($timeout) {
    return {
        scope:{
            model:'=inlineEdit',
            required:'&required',
            error:'@error',
            handleSave:'&onSave',
            handleCancel:'&onCancel'
        },
        link:function (scope, elm, attr) {
            var previousValue;

            scope.edit = function () {
                scope.editMode = true;
                previousValue = scope.model;

                $timeout(function () {
                    elm.find('input')[0].focus();
                }, 0, false);
            };
            scope.save = function () {
                if (scope.model == undefined) {
                    scope.error = true;
                    console.log(scope.error);
                }
                else if (scope.model == null) {
                    alert(scope.model);
                }
                else {
                    if (scope.model.length > 0) {
                        scope.editMode = false;
                        scope.handleSave({value:scope.model});
                    }
                }
            };
            scope.cancel = function () {
                scope.editMode = false;
                scope.model = previousValue;
                scope.handleCancel({value:scope.model});
            };
        },
        templateUrl:'inline-edit.html'
    };
});

App.directive('onEsc', function () {
    return function (scope, elm, attr) {
        elm.bind('keydown', function (e) {
            if (e.keyCode === 27) {
                scope.$apply(attr.onEsc);
            }
        });
    };
});

App.directive('onEnter', function () {
    return function (scope, elm, attr) {
        elm.bind('keypress', function (e) {
            if (e.keyCode === 13) {
                scope.$apply(attr.onEnter);
            }
        });
    };
});