'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/login-register',{
                templateUrl: 'components/login-register/login-registerTemplate.html',
                controller: 'LoginRegisterController'
            }).
            when('/favorites',{
                templateUrl: 'components/favorite/favoriteTemplate.html',
                controller: 'favoriteController'
            }).
            when('/searchComment',{
                templateUrl: 'components/search-comment/searchCommentTemplate.html',
                controller: 'searchCommentController'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$rootScope', '$location', '$resource', '$http',
    function ($scope, $rootScope, $location, $resource, $http) {
        $scope.main = {};
        $scope.main.title = {title: 'Users'};

        $scope.main.user= '';

        $scope.main.currUser={};

        $scope.main.loggedUser={};

        $scope.main.logged='Please Login';
        $scope.main.logout=false;

        $scope.main.key=''; //Search keyword



        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if (!$scope.main.logout) {
             // no logged user, redirect to /login-register unless already there
            if (next.templateUrl !== "components/login-register/login-registerTemplate.html") {
                $location.path("/login-register");
            }
          }
        });

        $scope.main.logoutfunc=function(){

            $scope.main.logged='Please Login';
            $scope.main.logout=false;
            var logout=$resource('/admin/logout');
            logout.save({},function(){$rootScope.$broadcast('LoggedIn');},function(err){console.error(err);});
            $location.path('/login-register');

            
        }
        

        
        function Callback(model){
            $scope.$apply(function () {
                
                $scope.main.info=JSON.parse(model.responseText);
                $scope.main.version=$scope.main.info.version;
                
            });
        
        }

         /*
          * FetchModel - Fetch a model from the web server.
          *   url - string - The URL to issue the GET request.
          *   doneCallback - function - called with argument (model) when the
          *                  the GET request is done. The argument model is the object
          *                  containing the model. model is undefined in the error case.
          */
        $scope.FetchModel = function(url, doneCallback) {
            var xhr;
            xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function() {
                //Don’t do anything if not final state
                
                if (this.readyState !== 4){
                    return; 
                }
                //Final State but status not OK
                if (this.status !== 200) {
                    return;
                }
                //Final State & status OK
                if (this.readyState === 4 && this.status === 200){
                    doneCallback(this);
                }
            }
            xhr.open("GET", url);
            xhr.send();
            
        };
        
        $scope.FetchModel('/test/info',Callback);


        var selectedPhotoFile;   // Holds the last file selected by the user

        // Called on file selection - we simply save a reference to the file in selectedPhotoFile
        $scope.inputFileNameChanged = function (element) {
            selectedPhotoFile = element.files[0];
        };

        // Has the user selected a file?
        $scope.inputFileNameSelected = function () {
            return !!selectedPhotoFile;
        };

        // Upload the photo file selected by the user using a post request to the URL /photos/new
        $scope.uploadPhoto = function () {
            if (!$scope.inputFileNameSelected()) {
                console.error("uploadPhoto called will no selected file");
                return;
            }
            console.log('fileSubmitted', selectedPhotoFile);

            // Create a DOM form and add the file to it under the name uploadedphoto
            var domForm = new FormData();
            domForm.append('uploadedphoto', selectedPhotoFile);

            // Using $http to POST the form
            $http.post('/photos/new', domForm, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function(newPhoto){
                // The photo was successfully uploaded. XXX - Do whatever you want on success.
                window.alert('Upload success!');
                $rootScope.$broadcast('addcomment');
            }).error(function(err){
                // Couldn't upload the photo. XXX  - Do whatever you want on failure.
                console.error('ERROR uploading photo', err);
            });

        };
               
        
    }]);

    

