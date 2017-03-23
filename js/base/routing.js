(function (angular) {
    angular.module('myApp.routing', [])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            function setTemplateUrl(url) {
                var t = Date.now();
                url = url + '?t=' + t;
                return url;
            };
            $stateProvider
                .state('home', {
                    url: '/home',
                    controller: 'loginCtrl',
                    templateUrl: './components/login/login.html'
                })
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: './views/main.html',
                })
                .state('app.dishes', {
                    url: '/dishes/:dishesID',
                    templateUrl: './components/dishes/dishes.html',
                    controller: 'dishesCtrl'
                })
                .state('app.pay', {
                    url: '/pay',
                    templateUrl: './components/pay/pay.html',
                    controller: 'payCtrl'
                });
            $urlRouterProvider
                .when('/app/dishes', '/app/dishes/0')
                .when('/app', '/app/dishes')
                .otherwise('home');
        }]);
})(angular);
