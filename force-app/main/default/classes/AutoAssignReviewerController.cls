public without sharing class AutoAssignReviewerController {
    public AutoAssignReviewerController() {}

    @AuraEnabled(cacheable = true)
    public static Application_Proposal__c getRcDetails(String id){
        try {
            return [Select Id,Name From Application_Proposal__c Where Id=:id];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    Public static string matchReviewer(string proposalId){
        system.System.debug('proposalId--'+proposalId);
        Application_Proposal__c appProposal = [select name,id,KeyWords__c,Equipment__c from Application_Proposal__c where Id =:proposalId];
        List<string> proposalKeyWordList ;
        if(!string.isBlank(appProposal.Equipment__c )){
            system.debug('appProposal.KeyWords__c ---'+appProposal.Equipment__c );
            proposalKeyWordList = appProposal.Equipment__c.split(',');
            system.debug('proposalKeyWordList ---'+proposalKeyWordList);
        }
        if(proposalKeyWordList.size() > 0){
            List<Reviewer__c> reviewerList = [select name,id from Reviewer__c where Skills__c Like :proposalKeyWordList Limit 5];
            system.debug('reviewerList---'+reviewerList);
            List<Reviewer_Mapping__c> revmappingList = New List<Reviewer_Mapping__c>();
            if(reviewerList.size() > 0){

                for(Reviewer__c rev:reviewerList){
                    Reviewer_Mapping__c revmapping = New Reviewer_Mapping__c();
                    revmapping.Reviewer__c = rev.Id;
                    revmapping.Proposals__c = proposalId;
                    revmappingList.add(revmapping); 
                }
                insert revmappingList;
                RETURN 'success';
            }
            RETURN 'No Reviewers Found';
        }
        RETURN 'No Keywords';
    }
}