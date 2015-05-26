(function () {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('ShowWinesController', ShowWinesController);

    ShowWinesController.$inject = ['$ionicLoading', 'results'];


	function ShowWinesController($ionicLoading, results) {

        $ionicLoading.hide();

		var vm = this;

        vm.wines = results.data;

        window.wines = results.data;



	}

}());
