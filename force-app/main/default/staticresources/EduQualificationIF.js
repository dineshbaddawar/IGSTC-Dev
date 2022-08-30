angular.module('cp_app').controller('EduQualificationIF_Ctrl', function($scope,$rootScope) {
    $scope.objContact={};
    $scope.objEduDetails={};
    $scope.objMasterThesis={};
    $scope.objPhDThesis={};
    $scope.getEduQualification=function(){
        IndustrialFellowshipController.getEduQualification($rootScope.userId, function (result, event) {
            debugger
            console.log(result);
            console.log(event);
            $scope.objEduDetails=result;
            for(var i=0; i<result.length;i++){
                if(result[i].RecordType.Name=="Thesis"){
                    if(result[i].Thesis_Type__c=="Master Thesis"){
                        $scope.objMasterThesis=result[i];
                        if($scope.objMasterThesis.Start_Date__c!=undefined && $scope.objMasterThesis.Start_Date__c!=''){
                            $scope.StartDate=new Date($scope.objMasterThesis.Start_Date__c);
                        }
                        if($scope.objMasterThesis.End_Date__c!=undefined && $scope.objMasterThesis.End_Date__c!=''){
                            $scope.EndDate=new Date($scope.objMasterThesis.End_Date__c);
                        }
                    }
                    else if(result[i].Thesis_Type__c=="PhD Thesis"){
                        $scope.objPhDThesis=result[i];
                        if($scope.objPhDThesis.Start_Date__c!=undefined && $scope.objPhDThesis.Start_Date__c!=''){
                            $scope.masterStartDate=new Date($scope.objPhDThesis.Start_Date__c);
                        }
                        if($scope.objPhDThesis.End_Date__c!=undefined && $scope.objPhDThesis.End_Date__c!=''){
                            $scope.masterEndDate=new Date($scope.objPhDThesis.End_Date__c);
                        }
                    }
                }
            }
            $scope.$apply();
        });
    }
    $scope.saveEduDetailIF=function(){
        var msterStartDateNew;
        var masterEndDateNew;
        for (let i = 0; i < $scope.objEduDetails.length; i++) {
            delete($scope.objEduDetails[i]['$$hashKey']);
        }
        debugger
        var years=0;
        var month=0;
        var day=0;
      if($scope.masterStartDate!=undefined && $scope.masterStartDate!=''){
        years = $scope.masterStartDate.getUTCFullYear();
        month = $scope.masterStartDate.getUTCMonth()+1;
        day = $scope.masterStartDate.getDate();
        $scope.msterStartDateNew=new Date(years,month,day);
        // $scope.objMasterThesis.Start_Date__c=$scope.msterStartDateNew;
      }
    if($scope.masterEndDate!=undefined && $scope.masterEndDate!=''){
      years = $scope.masterEndDate.getUTCFullYear();
      month = $scope.masterEndDate.getUTCMonth()+1;
      day = $scope.masterEndDate.getDate();
      $scope.masterEndDateNew=new Date(years,month,day);
    //   $scope.objMasterThesis.End_Date__c=$scope.masterEndDateNew;
    }
    
        IndustrialFellowshipController.saveEduDetailIF($rootScope.userId,$scope.objEduDetails, function (result, event) {
            console.log(result);
            console.log(event);
            if (event.status) {
                swal({
                  title: "Education Qualification",
                  text: result,
                  icon: "success",
                  button: "ok!",
                }).then((value) => {
                      var link=document.createElement("a");
                      link.id = 'someLink'; //give it an ID!
                      link.href="#/AchievementsIF";
                      link.click();
                    });
              }
              else
              {
                swal({
                  title: "Education Qualification",
                  text: "Exception!",
                  icon: "error",
                  button: "ok!",
                });
              }
        })
    }
    $scope.myFilter=function(item){
        if(item.RecordType.Name!="Thesis"){
            return true;
        }
        else
        {
            return false;
        }
    }
    $scope.clickPreviousEduQualification=function(){
        var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href="#/PersonalInformationIF";
        link.click();
    }
    // $scope.getContactDetails=function(){
    //     ApplicantPortal_Contoller.getContactDetails($rootScope.userId, function (result, event) {
    //         console.log(result);
    //         console.log(event);
    //         if (event.status) {
    //             debugger
    //                 $scope.objContact=result;
    //                 delete $scope.objContact.Publications_Patents__r;
    //                 if($scope.objContact.Education_Details__r!=undefined && $scope.objContact.Education_Details__r!=''){
    //                     $scope.objEduDetails=$scope.objContact.Education_Details__r;
    //                 }
    //                 else
    //                 {
    //                     $scope.objEduDetails={
    //                         Contact__c:"",
    //                         Degree__c:"",
    //                         End_Year__c:"",
    //                         Institution_Name__c:"",
    //                         Name:"",
    //                         Specialization__c:""
    //                     }
    //                 }
    //                 // $scope.checkSameAdd=result.Addess_same_as__c;
    //                 // if(result.Passport_Expiry__c!=undefined && result.Passport_Expiry__c!=''){
    //                 //   $scope.PassExpiryDate=new Date(result.Passport_Expiry__c);
    //                 // }
    //                 // if(result.Birthdate!=undefined && result.Birthdate!=''){
    //                 //   $scope.Birthdate=new Date(result.Birthdate);
    //                 // }
    //                 $scope.$apply();
    //         }
    //       },
    //         { escape: true }
    //       );
    // }
    $scope.getEduQualification();
});