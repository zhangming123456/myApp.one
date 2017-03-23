(function (angular) {
    angular.module('myApp.dishes', [])
        .controller('dishesCtrl', ['$scope', '$stateParams', '$location', '$http', function ($scope, $stateParams, $location, $http) {
            $scope.searchVal = '请输入';
            $scope.search = [];
            $scope.searchSever = function (val) {
                console.log(val);
            };

            var vm = $scope.vm = {};
            $scope.table = ['编号', '菜品名称', '菜品单位'];
            var data = $scope.data = [
                {id: 11, Name: "牛肉饭", unit: '大碗'},
                {id: 12, Name: "牛肉饭", unit: '小碗'},
                {id: 13, Name: "饭", unit: '小碗'},
            ];
            $scope.typeName = '菜品映射';
            $scope.index = $stateParams.dishesID;
            if ($scope.index > 1 || $scope.index < 0) {
                $location.path('/app').replace();
            }
            vm.values = [
                {code: 'a', name: "单品", url: ''},
                {code: 'b', name: "套餐", url: ''}
            ];
            vm.selection = vm.values[$scope.index];

            $scope.$watch('vm', function (newVal, oldVal) {
                var newCode = newVal.selection.code,
                    oldCode = oldVal.selection.code;
                if (newCode != oldCode) {
                    switch (newCode) {
                        case "a":
                            $location.path('/app/dishes/0').replace();
                            break;
                        case "b":
                            $location.path('/app/dishes/1').replace();
                            break;
                        default:
                            $location.path('/app').replace();
                    }
                }
            }, true);
            $http
                .get(vm.values[$scope.index].url)
                .then(
                    function (data) {

                    },
                    function (data) {

                    }
                )
        }])
})(angular);
