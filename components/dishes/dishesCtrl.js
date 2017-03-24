(function (angular) {
    angular.module('myApp.dishes', [])
        .controller('dishesCtrl', ['$scope', '$stateParams', '$location', '$http', '$filter', '$document', function ($scope, $stateParams, $location, $http, $filter, $document) {
            $scope.typeName = '菜品映射';
            var dis_id = $scope.dis_id = $stateParams.dishesID;
            $scope.isSingleProduct = dis_id == 0 ? true : false;
            if ($scope.index > 1 || $scope.index < 0) {
                $location.path('/app').replace();
            }
            // 选择
            var select = $scope.select = {};
            select.values = [
                {code: 'a', name: "单品", url: ''},
                {code: 'b', name: "套餐", url: ''}
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
            //搜索栏
            var search = $scope.search = {};
            search.list = {};
            search.val = '请输入';
            search.model = {};
            $scope.$watch('search', function (a, b) {
                for (var key in a.model) {
                    if (a.model[key].length <= 0) {
                        delete a.model[key]
                    }
                }
            }, true);
            angular.extend(search.list, table_thead.list[0].dataList, table_thead.list[1].dataList);
            $scope.isSeachIndex = function (e) {
                return e <= 4
            };
            //返回数据
            var resultAjax = {
                "Status": 1,
                "Error": null,
                "Data": [
                    {
                        "DishMenuId": 2,
                        "DishId": 152,
                        "DishName": "菜品2",
                        "DishSerial": "2",
                        "UnitId": 152,
                        "UnitName": "单位2",
                        "PosMenuId": 22,
                        "PosMenuName": "菜品22",
                        "PosMenuNumber": 22,
                        "YedIsPackage": 0,
                        "DishPrice": "22.00",
                        "PosEatInPrice": "22.00",
                        "PosTakeAwayPrice": "23.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 152,
                        "DishName": "寺",
                        "DishSerial": "15624",
                        "UnitId": 9,
                        "UnitName": "碟",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 149,
                        "DishName": "fdsfsdf",
                        "DishSerial": "65985",
                        "UnitId": 152,
                        "UnitName": "个",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 145,
                        "DishName": "打包盒（大的）都有",
                        "DishSerial": "99122",
                        "UnitId": 152,
                        "UnitName": "个",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 144,
                        "DishName": "打包盒（小盒子）只有外卖",
                        "DishSerial": "21123",
                        "UnitId": 152,
                        "UnitName": "个",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 143,
                        "DishName": "口味",
                        "DishSerial": "00992",
                        "UnitId": 151,
                        "UnitName": "麻辣",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 143,
                        "DishName": "口味",
                        "DishSerial": "00992",
                        "UnitId": 150,
                        "UnitName": "香辣",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 142,
                        "DishName": "74456",
                        "DishSerial": "jdddd",
                        "UnitId": 143,
                        "UnitName": "36",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 140,
                        "DishName": "safds",
                        "DishSerial": "jd111",
                        "UnitId": 143,
                        "UnitName": "36",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    },
                    {
                        "DishMenuId": 0,
                        "DishId": 136,
                        "DishName": "关联菜品2",
                        "DishSerial": "20124",
                        "UnitId": 65,
                        "UnitName": "224",
                        "PosMenuId": 0,
                        "PosMenuName": null,
                        "PosMenuNumber": 0,
                        "YedIsPackage": 0,
                        "DishPrice": "0.00",
                        "PosEatInPrice": "0.00",
                        "PosTakeAwayPrice": "0.00",
                        "DishSubList": null
                    }
                ],
                "TotalCount": 72
            };
            var result = $scope.result = {};
            result.data = resultAjax.Data;

            $scope.modal = {
                title: '标题',
                msg: 'Hello,这是一个由Bootstrap提供的模态框.'
            };
            var modal = $scope.modal = {
                text: "<h1>12</h1>"
            };

            // $http
            //     .get(select.values[$scope.index].url)
            //     .then(
            //         function (data) {
            //
            //         },
            //         function (data) {
            //
            //         }
            //     )

        }])
})(angular);
