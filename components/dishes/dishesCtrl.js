(function (angular) {
    angular.module('myApp.dishes', [])
        .controller('dishesCtrl', ['$scope', '$stateParams', '$location', '$http', '$filter', '$document', '$rootScope', 'httpServer', function ($scope, $stateParams, $location, $http, $filter, $document, $rootScope, httpServer) {
            $scope.typeName = '菜品映射';
            var dis_id = $scope.dis_id = $stateParams.dishesID;
            $scope.isSingleProduct = dis_id == 0 ? true : false;
            if ($scope.index > 1 || $scope.index < 0) {
                $location.path('/app').replace();
            }
            // 选择
            var select = $scope.select = {};
            select.values = [
                {
                    code: 'a', name: "单品", url: $rootScope.httpIp + '/Dish/SingleList',
                    getUrl: $rootScope.httpIp + "/Dish/GetPosDishList"
                },
                {
                    code: 'b',
                    name: "套餐",
                    url: $rootScope.httpIp + '/Dish/PackageList',
                    getUrl: $rootScope.httpIp + "/Dish/GetPosDishPackList"
                }
            ];

            select.selection = select.values[dis_id];

            $scope.$watch('select', function (newVal, oldVal) {
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

            //根据路径显示表格
            var table_thead = $scope.table_thead = {};
            table_thead.list = [
                {
                    name: '优e品',
                    dataList: {
                        "DishId": '编号',
                        'DishName': '菜品名称',
                        'DishSerial': '菜品单位'
                    },
                    colspanNum: 3
                },
                {
                    name: '吉野家',
                    dataList: {
                        'PosMenuId': '编号',
                        'PosMenuName': '菜品名称',
                        'PosEatInPrice': '堂食',
                        'PosTakeAwayPrice': '外带'
                    },
                    colspanNum: 4
                }
            ];
            if (dis_id == 1) {
                delete table_thead.list[0].dataList.DishSerial;
                table_thead.list[0].colspanNum = 2;
            }
            var clearData = function (obj) {
                for (var key in obj) {
                    if (obj[key].length <= 0) {
                        delete obj[key]
                    }
                }
            };
            //搜索栏
            var search = $scope.search = {};
            search.list = {};
            search.val = '请输入';
            search.model = {};
            $scope.$watch('search', function (a, b) {
                clearData(a.model);
            }, true);
            angular.extend(search.list, table_thead.list[0].dataList, table_thead.list[1].dataList);
            $scope.isSeachIndex = function (e, n) {
                return e <= n
            };
            //返回数据
            var result = $scope.result = {};
            var dataAjax = $scope.dataAjax = {
                "PageIndex": 1,
                "PageSize": 72,
            };
            result.resultData = {};
            result.resultAjax = {};
            httpServer.post(
                select.values[dis_id].url,
                dataAjax,
                function (results) {
                    result.resultAjax = results;
                    result.resultData = results.data;
                }
            );
            var getIdDate = function (key, id, data) {
                var i;
                for (i = 0; i < data.length; i++) {
                    if (id === data[i][key]) {
                        return data[i]
                    }
                }
            };
            //映射
            var modal = $scope.modal = {
                isOpenModal_show: false,
                isOpenModal: false,
                modalData: {},
                modalDataAjax: {},
                postGetPos: function () {
                    var _this = this;
                    httpServer.post(select.values[dis_id].getUrl, null, function (reault) {
                        var data = reault.data
                        // if(data.Error){
                        _this.modalDataAjax = data.Data;
                        // }
                    })
                },
                tilte: "选择菜品",
                body: '',
                dataTypesOf: [
                    {}
                ],
                open: function (e) {
                    if (e != undefined) {
                        this.isOpenModal_show = true;
                        this.isOpenModal = true;
                    }
                },
                stop: function () {
                    if (this.isOpenModal_show) {
                        this.isOpenModal_show = false;
                        this.isOpenModal = false;
                    }
                },
                stopEvent: function (e) {
                    e.stopPropagation()
                }
            };
            $scope.modelsearchs = {};
            $scope.$watch('modelsearchs', function (n) {
                clearData(n);
            }, true);
            var modalRadio = $scope.modalRadio = {};
            modalRadio.value = 2;
            modalRadio.values = [
                {
                    code: 'a', name: "单品", url: $rootScope.httpIp + '/Dish/SingleList',
                    getUrl: $rootScope.httpIp + "/Dish/GetPosDishList"
                },
                {
                    code: 'b',
                    name: "套餐",
                    url: $rootScope.httpIp + '/Dish/PackageList',
                    getUrl: $rootScope.httpIp + "/Dish/GetPosDishPackList"
                }
            ];
            modalRadio.selection = modalRadio.values[dis_id];
            var modalRadio2 = $scope.modalRadio2 = {};
            modalRadio2.value = 2;
            modalRadio2.values = [
                {
                    code: 'a', name: "单品", url: $rootScope.httpIp + '/Dish/SingleList',
                    getUrl: $rootScope.httpIp + "/Dish/GetPosDishList"
                },
                {
                    code: 'b',
                    name: "套餐",
                    url: $rootScope.httpIp + '/Dish/PackageList',
                    getUrl: $rootScope.httpIp + "/Dish/GetPosDishPackList"
                }
            ];
            modalRadio2.selection = modalRadio2.values[dis_id];

            $scope.OpenModal = function (i, id) {
                switch (i) {
                    case 1:
                        modal.modalData = getIdDate("DishUnitId", id, result.resultData.Data);
                        modal.open(1);
                        break;
                    case 2:
                        // modal.open(2);
                        break;
                    default:
                        modal.modalData = getIdDate("DishUnitId", id, result.resultData.Data);
                        modal.postGetPos();
                        modal.open(0);
                }
            };

        }])
})(angular);
