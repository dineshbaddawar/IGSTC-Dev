// angular.module('cp_app').controller('PersonalInformationIF_Ctrl', function($scope,$rootScope) {
//     $scope.clickPreviousPersonalInfo=function(){
//         var link=document.createElement("a");
//                     link.id = 'someLink'; //give it an ID!
//                     link.href="#/Dashboard_IF";
//                     link.click();
//     }
// });
angular.module('cp_app').controller('PersonalInformationIF_Ctrl', function($scope,$rootScope) {
    $scope.objContact={};
    $scope.getContactDetails=function(){
    ApplicantPortal_Contoller.getContactDetails($rootScope.userId, function (result, event) {
        console.log(result);
        console.log(event);
        if (event.status) {
                $scope.objContact=result;
                delete $scope.objContact.Publications_Patents__r;
                delete $scope.objContact.Education_Details__r;
                // $scope.checkSameAdd=result.Addess_same_as__c;
                if(result.Passport_Expiry__c!=undefined && result.Passport_Expiry__c!=''){
                  $scope.PassExpiryDate=new Date(result.Passport_Expiry__c);
                }
                if(result.Birthdate!=undefined && result.Birthdate!=''){
                  $scope.Birthdate=new Date(result.Birthdate);
                }
                var mailingAddress=result.MailingStreet;
                if(mailingAddress!=undefined && mailingAddress!=''){
                  var arrMA =mailingAddress.split(';');
                  $scope.MailingLine1=arrMA[0];
                  if(arrMA.length>0){
                    $scope.MailingLine2=arrMA[1];
                  }
                }
                if(result.OtherStreet!=undefined && result.OtherStreet!=''){
                  var arrMA =result.OtherStreet.split(';');
                  $scope.OtherLine1=arrMA[0];
                  if(arrMA.length>0){
                    $scope.OtherLine2=arrMA[1];
                  }
                }
                $scope.gender=$rootScope.gender;
                $scope.nationality=$rootScope.nationality;
                $scope.country=$rootScope.country;
                $scope.$apply();
        }
      },
        { escape: true }
      );
}
$scope.updatePersonalInfoIF=function(){
    var birthYear=0;
    var birthMonth=0;
    var birthDay=0;
    console.log($rootScope.userId);
      if($scope.Birthdate!=undefined && $scope.Birthdate!=''){
        birthYear = $scope.Birthdate.getUTCFullYear();
        birthMonth = $scope.Birthdate.getUTCMonth()+1;
        birthDay = $scope.Birthdate.getDate();
        // delete $scope.objContact.Birthdate;
      }
      var pasExYear=0;
      var pasExMonth=0;
      var pasExDay=0;
      if($scope.PassExpiryDate!=undefined && $scope.PassExpiryDate!=''){
        pasExYear = $scope.PassExpiryDate.getUTCFullYear();
        pasExMonth = $scope.PassExpiryDate.getUTCMonth()+1;
        pasExDay = $scope.PassExpiryDate.getDate();
        // delete $scope.objContact.PhD_Enroll_Date__c;
      }
      if($scope.MailingLine1!=undefined){
        $scope.objContact.MailingStreet=$scope.MailingLine1;
      }
      if($scope.MailingLine2!=undefined){
        $scope.objContact.MailingStreet=$scope.objContact.MailingStreet+';'+$scope.MailingLine2;
      }
      if($scope.MailingLine1==null && $scope.MailingLine2==null){
        $scope.objContact.MailingStreet=null;
      }
      if($scope.OtherLine1!=undefined){
        $scope.objContact.OtherStreet=$scope.OtherLine1;
      }
      if($scope.OtherLine2!=undefined){
        $scope.objContact.OtherStreet=$scope.objContact.OtherStreet+';'+$scope.OtherLine2;
      }
      if($scope.OtherLine1==null && $scope.OtherLine2==null){
        $scope.objContact.OtherStreet=null;
      }
    ApplicantPortal_Contoller.updatePersonalInfoIF($rootScope.userId,$scope.objContact,
      birthDay,birthMonth,birthYear,pasExYear,pasExMonth,pasExDay,function (result, event) {
          debugger
          console.log(result);
          console.log(event);
          debugger
          if (event.status) {
            swal({
              title: "Personal Info",
              text: result,
              icon: "success",
              button: "ok!",
            }).then((value) => {
                  var link=document.createElement("a");
                  link.id = 'someLink'; //give it an ID!
                  link.href="#/EduQualificationIF";
                  link.click();
                });
          }
          else
          {
            swal({
              title: "Personal Info",
              text: "Exception!",
              icon: "error",
              button: "ok!",
            });
          }
        },
          { escape: true }
        );
}
$scope.getContactDetails();
    $scope.clickPreviousPersonalInfo=function(){
        var link=document.createElement("a");
                    link.id = 'someLink'; //give it an ID!
                    link.href="#/Dashboard_IF";
                    link.click();
    }
    $scope.setAddressSameAs=function(){
      if($scope.objContact.Addess_same_as__c){
        $scope.OtherLine1=$scope.MailingLine1;
        $scope.OtherLine2=$scope.MailingLine2;
        $scope.objContact.OtherCity=$scope.objContact.MailingCity;
        $scope.objContact.OtherState=$scope.objContact.MailingState;
        $scope.objContact.OtherCountry=$scope.objContact.MailingCountry;
        $scope.objContact.OtherPostalCode=$scope.objContact.MailingPostalCode;
      }
      else
      {
        $scope.OtherLine1=null;
        $scope.OtherLine2=null;
        $scope.objContact.OtherCity=null;
        $scope.objContact.OtherState=null;
        $scope.objContact.OtherCountry=null;
        $scope.objContact.OtherPostalCode=null;
      }
    }
});