angular.module('cp_app').controller('networkmeet_ctrl', function($scope,$rootScope) {
debugger;
$scope.date;
$scope.siteURL = siteURL;

$scope.getApplicantDetails = function(){
    ApplicantPortal_Contoller.getProjectDetailsForNetMeet($rootScope.userId, function (result, event){
    if(event.status) {
        debugger;
        $scope.applicantDetails = result;
        // for(var i=0;i<$scope.applicantDetails.length;i++){
        //     for(j=0;j<$scope.applicantDetails.Network_Meetings__r.length;j++){
        //         var  networkMeeting = {"Name":$scope.applicantDetails[i].Name,"contact":$scope.applicantDetails[i].Id ,"Meeting_Agenda__c":" ","Meeting_Venue__c": "","Tentative_Date__c": new Date($scope.applicantDetails[i].Network_Meetings__r[0].Tentative_Date__c),"tentativeday": 0, "tentativemonth": 0, "tentativeyear": 0,"Actual_Date__c": new Date($scope.applicantDetails[i].Network_Meetings__r[0].Tentative_Date__c),"actualday": 0, "actualmonth": 0, "actualyear": 0};
        //     if($scope.applicantDetails[i].Network_Meetings__r != undefined && $scope.applicantDetails[i].Network_Meetings__r.length > 0 ){
        //         networkMeeting.Meeting_Agenda__c = $scope.applicantDetails[i].Network_Meetings__r[0].Meeting_Agenda__c;
        //         networkMeeting.Meeting_Venue__c = $scope.applicantDetails[i].Network_Meetings__r[0].Meeting_Venue__c;
        //         if($scope.applicantDetails[i].Network_Meetings__r[0].Tentative_Date__c != undefined){
        //             networkMeeting.Tentative_Date__c = new Date($scope.applicantDetails[i].Network_Meetings__r[0].Tentative_Date__c);
        //         }
        //         if($scope.applicantDetails[i].Network_Meetings__r[0].Actual_Date__c != undefined){
        //             networkMeeting.Actual_Date__c = new Date($scope.applicantDetails[i].Network_Meetings__r[0].Actual_Date__c);
        //         }
        //         networkMeeting.Id = $scope.applicantDetails[i].Network_Meetings__r[0].Id;
        //     }
        //     $scope.meetingList.push(networkMeeting);
        //     }
        // }
        $scope.applicantDetails = result;
        for(var i=0;i<$scope.applicantDetails.length;i++){
            if($scope.applicantDetails[i].Network_Meetings__r != undefined){
                for(j=0;j<$scope.applicantDetails[i].Network_Meetings__r.length;j++){
                    if($scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c != undefined){
                        $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c   = new Date($scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c);
                    }
                    if($scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c != undefined){
                        $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c   = new Date($scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c);
                    }
                }
            }else{
                var netMeeting = [{"meetingAgenda":"","meetingVenue":"","contact":"","id":"","tentativeyear":0,"tentativemonth":0,"tentativeday":0,"actualyear":0,"actualmonth":0,"actualday":0}];

                $scope.applicantDetails[i].Network_Meetings__r =netMeeting;
                
            }

        }
        $scope.$apply();
    }
},
{escape: true}
)
}
$scope.getApplicantDetails();

$scope.submitMeetingDetails = function(){
    debugger;
    $scope.meetingList = [];
    for(let i=0; i<$scope.applicantDetails.length; i++){
        delete ($scope.applicantDetails[i]['Name']);
        delete ($scope.applicantDetails[i]['$$hashKey']);
      
        for(let j=0; j<$scope.applicantDetails[i].Network_Meetings__r.length; j++){
            var networkMeeting = {"meetingAgenda":"","meetingVenue":"","contact":"","id":"","tentativeyear":0,"tentativemonth":0,"tentativeday":0,"actualyear":0,"actualmonth":0,"actualday":0};

            networkMeeting.contact = $scope.applicantDetails[i].Id;
            if($scope.applicantDetails[i].Network_Meetings__r[j].Id != undefined){
                networkMeeting.id = $scope.applicantDetails[i].Network_Meetings__r[j].Id;
                networkMeeting.meetingAgenda = $scope.applicantDetails[i].Network_Meetings__r[j].Meeting_Agenda__c;
                networkMeeting.meetingVenue = $scope.applicantDetails[i].Network_Meetings__r[j].Meeting_Venue__c;
            }else{
                networkMeeting.id = null;
            }

            if($scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c != undefined){
                networkMeeting.tentativeyear = $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c.getUTCFullYear();
                networkMeeting.tentativemonth = $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c.getUTCMonth()+1;
                networkMeeting.tentativeday = $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c.getDate();
            }

            if($scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c != undefined){

                networkMeeting.actualyear = $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c.getUTCFullYear();
                networkMeeting.actualmonth = $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c.getUTCMonth()+1;
                networkMeeting.actualday = $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c.getDate();
                // var networkMeeting = {"Name":$scope.applicantDetails[i].Name,"contact":$scope.applicantDetails[i].Id,
                // // "tentativeyear": $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c.getUTCFullYear(),
                // // "tentativemonth": $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c.getUTCMonth()+1,
                // // "tentativeday": $scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c.getDate(),
                // "actualyear": $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c.getUTCFullYear(),
                // "actualmonth": $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c.getUTCMonth()+1, 
                // "actualday": $scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c.getDate()};

            }
            $scope.meetingList.push(networkMeeting);
            delete ($scope.applicantDetails[i].Network_Meetings__r[j].Tentative_Date__c);
            delete ($scope.applicantDetails[i].Network_Meetings__r[j].Actual_Date__c);
        }
    }
    ApplicantPortal_Contoller.insertMeetingDetails($scope.meetingList, function(result, event){
        if(event.status){
         debugger;
         Swal.fire(
             'Success',
             'Submitted successfully.',
             'success'
         );
         $scope.redirectPageURL('Home');
         $scope.meetingList = result;
         $scope.$apply();  
     }
    },
    {escape:true}
    )
}

// $scope.submitMeetingDetails = function(){
// debugger;
// for(let i=0; i<$scope.meetingList.length; i++){
//     delete ($scope.meetingList[i]['Name']);
//     delete ($scope.meetingList[i]['$$hashKey']);
// }
// $scope.networkList = [];
// for(let i=0; i<$scope.applicantDetails.length; i++){
//     debugger;
//     if($scope.applicantDetails[i].Network_Meetings__r.length>0){
//         for(let j=0; j<$scope.applicantDetails[i].Network_Meetings__r.length; j++){
//             delete ($scope.applicantDetails[i].Network_Meetings__r[j]['$$hashKey']);
//             $scope.applicantDetails[i].Network_Meetings__r[j].Contact__c = $scope.applicantDetails[i].Id;
//                 $scope.networkList.push($scope.applicantDetails[i].Network_Meetings__r[j])
//         }
//     }
// }
    
// Proposal_Controller.insertMeetingDetails($scope.networkList, function(result, event){
//     if(event.status){
//         debugger;
//         Swal.fire(
//             'Success',
//             'Submitted successfully.',
//             'success'
//         );
//         $scope.redirectPageURL('GrantApplication');
//         $scope.networkList = result;
//         $scope.$apply();  
//     }
// },
// {escape: true}
// )
// }

// $scope.contactDetails = [{'Meeting_Agenda__c': '', 'Meeting_Venue__c': '', 'Participants__c': ''}];
$scope.networkMeetingList = [];

$scope.meetingList = [{
    'Meeting_Agenda__c': '',
    'Meeting_Venue__c': ''
    //'Contact__c': $scope.meetingList.id
}];

$scope.addRow = function(param1, param2){
    debugger;
    $scope.applicantDetails[param1].Network_Meetings__r.push({
        'Meeting_Agenda__c': '',
        'Meeting_Venue__c': '',
        'Contact__c': $scope.applicantDetails[param1].Id
    });
//$scope.meetingList.Network_Meetings__r.push({'Meeting_Agenda__c': '', 'Meeting_Venue__c': '', 'Participants__c': ''});
}

// $scope.deleteRow = function(param1){
//     debugger;
//     if($scope.meetingList[param1].Network_Meetings__r.length > 1)
//         $scope.meetingList[param1].Network_Meetings__r.splice();
// }

$scope.deleteRow = function (param1, param2) {
    if($scope.applicantDetails[param1].Network_Meetings__r.length > 1)
        $scope.applicantDetails[param1].Network_Meetings__r.splice(param2, 1);

}

$scope.redirectPageURL = function(pageName){
    debugger;
    var link=document.createElement("a");
    link.id = 'someLink'; //give it an ID!
    link.href="#/"+pageName;
    link.click();
}
});