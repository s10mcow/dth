(function () {
    'use strict';

    angular.module('WB.Controllers.Crud', [])
        .controller('CrudController', CrudController);

    CrudController.$inject = ['$scope', 'wbCrud', 'wbCamera', 'wbSearch', '$ionicLoading', '$state', '$log'];

    function CrudController($scope, wbCrud, wbCamera, wbSearch, $ionicLoading, $state, $log) {

        var vm = this;

        //Variables
        vm.image = '';
        vm.editWine = {
            base64Img: ''
        };
        vm.newWine = {
            rating: 3,
            headache: 0
        };
        vm.view = {
            add: true,
            edit: false
        };

        //Methods
        vm.addNewWine = addNewWine;
        vm.getImage = getImage;
        vm.findById = findById;
        vm.submitEditedWine = submitEditedWine;
        vm.removeWine = removeWine;


        wbSearch.findAllWineNames()
            .success(function (wines) {
                vm.wines = wines;
            });


        function findById(id) {
            if (!id) {
                return;
            }
            vm.base64Img = '';
            vm.editWine = {
                base64Img: ''
            };
            $ionicLoading.show({
                template: 'Checking the stores!'
            });
            wbSearch.findById(id)
                .success(function (wine) {
                    _.each(wine, function (value, key) {
                        vm.editWine[key] = value;
                        if (key === 'base64Img') {
                            vm.base64Img = value;
                        }
                    });
                    $ionicLoading.hide();
                });
        }

        function submitEditedWine(wine) {

            var exit = false;

            _.forEach(wine, function (component, key) {
                if (!component || typeof component === 'number' || key === 'base64Img') {
                    return;
                }
                if (!wine.name) {
                    exit = true;
                }
                wine[key] = component.toLowerCase();
            });

            wine.base64Img = vm.base64Img;

            wbCrud.editWine(wine)
                .success(function () {
                    vm.base64Img = '';
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

            wine.base64Img = vm.base64Img;

            wbCrud.addNewWine(wine)
                .success(function (data) {
                    vm.newWine = {
                        rating: 3,
                        headache: 0
                    };
                    vm.newWine.base64Img = '';
                    $ionicLoading.hide();
                    vm.wines = data;
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
                .error(function (err) {
                    console.log(err);
                    $ionicLoading.hide();
                });
        }


        function getImage() {
            wbCamera.getPicture().then(function (imageData) {
                vm.base64Img = imageData;
            }, function (err) {
                console.log(err);
            });
        }

        function removeWine(wine) {

            $ionicLoading.show({
                template: 'Throwing Overboard!'
            });

            var id = {_id: wine._id};


            wbCrud.removeWine(id)
                .success(function (data) {
                    $ionicLoading.hide();
                    vm.wines = data;
                })

                .error(function (err) {
                    $log.debug(err);
                    $ionicLoading.hide();
                })
        }

    }

}());
