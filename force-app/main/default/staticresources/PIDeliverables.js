angular.module('cp_app').controller('deliverables_ctrl', function($scope,$rootScope) {
    debugger;
    $scope.date;
    $scope.siteURL = siteURL;
    $scope.deliverableList = [];
    $scope.deliverableListwaweqw = [];
                
                $scope.getApplicantDetails = function(){
                    debugger;
                    ApplicantPortal_Contoller.getProjectDetailsForPI($rootScope.userId, function (result, event){
                    if(event.status) {
                        debugger;   
                        //$scope.date = new Date(result.Due_Date__c);
                        $scope.applicantDetails = result;
                        
                        for(var i=0;i<$scope.applicantDetails.length;i++){
                            var piDeliver = {"Name":$scope.applicantDetails[i].Name,"Responsible_Partner":$scope.applicantDetails[i].Id ,"Title": "","Due_Date__c": "","day": 0, "month": 0, "year": 0};
                            if($scope.applicantDetails[i].PI_Deliverables__r != undefined){
                                piDeliver.Due_Date__c = new Date($scope.applicantDetails[i].PI_Deliverables__r[0].Due_Date__c)
                            }
                            if($scope.applicantDetails[i].PI_Deliverables__r != undefined && $scope.applicantDetails[i].PI_Deliverables__r.length > 0 ){
                                piDeliver.Title = $scope.applicantDetails[i].PI_Deliverables__r[0].Title__c;
                                if($scope.applicantDetails[i].PI_Deliverables__r[0].Due_Date__c != undefined){
                                    piDeliver.Due_Date__c = new Date($scope.applicantDetails[i].PI_Deliverables__r[0].Due_Date__c);
                                }
                                if($scope.applicantDetails[i].PI_Deliverables__r[0].Id != undefined)
                                    piDeliver.Id = $scope.applicantDetails[i].PI_Deliverables__r[0].Id;
                            }
                            $scope.deliverableList.push(piDeliver);
                            $scope.deliverableListwaweqw.push(piDeliver);
                            
                        }
                        $scope.$apply();
                    }
                  },
                  {escape: true}
                )
                }
                $scope.getApplicantDetails();

    $scope.submitDeliverables = function(){

        for(let i=0; i<$scope.deliverableList.length; i++){
            debugger;
            delete ($scope.deliverableList[i]['Name']);
            delete ($scope.deliverableList[i]['$$hashKey']);
            if($scope.deliverableList[i].Due_Date__c == "" || $scope.deliverableList[i].Due_Date__c == undefined){
                delete ($scope.deliverableList[i].Due_Date__c);
            }else{
                $scope.deliverableList[i].year = $scope.deliverableList[i].Due_Date__c.getUTCFullYear();
                $scope.deliverableList[i].month = $scope.deliverableList[i].Due_Date__c.getUTCMonth()+1;
                $scope.deliverableList[i].day = $scope.deliverableList[i].Due_Date__c.getDate();
            }
            delete ($scope.deliverableList[i].Due_Date__c);
        }

        ApplicantPortal_Contoller.insertDeliverables($scope.deliverableList, function(result, event){
            if(event.status && result != null){
                    debugger;
                    Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                    $scope.redirectPageURL('Network_Meeting');
                    $scope.deliverableList = result;
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