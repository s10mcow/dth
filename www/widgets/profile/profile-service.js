(function() {

	'use strict';

	var app = angular.module('WB.Widgets');

    app.factory('wbProfile', wbProfile);

    wbProfile.$inject = [];

	function wbProfile() {

        var userInfo = {
            _id: 10155530167735024,
            favorites: []
        };

        var service = {};

        service.user = user;

        return service;


        function user() {
            return arguments[0] ? userInfo = arguments[0] : userInfo;
        }


    }


}());
