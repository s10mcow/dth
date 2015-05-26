(function() {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.factory('wbCrud', wbCrud);

	wbCrud.$inject = ['$http', 'API_URL'];

	function wbCrud($http, API_URL) {

        var service = {};

        service.addNewWine = function (wine) {
            wine = JSON.stringify(wine);
            return $http.post(API_URL + '/wines', wine);
        };

        service.editWine = function (wine) {
            wine = JSON.stringify(wine);
            return $http.put(API_URL + '/wines', wine);
        };

        service.removeWine = function (id) {
            return $http.delete(API_URL + '/wines/' + id._id);
        };

        return service;
    }


}());
