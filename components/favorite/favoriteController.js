'use strict';

cs142App.controller('favoriteController', ['$scope', '$resource','$location','$rootScope',
    function ($scope,$resource,$location,$rootScope) {
        $scope.fav={};

        $scope.fav.delete= function (photo) {

            var deletePhoto=$resource('/deleteFavorite/'+photo.id);
            var response=deletePhoto.save({}, function () {
                if(response.id){
                    window.alert('Delete success');
                    $rootScope.$broadcast('getFav');
                }
            },function(err){
                console.error(err);
            })
        }

        $scope.$on('getFav',function(){
            var favPhoto=$resource('/user/'+$scope.main.loggedUser._id);

            var response=favPhoto.get({}, function () {
                $scope.fav.photos=response.favorite;
                console.log($scope.fav.photos);
            },function(err){
                console.error(err);
            });
        });

        var favPhoto=$resource('/user/'+$scope.main.loggedUser._id);

        var response=favPhoto.get({}, function () {
            $scope.fav.photos=response.favorite;
            console.log($scope.fav.photos);
        },function(err){
            console.error(err);
        });


    }
]);
