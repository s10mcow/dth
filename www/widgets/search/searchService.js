(function () {

	'use strict';

    var app = angular.module('WB.Widgets');

    app.factory('wbWines', wbWines);

    wbWines.$inject = ['$http', 'Restangular'];


	function wbWines($http, Restangular) {

        return Restangular.service('wines');

		//var service = {};
		//
		//service.findAllWines = function () {
		//	return $http.get('https://wine-brain.herokuapp.com/wines');
		//};
		//
		//service.findAllWineNames = function () {
         //   return $http.get('https://wine-brain.herokuapp.com/wines/names');
		//};
		//
		//service.findByName = function (name) {
		//	return $http.get('https://wine-brain.herokuapp.com/wines/names/' + name);
		//};
		//
		//service.findById = function (id) {
         //   return $http.get('https://wine-brain.herokuapp.com/wines/' + id);
		//};
		//
		//service.addNewWine = function (wine) {
		//	wine = JSON.stringify(wine);
		//	return $http.post('https://wine-brain.herokuapp.com/wines', wine);
		//};
		//
		//return service;
	}


}());
