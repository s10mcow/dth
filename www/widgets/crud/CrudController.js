(function () {
    'use strict';

    var app = angular.module('WB.Widgets');

    app.controller('CrudController', CrudController);

    CrudController.$inject = ['wbWines', 'wbCamera', '$ionicLoading', '$state', '$log'];

    function CrudController(wbWines, wbCamera, $ionicLoading, $state, $log) {

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

        wbWines.one('names').getList()
            .then(function (wines) {
                vm.wines = wines;
            });


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
            wbWines.one(id).get()
                .then(function (wine) {
                    vm.wine = wine;
                    $ionicLoading.hide();
                });
        }

        function submitEditedWine(wine) {

            wine.put()
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


            wbWines.post(wine)
                .then(function (wines) {
                    vm.wine = {
                        rating: 3,
                        headache: 0,
                        base64Img: ''
                    };

                    vm.wines = wines;

                    var options = {
                        method: 'feed',
                        name: vm.newWine.name,
                        message: 'I am drinking ' + vm.newWine.name,
                        description: vm.newWine.origin + 'wine ' + vm.newWine.price + 'per bottle'
                    };

                    facebookConnectPlugin.showDialog(options,
                        function (res) {
                            $log.debug(res);
                        },
                        function () {

                        }
                    );

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
