angular.module('cp_app').controller('ProjectDetailsSing_Ctrl', function($scope,$rootScope) {
    $scope.objContact={};
    $scope.objProposal={};
    $scope.objKeyword=[];
    $scope.objKeyword.push("");
    $scope.getProposalDet=function(){
        IndustrialFellowshipController.getProposalDet($rootScope.userId, function (result, event) {
          debugger
                console.log(result);
                console.log(event);
                $scope.objContact=result;
                if(result.Proposals__r!=undefined && result.Proposals__r!=''){
                    $scope.objProposal=result.Proposals__r;
                } 
                // if($scope.objProposal.KeyWords__c!=undefined && $scope.objProposal.KeyWords__c!=''){
                //   var keyword=$scope.objProposal.KeyWords__c.split(';');
                //   $scope.objKeyword.splice(0,1);
                //   for(var k=0;k<keyword.length;k++){
                //     $scope.objKeyword.push({"Keyword":keyword[k]});
                //   }
                // }   
                $scope.$apply(); 
        });
    }
    $scope.addKeyword=function(){
      debugger
      if($scope.objKeyword.length<=4){
          $scope.objKeyword.push("");
          $scope.$apply();
      }
    }
    $scope.removeKeyword=function(index){
      if($scope.objKeyword.length>1){
      $scope.objKeyword.splice(index, 1);
      }  
    }
    $scope.saveProjectDetailsSing=function(){
        delete $scope.objContact.Proposals__r;
        debugger
        var keyword="";
        for(var i=0;i<$scope.objKeyword.length;i++){
          if(i==0)
          keyword=$scope.objKeyword[i];
          else
          keyword=keyword+';'+$scope.objKeyword[i];
        }
        $scope.objProposal.KeyWords__c=keyword;
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