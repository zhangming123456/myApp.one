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
            //假数据
            result.resultData = {
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
            // httpServer.post(
            //     select.values[dis_id].url,
            //     dataAjax,
            //     function (results) {
            //         result.resultAjax = results;
            //         result.resultData = results.data;
            //     },
            //     function () {
            //
            //     }
            // );
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
                    //假数据
                    this.modalDataAjax = {
                        "Status": 1,
                        "Error": null,
                        "Data": [
                            {
                                "PosMenuId": 98,
                                "PosMenuName": "**主食类**",
                                "PosMenuNumber": 1000000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2115,
                                "PosMenuName": "**该类空白**",
                                "PosMenuNumber": 1000001,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 99,
                                "PosMenuName": "招牌特制牛肉饭（小）1",
                                "PosMenuNumber": 1100001,
                                "PosEatInPrice": "14.00",
                                "PosTakeAwayPrice": "14.00"
                            },
                            {
                                "PosMenuId": 1837,
                                "PosMenuName": "招牌特制牛肉饭（中）",
                                "PosMenuNumber": 1100002,
                                "PosEatInPrice": "18.00",
                                "PosTakeAwayPrice": "19.00"
                            },
                            {
                                "PosMenuId": 1838,
                                "PosMenuName": "招牌特制牛肉饭（大）",
                                "PosMenuNumber": 1100003,
                                "PosEatInPrice": "23.00",
                                "PosTakeAwayPrice": "24.00"
                            },
                            {
                                "PosMenuId": 1839,
                                "PosMenuName": "一品山菌饭（中）",
                                "PosMenuNumber": 1100004,
                                "PosEatInPrice": "16.00",
                                "PosTakeAwayPrice": "17.00"
                            },
                            {
                                "PosMenuId": 1840,
                                "PosMenuName": "一品山菌饭（大）",
                                "PosMenuNumber": 1100005,
                                "PosEatInPrice": "20.00",
                                "PosTakeAwayPrice": "21.00"
                            },
                            {
                                "PosMenuId": 1841,
                                "PosMenuName": "招牌特制鸡肉饭（中）",
                                "PosMenuNumber": 1100006,
                                "PosEatInPrice": "16.00",
                                "PosTakeAwayPrice": "17.00"
                            },
                            {
                                "PosMenuId": 1842,
                                "PosMenuName": "招牌特制鸡肉饭（大）",
                                "PosMenuNumber": 1100007,
                                "PosEatInPrice": "21.00",
                                "PosTakeAwayPrice": "22.00"
                            },
                            {
                                "PosMenuId": 1843,
                                "PosMenuName": "咖哩牛肉饭",
                                "PosMenuNumber": 1100008,
                                "PosEatInPrice": "26.00",
                                "PosTakeAwayPrice": "27.00"
                            },
                            {
                                "PosMenuId": 1844,
                                "PosMenuName": "咖哩鸡肉饭",
                                "PosMenuNumber": 1100009,
                                "PosEatInPrice": "22.00",
                                "PosTakeAwayPrice": "23.00"
                            },
                            {
                                "PosMenuId": 1845,
                                "PosMenuName": "双宝饭",
                                "PosMenuNumber": 1100010,
                                "PosEatInPrice": "28.00",
                                "PosTakeAwayPrice": "29.00"
                            },
                            {
                                "PosMenuId": 1846,
                                "PosMenuName": "双色牛肉山菌饭",
                                "PosMenuNumber": 1100011,
                                "PosEatInPrice": "26.00",
                                "PosTakeAwayPrice": "27.00"
                            },
                            {
                                "PosMenuId": 1847,
                                "PosMenuName": "双色鸡肉山菌饭",
                                "PosMenuNumber": 1100012,
                                "PosEatInPrice": "22.00",
                                "PosTakeAwayPrice": "23.00"
                            },
                            {
                                "PosMenuId": 1848,
                                "PosMenuName": "招牌特制牛肉面",
                                "PosMenuNumber": 1100013,
                                "PosEatInPrice": "22.00",
                                "PosTakeAwayPrice": "23.00"
                            },
                            {
                                "PosMenuId": 1849,
                                "PosMenuName": "台式卤肉饭",
                                "PosMenuNumber": 1100014,
                                "PosEatInPrice": "15.00",
                                "PosTakeAwayPrice": "16.00"
                            },
                            {
                                "PosMenuId": 1850,
                                "PosMenuName": "麻婆炸鸡饭（新）",
                                "PosMenuNumber": 1100015,
                                "PosEatInPrice": "18.00",
                                "PosTakeAwayPrice": "19.00"
                            },
                            {
                                "PosMenuId": 1851,
                                "PosMenuName": "日式小鸡饭（小）（新）",
                                "PosMenuNumber": 1100016,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "13.00"
                            },
                            {
                                "PosMenuId": 1852,
                                "PosMenuName": "蒲烧鳗重单份",
                                "PosMenuNumber": 1100017,
                                "PosEatInPrice": "32.00",
                                "PosTakeAwayPrice": "33.00"
                            },
                            {
                                "PosMenuId": 1957,
                                "PosMenuName": "蒲烧鳗重双份",
                                "PosMenuNumber": 1100018,
                                "PosEatInPrice": "54.00",
                                "PosTakeAwayPrice": "55.00"
                            },
                            {
                                "PosMenuId": 1958,
                                "PosMenuName": "招牌特制鸡肉饭（中）（特价）",
                                "PosMenuNumber": 1100019,
                                "PosEatInPrice": "9.90",
                                "PosTakeAwayPrice": "9.90"
                            },
                            {
                                "PosMenuId": 2068,
                                "PosMenuName": "麻婆豆腐牛肉饭",
                                "PosMenuNumber": 1100020,
                                "PosEatInPrice": "18.00",
                                "PosTakeAwayPrice": "19.00"
                            },
                            {
                                "PosMenuId": 2102,
                                "PosMenuName": "番茄牛肉饭",
                                "PosMenuNumber": 1100021,
                                "PosEatInPrice": "18.00",
                                "PosTakeAwayPrice": "19.00"
                            },
                            {
                                "PosMenuId": 2359,
                                "PosMenuName": "铁板泡菜豚肉",
                                "PosMenuNumber": 1100022,
                                "PosEatInPrice": "32.00",
                                "PosTakeAwayPrice": "33.00"
                            },
                            {
                                "PosMenuId": 2360,
                                "PosMenuName": "招牌牛肉定食",
                                "PosMenuNumber": 1100023,
                                "PosEatInPrice": "38.00",
                                "PosTakeAwayPrice": "39.00"
                            },
                            {
                                "PosMenuId": 2375,
                                "PosMenuName": "青花鱼定食",
                                "PosMenuNumber": 1100024,
                                "PosEatInPrice": "35.00",
                                "PosTakeAwayPrice": "36.00"
                            },
                            {
                                "PosMenuId": 2384,
                                "PosMenuName": "麻辣猪肉锅",
                                "PosMenuNumber": 1100025,
                                "PosEatInPrice": "38.00",
                                "PosTakeAwayPrice": "39.00"
                            },
                            {
                                "PosMenuId": 2385,
                                "PosMenuName": "牛肉寿喜锅",
                                "PosMenuNumber": 1100026,
                                "PosEatInPrice": "40.00",
                                "PosTakeAwayPrice": "41.00"
                            },
                            {
                                "PosMenuId": 2387,
                                "PosMenuName": "麻婆豆腐炸鸡饭",
                                "PosMenuNumber": 1100027,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "13.00"
                            },
                            {
                                "PosMenuId": 2392,
                                "PosMenuName": "味增吉利猪扒饭",
                                "PosMenuNumber": 1100028,
                                "PosEatInPrice": "22.00",
                                "PosTakeAwayPrice": "23.00"
                            },
                            {
                                "PosMenuId": 2394,
                                "PosMenuName": "锦彩鲜疏咖喱饭",
                                "PosMenuNumber": 1100029,
                                "PosEatInPrice": "22.00",
                                "PosTakeAwayPrice": "23.00"
                            },
                            {
                                "PosMenuId": 1932,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100100,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1963,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100101,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1974,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100102,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1981,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100103,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2090,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100104,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2127,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100105,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2137,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100106,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2168,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100107,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2182,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100108,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2192,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100109,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2009,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100201,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2010,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100202,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2270,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1100203,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2116,
                                "PosMenuName": "**下午茶单品**",
                                "PosMenuNumber": 1200000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2117,
                                "PosMenuName": "大福",
                                "PosMenuNumber": 1200001,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2118,
                                "PosMenuName": "小吃拼盘",
                                "PosMenuNumber": 1200002,
                                "PosEatInPrice": "10.00",
                                "PosTakeAwayPrice": "10.00"
                            },
                            {
                                "PosMenuId": 2119,
                                "PosMenuName": "牛肉乌冬面",
                                "PosMenuNumber": 1200003,
                                "PosEatInPrice": "15.00",
                                "PosTakeAwayPrice": "15.00"
                            },
                            {
                                "PosMenuId": 2170,
                                "PosMenuName": "红豆鲷鱼烧",
                                "PosMenuNumber": 1200004,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2171,
                                "PosMenuName": "抹茶布丁",
                                "PosMenuNumber": 1200005,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2172,
                                "PosMenuName": "抹茶铜锣烧",
                                "PosMenuNumber": 1200006,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "12.00"
                            },
                            {
                                "PosMenuId": 2188,
                                "PosMenuName": "南瓜蛋挞",
                                "PosMenuNumber": 1200007,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "12.00"
                            },
                            {
                                "PosMenuId": 2490,
                                "PosMenuName": "芝士蛋糕",
                                "PosMenuNumber": 1200008,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "12.00"
                            },
                            {
                                "PosMenuId": 2120,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200100,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2121,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200101,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2122,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200102,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2173,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200103,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2174,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200104,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2175,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200105,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2189,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200106,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2190,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 1200107,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2492,
                                "PosMenuName": "乌冬面",
                                "PosMenuNumber": 1300001,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 2493,
                                "PosMenuName": "糖心蛋米线",
                                "PosMenuNumber": 1300002,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 2494,
                                "PosMenuName": "牛肉粥",
                                "PosMenuNumber": 1300003,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 2495,
                                "PosMenuName": "白粥",
                                "PosMenuNumber": 1300004,
                                "PosEatInPrice": "2.00",
                                "PosTakeAwayPrice": "2.00"
                            },
                            {
                                "PosMenuId": 2496,
                                "PosMenuName": "日式温泉蛋",
                                "PosMenuNumber": 1300005,
                                "PosEatInPrice": "4.00",
                                "PosTakeAwayPrice": "4.00"
                            },
                            {
                                "PosMenuId": 2497,
                                "PosMenuName": "营养豆浆",
                                "PosMenuNumber": 1300006,
                                "PosEatInPrice": "4.00",
                                "PosTakeAwayPrice": "4.00"
                            },
                            {
                                "PosMenuId": 2498,
                                "PosMenuName": "日式饭团（青菜味）",
                                "PosMenuNumber": 1300007,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            },
                            {
                                "PosMenuId": 2499,
                                "PosMenuName": "日式饭团（鲑鱼味）",
                                "PosMenuNumber": 1300008,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            },
                            {
                                "PosMenuId": 2500,
                                "PosMenuName": "日式饭团（鲣鱼味）",
                                "PosMenuNumber": 1300009,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            },
                            {
                                "PosMenuId": 1853,
                                "PosMenuName": "**饮料**",
                                "PosMenuNumber": 2000000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1854,
                                "PosMenuName": "百事可乐",
                                "PosMenuNumber": 2000001,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1855,
                                "PosMenuName": "七喜",
                                "PosMenuNumber": 2000002,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1856,
                                "PosMenuName": "柠檬茶",
                                "PosMenuNumber": 2000003,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1857,
                                "PosMenuName": "橙C",
                                "PosMenuNumber": 2000004,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1858,
                                "PosMenuName": "红茶",
                                "PosMenuNumber": 2000005,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1859,
                                "PosMenuName": "伯爵奶茶",
                                "PosMenuNumber": 2000006,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1860,
                                "PosMenuName": "柠香可乐",
                                "PosMenuNumber": 2000007,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1861,
                                "PosMenuName": "柠香雪碧",
                                "PosMenuNumber": 2000008,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1862,
                                "PosMenuName": "百事可乐（大）",
                                "PosMenuNumber": 2000009,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 1863,
                                "PosMenuName": "七喜（大）",
                                "PosMenuNumber": 2000010,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 1875,
                                "PosMenuName": "柠檬茶（大）",
                                "PosMenuNumber": 2000011,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 1876,
                                "PosMenuName": "橙C（大）",
                                "PosMenuNumber": 2000012,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 1877,
                                "PosMenuName": "红茶（大）",
                                "PosMenuNumber": 2000013,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2322,
                                "PosMenuName": "冰港式奶茶",
                                "PosMenuNumber": 2000014,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 1949,
                                "PosMenuName": "冰抹茶红豆饮",
                                "PosMenuNumber": 2000015,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 1950,
                                "PosMenuName": "日本茶",
                                "PosMenuNumber": 2000016,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1951,
                                "PosMenuName": "樱花草莓气泡饮",
                                "PosMenuNumber": 2000017,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 1952,
                                "PosMenuName": "山楂树莓气泡饮",
                                "PosMenuNumber": 2000018,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 1990,
                                "PosMenuName": "桂花香梨果饮",
                                "PosMenuNumber": 2000019,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 1991,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000020,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1992,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000021,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1993,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000022,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1994,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000023,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2062,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000024,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2080,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000025,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2081,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000026,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2130,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000027,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2134,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000028,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2135,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000029,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2136,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000030,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2176,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000031,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2177,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000032,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2180,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000033,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2181,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2000034,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1970,
                                "PosMenuName": "**汤类**",
                                "PosMenuNumber": 2001000,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1971,
                                "PosMenuName": "紫玉汤",
                                "PosMenuNumber": 2001001,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1969,
                                "PosMenuName": "味噌汤",
                                "PosMenuNumber": 2001002,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 2376,
                                "PosMenuName": "菌菇味噌汤",
                                "PosMenuNumber": 2001003,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2196,
                                "PosMenuName": "**皿类**",
                                "PosMenuNumber": 2002000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2197,
                                "PosMenuName": "牛肉皿",
                                "PosMenuNumber": 2002001,
                                "PosEatInPrice": "16.00",
                                "PosTakeAwayPrice": "16.00"
                            },
                            {
                                "PosMenuId": 2198,
                                "PosMenuName": "鸡肉皿",
                                "PosMenuNumber": 2002002,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "12.00"
                            },
                            {
                                "PosMenuId": 2199,
                                "PosMenuName": "蔬菜皿",
                                "PosMenuNumber": 2002003,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2486,
                                "PosMenuName": "牛肉皿（特价）",
                                "PosMenuNumber": 2002004,
                                "PosEatInPrice": "11.00",
                                "PosTakeAwayPrice": "11.00"
                            },
                            {
                                "PosMenuId": 2200,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2004000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2201,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2004001,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2202,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2004002,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2253,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 2004003,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1864,
                                "PosMenuName": "**副产品**",
                                "PosMenuNumber": 3000000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1865,
                                "PosMenuName": "薯饼",
                                "PosMenuNumber": 3000001,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1866,
                                "PosMenuName": "茶碗蒸",
                                "PosMenuNumber": 3000002,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1867,
                                "PosMenuName": "香辣笋拼盘",
                                "PosMenuNumber": 3000003,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            },
                            {
                                "PosMenuId": 1868,
                                "PosMenuName": "唐扬鸡块",
                                "PosMenuNumber": 3000004,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1869,
                                "PosMenuName": "海草沙律",
                                "PosMenuNumber": 3000005,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 1870,
                                "PosMenuName": "韩国泡菜",
                                "PosMenuNumber": 3000006,
                                "PosEatInPrice": "4.00",
                                "PosTakeAwayPrice": "4.00"
                            },
                            {
                                "PosMenuId": 1872,
                                "PosMenuName": "绿禾童",
                                "PosMenuNumber": 3000007,
                                "PosEatInPrice": "3.00",
                                "PosTakeAwayPrice": "3.00"
                            },
                            {
                                "PosMenuId": 1873,
                                "PosMenuName": "白饭",
                                "PosMenuNumber": 3000008,
                                "PosEatInPrice": "2.00",
                                "PosTakeAwayPrice": "2.00"
                            },
                            {
                                "PosMenuId": 2203,
                                "PosMenuName": "卤蛋",
                                "PosMenuNumber": 3000009,
                                "PosEatInPrice": "2.00",
                                "PosTakeAwayPrice": "2.00"
                            },
                            {
                                "PosMenuId": 1933,
                                "PosMenuName": "酸豆角肉末",
                                "PosMenuNumber": 3000010,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 2159,
                                "PosMenuName": "香辣笋",
                                "PosMenuNumber": 3000011,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            },
                            {
                                "PosMenuId": 2191,
                                "PosMenuName": "福神渍",
                                "PosMenuNumber": 3000012,
                                "PosEatInPrice": "4.00",
                                "PosTakeAwayPrice": "4.00"
                            },
                            {
                                "PosMenuId": 2194,
                                "PosMenuName": "吉野鸡软骨",
                                "PosMenuNumber": 3000013,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 2204,
                                "PosMenuName": "粟米摇滚沙拉",
                                "PosMenuNumber": 3000014,
                                "PosEatInPrice": "10.00",
                                "PosTakeAwayPrice": "10.00"
                            },
                            {
                                "PosMenuId": 2205,
                                "PosMenuName": "沙拉酱",
                                "PosMenuNumber": 3000015,
                                "PosEatInPrice": "1.00",
                                "PosTakeAwayPrice": "1.00"
                            },
                            {
                                "PosMenuId": 2323,
                                "PosMenuName": "毛豆羊栖菜（新）",
                                "PosMenuNumber": 3000016,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 2206,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2207,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001001,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2208,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001002,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2209,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001003,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2210,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001004,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2211,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001005,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2212,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001006,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2254,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3001007,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2213,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3002000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2214,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3002001,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2290,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 3002002,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1878,
                                "PosMenuName": "**非食材**",
                                "PosMenuNumber": 4000000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1879,
                                "PosMenuName": "吉宝挂件",
                                "PosMenuNumber": 4000001,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1880,
                                "PosMenuName": "打包袋",
                                "PosMenuNumber": 4000002,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1881,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000003,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1882,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000004,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1883,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000005,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1884,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000006,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 1885,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000007,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2079,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000008,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2131,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000009,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2183,
                                "PosMenuName": "**暂未使用**",
                                "PosMenuNumber": 4000010,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2161,
                                "PosMenuName": "**美食券加类**",
                                "PosMenuNumber": 4001000,
                                "PosEatInPrice": "0.00",
                                "PosTakeAwayPrice": "0.00"
                            },
                            {
                                "PosMenuId": 2162,
                                "PosMenuName": "加1元",
                                "PosMenuNumber": 4001001,
                                "PosEatInPrice": "1.00",
                                "PosTakeAwayPrice": "1.00"
                            },
                            {
                                "PosMenuId": 2163,
                                "PosMenuName": "加2元",
                                "PosMenuNumber": 4001002,
                                "PosEatInPrice": "2.00",
                                "PosTakeAwayPrice": "2.00"
                            },
                            {
                                "PosMenuId": 2164,
                                "PosMenuName": "加3元",
                                "PosMenuNumber": 4001003,
                                "PosEatInPrice": "3.00",
                                "PosTakeAwayPrice": "3.00"
                            },
                            {
                                "PosMenuId": 2165,
                                "PosMenuName": "加4元",
                                "PosMenuNumber": 4001004,
                                "PosEatInPrice": "4.00",
                                "PosTakeAwayPrice": "4.00"
                            },
                            {
                                "PosMenuId": 2166,
                                "PosMenuName": "加5元",
                                "PosMenuNumber": 4001005,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            },
                            {
                                "PosMenuId": 2167,
                                "PosMenuName": "加6元",
                                "PosMenuNumber": 4001006,
                                "PosEatInPrice": "6.00",
                                "PosTakeAwayPrice": "6.00"
                            },
                            {
                                "PosMenuId": 2324,
                                "PosMenuName": "加7元",
                                "PosMenuNumber": 4001007,
                                "PosEatInPrice": "7.00",
                                "PosTakeAwayPrice": "7.00"
                            },
                            {
                                "PosMenuId": 2325,
                                "PosMenuName": "加8元",
                                "PosMenuNumber": 4001008,
                                "PosEatInPrice": "8.00",
                                "PosTakeAwayPrice": "8.00"
                            },
                            {
                                "PosMenuId": 2326,
                                "PosMenuName": "加9元",
                                "PosMenuNumber": 4001009,
                                "PosEatInPrice": "9.00",
                                "PosTakeAwayPrice": "9.00"
                            },
                            {
                                "PosMenuId": 2327,
                                "PosMenuName": "加10元",
                                "PosMenuNumber": 4001010,
                                "PosEatInPrice": "10.00",
                                "PosTakeAwayPrice": "10.00"
                            },
                            {
                                "PosMenuId": 2328,
                                "PosMenuName": "加11元",
                                "PosMenuNumber": 4001011,
                                "PosEatInPrice": "11.00",
                                "PosTakeAwayPrice": "11.00"
                            },
                            {
                                "PosMenuId": 2329,
                                "PosMenuName": "加12元",
                                "PosMenuNumber": 4001012,
                                "PosEatInPrice": "12.00",
                                "PosTakeAwayPrice": "12.00"
                            },
                            {
                                "PosMenuId": 2330,
                                "PosMenuName": "加13元",
                                "PosMenuNumber": 4001013,
                                "PosEatInPrice": "13.00",
                                "PosTakeAwayPrice": "13.00"
                            },
                            {
                                "PosMenuId": 2331,
                                "PosMenuName": "加14元",
                                "PosMenuNumber": 4001014,
                                "PosEatInPrice": "14.00",
                                "PosTakeAwayPrice": "14.00"
                            },
                            {
                                "PosMenuId": 2332,
                                "PosMenuName": "加15元",
                                "PosMenuNumber": 4001015,
                                "PosEatInPrice": "15.00",
                                "PosTakeAwayPrice": "15.00"
                            },
                            {
                                "PosMenuId": 2371,
                                "PosMenuName": "外送服务费",
                                "PosMenuNumber": 4001016,
                                "PosEatInPrice": "5.00",
                                "PosTakeAwayPrice": "5.00"
                            }
                        ],
                        "TotalCount": 0
                    };
                    // httpServer.post(select.values[dis_id].getUrl, null, function (reault) {
                    //     var data = reault.data;
                    //     // if(data.Error){
                    //     _this.modalDataAjax = data.Data;
                    //     // }
                    // })
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
                        modalRadio.selection = undefined;
                        $scope.modelsearchs = {};
                        this.modalDataAjax = {};
                        this.isOpenModal_show = false;
                        this.isOpenModal = false;
                    }
                },
                stopEvent: function (e) {
                    e.stopPropagation()
                }
            };
            $scope.modelsearchs = {};
            // $scope.isModalNull =
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
            modalRadio.selection = 5;
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


