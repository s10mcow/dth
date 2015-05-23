(function () {
	'use strict';

	var app = angular.module('WB.Widgets.Login', []);

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$log', '$state', '$cordovaFacebook', 'AUTH_EVENTS'];

	function LoginController($http, $log, $state, $cordovaFacebook, AUTH_EVENTS) {

		var vm = this;

        vm.login = login;

        function login() {

            facebookConnectPlugin.login(['public_profile'],
                function (response) {
                    $log.debug(response);
                    //var accessToken = response.authResponse.accessToken;
                    //console.log(accessToken);
                    //facebookConnectPlugin.api()
                    $state.go('home.profile');
                },
                function (response) { $log.debug(JSON.stringify(response)); }
            );

        }

	}

}());
