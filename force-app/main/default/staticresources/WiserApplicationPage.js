angular.module('cp_app').controller('WiserApplicantInformation_Ctrl', function($scope,$rootScope) {
    
  $scope.objContact = {};
  $scope.getContactWiser = function(){
    debugger;
    IndustrialFellowshipController.getContactWiser($rootScope.userId, function(result, event){
        debugger;
        console.log("result ::",result);

        $scope.objContact = result;
        $scope.nationality = $rootScope.nationality;
        $scope.country = $rootScope.country;

        if(result.Birthdate !=undefined && result.Birthdate !=''){
            $scope.Birthdate = new Date(result.Birthdate);
        }

        var mailingAddress = result.MailingStreet;
        if(mailingAddress != undefined && mailingAddress !=''){
            var arrMA = mailingAddress.split(';');
            $scope.MailingLine1 = arrMA[0];
            if(arrMA.length>0){
                $scope.MailingLine2 = arrMA[1];
            }
        }
        $scope.$apply();
    });
  };

  $scope.saveApplicantPortalWiser = function(){
    alert("Method saveApplicantPortalWiser Called")
    debugger;
    var birthYear = 0;
    var birthMonth = 0;
    var birthDay = 0;
    console.log("UserID ::",$rootScope.userId);
    if($scope.Birthdate !=undefined && $scope.Birthdate !=''){
        birthYear = $scope.Birthdate.getUTCFullYear();
        birthMonth = $scope.Birthdate.getUTCMonth()+1;
        birthDay = $scope.Birthdate.getDate();
    }

    debugger;
    if($scope.MailingLine1 !=undefined){
        $scope.objContact.MailingStreet = $scope.MailingLine1;
    }
    if($scope.MailingLine2 != undefined){
        $scope.objContact.MailingStreet = $scope.objContact.MailingStreet+';'+$scope.MailingLine2;
    }
    if($scope.MailingLine1 == null && $scope.MailingLine2 == null){
        $scope.objContact = MailingStreet = null;
    }

    IndustrialFellowshipController.saveApplicantPortalWiser($rootScope.userId, $scope.objContact, birthYear, birthMonth, birthDay, function(result, event){
        debugger;
        console.log("Result in saveApplicantPortalWiser ::",result);
        if(event.status){
            swal({
                title: "Applicant Details",
                text : result,
                icon: "success",
                button : "ok !",
            }).then((value) =>{
                var link = document.createElement("a");
                link.id = 'userId';
                link.href = "#/ProjectDetailsWiser";
              //  link.href="#/ProjectDetailsSing";
                link.click();
            });
        } else{
            swal({
                title : "ERROR",
                text : "Exception!",
                icon : "error",
                button : "ok!",
            });
        }
    });

  };

$scope.getContactWiser();
});