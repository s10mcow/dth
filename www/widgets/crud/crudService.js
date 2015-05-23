(function() {

	'use strict';

	angular.module('WB.Services.Crud', [])

		.factory('wbCrud', wbCrud);

	wbCrud.$inject = ['$http'];

	function wbCrud($http) {

        var service = {};

        service.addNewWine = function (wine) {
            wine = JSON.stringify(wine);
                return $http.post('http://wine-brain.herokuapp.com/wines', wine);
        };

        service.editWine = function (wine) {
            wine = JSON.stringify(wine);
            return $http.put('http://wine-brain.herokuapp.com/wines', wine);
        };

        service.removeWine = function (id) {
            return $http.delete('http://wine-brain.herokuapp.com/wines/' + id._id);
        };

        return service;
    }


}());
