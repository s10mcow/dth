(function () {
	'use strict';

	var app = angular.module('WB.Widgets');

    app.controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$log', '$cordovaFacebook', '$ionicLoading', 'wbUsers', 'wbProfile', 'wbWines'];

	function ProfileController($log, $cordovaFacebook, $ionicLoading, wbUsers, wbProfile, wbWines) {

        var vm = this;

        vm.user = {};
        vm.getName = getName;

        $cordovaFacebook.api('me')
            .then(getMe)
            .then(amIinDB)
            .then(setUser)
            .then(setFavs)
            .catch(error);


        function getName(wine) {
            $log.debug(wine);
            //return wbWines.one(wine).get();

        }

        function getMe(me) {
            vm.user.firstName = me.first_name;
            vm.user.lastName = me.last_name;
            vm.user.email = me.email;
            vm.user.name = me.name;
            vm.user.id = me.id;
            return wbUsers.one(me.id).get();
        }


        function amIinDB(user) {

            if(!user) {
                var info = {
                    _id: vm.user.id,
                    email: vm.user.email,
                    name: vm.user.name,
                    firstName: vm.user.firstName,
                    lastName: vm.user.lastName
                };

                return wbUsers.post(JSON.stringify(info));

            } else {

                user._id = vm.user.id;
                user.email = vm.user.email;
                user.name = vm.user.name;
                user.firstName = vm.user.firstName;
                user.lastName = vm.user.lastName;

                return user.put();
            }
        }

        function setUser(user) {
            var favorites = user[0].favorites;
            wbProfile.user(user[0]);
            var getFavs = wbWines.one('fav');
            getFavs.favs = favorites;
            return getFavs.post();
        }

        function setFavs(favs) {
            vm.user.favorites = favs;
            $ionicLoading.hide();
        }


        function error(err) {
            $log.debug(err);
        }


	}

}());
