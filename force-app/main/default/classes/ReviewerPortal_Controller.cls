/**
 * @author [Dinesh B]
 * @email dinesh.b@utilitarianLab.com
 * @create date 2022-07-05 11:52:25
 * @modify date 2022-07-05 11:52:25
 * @desc [description]
 */


public withOut sharing class ReviewerPortal_Controller {
    public string tabValues  {get;set;}
    public String GradValues {get;set;}
    public String RatingValues {get;set;}
    public String stages {get;set;}

      //************************************** Getting Custom Setting Data ***********************************************
    
    public ReviewerPortal_Controller() {
        list<Reviwer_Portal_Tabs__c> cdTabs = [select name,Tab_Label__c,id,Controller_Name__c,Display_Order__c from Reviwer_Portal_Tabs__c ORDER BY Display_Order__c];
        System.debug('cdTabs--'+cdTabs);
        tabValues = JSON.serialize(cdTabs);
        GradValues = JSON.serialize(Utility.getPicklistValues('Reviewer_Response_LineItem__c' , 'Grade_Value__c'));
        RatingValues = JSON.serialize(Utility.getPicklistValues('Reviewer_Response_LineItem__c' , 'Rating__c'));
        stages = JSON.serialize(Utility.getPicklistValues('Reviewer_Mapping__c' , 'Stage__c'));
    }
    
      //************************************** Reviewer DETAIL PAGE ***********************************************

    @RemoteAction
    public static Reviewer__c GetReviewerDetails(String hashCode) {
        List<Reviewer__c> RevList = [SELECT Id,Name,Email__c,Password__c,Login_Hash_Code__c FROM Reviewer__c WHERE Login_Hash_Code__c =: hashCode ];
        
        if(RevList.size()>0){
            System.debug('the GetReviewerDetails RecordID  :: '+RevList[0].Id);
            return RevList[0];
        }
        return null;
    }
    
          //************************************** Application Proposal DETAIL PAGE ***********************************************

    @RemoteAction
    public static List<Application_Proposal__c> getAllProposal(String hashId){    
        try{
            List<Reviewer_Mapping__c> ReviewMappingList = [Select Id, Name,Stage__c,Reviewer__r.Name,Reviewer__r.Email__c,Proposals__r.Name,Proposals__r.Title_Of__c,Proposals__r.Id From Reviewer_Mapping__c WHERE Reviewer__r.Login_Hash_Code__c =: hashId];
               // Getting Purposal Which Are present in the Reviewer_Mapping__c object.
            Set<String> PurposalId = new Set<String>();
            for(Reviewer_Mapping__c PurpoId : ReviewMappingList){
                PurposalId.add(PurpoId.Proposals__c);
                System.debug('The Purposal ID :'+PurposalId);
            }
         
            List<Application_Proposal__c> PurposalList = [SELECT Id,Name,Title_Of__c,Title_In_German__c,Awarded_Amount__c,Proposal_Stages__c,Thematic_Topic__c,Equipment__c,Acronym__c,Summary__c,KeyWords__c,Criteria_For_Abandoning_The_Project__c,Current_State_Of_The_Art__c,Expected_Deliverables__c,Duration_In_Months_Max_36__c,Innovative_Aspects__c,Application_Date__c,Research_Scholars__c,Necessity_Of_Funding__c,Research_Approach_Objectives__c,Project_Description__c,Reasons_For_And_Benefits_Of_Cooperation__c,(SELECT  Name,AccountName__c,Department,Email,Account_Phone__c,Account_BillingCity__c FROM Contacts__r), (SELECT Name,Title__c,Duration_End_Month__c,Duration_Start_Month__c FROM Work_Package__r), (SELECT Id,ParentId,Name FROM Attachments), (SELECT Name,Budget__c,Funding_Agency__c,Title__c FROM Existing_Grants__r), (SELECT Name FROM Proposal_Thematic_Areas__r), Question_Template__c,(SELECT Id,Name,Stage__c FROM Reviewer_Mapping__r WHERE Reviewer__r.Login_Hash_Code__c =: hashId) FROM Application_Proposal__c WHERE ID =: PurposalId];
            // String richTextToPlainText = PurposalList[0].Project_Description__c.stripHtmlTags();
            // System.debug('djsjdshdsjdsgd----'+richTextToPlainText);
            if(PurposalList.size()>0){
                System.debug('PurposalList-->'+PurposalList[0]);
                return PurposalList;
            }
            return null;
        }catch(Exception e){
            System.debug('The Error '+e.getMessage());
            return null;
        } 
    }
   
//************************************** Questiotion& Response Wrapper Class DETAIL PAGE ***********************************************
@RemoteAction
    Public Static List<Reviewer_Mapping__c> getReviewersDet(String QuesTempId,String ReviewerMapId,String ProposalId){
        // QLI : Question Line Item
        // RRLI:  Reviewer Response Line Item
        //select id,name,(select id from Reviewer_Response_LineItem__r WHERE Reviewer_Mapping__c !='a1T1y000001i0m9EAA'),Reviewer__r.Name from Reviewer_Mapping__c where Proposals__c='a081y0000029D81AAE' and id!='a1T1y000001i0m9EAA'
        return [SELECT Id,Name,Reviewer__r.Name,Reviewer__r.Email__c,Reviewer__r.Skills__c,(select id,Name,Grade_Value__c,Rating__c,Response__c,Reviewer_Mapping__r.Stage__c from Reviewer_Response_LineItem__r 
        WHERE Reviewer_Mapping__c !=:ReviewerMapId) FROM Reviewer_Mapping__c WHERE Proposals__c=: ProposalId and id!=:QuesTempId];
        
        // List<QuestionLIWrapper> WrapRes = new List<QuestionLIWrapper>();
        
        // for(Question_Line_Item__c QLIMRes : getAllQuesLintItem){
        //   QuestionLIWrapper wrap = new QuestionLIWrapper();
        //   if(QLIMRes.Reviewer_Response_LineItem__r.size()>0){
        //     wrap.RRLineItemList = QLIMRes.Reviewer_Response_LineItem__r[0];
        //   }
        //     wrap.getQuesLineItemList = QLIMRes;
        //     for(Reviewer_Response_LineItem__c rrl : QLIMRes.Reviewer_Response_LineItem__r){
        //         wrap.rmStage = rrl.Reviewer_Mapping__r.Stage__c;
        //     }
            
        //    WrapRes.add(wrap);
        // }
        
        // return WrapRes;
    }
@RemoteAction
    Public Static List<QuestionLIWrapper> getAllQLIAndRRLI(String QuesTempId,String ReviewerMapId){
        // QLI : Question Line Item
        // RRLI:  Reviewer Response Line Item
        //select id,name,(select id from Reviewer_Response_LineItem__r WHERE Reviewer_Mapping__c !='a1T1y000001i0m9EAA'),Reviewer__r.Name from Reviewer_Mapping__c where Proposals__c='a081y0000029D81AAE' and id!='a1T1y000001i0m9EAA'
        List<Question_Line_Item__c> getAllQuesLintItem = [SELECT Id,Name,Question__c,Question_Template__c,Is_Comment_Applicable__c,Is_Grading_Applicable__c,Is_Rating_Applicable__c,Question_Template__r.Total_Questions__c,Question_Template__r.Name,
        (SELECT Id,Name,Grade_Value__c,Rating__c,Response__c,Reviewer_Mapping__r.Stage__c FROM Reviewer_Response_LineItem__r WHERE Reviewer_Mapping__c =: ReviewerMapId) 
        FROM Question_Line_Item__c  WHERE Question_Template__c =:QuesTempId ORDER BY Name];
        
        List<QuestionLIWrapper> WrapRes = new List<QuestionLIWrapper>();
        
        for(Question_Line_Item__c QLIMRes : getAllQuesLintItem){
          QuestionLIWrapper wrap = new QuestionLIWrapper();
          if(QLIMRes.Reviewer_Response_LineItem__r.size()>0){
            wrap.RRLineItemList = QLIMRes.Reviewer_Response_LineItem__r[0];
          }
            wrap.getQuesLineItemList = QLIMRes;
            for(Reviewer_Response_LineItem__c rrl : QLIMRes.Reviewer_Response_LineItem__r){
                wrap.rmStage = rrl.Reviewer_Mapping__r.Stage__c;
            }
            
           WrapRes.add(wrap);
        }
        
        return WrapRes;
    }


//************************************** Getting All Response Line Item DETAIL PAGE ***********************************************

    @RemoteAction 
    public Static List<QuestionLIWrapper> getAllResponseLineItem (List<QuestionLIWrapper> wrapperList, String ReviewerMapId, String param1){
        system.debug('wrapperList---'+wrapperList);
        system.debug('ReviewerMapId---'+ReviewerMapId);
        List<Reviewer_Response_LineItem__c> reviwerResToUpsert = New List<Reviewer_Response_LineItem__c>();

        try{
              for(QuestionLIWrapper wrap:wrapperList){
                System.debug('The wrap Result ----> '+wrap);
            wrap.RRLineItemList.Question_Line_Item__c = wrap.getQuesLineItemList.Id;
            //wrap.RRLineItemList.Reviewer_Mapping__c = ReviewerMapId;

            reviwerResToUpsert.add(wrap.RRLineItemList);
            System.debug('The reviwerResToUpsert Result ----> '+reviwerResToUpsert);
        }
        Reviewer_Mapping__c revMap = New Reviewer_Mapping__c(Stage__c = param1,Id=ReviewerMapId);
        update revMap;
        upsert reviwerResToUpsert;
        return wrapperList;

        }catch(Exception e){
                System.debug('The Error '+e.getMessage());
                System.debug('Erron Line '+e.getLineNumber());
            }

      return null;
    }

    @RemoteAction
    public static string finalSubmission(List<QuestionLIWrapper> wrapperList, String ReviewerMapId){
        try{
            return 'success';
        }catch(Exception e){
            return 'error';
        }
    }
  
    
}