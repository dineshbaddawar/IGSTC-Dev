angular.module('cp_app').controller('FellowshipDetailsIF_Ctrl', function($scope,$rootScope) {
    $scope.objContactList=[];
    $scope.objProposal={};
    $scope.objContacts__r={};
    $scope.objContact1={};
    $scope.objIndFell={};
$scope.getContactDet=function(){
    IndustrialFellowshipController.getContactDetailsFellowDet($rootScope.userId, function (result, event) {
            console.log(result);
            console.log(event);
            if(result.Proposals__r!=undefined && result.Proposals__r!=''){
                $scope.objProposal=result.Proposals__r;
            }
            $scope.objIndFell=result;
            if(result.Contacts1__r!=undefined && result.Contacts1__r!=''){
                $scope.objContact1=result.Contacts1__r[0];   
            }
            else{
                $scope.objContact1={
                    Host_Details__c:result.Id,
                    MailingStreet:""
                };              
            }
            if(result.Contacts__r!=undefined && result.Contacts__r!=''){
                $scope.objContacts__r=result.Contacts__r[0];                
            }
            else
            {
                $scope.objContacts__r={
                    Mentor_Details__c:result.Id,
                    MailingStreet:""
                };                
            }   
            var mailingAddress=$scope.objContacts__r.MailingStreet;
                if(mailingAddress!=undefined && mailingAddress!=''){
                  var arrMA =mailingAddress.split(';');
                  $scope.MailingLine1=arrMA[0];
                  if(arrMA.length>0){
                    $scope.MailingLine2=arrMA[1];
                  }
                }
                var mailingAddress2=$scope.objContact1.MailingStreet;
                if(mailingAddress2!=undefined && mailingAddress2!=''){
                  var arrMA =mailingAddress2.split(';');
                  $scope.OtherLine1=arrMA[0];
                  if(arrMA.length>0){
                    $scope.OtherLine2=arrMA[1];
                  }
                }
                // if(result.OtherStreet!=undefined && result.OtherStreet!=''){
                //   var arrMA =result.OtherStreet.split(';');
                //   $scope.OtherLine1=arrMA[0];
                //   if(arrMA.length>0){
                //     $scope.OtherLine2=arrMA[1];
                //   }
                // }                     
            $scope.country=$rootScope.country;
            $scope.$apply();

    },{ escape: true });
}
$scope.setAddressSameAs=function(){
    if($scope.objContacts__r.Addess_same_as__c){
      $scope.objContacts__r.OtherStreet=$scope.objContacts__r.MailingStreet;
      $scope.OtherLine22=$scope.MailingLine2;
      $scope.objContacts__r.OtherCity=$scope.objContacts__r.MailingCity;
      $scope.objContacts__r.OtherState=$scope.objContacts__r.MailingState;
      $scope.objContacts__r.OtherCountry=$scope.objContacts__r.MailingCountry;
      $scope.objContacts__r.OtherPostalCode=$scope.objContacts__r.MailingPostalCode;
    }
    else
    {
      $scope.objContacts__r.OtherStreet=null;
      $scope.OtherLine22=null;
      $scope.objContacts__r.OtherCity=null;
      $scope.objContacts__r.OtherState=null;
      $scope.objContacts__r.OtherCountry=null;
      $scope.objContacts__r.OtherPostalCode=null;
    }
  }
  $scope.setAddressSameAsHost=function(){
    if($scope.objContact1.Addess_same_as__c){
      $scope.objContact1.OtherStreet=$scope.objContact1.MailingStreet;
      $scope.OtherLine223=$scope.MailingStreet3;
      $scope.objContact1.OtherCity=$scope.objContact1.MailingCity;
      $scope.objContact1.OtherState=$scope.objContact1.MailingState;
      $scope.objContact1.OtherCountry=$scope.objContact1.MailingCountry;
      $scope.objContact1.OtherPostalCode=$scope.objContact1.MailingPostalCode;
    }
    else
    {
      $scope.objContact1.OtherStreet=null;
      $scope.OtherLine223=null;
      $scope.objContact1.OtherCity=null;
      $scope.objContact1.OtherState=null;
      $scope.objContact1.OtherCountry=null;
      $scope.objContact1.OtherPostalCode=null;
    }
  }
$scope.clickFellowshipDetails=function(){
    // if($scope.MailingLine1!=undefined){
    //     if($scope.Contacts__r.MailingStreet!=undefined)
    //         $scope.Contacts__r.MailingStreet=$scope.MailingLine1;
    //     else
    //         $scope.Contacts__r.push({'MailingStreet':$scope.MailingLine1});
    //   }
    //   if($scope.MailingLine2!=undefined){
    //     $scope.Contacts__r.MailingStreet=$scope.Contacts__r.MailingStreet+';'+$scope.MailingLine2;
    //   }
    //   if($scope.MailingLine1==null && $scope.MailingLine2==null){
    //     $scope.Contacts__r.MailingStreet=null;
    //   }
    //   if($scope.OtherLine1!=undefined){
    //     $scope.Contacts1__r.OtherStreet=$scope.OtherLine1;
    //   }
    //   if($scope.OtherLine2!=undefined){
    //     $scope.Contacts1__r.OtherStreet=$scope.Contacts1__r.OtherStreet+';'+$scope.OtherLine2;
    //   }
    //   if($scope.OtherLine1==null && $scope.OtherLine2==null){
    //     $scope.Contacts1__r.OtherStreet=null;
    //   }
    $scope.objContactList.push($scope.objContact1);
    $scope.objContactList.push($scope.objContacts__r);
    delete $scope.objIndFell.Contacts__r;
    delete $scope.objIndFell.Contacts1__r;
    IndustrialFellowshipController.saveFellowshipDetails($rootScope.userId,$scope.objContactList,$scope.objIndFell,$scope.objProposal, function (result, event) {
            console.log(result);
            console.log(event);
            if (event.status) {
                swal({
                  title: "Fellowship Details",
                  text: result,
                  icon: "success",
                  button: "ok!",});
                // }).then((value) => {
                //       var link=document.createElement("a");
                //       link.id = 'someLink'; //give it an ID!
                //       link.href="#/EduQualificationIF";
                //       link.click();
                //     });
              }
              else
              {
                swal({
                  title: "Fellowship Details",
                  text: "Exception!",
                  icon: "error",
                  button: "ok!",
                });
              }

    },{ escape: true });
}
$scope.clickPreviousFellowshipDetails=function(){
    var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href="#/EmploymentDetailsIF";
        link.click();
}
$scope.getContactDet();
});