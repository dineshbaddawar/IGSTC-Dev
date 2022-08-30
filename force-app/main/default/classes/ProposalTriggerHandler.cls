public class ProposalTriggerHandler {
    static ProposalTriggerHandler proposalInstance;

    public static ProposalTriggerHandler getInstance(){
        if(proposalInstance==null)
            proposalInstance = new ProposalTriggerHandler();
        return proposalInstance;    
    }

    public void afterInsert(Map<Id,Application_Proposal__c> proposalMap){
        SharePointCallout.createFolder(proposalMap.keySet());
    }
}