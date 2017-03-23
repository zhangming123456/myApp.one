(function (angular) {
    angular.module('myApp.pay', [])
        .controller('payCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
            $scope.text = "pay";
        }]);
})(angular);
