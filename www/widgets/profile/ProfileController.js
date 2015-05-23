(function () {
	'use strict';

	var app = angular.module('WB.Widgets.Profile', []);

    app.controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', '$log', '$cookies', '$cordovaFacebook', 'AUTH_EVENTS'];

	function ProfileController($http, $log, $cookies, $cordovaFacebook, AUTH_EVENTS) {



	}

}());
