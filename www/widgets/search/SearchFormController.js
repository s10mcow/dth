(function () {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('SearchFormController', SearchFormController);

	SearchFormController.$inject = ['$rootScope', '$log', '$state', 'wbPouch', 'HELPERS'];

	function SearchFormController($rootScope, $log, $state, wbPouch, HELPERS) {


		var vm = this;

		vm.wines = [];
		vm.newWine = {};
		vm.submitSearch = submitSearch;

        var options = {
            include_docs: true
        };

        wbPouch.local.allDocs(options)
            .then(mapNamesAndBroadcast)
            .catch(error);



        //Private Methods

        function mapNamesAndBroadcast(results) {
            vm.names = results.rows.filter(function (row) {
                return row;
            }).map(function (row) {
                return row.doc;
            }).filter(function (doc) {
                return !!doc.name;
            }).map(function (wine) {
               return wine.name;
            });

            $rootScope.$broadcast(HELPERS.loadedNames, vm.names)
        }

        function error(err) {
            $log.debug(err);
        }

        function submitSearch(searchTerm) {
            $state.go('home.results', {searchTerm: searchTerm.toLowerCase().trim()});
		}

	}

}());
