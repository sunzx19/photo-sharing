'use strict';


cs142App.controller('UserListController', ['$scope','$rootScope','$location',
    function ($scope, $rootScope,$location) {
        $scope.$on('LoggedIn', function(){
            $scope.main.title = 'Users';

            $scope.ul={};



            $scope.ul.searchComment=function(){
                $location.path("/searchComment");
                $rootScope.$broadcast('search');
            }



            //console.log('window.cs142models.userListModel()', window.cs142models.userListModel());

            //$scope.ul.users=window.cs142models.userListModel();

            function listCallback(model){
            	$scope.$apply(function () {
                    if(model.responseText){
                    $scope.ul.users=JSON.parse(model.responseText);
                    $scope.main.userList=$scope.ul.users;
                    //console.log('refetch');
                    }
                });
            	
            }

            $scope.FetchModel('/user/list',listCallback);
        });
        

        

    }]);

