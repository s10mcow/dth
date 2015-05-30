(function () {
    'use strict';

    var app = angular.module('WB.Services');

    app.factory('wbPouch', wbPouch);

    wbPouch.$inject = [];

    function wbPouch() {

        var service = {};

        service.local = new PouchDB('wines');
        service.remote = 'https://dth.iriscouch.com/wines';
        service.sync = sync;

        return service;

        function sync() {
            service.local.sync(service.remote, {live: true})
        }

    }


}());


