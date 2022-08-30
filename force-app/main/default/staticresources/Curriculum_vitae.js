angular.module('cp_app').controller('CV_Ctrl', function($scope,$rootScope) {
    debugger;
    $scope.siteURL = siteURL;
    $scope.indianCoDetails = {};
    $scope.germanCoDetails = {};
    $scope.allCoordinatorDetails = [];

    $scope.educationList = [];
    $scope.employmentList = [];
    $scope.publicationList = [];
    
    //SAVE CONTACTDETAILS
    
    $scope.getContactDetails = function (){
        ApplicantPortal_Contoller.getCurriculumDetails($rootScope.userId, function (result, event){
            if(event.status) {
                debugger;
                
            for(i=0;i<result.length;i++){
                if(result[i].Indian__c == true){
                    $scope.indianCoDetails = result[i];
                    $scope.indianCoDetails = {'FirstName':result[i].FirstName,'LastName':result[i].LastName,'Actual_Position__c':result[i].Actual_Position__c,'MailingCity':result[i].MailingCity,'MailingState':result[i].MailingState,'MailingCountry':result[i].MailingCountry,'Id':result[i].Id,'Education_Details__r':result[i].Education_Details__r,'Employment_Details__r':result[i].Employment_Details__r,'Publications_Patents__r':result[i].Publications_Patents__r};
                    }else{
                    $scope.germanCoDetails = result[i];
                    $scope.germanCoDetails = {'FirstName':result[i].FirstName,'LastName':result[i].LastName,'Actual_Position__c':result[i].Actual_Position__c,'MailingCity':result[i].MailingCity,'MailingState':result[i].MailingState,'MailingCountry':result[i].MailingCountry,'Id':result[i].Id,'Education_Details__r':result[i].Education_Details__r,'Employment_Details__r':result[i].Employment_Details__r,'Publications_Patents__r':result[i].Publications_Patents__r};
                    }
                }
                //$scope.contactDetails = result;
                //$scope.contactDetails = {'FirstName':result.FirstName,'LastName':result.LastName,'Actual_Position__c':result.Actual_Position__c,'MailingCity':result.MailingCity,'MailingState':result.MailingState,'MailingCountry':result.MailingCountry,'Id':result.Id};
                if($scope.indianCoDetails.Education_Details__r != undefined){
                    $scope.educationDetailsForIndian = $scope.indianCoDetails.Education_Details__r;
                }else{
                    $scope.educationDetailsForIndian = [{'Name':'','Contact__c':$scope.indianCoDetails.Id}];
                }
                if($scope.indianCoDetails.Employment_Details__r != undefined){
                    $scope.employmentDetailsForIndian = $scope.indianCoDetails.Employment_Details__r;
                }else{
                    $scope.employmentDetailsForIndian = [{'Name':'','Contact__c':$scope.indianCoDetails.Id}];
                }
                if($scope.indianCoDetails.Publications_Patents__r != undefined){
                    $scope.publicationDetailsForIndian = $scope.indianCoDetails.Publications_Patents__r;
                }else{
                    $scope.publicationDetailsForIndian = [{'Name':'','Contact__c':$scope.indianCoDetails.Id}];
                }

                if($scope.germanCoDetails.Education_Details__r != undefined){
                    $scope.educationDetailsForGerman = $scope.germanCoDetails.Education_Details__r;
                }else{
                    $scope.educationDetailsForGerman = [{'Name':'','Contact__c':$scope.germanCoDetails.Id}];
                }
                if($scope.germanCoDetails.Employment_Details__r != undefined){
                    $scope.employmentDetailsForGerman = $scope.germanCoDetails.Employment_Details__r;
                }else{
                    $scope.employmentDetailsForGerman = [{'Name':'','Contact__c':$scope.germanCoDetails.Id}];
                }
                if($scope.germanCoDetails.Publications_Patents__r != undefined){
                    $scope.publicationDetailsForGerman = $scope.germanCoDetails.Publications_Patents__r;
                }else{
                    $scope.publicationDetailsForGerman = [{'Name':'','Contact__c':$scope.germanCoDetails.Id}];
                }
                $scope.$apply();
            }
        },
          {escape: true}
        )
    }
    
    $scope.getContactDetails();
    $scope.saveRecord = function(){
        debugger;
        if($scope.indianCoDetails.Proposals__c != undefined || $scope.indianCoDetails.Proposals__c != ""){
            $scope.germanCoDetails.Proposals__c = $scope.indianCoDetails.Proposals__c;
        }else if($scope.germanCoDetails.Proposals__c != undefined || $scope.germanCoDetails.Proposals__c != ""){
            $scope.indianCoDetails.Proposals__c = $scope.germanCoDetails.Proposals__c;
        }
        $scope.allCoordinatorDetails.push($scope.indianCoDetails);
        $scope.allCoordinatorDetails.push($scope.germanCoDetails);

        $scope.educationList = $scope.educationDetailsForIndian.concat($scope.educationDetailsForGerman);
        $scope.employmentList = $scope.employmentDetailsForIndian.concat($scope.employmentDetailsForGerman);
        $scope.publicationList = $scope.publicationDetailsForIndian.concat($scope.publicationDetailsForGerman);
        
        //FOR EMPLOYMENT
        for(let i=0; i<$scope.educationList.length; i++){
            delete ($scope.educationList[i]['$$hashKey']);
        }
        
        //FOR EMPLOYMENT
        for(let i=0; i<$scope.employmentList.length; i++){
            delete ($scope.employmentList[i]['$$hashKey']);
        }
        
        //FOR PUBLICATIONS / PATENTS
        for(let i=0; i<$scope.publicationList.length; i++){
            delete ($scope.publicationList[i]['$$hashKey']);
        }

        for(i=0;i<$scope.allCoordinatorDetails.length;i++){
            debugger;
            delete ($scope.allCoordinatorDetails[i].Education_Details__r);
            delete ($scope.allCoordinatorDetails[i].Employment_Details__r);
            delete ($scope.allCoordinatorDetails[i].Publications_Patents__r);
        }
        
        ApplicantPortal_Contoller.insertCurriculumDetails($scope.allCoordinatorDetails, $scope.educationList, $scope.employmentList, $scope.publicationList, function (result, event){
            if(event.status) {
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('Financial_Details');
                //$scope.allCoordinatorDetails = result;
                $scope.$apply();
            }
        },
                                                         {escape: true}
                                                        )
    }
    
    /**************************************** INDIAN DETAILS ***********************************************************/
    //EDUCATION
    $scope.addRowEduIndian = function(){
        $scope.educationDetailsForIndian.push({'Name':'','Contact__c':$scope.indianCoDetails.Id});
    }
    
    $scope.deleteRowEduIndian = function(index){
        if($scope.educationDetailsForIndian.length > 1)
            $scope.educationDetailsForIndian.splice(index,1);
        
    }
    
    //EMPLOYMENT
    $scope.addRowEmpIndian = function(){
        $scope.employmentDetailsForIndian.push({'Name':'','Contact__c':$scope.indianCoDetails.Id});
    }
    
    $scope.deleteRowEmpIndian = function(index){
        if($scope.employmentDetailsForIndian.length > 1)
            $scope.employmentDetailsForIndian.splice(index,1);
        
    }
    
    //PUBLICATIONS / PATENTS
    //$scope.publicationListIndian = [{'Name':'','Contact__c':$scope.indianCoDetails.Id}];
    $scope.addRowPublicationIndian = function(){
        $scope.publicationDetailsForIndian.push({'Name':'','Contact__c':$scope.indianCoDetails.Id});
    }
    
    $scope.deleteRowPublicationIndian = function(index){
        if($scope.publicationDetailsForIndian.length > 1)
            $scope.publicationDetailsForIndian.splice(index,1);
        
    }


    /****************************************GERMAN DETAILS ***********************************************************/
    //EDUCATION
    $scope.addRowEduGerman = function(){
        $scope.educationDetailsForGerman.push({'Name':'','Contact__c':$scope.germanCoDetails.Id});
    }
    
    $scope.deleteRowEduGerman = function(index){
        if($scope.educationDetailsForGerman.length > 1)
            $scope.educationDetailsForGerman.splice(index,1);
        
    }
    
    //EMPLOYMENT
    $scope.addRowEmpGerman = function(){
        $scope.employmentDetailsForGerman.push({'Name':'','Contact__c':$scope.germanCoDetails.Id});
    }
    
    $scope.deleteRowEmpGerman = function(index){
        if($scope.employmentDetailsForGerman.length > 1)
            $scope.employmentDetailsForGerman.splice(index,1);
        
    }
    
    //PUBLICATIONS / PATENTS
    //$scope.publicationListGerman = [{'Name':'','Contact__c':$scope.germanCoDetails.Id}];
    $scope.addRowPublicationGerman = function(){
        $scope.publicationDetailsForGerman.push({'Name':'','Contact__c':$scope.germanCoDetails.Id});
    }
    
    $scope.deleteRowPublicationGerman = function(index){
        if($scope.publicationDetailsForGerman.length > 1)
            $scope.publicationDetailsForGerman.splice(index,1);
        
    }
    
    //GET CONTACTDETAILS
    $scope.getContactDetails = function(){
        ApplicantPortal_Contoller.getContactDetails($scope.hashCode, function(result,event){
            if(event.status){
                debugger;
                $scope.$apply();
            } 
        },
                                                      {escape:true}
                                                     )
    }
    
    $scope.redirectPageURL = function(pageName){
        debugger;
        var link=document.createElement("a");
        link.Id = 'someLink'; //give it an ID!
        link.href="#/"+pageName;
        link.click();
    }
});