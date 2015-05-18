(function () {
	'use strict';

	angular.module('WB.Controllers.Crud', [])
		.controller('CrudController', CrudController);

	CrudController.$inject = ['wbCrud', 'wbCamera', 'wbSearch', '$ionicLoading'];

	function CrudController(wbCrud, wbCamera, wbSearch, $ionicLoading) {

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
        vm.toggleView = toggleView;
        vm.findById = findById;
        vm.submitEditedWine = submitEditedWine;


        wbSearch.findAllWineNames()
            .success(function (wines) {
                vm.wines = wines;
            });

        function findById(id) {
            wbSearch.findById(id)
                .success(function (wine) {
                    _.each(wine, function (value, key) {
                        vm.editWine[key] = value;
                        if(key === 'base64Img') {
                            vm.base64Img = value;
                        }
                    });
                });
        }

        function toggleView() {
            vm.view.add = !vm.view.add;
            vm.view.edit = !vm.view.edit;
        }


        function submitEditedWine(wine) {

            var exit = false;

            _.forEach(wine, function (component, key) {
                if(!component || typeof component === 'number' || key === 'base64Img') { return; }
                if(!wine.name) { exit = true; }
                wine[key] = component.toLowerCase();
            });

            wine.base64Img = vm.base64Img;

            wbCrud.editWine(wine)
                .success(function () {
                    vm.base64Img = '';
                    toggleView();
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
                if(!component || typeof component === 'number' || key === 'base64Img') { return; }
                if(!wine.name) { exit = true; }
                wine[key] = component.toLowerCase();
            });

            if(exit) {
                exit = !exit;
                return;
            }

            wine.base64Img = vm.base64Img;

            wbCrud.addNewWine(wine)
                .success(function () {
                    vm.newWine = {
                        rating: 3,
                        headache: 0
                    };
                    vm.newWine.base64Img = '';
                    $ionicLoading.hide();
                })
                .error(function (err) {
                    console.log(err);
                    $ionicLoading.hide();
                });
        }


        function getImage() {
            wbCamera.getPicture().then(function(imageData) {
                vm.base64Img = imageData;
            }, function(err) {
                console.log(err);
            });
        }

    }

}());
