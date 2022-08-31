angular.module('cp_app').controller('ProjectDetailCtrl', function($scope,$rootScope) {
    
    debugger;
    $scope.duration = duration;
    $scope.siteURL = siteURL;
    //$rootScope.secondstage = secondstage;
    $rootScope.userHashId;
    $rootScope.duration;
    $rootScope.userId;
    $rootScope.candidateId;
    $rootScope.siteURL;
    $rootScope.thematicAreaList;
    $scope.tentitiveStartDate;
    $rootScope.contactId;
    $scope.disable = false;
    $rootScope.secondstage;
    $scope.thematicAreaToDisplay = [];
    $scope.getApplicantDetail = function(){
        ApplicantPortal_Contoller.getApplicantDetails($rootScope.userId, function(result, event){
            if(event.status) {
                debugger;
                if(result != null){
                    var thematicAreaId = []
                    $rootScope.projectId = result.Id;
                   
                      $scope.tentitiveStartDate = new Date(result.Tentative_Start_Date__c);
                      $scope.applicantDetails = result;
                      if($scope.applicantDetails.Application_Thematic_Area__r != undefined){
                          $scope.thematicAreaToDisplay = [];
                          for(var i=0;i<$scope.applicantDetails.Application_Thematic_Area__r.length;i++){
                                              thematicAreaId.push($scope.applicantDetails.Application_Thematic_Area__r[i].Thematic_Area_Name__c);
      
                            /*  if(thematicAreaId.includes($scope.applicantDetails.Application_Thematic_Area__r[i].Id)){
                                  $scope.thematicAreaToDisplay.push({"Id":$scope.applicantDetails.Application_Thematic_Area__r[i].Id,"Name":$scope.applicantDetails.Application_Thematic_Area__r[i].Thematic_Area_Name__c	,"checked":true});
                              }else{
                                  $scope.thematicAreaToDisplay.push({"Id":$scope.applicantDetails.Application_Thematic_Area__r[i].Id,"Name":$scope.applicantDetails.Application_Thematic_Area__r[i].Thematic_Area_Name__c	,"checked":false});
                              }*/
                          } 
                          for(var i=0;i<$scope.thematicAreaList.length;i++){
                              if(thematicAreaId.includes($scope.thematicAreaList[i].Name)){
                                  $scope.thematicAreaToDisplay.push({"Id":$scope.thematicAreaList[i].Id,"Name":$scope.thematicAreaList[i].Name,"checked":true});
                              }else{
                                  $scope.thematicAreaToDisplay.push({"Id":$scope.thematicAreaList[i].Id,"Name":$scope.thematicAreaList[i].Name	,"checked":false});
                              }
                          }
                      }else{
      
                          for(var i=0;i<$scope.thematicAreaList.length;i++){
                              $scope.thematicAreaToDisplay.push({"Id":$scope.thematicAreaList[i].Id,"Name":$scope.thematicAreaList[i].Name,"checked":false});
      
                          }
                      } 
                }else{
                    for(var i=0;i<$scope.thematicAreaList.length;i++){
                        $scope.thematicAreaToDisplay.push({"Id":$scope.thematicAreaList[i].Id,"Name":$scope.thematicAreaList[i].Name,"checked":false});
                    }
                }
               
              //  $rootScope.userId = result.Id;
                $scope.$apply();
            }
        },
          {escape: true}
      )
    }
    $scope.getApplicantDetail();
    $scope.applicantDetails = {};
    $scope.camDetails = {};
    $scope.thematicAreaList = thematicAreaList;
    
    $scope.saveApplication = function(){
        $scope.applicantDetails.Campaign__c = $rootScope.tagCampaignId;
        debugger;

        if($scope.applicantDetails.Acronym__c == undefined || $scope.applicantDetails.Acronym__c == ""){
            Swal.fire(
                '',
              'Please enter Project Acronym',
              'error'
              );
              return;
        }

        if($scope.applicantDetails.Title_Of__c == undefined || $scope.applicantDetails.Title_Of__c == ""){
            Swal.fire(
                '',
              'Please enter Title Of Proposal',
              'error'
              );
              return;
        }

        if($scope.applicantDetails.Title_In_German__c == undefined || $scope.applicantDetails.Title_In_German__c == ""){
            Swal.fire(
                '',
              'Please enter Title Of Proposal In German',
              'error'
              );
              return;
        }
        

        if($scope.tentitiveStartDate== undefined && $rootScope.secondstage == true)
                    {
                        Swal.fire(
                          '',
                        'Please enter Tentative Date',
                        'error'
                        );
                            return;
                    }

        if($scope.tentitiveStartDate != undefined){
            var year = $scope.tentitiveStartDate.getUTCFullYear();
            var month = $scope.tentitiveStartDate.getUTCMonth()+1;
            var day = $scope.tentitiveStartDate.getDate();
        }else{
            var year = 0;
            var month = 0;
            var day = 0;
        }
        delete($scope.applicantDetails.Application_Thematic_Area__r);
    ApplicantPortal_Contoller.insertApplication($scope.applicantDetails,$scope.selectedTheme,day,month,year,$rootScope.contactId, function (result, event){
            if(event.status && result != null) {
                debugger;
                Swal.fire(
                    'SUCCESS',
                    'Your Application is submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('ConsortiaDetailPage');
                $rootScope.projectId = result;
                $scope.$apply();
            }
        },
       {escape: false}
       )
    }
    //
    
    $scope.redirectPageURL = function(pageName){
        debugger;
        var link=document.createElement("a");
        link.id = 'someLink'; //give it an ID!
        link.href="#/"+pageName;
        link.click();
    }
    
    $scope.selectedTheme = [];
    $scope.thematicArea = function(theme){
        debugger;
        if($scope.selectedTheme.includes(theme)){
            
            $scope.selectedTheme.splice($scope.selectedTheme.indexOf(theme),1);
        }else{
            $scope.selectedTheme.push(theme);
        }
    }

    $scope.getDetails = function(){
        debugger;
        $scope.camDetails = result;
        {escape: false}
    }
});