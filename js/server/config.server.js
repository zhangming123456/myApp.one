(function (angular) {
    angular.module('')
    myApp.factory("configService", [function () {
        var service = {
            baseHost: "http://192.168.2.193:8004",
            imei: ""
        };

        service.imei = 14708313714;

        return service;
    }]);

// myApp.factory("configService", [function () {
//     var service = {
//         baseHost: "",
//         imei: ""
//     };

//     service.imei = "";

//     return service;
// }]);
})(angular);