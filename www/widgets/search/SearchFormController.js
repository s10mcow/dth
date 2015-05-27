(function () {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('SearchFormController', SearchFormController);

	SearchFormController.$inject = ['$rootScope', '$log', '$state', 'wbWines', 'HELPERS'];

	function SearchFormController($rootScope, $log, $state, wbWines, HELPERS) {


		var vm = this;

		vm.wines = [];
		vm.newWine = {};
		vm.submitSearch = submitSearch;

        wbWines.one('names').getList()
            .then(mapNamesAndBroadcast)
            .catch(error);



        //Private Methods

        function mapNamesAndBroadcast(names) {
            vm.names = names.map(function (wine) {
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
