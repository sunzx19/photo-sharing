'use strict';


cs142App.controller('searchCommentController', ['$scope','$rootScope','$location','$resource',
    function ($scope, $rootScope,$location,$resource) {
        $scope.sr={};
        $scope.sr.click=function(){
            $rootScope.$broadcast('addcomment');
        }

        var search=$resource('/commentSearch/'+$scope.main.key);
        var response=search.query({}, function () {
            //console.log(response);
            $scope.sr.photos=response;
            console.log($scope.sr.photos);
            var array=$scope.main.key.split(' ');
            console.log(array);

            for (var i=0;i<$scope.sr.photos.length;i++){
                var comments=$scope.sr.photos[i].comments;
                for (var j=0;j<comments.length;j++){
                    console.log(comments[j]);
                    var h=0;

                    for (h=0;h<array.length;h++){
                        if (comments[j].comment.toLowerCase().indexOf(array[h].toLowerCase()) !== -1){

                            break;

                        }
                    }
                    console.log(h);
                    if(h===array.length){
                        comments.splice(j,1);
                        j--;

                    }


                }
            }
        },function(err){
            console.error(err);
        });
        $scope.$on('search', function () {
            var search=$resource('/commentSearch/'+$scope.main.key);
            var response=search.query({}, function () {
                //console.log(response);
                $scope.sr.photos=response;
                console.log($scope.sr.photos);
                var array=$scope.main.key.split(' ');
                console.log(array);

                for (var i=0;i<$scope.sr.photos.length;i++){
                    var comments=$scope.sr.photos[i].comments;
                    for (var j=0;j<comments.length;j++){
                        console.log(comments[j]);
                        var h=0;

                        for (h=0;h<array.length;h++){
                            if (comments[j].comment.toLowerCase().indexOf(array[h].toLowerCase()) !== -1){

                                break;

                            }
                        }
                        console.log(h);
                        if(h===array.length){
                            comments.splice(j,1);
                            j--;

                        }


                    }
                }
            },function(err){
                console.error(err);
            });
        } )
        }

]);
