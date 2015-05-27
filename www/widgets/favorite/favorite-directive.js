(function () {

    'use strict';

    var app = angular.module('WB.Widgets');

    app.directive('wbFavorite', wbFavorite);

    wbFavorite.$inject = ['wbProfile'];

    function wbFavorite(wbProfile) {

        var linker = function (scope, element, attr, favCtrl) {
            var user = wbProfile.user();

            favCtrl.init(element);

            setUpClasses(element);

            function setUpClasses(el) {
                user.favorites.forEach(function (fav) {
                    if(fav === favCtrl.wine._id) {
                        el.toggleClass('ion-android-favorite-outline');
                        el.toggleClass('ion-android-favorite');
                        el.toggleClass('active');
                    }
                })
            }
        };

        return {
            restrict: 'E',
            link: linker,
            scope: {
                wine: '='
            },
            controller: 'FavoriteController as favCtrl',
            bindToController: true,
            replace: true,
            template: '<a class="favorite button button-icon icon ion-android-favorite-outline" ng-click="favCtrl.addFavorite(favCtrl.wine)"></a>'
        }

    }



    app.controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['favService', '$log'];

    function FavoriteController(favService, $log) {

        var vm = this;

        vm.init = init;
        vm.addFavorite = addFavorite;

        function init(element, item) {
            favService.init(element, item);
        }

        function addFavorite(item) {
            favService.addFavorite(item);
        }

    }

    app.factory('favService', favService);

    favService.$inject = ['wbProfile', '$log', 'wbUsers'];

    function favService(wbProfile, $log, wbUsers) {

        var service = {};
        var item;
        var user = wbProfile.user();
        var wbFav = wbUsers.one(user._id);

        service.init = init;
        service.addFavorite = addFavorite;


        function addFavorite(i) {
            item = i;
        }

        function init(el, i) {
            item = i;
            clickEvent(el);
        }



        function clickEvent(el) {
            el.on('click', function (e) {
                el.toggleClass('ion-android-favorite-outline');
                el.toggleClass('ion-android-favorite');
                el.toggleClass('active');

                var edit = el.hasClass('active') ? add : remove;

                edit(item).then(function (userInfo) {
                    wbProfile.user(userInfo);
                });
            });
        }

        function add(item) {
            return wbFav.one('fav', item._id).post();
        }

        function remove(item) {
            return wbFav.one('fav', item._id).remove()
        }


        return service;

    }

}());
