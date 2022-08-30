angular.module('cp_app').controller('participant_ctrl', function($scope,$rootScope){
    debugger;
    $scope.siteURL = siteURL;
    $scope.indianList = [];
    $scope.germanList = [];
    $scope.listOfAllContacts = [];
    $scope.indian;
    $scope.german;

    $scope.getParticipantDetails = function(){
        debugger;
        ApplicantPortal_Contoller.getParticipantDetails($rootScope.userId, function(result, event){
            if(event.status){
                debugger;
                $scope.applicantDetails = result;
                for(i=0;i<$scope.applicantDetails.length;i++){
                    var indianParticipants = {"LastName": $scope.applicantDetails[i].LastName,"Phone": $scope.applicantDetails[i].Phone,"Affiliation__c": " ","Email": " "};
                    var germanParticipants = {"LastName": $scope.applicantDetails[i].LastName,"Phone": $scope.applicantDetails[i].Phone,"Affiliation__c": " ","Email": " "};
                    if($scope.applicantDetails[i].Indian__c == true){
                        $scope.indianList = $scope.applicantDetails[i].Contacts1__r;
                        $scope.indian = $scope.applicantDetails[i];
                        
                    }else if($scope.applicantDetails[i].German__c == true){
                        $scope.germanList = $scope.applicantDetails[i].Contacts1__r;
                        $scope.german = $scope.applicantDetails[i];
                    }
                }
                $scope.$apply();
            }
        },
        {escape: true}
        )
    }
    $scope.getParticipantDetails();

    $scope.saveDetails = function(){
        debugger;
        $scope.listOfAllContacts = $scope.indianList.concat($scope.germanList);
        // $scope.listOfAllContacts.push($scope.indianList);
        // $scope.listOfAllContacts.push($scope.germanList);
        for(let i=0; i<$scope.listOfAllContacts.length; i++){
            //delete (listOfAllContacts[i]['Name']);
            delete ($scope.listOfAllContacts[i]['$$hashKey']);
        }
        ApplicantPortal_Contoller.insertParticipants($scope.listOfAllContacts, function(result, event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('Curriculum_vitae');
                $scope.listOfAllContacts = result;
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

    $scope.addIndianRow = function () {
        debugger;
        var contactRec = {
            'LastName': '',
            'Affiliation__c': '',
            'Email': '',
            'Phone': '',
            'Presenting_Workshop__c': '',
            'Host_Details__c': $scope.indian.Id
        };
        $scope.indianList.push(contactRec);
    }

    $scope.deleteIndianRow = function (index) {
        if ($scope.indianList.length > 1){
            if($scope.indianList[index].Id != undefined){
                $scope.deleteParticipant($scope.indianList[index].Id);
            }
            $scope.indianList.splice(index, 1);
        }
    }

    $scope.addGermanRow = function () {
        debugger;
        var contactRec = {
            'LastName': '',
            'Affiliation__c': '',
            'Email': '',
            'Phone': '',
            'Presenting_Workshop__c': '',
            'Host_Details__c': $scope.german.Id
        };
        $scope.germanList.push(contactRec);
    }

    $scope.deleteGermanRow = function (index) {
        if ($scope.germanList.length > 1)
            $scope.germanList.splice(index, 1);

    }

    $scope.deleteParticipant = function(conid){
        ApplicantPortal_Contoller.deleteParticipant(conid, function (result, event) {
            if (event.status) {
                debugger;
                Swal.fire(
                    'Success',
                    'Deleted Succesfully.',
                    'success'
                );
                $scope.$apply();
            }
        }, {
            escape: true
        })
    }
})