angular.module('cp_app').controller('proposal_ctrl', function($scope, $rootScope){
    debugger;
    $rootScope.siteURL = siteURL;
    $rootScope.proposalDetails = {};

    $scope.getProposalDetails = function(){
        debugger;

        ApplicantPortal_Contoller.getProjectdetils($rootScope.userId, function(result, event){
            if(event.status){
                $scope.proposalDetails = result;
                $scope.$apply();
            }
        },
        {escape: true}
        )
    }

    $scope.getProposalDetails();

    $scope.saveProposalDetails = function(){
        debugger;
        ApplicantPortal_Contoller.insertProjectDetails($scope.proposalDetails, function(result, event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('Participants');
                $scope.proposalDetails = result;
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
})