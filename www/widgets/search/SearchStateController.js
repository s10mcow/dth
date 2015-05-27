(function () {


	'use strict';

    var app = angular.module('WB.Widgets');

    app.controller('SearchStateController', SearchStateController);

	SearchStateController.$inject = ['resolveWines', '$rootScope', '$timeout', 'HELPERS'];

	function SearchStateController(resolveWines, $rootScope, $timeout, HELPERS) {

        var wineArr = [];

		wineArr = resolveWines
			.map(function (wine) {
				return wine.name;
			});


        $timeout(function () {
            $rootScope.$broadcast(HELPERS.loadedNames, wineArr)
        });
	}

}());
