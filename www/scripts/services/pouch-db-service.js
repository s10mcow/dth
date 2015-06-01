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
            service.local.sync(service.remote, {live: true, retry: true})
                .on('change', function (change) {
                    // yo, something changed!
                    console.log('change to DB detected')
                }).on('paused', function (info) {
                    // replication was paused, usually because of a lost connection
                }).on('active', function (info) {
                    // replication was resumed
                }).on('error', function (err) {
                    // totally unhandled error (shouldn't happen)
                });
        }

    }


}());


