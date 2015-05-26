(function () {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('SearchFormController', SearchFormController);

	SearchFormController.$inject = ['$scope', '$state', 'wbSearch'];

	function SearchFormController($scope, $state, wbSearch) {


		var vm = this;

		vm.wines = [];
		vm.newWine = {};
		vm.submitSearch = submitSearch;
		vm.submitNewWine = submitNewWine;
        vm.wineNames = $scope.wineNames;

        function submitSearch(searchTerm) {



            $state.go('home.results', {searchTerm: searchTerm.toLowerCase().trim()});
		}

		function submitNewWine(wine) {
			if (_.isEmpty(wine)) {
				console.log('empty wine bottle');
				return;
			}
			wbSearch.addNewWine(wine)
				.success(function () {
					console.log('added');
				})
		}


	}

}());
