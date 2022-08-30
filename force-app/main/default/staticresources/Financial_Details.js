angular.module('cp_app').controller('financialdetails_ctrl', function($scope, $rootScope){
   
    $scope.siteURL = siteURL;
    $scope.indianCoDetails = {};
    $scope.germanCoDetails = {};
    $scope.allCoordinatorDetails = [];

    $scope.getFinancialDetails = function(){
        ApplicantPortal_Contoller.getAllFinancialDetails($rootScope.userId, function (result, event){
            if(event.status){
                debugger;
                for(i=0;i<result.length;i++){
                    if(result[i].Indian__c == true){
                        $scope.indianCoDetails = result[i];
                        $scope.indianCoDetails = {'Id':result[i].Id,'Financial_Contribution__r':result[i].Financial_Contribution__r,'Proposals__c':result[i].Proposals__c};

                    }else{
                        $scope.germanCoDetails = result[i];
                        $scope.germanCoDetails = {'Id':result[i].Id,'Financial_Contribution__r':result[i].Financial_Contribution__r,'Proposals__c':result[i].Proposals__c};
                    }
                }
                if($scope.indianCoDetails.Financial_Contribution__r != undefined){
                    $scope.financialDetailsForIndian = $scope.indianCoDetails.Financial_Contribution__r;
                }else{
                    $scope.financialDetailsForIndian = [{'Name':'','Partner__c':$scope.indianCoDetails.Id}];

                }

                if($scope.germanCoDetails.Financial_Contribution__r != undefined){
                    $scope.financialDetailsForGerman = $scope.germanCoDetails.Financial_Contribution__r;
                }else{
                    $scope.financialDetailsForGerman = [{'Name':'','Partner__c':$scope.germanCoDetails.Id}];
                }

                $scope.$apply();
            }
        },
        {escape: true}
        )
    }
    $scope.getFinancialDetails();

    $scope.submitDetails = function(){
        debugger;
        if($scope.indianCoDetails.Proposals__c != undefined || $scope.indianCoDetails.Proposals__c != ""){
            $scope.germanCoDetails.Proposals__c = $scope.indianCoDetails.Proposals__c;
        }else if($scope.germanCoDetails.Proposals__c != undefined || $scope.germanCoDetails.Proposals__c != ""){
            $scope.indianCoDetails.Proposals__c = $scope.germanCoDetails.Proposals__c;
        }

        $scope.allCoordinatorDetails.push($scope.indianCoDetails);
        $scope.allCoordinatorDetails.push($scope.germanCoDetails);

        $scope.financialList = $scope.financialDetailsForIndian.concat($scope.financialDetailsForGerman);

        for(let i=0; i<$scope.financialList.length; i++){
            delete ($scope.financialList[i]['$$hashKey']);
        }

        for(i=0;i<$scope.allCoordinatorDetails.length;i++){
            debugger;
            delete ($scope.allCoordinatorDetails[i].Financial_Contribution__r);
        }
        ApplicantPortal_Contoller.saveFinancialDetails($scope.financialList, function(result, event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('Home');
                $scope.$apply();
            }
        },
        {escape: true}
        )
    }

    $scope.addRowFinancialIndian = function(){
        $scope.financialDetailsForIndian.push({'Name':'','Partner__c':$scope.indianCoDetails.Id});
    }

    $scope.deleteRowFinancialIndian = function(index){
        if($scope.financialDetailsForIndian.length > 1)
            $scope.financialDetailsForIndian.splice(index,1);
        
    }

    $scope.addRowFinancialGerman = function(){
        $scope.financialDetailsForGerman.push({'Name':'','Partner__c':$scope.germanCoDetails.Id});
    }

    $scope.deleteRowFinancialGerman = function(index){
        if($scope.financialDetailsForGerman.length > 1)
            $scope.financialDetailsForGerman.splice(index,1);
        
    }

    $scope.redirectPageURL = function(pageName){
        debugger;
        var link=document.createElement("a");
        link.Id = 'someLink'; //give it an ID!
        link.href="#/"+pageName;
        link.click();
    }
});