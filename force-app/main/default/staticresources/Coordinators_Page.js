angular.module('cp_app').controller('coordinators_ctrl',function($scope,$rootScope) {

    debugger;
    $scope.siteURL = siteURL;
    $scope.indianCoDetails = {};
    $scope.germanCoDetails = {};
    $scope.allCoordinatorDetails = [];

    $scope.getCoordinatorsDetails = function(){
        debugger;
        ApplicantPortal_Contoller.getCoordinatorsDetails($rootScope.userId, function(result, event){
            if(event.status){
                debugger;
               // $scope.contactDetails = result;

               //run a loop on result to check indian or german
               for(i=0;i<result.length;i++){
                if(result[i].Indian__c == true){
                    $scope.indianCoDetails = result[i];
                   }else{
                    $scope.germanCoDetails = result[i];
                   }
               }
                $scope.$apply();
            }
        },
        {escape: true}
        )
    }
    $scope.getCoordinatorsDetails();
    $scope.saveDetails = function(){
        debugger;
        if($scope.indianCoDetails.Proposals__c != undefined || $scope.indianCoDetails.Proposals__c != ""){
            $scope.germanCoDetails.Proposals__c = $scope.indianCoDetails.Proposals__c;
        }else if($scope.germanCoDetails.Proposals__c != undefined || $scope.germanCoDetails.Proposals__c != ""){
            $scope.indianCoDetails.Proposals__c = $scope.germanCoDetails.Proposals__c;
        }
        $scope.allCoordinatorDetails.push($scope.indianCoDetails);
        $scope.allCoordinatorDetails.push($scope.germanCoDetails);
        ApplicantPortal_Contoller.insertCoordinatorsInformation($scope.allCoordinatorDetails, function(result, event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('Proposal_Details');
                $scope.allCoordinatorDetails = result;
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