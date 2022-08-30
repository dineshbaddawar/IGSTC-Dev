angular.module('cp_app').controller('basicDetails_ctrl',function($scope, $rootScope){
    debugger;

    $scope.siteURL = siteURL;
    $rootScope.userId;
    $rootScope.siteURL;
    $rootScope.contactId;
    $scope.proposedDate;

    $scope.getApplicantProjectDetails = function(){
        ApplicantPortal_Contoller.getBasicDetails($rootScope.userId, function(result,event){
            if(event.status){
                debugger;
                    $rootScope.projectId = result.Id;
                    $scope.proposedDate = new Date(result.Proposed_Date__c);
                    $scope.applicantDetails = result;
                    $scope.$apply();
                }
        },
        {escape: true}
        )
    }
    $scope.getApplicantProjectDetails();

    $scope.applicantDetails = {};

    $scope.saveBasicDetails = function(){
        $scope.applicantDetails.Campaign__c = $rootScope.tagCampaignId;
        debugger;

        if($scope.proposedDate== undefined)
                    {
                        Swal.fire(
                          '',
                        'Please enter Proposed Date',
                        'error'
                        );
                            return;
                    }

                    if($scope.proposedDate != undefined || $scope.proposedDate != ""){
                        var year = $scope.proposedDate.getUTCFullYear();
                        var month = $scope.proposedDate.getUTCMonth()+1;
                        var day = $scope.proposedDate.getDate();
                    }else{
                        var year = 0;
                        var month = 0;
                        var day = 0;
                    }

        ApplicantPortal_Contoller.insertBasicDetails($scope.applicantDetails,day,month,year,$rootScope.contactId, function(result, event){
            if(event.status && result != null){
                debugger;
                Swal.fire(
                    'SUCCESS',
                    'Your Proposal is submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('Coordinators_Page');
                $rootScope.projectId = result;
                $scope.$apply();
            }
        },
        {escape: true}
        )
    }

    $scope.redirectPageURL = function(pageName){
        debugger;
        var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href="#/"+pageName;
        link.click();
    }

});