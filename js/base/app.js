(function (angular) {
    var myapp = angular.module('app', [
        'ui.router',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'filterServer',
        "jsonToStr.server",
        "http.Server",
        'myApp.routing',
        'myApp.dishes',
        'myApp.pay',
        'myApp.login',
    ]);
    myapp.controller('appCtrl', ['$scope', function ($scope) {
        $scope.isLogo = true;
    }]);
    myapp.run(['$rootScope', '$state', '$stateParams', '$location', '$http', function ($rootScope, $state, $stateParams, $location, $http) {
            $rootScope.httpIp = "http://192.168.4.201:8022";
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$locationChangeSuccess', function (a, b, c, d, e) {
                // $http({
                //     method: 'GET',
                //     url: '/login11'
                // }).then(function successCallback(response) {
                //     alert('成功');
                // }, function errorCallback(response) {
                //     // $location.path('/home').replace();
                // });
            });
        }
        ]
    );
})(angular);
