(function () {
    'use strict';


    angular.module('WB.Directives', []);
    angular.module('WB.Services', []);
    angular.module('WB.Widgets', [


    ]);

    angular.module('WB.Core', [
        'WB.Directives',
        'WB.Services',
        'WB.Widgets',
        'WB.Templates',
        'WB.Constants'
    ]);

    angular.module('WB.Vendors', [
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngCordova',
        'ionic',
        'ui.bootstrap',
        'restangular'
    ]);




}());
