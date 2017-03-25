(function (angular) {
    angular.module('jsonToStr.server', [])
        .service('jsonToStr', function () {
            this.to = function (data) {
                var str = '', key;
                for (key in data) {
                    str += key + "=" + data[key] + "&"
                }
                return str.replace(/\&$/, '');
            }
        })
})(angular);