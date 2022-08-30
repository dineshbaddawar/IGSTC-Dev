angular.module('cp_app').controller('campaign_ctrl', function($scope,$rootScope) {
    debugger;
    console.log($rootScope);
    $rootScope.activeTab = 0;
    $rootScope.userDetails;
    //$rootScope.tagCampaignId = campaign.id;
    $scope.myVar = 'allCampaigns';
    $scope.fetchCampaign = function(){
         ApplicantPortal_Contoller.fetchCampaignsPrograms(function(result, event){
            if(event.status){
                debugger;
               $scope.campaignList = result;
                $scope.selectedCampaign = result;
              $scope.$apply();
            }
        },
         {escape: true}
       )
    }
    $scope.fetchCampaign();
    
    $scope.detailPage = function(campaign){
        debugger;
        $scope.myVar = 'selectedcam';
        $rootScope.tagCampaignId = campaign.Id;
        $scope.selectedCampaign = campaign;
    }
    $scope.applyForProgram = function(){
        debugger;
        if(candidateId == "" || candidateId == undefined){
            var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';   
            window.location.replace(window.location.origin +sitePrefix+'/RegistrationForm');
            
        }
            var link=document.createElement("a");
            link.id = 'someLink'; //give it an ID!
            link.href="#/"+$scope.selectedCampaign.RedirectPage__c;
            //link.href="#/Dashboard_IF";
            link.click();
    }
    
    $scope.ShowBasicGuidelines = function(campaign){
        debugger;
        $scope.myVar = 'basicGuidelines';
        $scope.selectedCampaign = campaign;
    }
    
    $scope.ShowBasicGuidelinesFAQ = function(){
        debugger;
        $scope.myVar = 'basicGuidelines';
    }
    
    $scope.redirectPageURL = function(){
        debugger;
        $scope.myVar = 'allCampaigns';
        $rootScope.tagCampaignId = campaign.Id;
    }
    
    $scope.downloadDetails = function(docId){
        debugger;
        let anchorTagA =  document.createElement('a');
        anchorTagA.href = 'https://dev-igstc.cs114.force.com/ApplicantDashboard/servlet/servlet.FileDownload?file='+docId;
        anchorTagA.download = 'downloadPdf';
        anchorTagA.click();
        
    }
});