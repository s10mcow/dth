(function () {

	'use strict';

    var app = angular.module('WB.Services');

    app.factory('wbWines', wbWines);

    wbWines.$inject = ['Restangular'];


	function wbWines(Restangular) {

        return Restangular.service('wines');

	}


}());
