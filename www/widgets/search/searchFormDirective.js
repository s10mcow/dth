(function () {

	'use strict';


    var app = angular.module('WB.Widgets');

    app.directive('wbSearchForm', wbSearchForm);

	wbSearchForm.$inject = ['PATH'];

	function wbSearchForm(PATH) {

		var linker = function (scope, element, attr, searchCtrl) {
			var input = element.find('input');

			scope.getSearchTerm = function () {
				searchCtrl.submitSearch(input[0].value);
				input[0].value = '';
			}


		};


		return {
			restrict: 'E',
			link: linker,
			controller: 'SearchFormController',
			controllerAs: 'searchCtrl',
			templateUrl: PATH.widgets + 'search/search-form.tpl.html'
		}

	}


}());
