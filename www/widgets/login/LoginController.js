(function () {
	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$log', '$state', '$cordovaFacebook', '$ionicPlatform', '$ionicLoading'];

	function LoginController($log, $state, $cordovaFacebook, $ionicPlatform, $ionicLoading) {

		var vm = this;

        vm.login = login;

        function login() {

            $ionicPlatform.ready(function () {
                $ionicLoading.show({
                    template: 'Checking the manifest.'
                });
                facebookConnectPlugin.login(['public_profile', 'user_friends'],
                    function (response) {
                        $log.debug(response);
                        $state.go('home.profile');
                    },
                    function (response) {
                        $log.debug(JSON.stringify(response));
                    }
                );
            });

        }

	}

}());
