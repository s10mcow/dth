(function () {

	'use strict';

	angular.module('WB.Controllers.ShowWines', [])
		.controller('ShowWinesController', ShowWinesController);


    ShowWinesController.$inject = ['$ionicLoading', 'results'];


	function ShowWinesController($ionicLoading, results) {

        $ionicLoading.hide();

		var vm = this;

        vm.wines = results.data;

        window.wines = results.data;



	}

}());
