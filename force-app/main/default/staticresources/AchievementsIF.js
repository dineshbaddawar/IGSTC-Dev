angular.module('cp_app').controller('AchievementsIF_Ctrl', function($scope,$rootScope) {
    $scope.objAchiev={};
    $scope.flag='update';
    console.log($rootScope.userHashId);
    $scope.getAchievementsDet=function(){
        IndustrialFellowshipController.getAchievementsDet($rootScope.userId, function (result, event) {
            debugger;
            console.log(result);
            console.log(event);
            if(result!=null && result!=undefined){
                $scope.objAchiev=result;
                $scope.flag='update';
            }
            else
            {
                $scope.objAchiev={
                    Awards_Honours__c:"Hello",
                    Any_other_achievements__c:"",
                    Book_Chapters__c:"",
                    List_of_Patents_filed__c:"",
                    List_of_Publications__c:"",
                    Contact__c:""
                }
                $scope.flag='insert';
            }
            $scope.$apply();
        });
    }
    $scope.upsertAchievements=function(){
        IndustrialFellowshipController.upsertAchievements($rootScope.userId,$scope.objAchiev,$scope.flag, function (result, event) {
        console.log(result);
        console.log(event);
        if (event.status) {
            swal({
              title: "Achievements",
              text: result,
              icon: "success",
              button: "ok!",
            }).then((value) => {
                  var link=document.createElement("a");
                  link.id = 'someLink'; //give it an ID!
                  link.href="#/EmploymentDetailsIF";
                  link.click();
                });
          }
          else
          {
            swal({
              title: "Achievements",
              text: "Exception!",
              icon: "error",
              button: "ok!",
            });
          }
        });
    }
    $scope.clickPreviousAchievements=function(){
        var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href="#/EduQualificationIF";
        link.click();
    }
    $scope.getAchievementsDet();
});