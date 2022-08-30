public with sharing class SharePointCallout {
    @future(callout=true)
    public static void createFolder(Set<Id> proposalList){
        Map<Id,Application_Proposal__c> pMap = new Map<Id,Application_Proposal__c>([Select Id,Name,(Select Id,Name From Proposal_Documents__r) From Application_Proposal__c Where Id In : proposalList]);
        for(Application_Proposal__c pro : pMap.values()){
            String response = SharePointHandler.createFolderInsideSite('Proposals/'+pro.Name);
            if(response=='Success'){
                for(Proposal_Document__c pd: pro.Proposal_Documents__r){
                    SharePointHandler.createFolderInsideSite('Proposals/'+pro.Name+'/'+pd.Name);
                }
            }
        }
    }
}