
var app = angular.module('rp_app');
var sitePrefix = '/apex'
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('');
    var rp = $routeProvider;

    for (var i = 0; i < tabValues.length; i++) {
        var pageName = '/' + tabValues[i].Name;

        if (tabValues[i].Apex_class_Name__c != undefined) {
            rp.when(pageName, {

                templateUrl: sitePrefix + pageName,
                controller: tabValues[i].Apex_class_Name__c
            });
        } else {
            rp.when(pageName, {
                templateUrl: sitePrefix + pageName,
            })
        }

    }
});

app.controller('rp_dashboard_ctrl', function ($scope, $rootScope, $timeout, $window, $location, $element) {
    
    debugger;
   $scope.GetReviewerDetails = function(){
       debugger;
       ReviewerPortal_Controller.GetReviewerDetails(reviewerId, function(result, event){
        if(event.status && result !=null){
            console.log('Result -->'+result);

            $rootScope.reviewerId =result.Id;
           
        }
       },
       {escape:false}
       );
   }
   $scope.GetReviewerDetails();
});  