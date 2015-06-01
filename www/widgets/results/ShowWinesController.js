(function () {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('ShowWinesController', ShowWinesController);

    ShowWinesController.$inject = ['$ionicLoading', 'results'];


	function ShowWinesController($ionicLoading, results) {

        $ionicLoading.hide();

		var vm = this;

        if(results.rows) {

            vm.wines = results.rows.map(function (row) {
                return row.doc;
            }).filter(function (doc) {
                return !!doc.name;
            });
        } else {
            vm.wines = results.docs;
        }


	}

}());
