var workingDaysValues = [];
var userId;
var siteURL;
var candidateId;
var getAllEvents;
var eventsOnLoad;
var maxStringSize = 6000000;    //Maximum String size is 6,000,000 characters
var maxFileSize = 4350000;      //After Base64 Encoding, this is the max file size
var chunkSize = 950000;         //Maximum Javascript Remoting message size is 1,000,000 characters
var attachment;
var attachmentName;
var fileSize;
var positionIndex;
var doneUploading;
var blobData;
var gender;
var country;
var nationality;
var available_followship;
var associated_with_igstc;
var nature_of_Job;

//var contactId;
debugger;
var app = angular.module('cp_app');
var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';    // ======================>
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


function wysiwygeditor($scope) {
    $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false;
};

app.controller('cp_dashboard_ctrl', function ($scope, $rootScope, $timeout, $window, $location, $element) {
 $rootScope.duration = duration;
 $rootScope.countrytype = countrytype;
 $rootScope.presentingWorkshop = presentingWorkshop;
 $rootScope.userId = userId;
 $rootScope.candidateId = candidateId;
 $rootScope.siteURL = siteURL;
 $rootScope.thematicAreaList = thematicAreaList;  
 $rootScope.gender=gender;
 $rootScope.country=country;
 $rootScope.nationality=nationality;
 $rootScope.available_followship=available_followship;
 $rootScope.associated_with_igstc=associated_with_igstc;
 $rootScope.nature_of_Job=nature_of_Job;
 $rootScope.expanseHead = expanseHead;


    $rootScope.userDetails;
    $rootScope.activeTab = 0;
    $rootScope.siteURL = siteURL;
    $rootScope.userHashId = userId;
    $rootScope.candidateId = candidateId;
    $rootScope.contactId = contactId;
    $rootScope.projectId = projectId;
    $rootScope.secondstage = false;
    if(secondstage == "2nd Stage"){
        $rootScope.secondstage = true;
    }else{
        $rootScope.secondstage = false;
    }
 
    $scope.redirect = function(){
        
            var sitePrefix = window.location.href.includes('/apex') ? '/apex' : '/ApplicantDashboard';   
            window.location.replace(window.location.origin +sitePrefix+'/RegistrationForm');
            
    }
});  