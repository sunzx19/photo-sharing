'use strict';

cs142App.controller('LoginRegisterController', ['$scope', '$resource','$location','$rootScope',
  function ($scope,$resource,$location,$rootScope) {

    $scope.login={};
    $scope.login.username='';
    $scope.login.password='';
    $scope.login.submit=function(){
      var submit=$resource("/admin/login");
      var response=submit.save({login_name:$scope.login.username, password:$scope.login.password},function(){
        //console.log($scope.login.username,$scope.login.password);
        $scope.main.logged='Hi '+response.first_name+' !';
        $scope.main.logout=true;
        $scope.main.loggedUser=response;

        $location.path('/users/'+response._id);

        $rootScope.$broadcast('LoggedIn');
      },function(err){
        console.error(err);
      })
    };

    $scope.login.wannaReg=false;

    $scope.reg={};
    $scope.reg.login_name='';
    $scope.reg.password='';
    $scope.reg.password_re='';
    $scope.reg.first_name='';
    $scope.reg.last_name='';
    $scope.reg.location='';
    $scope.reg.description='';
    $scope.reg.occupation='';

    $scope.reg.register=function(){
      if($scope.reg.password!==$scope.reg.password_re){
        window.alert('The two passwords must be the same!');
      }else{
        var submit=$resource("/user");
        var response=submit.save({
          login_name:$scope.reg.login_name,
          password:$scope.reg.password,
          first_name:$scope.reg.first_name,
          last_name:$scope.reg.last_name,
          location:$scope.reg.location,
          description:$scope.reg.description,
          occupation:$scope.reg.occupation
        },function(){


          if(response.id){
            window.alert('Registration success! Please log in!');

            $scope.reg.login_name='';
            $scope.reg.password='';
            $scope.reg.password_re='';
            $scope.reg.first_name='';
            $scope.reg.last_name='';
            $scope.reg.location='';
            $scope.reg.description='';
            $scope.reg.occupation='';

            $rootScope.$broadcast('register');

          }else{
            window.alert('Registration failed!');
          }
          
        },function(err){
          console.error(err);
        })
      }
    };

    $scope.reg.wannaRegister=function(){
      $scope.login.wannaReg=true;
    };




  }]);