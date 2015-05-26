(function () {
    'use strict';

    var app = angular.module('WB.Services');

    app.factory('wbUsers', wbUsers);

    wbUsers.$inject = ['Restangular'];

    function wbUsers(Restangular) {

        return Restangular.service('users');

    }


}());


