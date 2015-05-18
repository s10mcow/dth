'use strict';

/**
 * @ngdoc overview
 * @name wineBrainApp
 * @description
 * # wineBrainApp
 *
 * Main module of the application.
 */
angular
    .module('wineBrainApp', [
        'WB.Services',
        'WB.Widgets',
        'WB.Templates',
        'WB.Constants',

        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
		'ionic',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider, $compileProvider, PATH, USER_ROLES) {

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);

        $locationProvider.html5Mode(
	        {
		        enabled: true,
		        requireBase: false
	        }
        ).hashPrefix('!');

		$ionicConfigProvider.views.maxCache(0);


		///////////////////
        // States Config //
        ///////////////////

        // For any unmatched url, redirect to root
        $urlRouterProvider.otherwise('/');

        $stateProvider

            ///////////////////
            //Base Home State//
            ///////////////////
            .state('home', {
                abstract: true,
                url: '/',
                views: {
                    '': {
                        templateUrl: PATH.templates + 'main-content.tpl.html'
                    },
                    'nav-bar@home': {
                        templateUrl: PATH.widgets + 'nav-bar/nav-bar.tpl.html',
                        controller: 'NavBarController as navBarCtrl'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.search', {
                url: '',
                views: {
                    'content@home': {
                        template:'<wb-search-form></wb-search-form>',
                        controller: 'SearchStateController',
                        resolve: {
                            resolveWines: function (wbSearch) {
                                return wbSearch.findAllWineNames();
                            }
                        }
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.results', {
                url: 'show-the-brain/{searchTerm}',
                views: {
                    'content@home': {
                        controller: 'ShowWinesController as showWinesCtrl',
                        templateUrl: PATH.widgets + 'results/show-wines.tpl.html',
                        resolve: {
                            results: function (wbSearch, $stateParams, $ionicLoading) {
                                $ionicLoading.show({
                                    template: 'Down the hatch!'
                                });

                                if($stateParams.searchTerm === 'all') {
                                    return wbSearch.findAllWines();
                                } else {
                                    return wbSearch.findByName($stateParams.searchTerm)
                                }
                            }
                        }
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.crud', {
                url: 'change-the-brain',
                views: {
                    'content@home': {
                        controller: 'CrudController as crudCtrl',
                        templateUrl: PATH.widgets + 'crud/crud.tpl.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
    })

    .run(function ($rootScope, $state, $stateParams, $ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function () {

            if(window.StatusBar) {
                StatusBar.styleDefault();
            }

        });




        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
