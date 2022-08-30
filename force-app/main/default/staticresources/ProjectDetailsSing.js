angular.module('cp_app').controller('ProjectDetailsSing_Ctrl', function($scope,$rootScope) {
    $scope.objContact={};
    $scope.objProposal={};
    $scope.objKeyword={
      "Keyword":""
    };
    $scope.getProposalDet=function(){
        IndustrialFellowshipController.getProposalDet($rootScope.userId, function (result, event) {
          debugger
                console.log(result);
                console.log(event);
                $scope.objContact=result;
                if(result.Proposals__r!=undefined && result.Proposals__r!=''){
                    $scope.objProposal=result.Proposals__r;
                }    
                $scope.$apply(); 
        });
    }
    $scope.addKeyword=function(){
      debugger
      $scope.objKeyword.push({"Keyword":""});
      $scope.$apply();
    }
    $scope.saveProjectDetailsSing=function(){
        delete $scope.objContact.Proposals__r;
        IndustrialFellowshipController.saveProjectDetailsSing($rootScope.userId,$scope.objContact,$scope.objProposal, function (result, event) {
                console.log(result);
                console.log(event);
                if (event.status) {
                    swal({
                      title: "Singnature and Seals",
                      text: result,
                      icon: "success",
                      button: "ok!",
                    }).then((value) => {
                          var link=document.createElement("a");
                          link.id = 'someLink'; //give it an ID!
                          link.href="#/SignatureSealsSing";
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
    $scope.clickPreviousSingh=function(){
        var link=document.createElement("a");
                          link.id = 'someLink'; //give it an ID!
                          link.href="#/ApplicantInformationSing";
                          link.click();
    }
    $scope.getProposalDet();
});