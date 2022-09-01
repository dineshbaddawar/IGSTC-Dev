public withOut sharing class ApplicantPortal_Contoller {
    public string tabValues  {get;set;}
    public string thematicAreaList {get;set;}
    public string duration  {get;set;}
    public string countrytype  {get;set;}
    public string presentingWorkshop  {get;set;}
    public string stage  {get;set;}
    public String ApplicantPortalSiteURL {get;set;}
    public string secondstage  {get;set;}
    public String candidateId {get;set;}
    public String projectId {get;set;}
    public string contactId {get;set;}
    public string financialConDetails {get;set;}
    public string gender {get;set;}
    public string nationality {get;set;}
    public string country {get;set;}
    public string available_followship {get;set;}
    public string associated_with_igstc {get;set;}
    public String nature_of_Job{get;set;}
    public String expanseHead {get;set;}

    public ApplicantPortal_Contoller() {
        ApplicantPortalSiteURL = Constants.CANDIDATE_SITE ;
        list<Application_Portal_Tabs__c> cdTabs = [select name,Tab_Label__c,id,Controller_Name__c,Display_Order__c from Application_Portal_Tabs__c ORDER BY Display_Order__c];
        tabValues = JSON.serialize(cdTabs);
        thematicAreaList = JSON.serialize(fetchAllThematicArea());
        duration = JSON.serialize(Utility.getPicklistValues('Application_Proposal__c' , 'Duration_In_Months_Max_36__c'));
        countrytype = JSON.serialize(Utility.getPicklistValues('Account' , 'Country_Type__c'));
        presentingWorkshop = JSON.serialize(Utility.getPicklistValues('Contact' , 'Presenting_Workshop__c'));
        financialConDetails = JSON.serialize([SELECT German_Academia__c,German_Institute__c,Indian__c,Indian_Institute__c FROM Financial_Overview_Conditions__c limit 1]);
        stage = JSON.serialize(Utility.getPicklistValues('Application_Proposal__c' , 'Stage__c'));
        candidateId = Apexpages.currentPage().getParameters().get('id'); 
        gender = JSON.serialize(Utility.getPicklistValues('Contact' , 'Gender__c'));
        nationality = JSON.serialize(Utility.getPicklistValues('Contact' , 'Nationality__c'));
        country = JSON.serialize(Utility.getPicklistValues('Contact' , 'Country__c'));
        available_followship = JSON.serialize(Utility.getPicklistValues('Contact' , 'Availing_Fellowship__c'));
        available_followship = JSON.serialize(Utility.getPicklistValues('Contact' , 'Associated_with_IGSTC__c'));
        nature_of_Job = JSON.serialize(Utility.getPicklistValues('Employment_Details__c' , 'Nature_of_Job__c'));
        expanseHead = JSON.serialize(Utility.getPicklistValues('Financial_Contribution__c' , 'Expanse_Head__c'));
        system.debug('candidateId---'+candidateId);
        if(!string.isBlank(candidateId)){
            List<contact> applicantDetails = [select name,id,Proposals__c from contact where Login_hash_code__c =:candidateId];
            if(!string.isBlank(applicantDetails[0].Proposals__c)){
                Application_Proposal__c proposal = [SELECT Id,Name,Stage__c FROM Application_Proposal__c where Id =: applicantDetails[0].Proposals__c];
                secondstage = proposal.stage__c;
            }

            if(applicantDetails.size() >0){
                projectId = applicantDetails[0].Proposals__c;
                contactId = applicantDetails[0].Id;
            }
        }
        
    }
    
    @RemoteAction
    public static List<Campaign> fetchCampaignsPrograms(){
        List<Campaign> campaignList = [SELECT Id,Name,Description,Image_URL__c,RedirectPage__c,(select name,id from Attachments order by createdDate DESC),(SELECT Id,Campaign__c,Name,Description__c FROM Campaign_Guidlines__r) FROM Campaign];
        if(!campaignList.isEmpty()){
            return campaignList; 
        }
        return Null;
    }

    @RemoteAction
    public static List<Campaign_Theme__c> fetchCampaignThemes(){
        List<Campaign_Theme__c> campaignThemeList = [SELECT Id,Name FROM Campaign_Theme__c];
        if(!campaignThemeList.isEmpty()){
            return campaignThemeList;
        }
        return Null;
    }

    //************************************** PROJECT DETAIL PAGE ***********************************************

    @RemoteAction
    public static Application_Proposal__c getApplicantDetails(String applicantHashCode){
        return Proposal_Controller.getApplicantDetails(applicantHashCode);
    }

    @RemoteAction
    public static String insertApplication(Application_Proposal__c applicantDetails, List<string> selThemeList, integer day, integer month, integer year, String conId){
        return Proposal_Controller.insertApplication(applicantDetails, selThemeList, day, month, year, conId);
    }

    @RemoteAction
    public static List<Thematic_Area__c> fetchAllThematicArea(){
        return Proposal_Controller.fetchAllThematicArea(); 

    } 

    

    //********************************** CONSORTIA DETAILS ***************************************************

    @RemoteAction
    public static string insertAccount(List<Account> accountDetails,List<Contact> contactDetails){
       return Proposal_Controller.insertAccount(accountDetails,contactDetails);
    }

    @RemoteAction
    public static Account saveAccount(Account accountDetails,string projectId){
        
        accountDetails.Proposals__c = projectId;
        accountDetails.NumberOfEmployees = Integer.valueOf(accountDetails.NumberOfEmployees);
       upsert accountDetails;
       return accountDetails;
    }

    @RemoteAction
    public static contact saveContact(Contact contactDetails,string accountId,string projectId){
        contactDetails.AccountId = accountId;
        contactDetails.Proposals__c = projectId;
       upsert contactDetails;
       return contactDetails;
    }

    @RemoteAction
    public static string insertAccountAndContact(account accDetails, list<contact> conListToInsert){
       return Proposal_Controller.insertAccountAndContact(accDetails,conListToInsert);
    }

    @RemoteAction
    public static  list<account> getPatnerDetails(string applicantHashCode){
        return Proposal_Controller.getPatnerDetails(applicantHashCode);
    }

    @RemoteAction
    public static string insertConsortiaDetailPage(list<Proposal_Controller.ConsortiaDetails> ConsortiaDetailsList,string projectId){
        return Proposal_Controller.insertConsortiaDetailPage(ConsortiaDetailsList,projectId);
    }

    @RemoteAction
    public static  void deleteContact(string contactId){
        Proposal_Controller.deleteContact(contactId);    
    }

    
    @RemoteAction
    public static  void deleteAccountDetails(string accId, list<string> contactIdList){
        Proposal_Controller.deleteAccountDetails(accId, contactIdList);    
    }

    //*************************************** CONSORTIUM PARTNER INFORMATION *********************************************
    
    @RemoteAction
    public static String insertPartnerInformation(Account contactDetails){
        return Proposal_Controller.insertPartnerInformation(contactDetails);
    }

    //************************************* CURRICULUM VITAE *********************************************************
    
    @RemoteAction
    public static String insertContactDetails(List<Contact> contactDetails, List<Education_Details__c> educationDetails, List<Employment_Details__c> employmentDetails, List<Publications_Patents__c> publicationDetails){
        //system.debug('method ::'+Proposal_Controller.insertContactDetails(contactDetails,educationDetails,employmentDetails,publicationDetails));
        return Proposal_Controller.insertContactDetails(contactDetails,educationDetails,employmentDetails,publicationDetails);
    }

    @RemoteAction
    public static Contact getContactDetails(string hashCode){
        return Proposal_Controller.getContactDetails(hashCode);
    }

    @RemoteAction
    public static Contact getCvDetails(string contactId){
        return Proposal_Controller.getCvDetails(contactId);
    }

    //******************************************* COMPANY PROFILE *********************************************
    
    @RemoteAction
    public static  Account getCompanyApplicantDetails(string applicantHashCode){
        return Proposal_Controller.getCompanyApplicantDetails(applicantHashCode);
    }

    @RemoteAction
    public static Account insertApplicant(Account applicantDetails){
        return Proposal_Controller.insertApplicant(applicantDetails); 
    }

    //****************************************** FINANCIAL OVERVIEW ***************************************************
    
    @RemoteAction
    public static  list<Contact> getProjectDetailsDetails(string applicantHashCode){
        return Proposal_Controller.getProjectDetailsDetails(applicantHashCode);
    }

    @RemoteAction
    public static String insertFinancialDetails(List<Financial_Contribution__c> financialDetails){
        return Proposal_Controller.insertFinancialDetails(financialDetails);
    }

    //*************************************** PROJECT DETAIL ********************************************
    
    @RemoteAction
    public static string insertProjectDetails(Application_Proposal__c proposalDetails){
        return Proposal_Controller.insertProjectDetails(proposalDetails);
    }

    @RemoteAction
    public static Application_Proposal__c getProjectdetils(string hashcode){
        return Proposal_Controller.getProjectdetils(hashcode);
    }

    @RemoteAction
    public static String doCUploadAttachment(String attachmentBody, String attachmentName, string cvId, String udId){
        return Proposal_Controller.doCUploadAttachment(attachmentBody,attachmentName,cvId,udId);
    }

    //************************************** WORK PACKAGE **********************************************************
    
    @RemoteAction
    public static list<contact> getWorkPackageDetails(string applicantHashCode){
        return Proposal_Controller.getWorkPackageDetails(applicantHashCode);
    }

    @RemoteAction
    public static  String insertWPContactDetails(List<Work_Package__c> workPackDetails){
        system.debug('workPackDetails ::'+workPackDetails);
        return Proposal_Controller.insertWPContactDetails(workPackDetails);
    }

    @RemoteAction
    public static  String insertWPContactDetailsAsDraft(List<Work_Package__c> workPackDetails){
        return Proposal_Controller.insertWPContactDetailsAsDraft(workPackDetails);
    }

    //************************************** Grant Application **********************************************************
    
    @RemoteAction
    public static  contact getApplicantDetailsForGrant(string applicantHashCode){
        return Proposal_Controller.getApplicantDetailsForGrant(applicantHashCode);
    }

    @RemoteAction
    public static String insertGrantApplication(Contact applicantDetails){
        return Proposal_Controller.insertGrantApplication(applicantDetails);
    }

    @RemoteAction
    public static Application_Proposal__c fetchProjectDetails(String projectId){
        system.debug('projectId :: '+projectId);
        return Proposal_Controller.fetchProjectDetails(projectId);
    }
    
    //************************************** PI Deliverables **********************************************************

    @RemoteAction
    public static  list<contact> getProjectDetailsForPI(string applicantHashCode){
        return Proposal_Controller.getProjectDetailsForPI(applicantHashCode);
    }

    
    @RemoteAction
    public static  String insertDeliverables(List<Proposal_Controller.PiWrapper> deliverableList){
        System.debug('deliverableList---'+deliverableList);
         return Proposal_Controller.insertDeliverables(deliverableList);
    }

    //************************************** Network Meeting **********************************************************

    @RemoteAction
    public static list<contact> getProjectDetailsForNetMeet(string applicantHashCode){
        return Proposal_Controller.getProjectDetailsForNetMeet(applicantHashCode);
    }

    @RemoteAction
    public static String insertMeetingDetails(List<Proposal_Controller.NetworkMeetWrapper> meetingList){
        system.debug('MeetingList ---> '+meetingList);
        return Proposal_Controller.insertMeetingDetails(meetingList);
    }
   //************************************** Industraial Fellowship ********************************************************** 
   @RemoteAction
    public static String updateIndusrianFellowshipBasicDet(String ContactId,Contact InstanceCon,Integer birthDay,Integer birthMonth,Integer birthYear,Integer phdEnrollYear,Integer phdEnrollMonth,Integer phdEnrollDay,Integer phdAwardYear,Integer phdAwardMonth,Integer phdAwardDay,Integer phdThesisYear,Integer phdThesisMonth,Integer phdThesisDay){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.updateIndusrianFellowshipBasicDet(ContactId,InstanceCon,birthDay,birthMonth,birthYear,phdEnrollYear,phdEnrollMonth,phdEnrollDay,phdAwardYear,phdAwardMonth,phdAwardDay,phdThesisYear,phdThesisMonth,phdThesisDay);
    }
    @RemoteAction
    public static String updatePersonalInfoIF(String ContactId,Contact InstanceCon,Integer birthDay,Integer birthMonth,Integer birthYear,Integer pasExYear,Integer pasExMonth,Integer pasExDay){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.updatePersonalInfoIF(ContactId,InstanceCon,birthDay,birthMonth,birthYear,pasExYear,pasExMonth,pasExDay);
    }

    //************************************** WORKSHOP ********************************************************** 

    //************************************** Coordinators Page **********************************************************
    
    @RemoteAction
    public static List<Contact> getCoordinatorsDetails(string hashCode){
        return Proposal_Controller.getCoordinatorsDetails(hashCode);
    }

    @RemoteAction
    public static String insertCoordinatorsInformation(List<Contact> contactDetails){
        return Proposal_Controller.insertCoordinatorsInformation(contactDetails);
    }

    //************************************** BasicDetails_Page **********************************************************

    @RemoteAction
    public static Application_Proposal__c getBasicDetails(String applicantHashCode){
        return Proposal_Controller.getBasicDetails(applicantHashCode);
    }

    @RemoteAction
    public static string insertBasicDetails (Application_Proposal__c applicantDetails, integer day, integer month, integer year, String conId){
        return Proposal_Controller.insertBasicDetails(applicantDetails, day, month, year, conId);
    }

    //************************************** Participants **********************************************************

    @RemoteAction
    public static List<contact> getParticipantDetails(string hashcode){
        return Proposal_Controller.getParticipantDetails(hashcode);
    }

    @RemoteAction
    public static string insertParticipants(List<Contact> listOfAllContacts){
        return Proposal_Controller.insertParticipants(listOfAllContacts);
    }

    @RemoteAction
    public static  void deleteParticipant(string contactId){
        Proposal_Controller.deleteParticipant(contactId);    
    }

    ////////////////////////////////////////////// Curriculum /////////////////////////////////////

    @RemoteAction
    public static String insertCurriculumDetails(List<Contact> contactDetails, List<Education_Details__c> educationDetails, List<Employment_Details__c> employmentDetails, List<Publications_Patents__c> publicationDetails){
        return Proposal_Controller.insertCurriculumDetails(contactDetails, educationDetails, employmentDetails, publicationDetails);
    }
    @RemoteAction
    public static List<Contact> getCurriculumDetails(string hashCode){
        return Proposal_Controller.getCurriculumDetails(hashCode);
    }

    //************************************** Financial_Details **********************************************************

    @RemoteAction
    public static List<Contact> getAllFinancialDetails(string hashCode){
        return Proposal_Controller.getAllFinancialDetails(hashCode);
    }

    @RemoteAction
    public static string saveFinancialDetails(List<Financial_Contribution__c> financialList){
        return Proposal_Controller.saveFinancialDetails(financialList);
    }

    //************************************** BankDetailsForCoordinators **********************************************************

    @RemoteAction
    public static List<Contact> getBankDetails(string hashCode){
        return Proposal_Controller.getBankDetails(hashCode);
    }


     //************************************** Project Details in Wiser **********************************************************
    @RemoteAction
    public static Application_Proposal__c getApplicantDetailsWiser(String applicantHashCode){
        return Proposal_Controller.getApplicantDetailsWiser(applicantHashCode);
    }

    @RemoteAction
    public static String insertApplicationWiser(Application_Proposal__c applicantDetails,  String conId){
        return Proposal_Controller.insertApplicationWiser(applicantDetails, conId);
    }

}