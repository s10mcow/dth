(function () {


	'use strict';

	angular.module('WB.Controllers.SearchState', [])

		.controller('SearchStateController', SearchStateController);

	SearchStateController.$inject = ['resolveWines', '$rootScope', '$timeout', 'HELPERS'];

	function SearchStateController(resolveWines, $rootScope, $timeout, HELPERS) {

        var wineArr = [];

		wineArr = resolveWines.data
			.map(function (wine) {
				return wine.name;
			});


        $timeout(function () {
            $rootScope.$broadcast(HELPERS.loadedNames, wineArr)
        });
	}

}());
