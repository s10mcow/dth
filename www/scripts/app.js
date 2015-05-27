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
        'WB.Core',
        'WB.Vendors'
    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider, $compileProvider, RestangularProvider, PATH, USER_ROLES, API_URL) {

        RestangularProvider.setBaseUrl(API_URL);

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
                            resolveWines: function (wbWines) {
                                return wbWines.one('names').getList();
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
                            results: function (wbWines, $stateParams, $ionicLoading) {
                                $ionicLoading.show({
                                    template: 'Down the hatch!'
                                });

                                if($stateParams.searchTerm === 'all') {
                                    return wbWines.getList();
                                } else {
                                    return wbWines.one('names').all($stateParams.searchTerm).getList()
                                }
                            }
                        }
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.profile', {
                url: 'profile',
                views: {
                    'content@home': {
                        controller: 'ProfileController as profileCtrl',
                        templateUrl: PATH.widgets + 'profile/profile.tpl.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.user]
                }
            })

            .state('home.login', {
                url: 'login',
                views: {
                    'content@home': {
                        controller: 'LoginController as loginCtrl',
                        templateUrl: PATH.widgets + 'login/login.tpl.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.crud', {
                url: 'change-the-brain/',
                abstract: true,
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.crud.add', {
                url: 'add',
                views: {
                    'content@home': {
                        controller: 'CrudController as crudCtrl',
                        templateUrl: PATH.widgets + 'crud/crud-add.tpl.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.crud.edit', {
                url: 'edit',
                views: {
                    'content@home': {
                        controller: 'CrudController as crudCtrl',
                        templateUrl: PATH.widgets + 'crud/crud-edit.tpl.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .state('home.crud.delete', {
                url: 'delete',
                views: {
                    'content@home': {
                        controller: 'CrudController as crudCtrl',
                        templateUrl: PATH.widgets + 'crud/crud-delete.tpl.html'
                    }
                },
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

    })

    .run(function ($rootScope, $state, $stateParams, $ionicPlatform) {
        $ionicPlatform.ready(function () {

            if(window.StatusBar) {
                StatusBar.styleDefault();
            }

            var appID = 684841048311727;
            var version = "v2.3"; // or leave blank and default is v2.0
            facebookConnectPlugin.browserInit(appID, version);

        });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
