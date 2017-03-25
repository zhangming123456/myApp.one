(function (angular) {
    angular.module('http.Server', [])
        .service("httpServer", ["$http", "jsonToStr", function ($http, jsonToStr) {
            this.post = function (url, data, successCallback, errorCallback) {
                $http({
                    method: 'POST',
                    url: url,
                    data: jsonToStr.to(data),
                    headers: {'Content-Type': "application/x-www-form-urlencoded"}
                }).then(function (results) {
                        successCallback(results);
                    }, function (data) {
                        errorCallback(data);
                    }
                )
            }
        }])
})(angular);