public class CongaDocGeneration {
    @AuraEnabled
    Public Static void generateTemplateFromProposal(String recordId){
        System.debug('recordId'+recordId);
        myMethod(recordId);
        
        //return TemplateId;
    }
    @future (callout=true)
    Public static void myMethod(String recordId){
        string var = [SELECT Id,Name,Conga_URL__c FROM Application_Proposal__c WHERE Id = :recordId][0].Conga_URL__c;
        String TemplateId = CongaHelperToolLightning.generateReport(var,null,null,null,null);
        system.debug('TemplateId'+TemplateId);
    }
}