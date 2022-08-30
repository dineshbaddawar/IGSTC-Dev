angular.module('rp_app').controller('projects_ctrl', function($scope,$rootScope) {
    debugger;
    console.log($rootScope);
    $rootScope.activeTab = 0;
    $rootScope.userDetails;
    $rootScope.reviewerId;
    $rootScope.GradValues=GradValues;
    $rootScope.RatingValues = RatingValues;
    $scope.disable = false;
    $scope.divReviewerResponse=true;

     debugger;
     $scope.getAllProposalFromReviewer = [];  
     $scope.flag=true;
     $scope.reviewerData={};
     $scope.objReviewer={};
     $scope.ObjResponse={};
    $scope.getAllProposal = function(){
        ReviewerPortal_Controller.getAllProposal(reviewerId, function(result, event){
            if(event.status && result !=null){
                debugger;                
                $scope.getAllProposalFromReviewer = result;
                $scope.$apply();
            }
        },
        {escape:true}
        )
    }

    debugger;
    $scope.projectDetails = function(project){
        debugger;
        $scope.flag=false;
         $scope.selectedProject = project;
         $scope.reviewerMapId = '';
         if($scope.selectedProject.Reviewer_Mapping__r.length>0){
             $scope.reviewerMapId = $scope.selectedProject.Reviewer_Mapping__r[0].Id;
         }
         $scope.getAllQuestionLineItem (project.Question_Template__c,project.Id);        
    }
 
     $scope.downloadDetails = function(docId){
         debugger;
         let anchorTagA =  document.createElement('a');
        // var baseURL = {!$Label.Proposal_Download_URL}; //'{!$Label.Proposal_Download_URL}' + 
       //  anchorTagA.href = '{!$Label.Proposal_Download_URL}'+'servlet/servlet.FileDownload?file=' + docId;
          anchorTagA.href = 'https://dev-igstc.cs114.force.com/Reviewer/servlet/servlet.FileDownload?file='+docId;
        // let bug =  anchorTagA.href;
       //  let repValue = bug.replace("%7B!$Label.Proposal_Download_URL%7D", "servlet");
       window.open(anchorTagA.href,'_blank');
         console.log('=============>', anchorTagA.href);
        //  anchorTagA.download = 'downloadPdf';
        //  anchorTagA.click();

     }

    $scope.getAllQuestionLineItem = function(QuesTempId,ProposalId){
        debugger;

        ReviewerPortal_Controller.getAllQLIAndRRLI(QuesTempId, $scope.reviewerMapId, function(result, event){
            if(event.status && result !=null){
                debugger;
                $scope.QuestionTempList =result; 
                if(result[0].rmStage == 'Submitted'){
                    $scope.disable = true;
                } 
                $scope.getReviewersDet(QuesTempId,ProposalId);
                $scope.$apply();
            }
        })
    }   
    $scope.getReviewersDet=function(QuesTempId,ProposalId){
        debugger
        ReviewerPortal_Controller.getReviewersDet(QuesTempId, $scope.reviewerMapId,ProposalId, function(result, event){
            debugger;
            console.log(result);
            console.log(event);
            if(event.status && result !=null){                
                $scope.reviewerData =result; 
                $scope.objReviewer=result.Reviewer__r;
                $scope.$apply();
            }
        })
    }
    $scope.showReviewerReponse=function(index){
        var objIndexData=$scope.reviewerData[index].Reviewer_Response_LineItem__r;
            $scope.ObjResponse=objIndexData;
            $scope.divReviewerResponse=false;
            $scope.$apply();
    }
    $scope.submitResponseDetail = function(param1){
        debugger;
        for(var i=0;i<$scope.QuestionTempList.length;i++){
            delete $scope.QuestionTempList[i]['$$hashKey'];
            delete $scope.QuestionTempList[i].getQuesLineItemList.Reviewer_Response_LineItem__r ;
        }

        
    for(var i=0;i<$scope.QuestionTempList.length; i++){
                    debugger;
                     if($scope.QuestionTempList[i].RRLineItemList.Rating__c == undefined && $scope.QuestionTempList[i].RRLineItemList.Rating__c == undefined && $scope.QuestionTempList[i].RRLineItemList.Grade_Value__c == undefined){
                        $scope.QuestionTempList.splice(i, 0);
                     }
                }

                console.log(param1)
        ReviewerPortal_Controller.getAllResponseLineItem( $scope.QuestionTempList, $scope.reviewerMapId, param1, function(result, event){
            if(event.status && result !=null){
                if(param1 == 'Draft'){
                    $scope.disable = false;
                }else if(param1 == 'Submitted'){
                    $scope.disable = true;
                }
                $scope.$apply();
                debugger;
                Swal.fire(

                    '',

                    'Record Saved Successfully !',

                    'success'

                )
            }
        })
    }
      

    $scope.backFromDetail = function(){
        $scope.flag=true;
    }
    $scope.getAllProposal();

   
});