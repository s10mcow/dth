(function () {


	'use strict';

	angular.module('WB.Controllers.SearchState', [])

		.controller('SearchStateController', SearchStateController);

	SearchStateController.$inject = ['$scope', 'resolveWines'];

	function SearchStateController($scope, resolveWines) {

		$scope.wineNames = '';

		resolveWines.data
			.map(function (wine) {
				return wine.name;
			})
			.forEach(function (name, index, array) {
				if (index < array.length - 1) {
					$scope.wineNames += name + ', ';
				} else {
					$scope.wineNames += name;
				}
			});

	}

}());
