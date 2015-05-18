angular.module('reevioDemoApp', [])
.directive('reevioRating', function () {
  return {
    restrict: 'A',
    scope:{
        value:'=reevioRating'
    },
    templateUrl:'src/reevioRating.partial.html',
    link: function ($scope, element, attrs) {      
      $scope.stars=new Array(parseInt(attrs.reevioRatingLength)); 
      $scope.disabled=(attrs.reevioRatingDisabled=="true")?true:false; 
      $scope.userChoice=false;
      $scope.hoverValue=0;
      
      $scope.starHover=function(i){
        if($scope.disabled) return;
        $scope.hoverValue=i+1;      
      }
      $scope.stopHover=function(){
        if($scope.disabled) return;
        $scope.hoverValue=0;      
      }
      $scope.starClick=function(i){
        if($scope.disabled) return;
        $scope.value=i+1;
        $scope.userChoice=true;
      }
    }
  }
})
