(function () {
    'use strict';

    var app = angular.module('WB.Widgets');

    app.controller('CrudController', CrudController);

    CrudController.$inject = ['wbWines', 'wbCamera', '$ionicLoading', 'wbPouch', '$state', '$log'];

    function CrudController(wbWines, wbCamera, $ionicLoading, wbPouch, $state, $log) {

        var vm = this;

        //Variables
        vm.image = '';

        vm.wine = {
            base64Img: '',
            rating: 3,
            headache: 0
        };

        //Methods
        vm.addNewWine = addNewWine;
        vm.getImage = getImage;
        vm.findById = findById;
        vm.submitEditedWine = submitEditedWine;
        vm.removeWine = removeWine;

        //wbWines.one('names').getList()
        //    .then(function (wines) {
        //        vm.wines = wines;
        //    });

        var options = {
            include_docs: true
        };

        $ionicLoading.show({
            template: 'Loading Wines.'
        });

        wbPouch.local.allDocs(options)
            .then(mapNamesAndBroadcast)
            .catch(error);

        function mapNamesAndBroadcast(results) {
            vm.wines = results.rows.filter(function (row) {
                return row;
            }).map(function (row) {
                return row.doc;
            }).filter(function (doc) {
                return !!doc.name;
            }).map(function (wine) {
                return {name: wine.name, id: wine._id};
            });

            $ionicLoading.hide();
        }

        function error(err) {
            $log.debug(err);
        }


        function findById(id) {
            if (!id) {
                return;
            }
            vm.base64Img = '';
            vm.wine = {
                base64Img: ''
            };
            $ionicLoading.show({
                template: 'Checking the stores!'
            });

            var find = {
                selector: {_id: id}
            };

            wbPouch.local.find(find)
                .then(function (wine) {
                    vm.wine = wine.docs[0];
                    $ionicLoading.hide();
                });
        }

        function submitEditedWine(wine) {

            //wine._id = new Date().toISOString();

            wbPouch.local.put(wine)
//            wine.put()
                .then(function () {
                    $state.go('home.results', {searchTerm: wine.name});
                });
        }

        function addNewWine(newWine) {

            var
                wine = angular.copy(newWine),
                exit = false
                ;

            $ionicLoading.show({
                template: 'Down the hatch!'
            });

            _.forEach(wine, function (component, key) {
                if (!component || typeof component === 'number' || key === 'base64Img') {
                    return;
                }
                if (!wine.name) {
                    exit = true;
                }
                wine[key] = component.toLowerCase();
            });

            if (exit) {
                exit = !exit;
                return;
            }


            wine._id = new Date().toISOString();

            wbPouch.local.put(wine)
                .then(function (wines) {
                    vm.wine = {
                        rating: 3,
                        headache: 0,
                        base64Img: ''
                    };

                    vm.wines = wines;

                    var options = {
                        method: 'feed',
                        name: vm.wine.name,
                        message: 'I am drinking ' + vm.wine.name,
                        description: vm.newWine.origin + 'wine ' + vm.wine.price + 'per bottle'
                    };

                    facebookConnectPlugin.showDialog(options,
                        function (res) {
                            $log.debug(res);
                        },
                        function () {

                        }
                    );
                    wbPouch.sync();
                    $state.go('home.results', {searchTerm: wine.name});
                })
                .catch(function (err) {
                    console.log(err);
                    $ionicLoading.hide();
                });
        }


        function getImage() {
            wbCamera.getPicture().then(function (imageData) {
                vm.wine.base64Img = imageData;
            }, function (err) {
                console.log(err);
            });
        }

        function removeWine(wine) {

            $ionicLoading.show({
                template: 'Throwing Overboard!'
            });

            wbPouch.find()
            wbWines.one(wine.id).remove()
                .then(function (wines) {
                    $ionicLoading.hide();
                    vm.wines = wines;
                })

                .catch(function (err) {
                    $log.debug(err);
                    $ionicLoading.hide();
                })
        }

    }

}());
