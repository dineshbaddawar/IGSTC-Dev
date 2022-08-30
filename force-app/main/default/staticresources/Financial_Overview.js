angular.module('cp_app').controller('financialCtrl', function($scope,$rootScope) {
    debugger;
    $scope.siteURL = siteURL;
    $rootScope.secondstage;
    $rootScope.financialConDetails = financialConDetails;
    $scope.financialDetails = {};
    $scope.disable = false;
    $scope.disabled = true;
    
    $scope.getApplicantDeetails = function(){
        ApplicantPortal_Contoller.getProjectDetailsDetails($rootScope.userId, function (result, event){
            if(event.status) {
                debugger;
                $scope.applicantDetails = result;
                $scope.financialOverViewList = [];
                for(var i=0;i<$scope.applicantDetails.length;i++){
                    var financialOverview = {"Name":$scope.applicantDetails[i].Name,"Partner__c":$scope.applicantDetails[i].Id ,"Own_Contribution__c":" ","IGSTC_Contribution__c": ""};
                    if($scope.applicantDetails[i].Financial_Contribution__r != undefined && $scope.applicantDetails[i].Financial_Contribution__r.length > 0 ){
                        financialOverview.Own_Contribution__c = $scope.applicantDetails[i].Financial_Contribution__r[0].Own_Contribution__c;
                        financialOverview.IGSTC_Contribution__c = $scope.applicantDetails[i].Financial_Contribution__r[0].IGSTC_Contribution__c;
                        financialOverview.Country__c = $scope.applicantDetails[i].Financial_Contribution__r[0].Country__c;
                        financialOverview.Account_Type__c = $scope.applicantDetails[i].Financial_Contribution__r[0].Account_Type__c;
                        financialOverview.Id = $scope.applicantDetails[i].Financial_Contribution__r[0].Id;
                    }
                    $scope.financialOverViewList.push(financialOverview);
                }
                $scope.$apply();
            }
        },
                                                               {escape: true}
                                                              )
    }
    $scope.getApplicantDeetails();
    
    $scope.submitFinancialDetails = function(){
       var financialList = [];
        financialList = $scope.financialOverViewList;
        for(let i=0; i<financialList.length; i++){
            //delete (financialList[i]['Name']);
            //delete (financialList[i]['$$hashKey']);
            if(financialList[i].Country__c == 'India' && financialList[i].Account_Type__c == 'Academia' && financialList[i].IGSTC_Contribution__c > $rootScope.financialConDetails[0].Indian__c){
                Swal.fire(
                    '',
                    'For Indian Academia, IGSTC Contribution should be not greater than 3.5cr.',
                    'Error'
                );
                return;
            }
            if(financialList[i].Country__c == 'India' && financialList[i].Account_Type__c == 'Industry' && financialList[i].IGSTC_Contribution__c > $rootScope.financialConDetails[0].Indian_Institute__c){
                Swal.fire(
                    '',
                    'For Indian Industry, IGSTC Contribution should not be greater than 1.5cr.',
                    'Error'
                );
                return;
            }
            if(financialList[i].Country__c == 'Germany' && financialList[i].Account_Type__c == 'Academia' && financialList[i].IGSTC_Contribution__c > $rootScope.financialConDetails[0].German_Academia__c){
                Swal.fire(
                    '',
                    'For Germany Academia, IGSTC Contribution should be not greater than 4,50,000.',
                    'Error'
                );
                return;
            }
            if(financialList[i].Country__c == 'Germany' && financialList[i].Account_Type__c == 'Industry' && financialList[i].IGSTC_Contribution__c > $rootScope.financialConDetails[0].German_Institute__c){
                Swal.fire(
                    '',
                    'For Germany Industry, IGSTC Contribution should be not greater than 4,50,000.',
                    'Error'
                );
                return;
            }
        }

        for(let i=0; i<financialList.length; i++){
            delete (financialList[i]['Name']);
            delete (financialList[i]['$$hashKey']);
        }

        ApplicantPortal_Contoller.insertFinancialDetails(financialList, function(result, event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('ProjectDetail');
                financialList = result;
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