angular.module('cp_app').controller('workPackageCtrl', function($scope,$rootScope) {
    debugger;
    $scope.siteURL = siteURL;
    
    $scope.workPackageDetails = {};
    $scope.disable = false;
    $rootScope.secondstage;
    
    $scope.getApplicantDetails = function(){
        ApplicantPortal_Contoller.getWorkPackageDetails($rootScope.userId, function (result, event){
            if(event.status) {
                debugger;
                $scope.applicantDetails = result;
                $scope.workPackList = [];
                for(var i=0;i<$scope.applicantDetails.length;i++){
                    var workPack = {"Name":$scope.applicantDetails[i].Name,"Contact__c":$scope.applicantDetails[i].Id ,"TRL_Level__c":" ","Title__c": "","Duration__c":""};
                    if($scope.applicantDetails[i].Work_Package__r != undefined && $scope.applicantDetails[i].Work_Package__r.length > 0 ){
                        workPack.TRL_Level__c = $scope.applicantDetails[i].Work_Package__r[0].TRL_Level__c;
                        workPack.Title__c = $scope.applicantDetails[i].Work_Package__r[0].Title__c;
                        workPack.Duration__c = $scope.applicantDetails[i].Work_Package__r[0].Duration__c;
                        workPack.Id = $scope.applicantDetails[i].Work_Package__r[0].Id; 
                    }
                    $scope.workPackList.push(workPack);
                }
                $scope.$apply();
            }
        },
       {escape: true}
       )
    }
    $scope.getApplicantDetails();
    
    $scope.submitWorkPackageDetails = function(){
        for(let i=0; i<$scope.workPackList.length; i++){
            delete ($scope.workPackList[i]['Name']);
            delete ($scope.workPackList[i]['$$hashKey']);
        }
        ApplicantPortal_Contoller.insertWPContactDetails($scope.workPackList, function(result, event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Your Application Submitted Successfully !!.',
                    'success'
                );
                if($scope.secondstage == true){
                    $scope.redirectPageURL('PIDeliverables');
                }else{
                    $scope.redirectPageURL('Home');   
                }
                
                $scope.workPackList = result;
                $scope.$apply();
                //var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';   
                //window.location.replace(window.location.origin +sitePrefix+'/ApplicantPortal?id='+ $scope.userId+'#/Home');
            }
        },
                                                       {escape: true}
                                                      )
    }

    $scope.finalSubmission = function(){
        Swal.fire({
            title: 'This is final submission of your proposal ! Do you want to continue?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            debugger;
            if (result.value) {
                debugger;
              //Swal.fire('Saved!', '', 'success')
              $scope.submitWorkPackageDetails();
            } else if (result.value) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    
    	$scope.redirectPageURL = function(pageName){
           debugger;
           var link=document.createElement("a");
           link.id = 'someLink'; //give it an ID!
           link.href="#/"+pageName;
           link.click();
         }

         $scope.submitWorkPackageDetailsAsDraft = function(){
            for(let i=0; i<$scope.workPackList.length; i++){
                delete ($scope.workPackList[i]['Name']);
                delete ($scope.workPackList[i]['$$hashKey']);
            }
            ApplicantPortal_Contoller.insertWPContactDetailsAsDraft($scope.workPackList, function(result, event){
                if(event.status){
                    debugger;
                    Swal.fire(
                        'Success',
                        'Your Application Submitted Successfully !!.',
                        'success'
                    );
                    if($scope.secondstage == true){
                        $scope.redirectPageURL('PIDeliverables');
                    }else{
                        $scope.redirectPageURL('Home');   
                    }
                    
                    //$scope.workPackList = result;
                    $scope.$apply();
                    //var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';   
                    //window.location.replace(window.location.origin +sitePrefix+'/ApplicantPortal?id='+ $scope.userId+'#/Home');
                }
            },
                                                           {escape: true}
                                                          )
        }
});