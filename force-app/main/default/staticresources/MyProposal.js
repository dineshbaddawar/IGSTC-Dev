angular.module('cp_app').controller('myProp_ctrl', function($scope,$rootScope) {
    debugger;
    $rootScope.activeTab = 0;
    $rootScope.projectId;
    $scope.fetchProjectDetails = function(){
        debugger;
        ApplicantPortal_Contoller.fetchProjectDetails(projectId, function(result, event){
            debugger;
            if(event.status & result != null){
                debugger;
                $scope.project = result;
                $scope.$apply();
            }
        },
        {escape: true}
        )
    }
    $scope.fetchProjectDetails();
   
    $scope.redirectPageURL = function(pageName){
        debugger;
        var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href="#/"+pageName;
        link.click();
    }
});