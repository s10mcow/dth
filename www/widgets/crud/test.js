var myPopup = $ionicPopup.show({
    title: 'Maak uw keuze',
    scope: $scope,
    buttons: [
        {
            text: '<b>take picture<b>',
            type: 'button-positive',
            onTap: function(e) {
                $scope.takePicture(Camera.PictureSourceType.CAMERA)
            }
        },
        {
            text: '<b>from gallery</b>',
            type: 'button-positive',
            onTap: function(e) {
                $scope.takePicture(Camera.PictureSourceType.PHOTOLIBRARY)
            }
        },
    ]
});
myPopup.then(function(res) {
    console.log('Tapped!', res);
});

};

$scope.takePicture = function(option) {




    $scope.data = {};
    $scope.data.slides = [];


    var options = {
        quality : 75,
        destinationType : Camera.DestinationType.FILE_URI,
        allowEdit : true,
        targetWidth : 500,
        targetHeight : 500,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
    };
    options.sourceType = option;

    $cordovaCamera.getPicture(options).then(function(FILE_URI) {
        // Success! Image data is here
        $scope.img = FILE_URI;

        $scope.alerts.img = true;

    }, function(err) {
        // An error occured. Show a message to the user
    });
};

$scope.sendPicture = function() {
    $scope.options = {};
    $scope.options.fileKey = "file";
    $scope.options.fileName = $scope.img.substr($scope.img.lastIndexOf('/') + 1);
    $scope.options.mimeType = "image/jpeg";
    $scope.options.params = {'cat':$scope.alerts.cat,'id':$scope.newid}; // if we need to send parameters to the server request

    // parameters: source, filePath, options
    $cordovaFile.uploadFile("*** YOUR API ", $scope.img, $scope.options).then(function(result) {
        // Success!
    }, function(err) {
        // An error occured. Show a message to the user
    });

}
