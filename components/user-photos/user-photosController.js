'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams','$resource','$rootScope',
  function($scope, $routeParams,$resource,$rootScope) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
    $scope.ph={};

    $scope.ph.newComment='';
    $scope.ph.disabled={};
    $scope.ph.addComment=function(photo){
      
      var add=$resource("/commentsOfPhoto/"+photo.id);
      var response=add.save({comment:$scope.ph.newComment},function(){
        $rootScope.$broadcast('addcomment');
        $scope.ph.newComment='';
      },function(err){
        console.error(err);
      })
    }

      $scope.ph.favorite= function (photo) {
          console.log(photo);
          var add=$resource("/addFavorite/"+photo.id);
          var response=add.save({photo:photo},function(){
              if(response.id) {

                  window.alert('Add success!');

                  $scope.ph.disabled[photo.id] = true;
                  $rootScope.$broadcast('getFav');
              }else{
                  window.alert('This photo is already your favorite!');
                  $scope.ph.disabled[photo.id]=true;

                  $rootScope.$broadcast('getFav');
              }

          },function(err){
              console.error(err);
          })
      }

      var photos=  $resource('/photosOfUser/'+userId);

      var response=photos.query({}, function () {
          $scope.ph.photoOfUser=response;
          $scope.main.user='Photos of '+ $scope.ph.photoOfUser[0].user.first_name+' '+ $scope.ph.photoOfUser[0].user.last_name;
          $scope.ph.title=$scope.ph.photoOfUser[0].user.first_name+' '+ $scope.ph.photoOfUser[0].user.last_name+" 's photos";
          $scope.ph.exist=true;



      },function(err){
          $scope.ph.title='No photos yet. Please upload!';
          $scope.ph.exist=false;
          console.error(err);
      });
      $scope.$on('addcomment',function(){
          var photos=  $resource('/photosOfUser/'+userId);

          var response=photos.query({}, function () {
              $scope.ph.photoOfUser=response;
              $scope.main.user='Photos of '+ $scope.ph.photoOfUser[0].user.first_name+' '+ $scope.ph.photoOfUser[0].user.last_name;
              $scope.ph.title=$scope.ph.photoOfUser[0].user.first_name+' '+ $scope.ph.photoOfUser[0].user.last_name+" 's photos";
              $scope.ph.exist=true;



          },function(err){
              $scope.ph.title='No photos yet. Please upload!';
              $scope.ph.exist=false;
              console.error(err);
          });
      });

    //function photoCallback(model){
    //
    //    $scope.$apply(function () {
    //        $scope.ph.photoOfUser=JSON.parse(model.responseText);
    //
    //        //console.log($scope.main.currUser);
    //
    //
    //
    //        $scope.main.user='Photos of '+ $scope.ph.photoOfUser[0].user.first_name+' '+ $scope.ph.photoOfUser[0].user.last_name;
    //
    //    });
    //}
    //
    //$scope.FetchModel('/photosOfUser/'+userId, photoCallback);
    //
    //$scope.$on('addcomment',function(){
    //
    //  $scope.FetchModel('/photosOfUser/'+userId, photoCallback);
    //})



  }]);
