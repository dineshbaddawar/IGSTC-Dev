angular.module('cp_app').controller('EmploymentDetails_Ctrl', function($scope,$rootScope) {
    $scope.objContact={};    
    $scope.getCotactDet=function(){
        IndustrialFellowshipController.getContactEmployement($rootScope.userId, function (result, event) {
            console.log(result);
            console.log(event);
            debugger
            $scope.objContact=result;
            $scope.available_followship=$rootScope.available_followship;
            $scope.associated_with_igstc=$rootScope.associated_with_igstc;
            $scope.nature_of_Job=$rootScope.nature_of_Job;
            $scope.$apply();
        });
    }
    $scope.clickEmploymentDetails=function(){
        debugger
        IndustrialFellowshipController.saveContactEmployement($rootScope.userId,$scope.objContact, function (result, event) {
            debugger;
            console.log(result);
            console.log(event);
            if (event.status) {
                swal({
                  title: "Employment Details",
                  text: result,
                  icon: "success",
                  button: "ok!",
                }).then((value) => {
                      var link=document.createElement("a");
                      link.id = 'someLink'; //give it an ID!
                      link.href="#/FellowshipDetailsIF";
                      link.click();
                    });
              }
              else
              {
                swal({
                  title: "Employment Details",
                  text: "Exception!",
                  icon: "error",
                  button: "ok!",
                });
              }
        });
    }
    $scope.clickPreviousEmploymentDetails=function(){
        var link=document.createElement("a");
                      link.id = 'someLink'; //give it an ID!
                      link.href="#/AchievementsIF";
                      link.click();
    }
    $scope.getCotactDet();
});