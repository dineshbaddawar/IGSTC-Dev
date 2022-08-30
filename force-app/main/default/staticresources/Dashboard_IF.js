angular.module('cp_app').controller('Dashboard_iF_Ctlr', function($scope,$rootScope) {
    $scope.showEnrolDate=true;
    $scope.basicDetails=true;
    
    $scope.eduQualification=false;
    $scope.achievements=false;
    $scope.employmentDetails=false;
    $scope.fellowshipDetails=false;
    $scope.objContact={};
    $scope.objContact.Industrial_Fellowship_Type__c='PIEF';
    
    $scope.getContactDet=function(){
        ApplicantPortal_Contoller.getContactDetails($rootScope.userId, function (result, event) {
            if (event.status) {
                    $scope.objContact=result;
                    delete $scope.objContact.Publications_Patents__r;
                    delete $scope.objContact.Education_Details__r;
                    //$scope.objContact.Industrial_Fellowship_Type__c='PIEF';
                    if(result.Birthdate!=undefined && result.Birthdate!=''){
                      $scope.Birthdate=new Date($scope.objContact.Birthdate);
                    }
                    if(result.PhD_Enroll_Date__c!=undefined && result.PhD_Enroll_Date__c!=''){
                      $scope.PhD_Enroll_Date__c=new Date($scope.objContact.PhD_Enroll_Date__c);
                    }
                    if(result.PhD_Awarded_Date__c!=undefined && result.PhD_Awarded_Date__c!=''){
                      $scope.PhD_Awarded_Date__c=new Date($scope.objContact.PhD_Awarded_Date__c);
                    }
                    if(result.Thesis_Submission_Date__c!=undefined && result.Thesis_Submission_Date__c!=''){
                      $scope.Thesis_Submission_Date__c=new Date($scope.objContact.Thesis_Submission_Date__c);
                    }
                    if($scope.objContact.Industrial_Fellowship_Type__c!='PIEF'){
                      $scope.clickRadioPDIF();
                      $scope.changeAward();                      
                    }
                    $scope.$apply();
            }
          },
            { escape: true }
          );
    }
    //$scope.getContactDet();
    $scope.clickBasicDetails=function(){  
      var birthYear=0;
        var birthMonth=0;
        var birthDay=0;
       var IndusrialFelloType=$scope.objContact.Industrial_Fellowship_Type__c;        
      if($scope.Birthdate!=undefined && $scope.Birthdate!=''){
        birthYear = $scope.Birthdate.getUTCFullYear();
        birthMonth = $scope.Birthdate.getUTCMonth()+1;
        birthDay = $scope.Birthdate.getDate();
        // delete $scope.objContact.Birthdate;
      }
      var phdEnrollYear=0;
        var phdEnrollMonth=0;
        var phdEnrollDay=0;
      if($scope.PhD_Enroll_Date__c!=undefined && $scope.PhD_Enroll_Date__c!=''){
        phdEnrollYear = $scope.PhD_Enroll_Date__c.getUTCFullYear();
        phdEnrollMonth = $scope.PhD_Enroll_Date__c.getUTCMonth()+1;
        phdEnrollDay = $scope.PhD_Enroll_Date__c.getDate();
        // delete $scope.objContact.PhD_Enroll_Date__c;
      }
      var phdAwardYear=0;
      var phdAwardMonth=0;
      var phdAwardDay=0;
      if($scope.PhD_Awarded_Date__c!=undefined && $scope.PhD_Awarded_Date__c!=''){
        phdAwardYear = $scope.PhD_Awarded_Date__c.getUTCFullYear();
        phdAwardMonth = $scope.PhD_Awarded_Date__c.getUTCMonth()+1;
        phdAwardDay = $scope.PhD_Awarded_Date__c.getDate();
        // delete $scope.objContact.PhD_Awarded_Date__c;
      }
      var phdThesisYear=0;
        var phdThesisMonth=0;
        var phdThesisDay=0;
      if($scope.Thesis_Submission_Date__c!=undefined && $scope.Thesis_Submission_Date__c!=''){
        phdThesisYear = $scope.Thesis_Submission_Date__c.getUTCFullYear();
        phdThesisMonth = $scope.Thesis_Submission_Date__c.getUTCMonth()+1;
        phdThesisDay = $scope.Thesis_Submission_Date__c.getDate();
        // delete $scope.objContact.Thesis_Submission_Date__c;
      }
      var age = moment().diff(''+birthYear+'-'+birthMonth+'-'+birthDay+'', 'years');
      if(age<21){
        swal("Basic Details", "Age should be more than 20 years", "info");
        return;
      }
      if(IndusrialFelloType=='PIEF'){
        if($scope.Birthdate==undefined || $scope.Birthdate==''){
          swal("Basic Details", "Please enter birthday", "info");
          // $scope.validDOB=true;
          return;
        }
        else if($scope.PhD_Enroll_Date__c==undefined || $scope.PhD_Enroll_Date__c==''){
          swal("Basic Details", "Please enter PhD enrolement date", "info");
          return;
        }
        else{          
          var enrolmentYears=moment().diff(''+phdEnrollYear+'-'+phdEnrollMonth+'-'+phdEnrollDay+'', 'years');
          if(age>30){
            swal("Basic Details", "Age should be less than or equal to 30 years", "info");
            return;
          }
          else if(enrolmentYears<1){
            swal("Basic Details", "Minimum PhD enrolement years should be one", "info");
            return;
          }
        }
        $scope.objContact.PhD_Awarded_Date__c=null;
        $scope.objContact.Thesis_Submission_Date__c=null;
      }
      else
      {
        if(age>35){
          swal("Basic Details", "Age should be less than or equal to 35 years", "info");
          return;
        }
        else if($scope.objContact.Awarded_PhD__c=="Yes"){          
          if($scope.PhD_Awarded_Date__c==undefined || $scope.PhD_Awarded_Date__c==''){
            swal("Basic Details", "Please enter PhD award mentioned in certificate", "info");
            return;
          }
          var yearsOfPhDAward=moment().diff(''+phdAwardYear+'-'+phdAwardMonth+'-'+phdAwardDay+'', 'years');
          if(yearsOfPhDAward>3){
            swal("Basic Details", "PhD awarded years should be less than or equal to 3 years", "info");
            return;
          }
        }
        else
        {
          if($scope.Thesis_Submission_Date__c==undefined || $scope.Thesis_Submission_Date__c==''){
            swal("Basic Details", "Please enter PhD thesis submission date", "info");
            return;
          }
          var ThesisSubYears=moment().diff(''+phdThesisYear+'-'+phdThesisMonth+'-'+phdThesisDay+'', 'years');
          if(ThesisSubYears>3){
            swal("Basic Details", "Years of thesis submission should be less than or equal to 3 years", "info");
            return;
          }
        }
      }
      
        ApplicantPortal_Contoller.updateIndusrianFellowshipBasicDet($rootScope.userId,$scope.objContact,
          birthDay,birthMonth,birthYear,
          phdEnrollYear,phdEnrollMonth,phdEnrollDay,
          phdAwardYear,phdAwardMonth,phdAwardDay,
          phdThesisYear,phdThesisMonth,phdThesisDay,function (result, event) {
            console.log(result);
            console.log(event);
            debugger
            if (event.status) {
              swal({
                title: "Basic Details",
                text: result,
                icon: "success",
                button: "ok!",
              }).then((value) => {
                    var link=document.createElement("a");
                    link.id = 'someLink'; //give it an ID!
                    link.href="#/PersonalInformationIF";
                    link.click();
                  });
            }
            else
            {
              swal({
                title: "Basic Details",
                text: "Exception!",
                icon: "error",
                button: "ok!",
              });
            }
          },
            { escape: true }
          );
    }    
    $scope.clickPersonalInfo=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=true;
        $scope.achievements=false;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=false;
    }
    $scope.clickPreviousPersonalInfo=function(){
        $scope.basicDetails=true;
        
        $scope.eduQualification=false;
        $scope.achievements=false;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=false;
    }
    $scope.clickEduQualification=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=false;
        $scope.achievements=true;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=false;
    }
    $scope.clickPreviousEduQualification=function(){
        $scope.basicDetails=false;
        $scope.personalInfo=true;
        $scope.eduQualification=false;
        $scope.achievements=false;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=false;
    }
    $scope.clickAchievements=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=false;
        $scope.achievements=false;
        $scope.employmentDetails=true;
        $scope.fellowshipDetails=false;
    }
    $scope.clickPreviousAchievements=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=true;
        $scope.achievements=false;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=false;
    }
    $scope.clickEmploymentDetails=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=false;
        $scope.achievements=false;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=true;
    }
    $scope.clickPreviousEmploymentDetails=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=false;
        $scope.achievements=true;
        $scope.employmentDetails=false;
        $scope.fellowshipDetails=false;
    }
    $scope.clickFellowshipDetails=function(){
        swal({
            title: "Good job!",
            text: "Write your code here!",
            icon: "success",
          });
    }
    $scope.clickPreviousFellowshipDetails=function(){
        $scope.basicDetails=false;
        
        $scope.eduQualification=false;
        $scope.achievements=false;
        $scope.employmentDetails=true;
        $scope.fellowshipDetails=false;
    }
    $scope.clickRadioPIEF=function(){
        $scope.showAwardDrop=false;
        $scope.showEnrolDate=true;
    }
    $scope.clickRadioPDIF=function(){
        $scope.showEnrolDate=false;
        $scope.showAwardDrop=true;        
    }    
    $scope.changeAward=function(){
          if($scope.objContact.Awarded_PhD__c=="Yes"){
            $scope.PhDDate=true;
            $scope.PhDThesis=false;
          }
          else
          {
            $scope.PhDDate=false;
            $scope.PhDThesis=true;
          }
    }
});