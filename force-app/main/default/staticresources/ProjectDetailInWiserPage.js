angular.module('cp_app').controller('ProjectDetailInWiserCtrl', function($scope,$rootScope){
     debugger;
     $rootScope.userHashId;
     $rootScope.userId;
     $rootScope.contactId;

     debugger;
     $scope.getApplicantDetailsWiser = function(){
          ApplicantPortal_Contoller.getApplicantDetailsWiser($rootScope.userId, function(result, event){
               if(event.status && result !=null){
                    debugger;
                 $rootScope.projectId = result.Id;
                 $scope.applicantDetails = result;
                 $scope.$apply();
               }
          },
          {escape: true}
          )
     }

     $scope.getApplicantDetailsWiser();
     $scope.applicantDetails = {};
  //   $scope.saveApplication = function(){
          $scope.saveApplication = function(){
               if($scope.applicantDetails.Title_Of__c == undefined || $scope.applicantDetails.Title_Of__c == ""){
                    Swal.fire(
                        '',
                      'Please enter Title Of Proposal',
                      'error'
                      );
                      return;
                }
               ApplicantPortal_Contoller.insertApplicationWiser($scope.applicantDetails, $rootScope.contactId, function(result, event){
                    if (event.status) {
                         swal({
                           title: "Singnature and Seals",
                           text:  'Your Application is submitted successfully.',
                           icon: "success",
                           button: "ok!",
                         }).then((value) => {
                               var link=document.createElement("a");
                               link.id = 'someLink'; //give it an ID!
                               link.href="#/SignatureSealsSing"; // page to Added
                               link.click();
                             });
                       }
                       else
                       {
                         swal({
                           title: "Singnature and Seals",
                           text: "Exception!",
                           icon: "error",
                           button: "ok!",
                         });
                       }

               });
          }

          $scope.clickPreviousWiser=function(){
               var link=document.createElement("a");
                                 link.id = 'someLink'; //give it an ID!
                                 link.href="#/HostInfoApplicationPage";
                                 link.click();
           }
           $scope.getApplicantDetailsWiser();
   

})