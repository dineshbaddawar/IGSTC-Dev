angular.module('cp_app').controller('HostInfoApplication_Ctrl', function($scope, $rootScope){
     $scope.objContact = {};
     $scope.getContactHostInfo = function(){
          debugger;
          IndustrialFellowshipController.getContactHostInfo($rootScope.userId, function(result, event){
               debugger;
               console.log("RESULT ::",result);
               console.log("RESULT ::",event);
               $scope.objContact = result;
               $scope.nationality = $rootScope.nationality;
               $scope.country = $rootScope.country;

               var mailingAddress = result.MailingStreet;
               if(mailingAddress != undefined && mailingAddress !=''){
                    var arrMA = mailingAddress.split(';');
                    $scope.MailingLine1 = arrMA[0];
                    if(arrMA.length > 0){
                         $scope.MailingLine2 = arrMA[1];
                    }
               }
               $scope.$apply();
          });
     };

     $scope.saveApplicationPortalHostInformation = function(){
          alert("Method saveApplicationPortalHostInformation Called")
          console.log("USER ID In HOST::",$rootScope.userId);
          debugger;
          if($scope.MailingLine1 != undefined){
               $scope.objContact.MailingStreet = $scope.MailingLine1;
          }
          if($scope.MailingLine2 != undefined){
               $scope.objContact.MailingStreet = $scope.objContact.MailingStreet+';'+$scope.MailingLine2;
          }
          if($scope.MailingLine1 == null && $scope.MailingLine2 == null){
               $scope.objContact = MailingStreet = null;
          }

          IndustrialFellowshipController.saveApplicationPortalHostInformation($rootScope.userId, $scope.objContact, function(result,event){
               debugger;
               console.log("Result IN saveApplicationPortalHostInformation ::",result);
               if(event.status){
                    swal({
                         title: "Applicant Details",
                         text: result,
                         icon: "success",
                         button: "ok!",
                    }).then((value) =>{
                         var link = document.createElement("a");
                         link.id = 'UserId';
                         link.href = "#/ProjectDetailsInWiser";
                         link.click();
                    });
               } else{
                    swal({
                         title: "ERROR",
                         text: "Exception !",
                         icon: "error",
                         button: "ok!",
                    });
               }
          });
     };
     $scope.getContactHostInfo();
})