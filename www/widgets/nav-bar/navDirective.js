(function () {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.directive('wbNavMenu', wbNavMenu);

	wbNavMenu.$inject = ['$rootScope'];

	function wbNavMenu($rootScope) {

		var linker = function (scope, element) {

			var dropDown = element.next();

			element.on('click', function () {
				dropDown.toggleClass('menu-open');
				element.toggleClass('active');
			});

			var listItem = dropDown.find('li');

			listItem.on('click', function () {
				dropDown.toggleClass('menu-open');
				element.toggleClass('active');
			});


			$rootScope.$on('$stateChangeSuccess', function () {
				dropDown.removeClass('menu-open');
				element.removeClass('active');
			})
		};

		return {
			restrict: 'A',
			link: linker
		}

	}


}());
