'use strict';

cs142App.controller('UserDetailController', ['$scope', '$routeParams','$resource',
  function ($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    $scope.dt={};
    var userId = $routeParams.userId;
    //$scope.dt.userDetail=window.cs142models.userModel(userId);

    $scope.dt.userDetail={};

    var photos=  $resource('/photosOfUser/'+userId);

    var response=photos.query({}, function () {
        if(response) {
            $scope.dt.recent = response[0];
            $scope.dt.most = response[0];
            var mostRecent = response[0].date_time;
            var mostComment = response[0].comments.length;
            for (var i = 0; i < response.length; i++) {
                var photo = response[i];
                if (photo.date_time > mostRecent) {
                    mostRecent = photo.date_time;
                    $scope.dt.recent = photo;
                }
                if (photo.comments.length > mostComment) {
                    mostComment = photo.comments.length;
                    $scope.dt.most = photo;
                }
            }
        }

    },function(err){
        console.error(err);
    });
    //refresh after upload a new photo
    $scope.$on('addcomment', function () {
        var photos=  $resource('/photosOfUser/'+userId);

        var response=photos.query({}, function () {
            if(response) {
                $scope.dt.recent = response[0];
                $scope.dt.most = response[0];
                var mostRecent = response[0].date_time;
                var mostComment = response[0].comments.length;
                for (var i = 0; i < response.length; i++) {
                    var photo = response[i];
                    if (photo.date_time > mostRecent) {
                        mostRecent = photo.date_time;
                        $scope.dt.recent = photo;
                    }
                    if (photo.comments.length > mostComment) {
                        mostComment = photo.comments.length;
                        $scope.dt.most = photo;
                    }
                }
            }

        },function(err){
            console.error(err);
        });

    });

    function detailCallback(model){
        $scope.$apply(function () {
            var temp=JSON.parse(model.responseText);
            for(var key in temp){
                if(key== 'id' || key== 'first_name' || key== 'last_name' || key== 'location' || key=='description' || key=='occupation'){
                    $scope.dt.userDetail[key]=temp[key];
                }

            }

            //console.log($scope.dt.userDetail);


            $scope.main.user= $scope.dt.userDetail.first_name+' '+$scope.dt.userDetail.last_name;

            $scope.main.currUser=$scope.dt.userDetail;
            //console.log($scope.main.currUser);

            
        });
    }

    $scope.FetchModel('/user/'+userId,detailCallback);

    // console.log('UserDetail of ', userId);

    // console.log('window.cs142models.userModel($routeParams.userId)',
    //     window.cs142models.userModel(userId));


  }]);
