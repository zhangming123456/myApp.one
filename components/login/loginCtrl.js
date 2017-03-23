(function (angular) {
    angular.module('myApp.login', [])
        .controller('loginCtrl', ['$scope', '$stateParams', '$urlRouter', '$location', function ($scope, $stateParams, $urlRouter, $location) {
            var vm = $scope.vm = {
                show_error: true,
                show_type: 2,
                user: {}
            };
            vm.submit = function (basic_form) {
                vm.show_error = true;
                basic_form.$setDirty();
                if (basic_form.$valid) {
                    console.log(vm.user);
                    $location.path('/app').replace();
                }
            };
        }])
})(angular);
