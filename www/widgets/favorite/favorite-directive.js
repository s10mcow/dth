(function () {

    'use strict';

    var app = angular.module('WB.Widgets');

    app.directive('wbFavorite', wbFavorite);

    wbFavorite.$inject = [];

    function wbFavorite() {

        var linker = function (scope, element, attr, favCtrl) {
            favCtrl.init(element);
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

        function init(element) {
            favService.init(element);
        }

        function addFavorite(item) {
            favService.addFavorite(item);
        }
    }

    app.service('favService', favService);

    favService.$inject = ['wbProfile', '$log', 'wbUsers'];

    function favService(wbProfile, $log, wbUsers) {

        var service = {};
        var item;
        var wbFav = wbUsers.one(wbProfile.user()[0]._id);

        service.init = init;
        service.addFavorite = addFavorite;


        function init(el) {

            clickEvent(el);
        }

        function clickEvent(el) {
            el.on('click', function (e) {
                el.toggleClass('ion-android-favorite-outline');
                el.toggleClass('ion-android-favorite');
                el.toggleClass('active');
                el.hasClass('active') ? add(item) : remove(item);
            });
        }

        function addFavorite(i) {
            item = i;
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
