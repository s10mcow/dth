(function () {
    'use strict';

    angular.module('WB.Services.Camera', [])
        .factory('wbCamera', wbCamera);

    wbCamera.$inject = ['$q'];

    function wbCamera($q) {

        var service = {};

        service.getPicture = getPicture;

        return service;



        function getPicture() {
            var deferred = $q.defer();

            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                targetWidth: 400,
                targetHeight: 400,
                allowEdit: true
            };

            //Access the camera api
            navigator.camera.getPicture(onSuccess, onError, options);

            //Success handler
            function onSuccess(imageData) {
                var image = "data:image/jpeg;base64," + imageData;
                deferred.resolve(image);
            }

            //Error handler
            function onError(err) { deferred.reject(err); }

            //Return the promise
            return deferred.promise;
        }


    }


}());


