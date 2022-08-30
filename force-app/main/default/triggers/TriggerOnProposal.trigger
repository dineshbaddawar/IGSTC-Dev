trigger TriggerOnProposal on Application_Proposal__c (after insert) {
    ProposalTriggerHandler proposalInstance = ProposalTriggerHandler.getInstance();

    if(Trigger.isInsert && Trigger.isAfter){
        proposalInstance.afterInsert(Trigger.newMap);
    }
}