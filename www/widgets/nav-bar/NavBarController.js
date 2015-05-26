(function () {
	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('NavBarController', NavBarController);

	NavBarController.$inject = ['$rootScope', 'AUTH_EVENTS'];

	function NavBarController($rootScope, AUTH_EVENTS) {

		var vm = this;

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function ($event, login) {
			vm.showUser = true;
			vm.username = login.data.name;

		});

	}

}());
