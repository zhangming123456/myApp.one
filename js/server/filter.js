(function (angular) {
    var app = angular.module('filterServer', []);
    app.filter('extend', function () {
        return function (arr, key, val) {
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][key], val) {
                    array.push(arr[i])
                }
            }
            return array;
        };
    })
})(angular);