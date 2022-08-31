public withOut sharing class Proposal_Controller {
    
   /* public string thematicAreaList {get;set;}
    public string duration  {get;set;}
    public String ApplicantPortalSiteURL {get;set;}
    public String candidateId {get;set;}
    
    public Proposal_Controller(){
        ApplicantPortalSiteURL = Constants.CANDIDATE_SITE ;
        thematicAreaList = JSON.serialize(fetchAllThematicArea());
        duration = JSON.serialize(Utility.getPicklistValues('Application_Proposal__c' , 'Duration_In_Months_Max_36__c'));
        candidateId = Apexpages.currentPage().getParameters().get('id'); 
        system.debug('candidateId---'+candidateId);
    }*/
    
    //************************************** PROJECT DETAIL PAGE ***********************************************
    
    
    public static Application_Proposal__c getApplicantDetails(string applicantHashCode){
       
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        system.debug('applicantHashCode' +applicantHashCode);
        Application_Proposal__c proposalRecord;
        if(!string.isBlank(conRec.Proposals__c)){
            proposalRecord = [SELECT id,Name,Acronym__c,Title_Of__c,Title_In_German__c,Thematic_Topic__c,Duration_In_Months_Max_36__c,Tentative_Start_Date__c,Summary__c,KeyWords__c,Stage__c,Proposed_Venue__c,Proposed_Date__c,(select name,id,Thematic_Area_Name__c	 from Application_Thematic_Area__r) FROM Application_Proposal__c WHERE Id=: conRec.Proposals__c];
            system.debug('proposalRecord----'+proposalRecord);
            return proposalRecord;
        }else{
            return proposalRecord;  
        }     
    }
    
    
    public static String insertApplication(Application_Proposal__c applicantDetails, List<string> setThemeList, integer day, integer month, integer year,String conId){
        try{
            //system.debug('day----'+day+'---month----'+month+'year----'+year);
            if(day==0 && month==0 && year==0){
                
            }else{
                applicantDetails.Tentative_Start_Date__c = Date.newInstance(year, month, day);
                
            }
            
            applicantDetails.Stage__c = '1st Stage';
            applicantDetails.Proposal_Stages__c = 'Draft';
            upsert applicantDetails;
            system.debug('setThemeList----'+setThemeList);
            List<Application_Thematic_Area__c> appThemeticAreaList = New List<Application_Thematic_Area__c>();
            for(string theme:setThemeList){
                appThemeticAreaList.add(new Application_Thematic_Area__c(Application__c=applicantDetails.Id,Thematic_Area__c=theme));
            }
            system.debug('appThemeticAreaList----'+appThemeticAreaList);
           insert appThemeticAreaList;
            system.debug('appThemeticAreaList-----------'+appThemeticAreaList);
           Contact con = new Contact(Id=conId,Proposals__c = applicantDetails.Id);
           update con;
           contact conRec = [select id,AccountId from Contact where id=:con.Id];
           if(!string.isBlank(conRec.AccountId)){
                Account acc = New Account();
                acc.Id = conRec.AccountId;
                acc.Proposals__c = applicantDetails.Id;
                update acc;
           }
            return applicantDetails.Id;
        }catch(Exception e){
            system.debug('exception ----'+e.getLineNumber()+'-----'+e.getMessage());
            return 'ERROR';
        }
    }
    
    
    public static List<Thematic_Area__c> fetchAllThematicArea(){
        List<Thematic_Area__c> thematicAreaList = [SELECT Id,Name FROM Thematic_Area__c];
        if(!thematicAreaList.isEmpty()){
            return thematicAreaList;
        }
        return thematicAreaList;
    }
    
    //********************************** CONSORTIA DETAILS ***************************************************
    
    
    public static string insertAccount(List<Account> accountDetails,List<Contact> contactDetails){
        try{
            upsert accountDetails;
            upsert contactDetails;
            return 'success';
        }catch (Exception e){
            return 'error';   
        }
    }

    
    public static string insertAccountAndContact(account accDetails, list<contact> conListToInsert){
        upsert accDetails;
        for(contact con:ConListToInsert){
            con.AccountId = accDetails.Id;
        }
        upsert ConListToInsert;
        return 'success';
    }

    public static string insertConsortiaDetailPage(list<ConsortiaDetails> ConsortiaDetailsList,string projectId){
       system.debug('accDetails---'+ConsortiaDetailsList);
       List<contact> contactToInsert = New List<contact>();
       List<Account> accountToInsert = New List<Account>();
     /*  for(ConsortiaDetails consortia:ConsortiaDetailsList){
            system.debug('consortia-----'+consortia);
            Account companyDetails = New Account(Name=consortia.company.Name,Website=consortia.company.Website);
          // system.debug('companyDetails----'+companyDetails);
          insert companyDetails;
            for(Contact partner:consortia.partnerDetails){
                system.debug('partner----'+partner);
                system.debug('consortia.company.Website----'+consortia.company.Website);
                partner.AccountId = companyDetails.Id;
                contactToInsert.add(partner);
            }
            accountToInsert.add(companyDetails);
       } */
       Map<string,List<contact>> accNameXcontactList = New Map<string,List<contact>>();
        for(ConsortiaDetails consortia:ConsortiaDetailsList){
        Account companyDetails = New Account(Name=consortia.company.Name,Website=consortia.company.Website,Country_Type__c=consortia.company.Country_Type__c,Proposals__c=projectId);
        if(!string.isBlank(consortia.company.Id)){
            companyDetails.Id = consortia.company.Id;
        }
        accountToInsert.add(companyDetails);
        accNameXcontactList.put(consortia.company.Name,consortia.partnerDetails);
        }
        system.debug('accNameXcontactList---'+accNameXcontactList);
        system.debug('accountToInsert---'+accountToInsert);
        upsert accountToInsert;
        Map<string,string> accNameXId = New Map<string,string>();
        for(Account acc:accountToInsert){
        accNameXId.put(acc.Name,acc.Id);
        }
        
        system.debug('accNameXId---'+accNameXId);
        for(string accName:accNameXcontactList.keyset()){
            for(Contact con : accNameXcontactList.get(accName)){
                con.AccountId = accNameXId.get(accName);
                con.Proposals__c = projectId;
                contactToInsert.add(con);
            }
        }
        system.debug('contactToInsert---'+contactToInsert);
        upsert contactToInsert;
        return 'success';
     }


    public static  list<account> getPatnerDetails(string applicantHashCode){
        system.debug('applicantHashCode---'+applicantHashCode);
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        list<contact> applicantList = New list<contact>();
        system.debug('conRec.Proposals__c---'+conRec.Proposals__c);
        if(!string.isBlank(conRec.Proposals__c)){
           List<account> accountContactList = [select Name,Website,Id,Year_Of_Establishment__c,Last_Year_s_Balance__c,SME__c, Homepage_URL__c,Country_Type__c,Head_Of_Project__c,Industry__c,
           Email__c,DSIR_Recoginition_Details__c,Company_Profile__c,Company_Website__c,Academia__c,Phone,Main_Business_Area__c,NumberOfEmployees,Infrastructural_Facilities__c,
           Domain_Expertise_Available__c,Large_Industry__c,Start_Up__c,ShippingStreet,ShippingCity,ShippingState,ShippingPostalCode,ShippingCountry,Department__c,
           (select name,id,firstName,LastName,Email,Phone from contacts order By createdDate ASC) from account where Proposals__c =:conRec.Proposals__c order By createdDate ASC]; 
           system.debug('accountContactList---'+accountContactList);
           return accountContactList;
        }
        return null;
    }

    public static  void deleteContact(string contactId){
        delete new Contact(id=contactId);
    }

    public static  void deleteAccountDetails(string accId, list<string> contactIdList){
      
        List<contact> contactToDelete = NEw List<contact>();
        if(contactIdList.size() > 0){
            for(string cId:contactIdList){
                contactToDelete.add(New Contact(Id=cId));
            }
            delete contactToDelete;
        }
        Account accTODelete = new Account(id=accId);
        delete accTODelete;
 
    }
    
    //*************************************** CONSORTIUM PARTNER INFORMATION *********************************************
    
    
    public static String insertPartnerInformation(Account contactDetails){
        try{
            upsert contactDetails;
            return 'SUCCESS';
        }catch(Exception e){
            return 'ERROR';
        }
    }
    
    //************************************* CURRICULUM VITAE *********************************************************
    
    
    public static String insertContactDetails(List<Contact> contactDetails, List<Education_Details__c> educationDetails, List<Employment_Details__c> employmentDetails, List<Publications_Patents__c> publicationDetails){
        try{
            Upsert contactDetails;
            for(Contact con : contactDetails){
                for(Education_Details__c edu : educationDetails){
                    edu.Contact__c = con.Id;
                }
                Upsert educationDetails;
                for(Employment_Details__c emp : employmentDetails){
                    emp.Contact__c = con.Id;
                }
                Upsert employmentDetails;
                for(Publications_Patents__c patent : publicationDetails){
                    patent.Contact__c = con.Id;
                }
                Upsert publicationDetails;
            }
            return 'SUCCESS'; 
        }catch(exception e){
            system.debug('error -->'+e.getMessage());
            return 'ERROR';
        }
    }
    
    
    public static Contact getContactDetails(string hashCode){
        Contact conRec = [SELECT Id,Name,FirstName,LastName,Actual_Position__c,Department,Country__c,
        Head_Of_Project__c,Homepage_URL__c,Email,Phone,Thesis_Submission_Date__c,Industrial_Fellowship_Type__c,Birthdate,PhD_Enroll_Date__c,Awarded_PhD__c,
        PhD_Awarded_Date__c,Gender__c,Nationality__c,PassportNo__c,Passport_Expiry__c,Addess_same_as__c,MailingAddress,MailingStreet,MailingCity,MailingCountry,MailingState,MailingPostalCode,
        OtherAddress,OtherStreet,OtherCountry,OtherCity,OtherState,OtherPostalCode,MobilePhone,OtherPhone,(SELECT Id,Name,Institution_Name__c,Specialization__c,Degree__c,End_Year__c FROM Education_Details__r),
        (SELECT Id,Name,Organization_Name__c,Position__c,End_Year__c FROM Employment_Details__r),(select name,id,description__c from Publications_Patents__r)
         From Contact WHERE Login_Hash_Code__c=: hashCode Limit 1];
        return conRec; 
    }

    public static Contact getCvDetails(string contactId){
        Contact conRec = [SELECT Id,Name,FirstName,LastName,Actual_Position__c,MailingCity,MailingState,MailingStreet,MailingCountry,Department,MailingPostalCode,
        Head_Of_Project__c,Homepage_URL__c,Email,Phone,(SELECT Id,Name,Institution_Name__c,Specialization__c,Degree__c,End_Year__c FROM Education_Details__r),
        (SELECT Id,Name,Organization_Name__c,Position__c,End_Year__c FROM Employment_Details__r),(select name,id,description__c from Publications_Patents__r)
         From Contact WHERE Id=: contactId Limit 1];
        return conRec; 
    }
    
    //******************************************* COMPANY PROFILE *********************************************
    
    
    public static  Account getCompanyApplicantDetails(string applicantHashCode){
        contact conRec = [select name,id,AccountId from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        system.debug('applicantHashCode' +applicantHashCode);
        if(conRec.AccountId != Null){
            Account acc = [SELECT id,Name,Year_Of_Establishment__c,Last_Year_s_Balance__c,Main_Business_Area__c,NumberOfEmployees,Infrastructural_Facilities__c,Domain_Expertise_Available__c,DSIR_Recoginition_Details__c,Large_Industry__c,SME__c,Start_Up__c FROM Account WHERE Id=: conRec.AccountId];
            return acc;
        }else{
            return Null;  
        }     
    }
    
    
    public static Account insertApplicant(Account applicantDetails){
        try{
            applicantDetails.NumberOfEmployees = integer.valueOf(applicantDetails.NumberOfEmployees);
            upsert applicantDetails;
            return applicantDetails;
        }catch (Exception e){
            return null;   
        }
    }
    
    //****************************************** FINANCIAL OVERVIEW ***************************************************
    
    
    public static  list<contact> getProjectDetailsDetails(string applicantHashCode){
        system.debug('applicantHashCode---'+applicantHashCode);
        Financial_Overview_Conditions__c financialConDetails = [SELECT German_Academia__c,German_Institute__c,Indian__c,Indian_Institute__c FROM Financial_Overview_Conditions__c];
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        list<contact> applicantList = New list<contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            applicantList = [select name,id,FirstName,LastName,(SELECT Id,Asked_From_IGSTC__c,IGSTC_Contribution__c,Own_Contribution__c,Total__c,Account_Type__c,Country__c FROM Financial_Contribution__r) from Contact  where Proposals__c=:conRec.Proposals__c];
            return applicantList;
        }
        system.debug('applicantList--'+applicantList);
        return applicantList;
    }
    
    
    public static String insertFinancialDetails(List<Financial_Contribution__c> financialDetails){
        try{
            upsert financialDetails;
            return 'SUCCESS';
        }catch(Exception e){
            return 'ERROR';
        }
    }
    
    //*************************************** PROJECT DETAIL ********************************************
    
    
    public static string insertProjectDetails(Application_Proposal__c proposalDetails){
        try{
            upsert proposalDetails;
            return 'Success';
        }catch(Exception e){
            return 'Error';
        }
    }

    
    public static Application_Proposal__c getProjectdetils(string hashcode){
          contact userDetail = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:hashcode limit 1];

          Application_Proposal__c appProposal;
          if(userDetail.Proposals__c != null){
                appProposal = [select name,id,Research_Approach_Objectives__c,Current_State_Of_The_Art__c,Project_Description__c,Expected_Deliverables__c,Equipment__c,
                Reasons_For_And_Benefits_Of_Cooperation__c,Criteria_For_Abandoning_The_Project__c,Innovative_Aspects__c,Research_Scholars__c,
                Necessity_Of_Funding__c,Background_Concept_Purpose__c,Specific_Need_For_the_Bilateral_Event__c from Application_Proposal__c where id=:userDetail.Proposals__c Limit 1];
          }
            return appProposal;
    }

    
    public static String doCUploadAttachment(String attachmentBody, String attachmentName, string cvId, String udId) {
        system.debug('attachmentBody---'+attachmentName+'---attachmentId---'+cvId+'---cvId---'+udId);
        if(String.isBlank(attachmentBody) || String.isBlank(udId))
            return 'ERROR';
        if(String.isBlank(cvId)) {
            ContentVersion conVer = new ContentVersion();
            conVer.ContentLocation = 'S'; // to use S specify this document is in Salesforce, to use E for external files
            conVer.PathOnClient = 'attachmentName'; // The files name, extension is very important here which will help the file in preview.
            conVer.Title = attachmentName; // Display name of the files
            conVer.VersionData = EncodingUtil.base64Decode(attachmentBody); // converting your binary string to Blog
            conVer.isMajorVersion = false;
            insert conVer;    //Insert ContentVersion
            
            ContentDistribution cdl = new ContentDistribution();
            cdl.ContentVersionId = conVer.Id;
            cdl.Name = 'PublicShare';
            cdl.RelatedRecordId = udId;
            insert cdl;
            system.debug('ContentDistribution----'+cdl);
            // First get the Content Document Id from ContentVersion Object
            Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
            //create ContentDocumentLink  record 
            ContentDocumentLink conDocLink = New ContentDocumentLink();
            conDocLink.LinkedEntityId = udId; // Specify RECORD ID here i.e Any Object ID (Standard Object/Custom Object)
            conDocLink.ContentDocumentId = conDoc;  //ContentDocumentId Id from ContentVersion
            conDocLink.shareType = 'V';
            insert conDocLink;
            return conVer.Id;
        }else {
            List<ContentVersion> cvList = [SELECT Id, VersionData FROM ContentVersion WHERE Id = :cvId];
            if(!cvList.isEmpty()) {
                ContentVersion cVersion = cvList[0];
                if(cVersion.VersionData != null) {
                    String newBody = EncodingUtil.base64Encode(cVersion.VersionData);
                    newBody += attachmentBody;
                    cVersion.VersionData = EncodingUtil.base64Decode(newBody); // converting your binary string to Blog
                    update cVersion;
                    return cVersion.Id;
                }   
            }
        }
        return 'ERROR';
    }
    
    //************************************** WORK PACKAGE **********************************************************
    
    public static  list<contact> getWorkPackageDetails(string applicantHashCode){
        system.debug('applicantHashCode---'+applicantHashCode);
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        list<contact> applicantList = New list<contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            applicantList = [select name,id,FirstName,LastName,(SELECT Id,TRL_Level__c,Application__c,Title__c,Duration__c FROM Work_Package__r) from Contact  where Proposals__c=:conRec.Proposals__c];
            return applicantList;
        }
        system.debug('applicantList--'+applicantList);
        return applicantList;
    }

    public static String insertWPContactDetails(List<Work_Package__c> workPackDetails){
        try{
            
            List<String> workPackageList = new List<String>();

            System.debug('WorkPackDetails------'+workPackDetails.size());
            for(Work_Package__c wp : workPackDetails){
                workPackageList.add(wp.Id);
                //wp.Application__r.Proposal_Stages__c = 'Submitted';
            }

            if(!workPackageList.isEmpty()){
                List<Application_Proposal__c> applicationList = new List<Application_Proposal__c>();
                List<Work_Package__c> packageList = [Select Id,Application__c From Work_Package__c Where Id IN :workPackageList];
                for(Work_Package__c work : packageList){
                    applicationList.add(new Application_Proposal__c(Id = work.Application__c,Proposal_Stages__c = 'Submitted'));
                }
                upsert workPackDetails;
                upsert applicationList;
            }
            return 'SUCCESS';
            
        }catch(Exception e){
            System.debug('The Error is  :'+e.getMessage());
            return 'ERROR'; 
        }
    }

    public static  String insertWPContactDetailsAsDraft(List<Work_Package__c> workPackDetails){
        try{
            upsert workPackDetails;
            return 'SUCCESS';
            
        }catch(Exception e){
            System.debug('The Error is  :'+e.getMessage());
            return 'ERROR'; 
        }
    }

    //************************************** PI Deliverables **********************************************************
    
    public class PiWrapper{
        String title;
        String Responsible_Partner;
        String id;
        Integer day;
        Integer month;
        Integer year;
    }

    public static  list<contact> getProjectDetailsForPI(string applicantHashCode){
        system.debug('applicantHashCode---'+applicantHashCode);
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        list<contact> applicantList = New list<contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            applicantList = [select name,id,FirstName,LastName,(SELECT Id,Title__c,Due_Date__c,Responsible_Partner__c FROM PI_Deliverables__r) from Contact  where Proposals__c=:conRec.Proposals__c];
            return applicantList;
        }
        system.debug('applicantList--'+applicantList);
        return applicantList;
    }
    
    public static  String insertDeliverables(List<PiWrapper> deliverableList){
        try{
            system.debug('deliverableList------'+deliverableList);
            List<PI_Deliverables__c> PIList = New List<PI_Deliverables__c>();
            for(PiWrapper wrap : deliverableList){
                PI_Deliverables__c pi = New PI_Deliverables__c();
                pi.Title__c = wrap.Title;
                pi.Responsible_Partner__c = wrap.Responsible_Partner;
                if(wrap.id != null){
                    pi.Id = wrap.id;
                }
                pi.Due_Date__c = Date.newInstance(wrap.year, wrap.month, wrap.day);
                PIList.add(pi);
                system.debug('ghoomar ghoomar'+pi);
            }
            system.debug('goome re');
            system.debug('PIList --------> '+PIList);
            upsert PIList;
            return 'SUCCESS';
            
        }catch(Exception e){
            System.debug('The Error is  :'+e.getMessage());
           return 'ERROR'; 
        }
    }
    
    //************************************** Network Meeting **********************************************************
    
    public class NetworkMeetWrapper{
        String meetingAgenda;
        String meetingVenue;
        String contact;
        String id;
        Integer tentativeday;
        Integer tentativemonth;
        Integer tentativeyear;
        Integer actualday;
        Integer actualmonth;
        Integer actualyear;
    }
    
    public static list<contact> getProjectDetailsForNetMeet(string applicantHashCode){
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        list<contact> applicantList = New list<contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            applicantList = [select name,id,(SELECT Id,Meeting_Agenda__c,Meeting_Venue__c,Tentative_Date__c,Participants__c,Actual_Date__c,Contact__c FROM Network_Meetings__r) from Contact  where Proposals__c=:conRec.Proposals__c];
            return applicantList;
        }
        return applicantList;
    }
    
    
    public static String insertMeetingDetails(List<NetworkMeetWrapper> meetingList){
        try{
            system.debug('size ---> '+meetingList.size());
            List<Network_Meeting__c> netMeetList = New List<Network_Meeting__c>();
            for(NetworkMeetWrapper wrapp : meetingList){
                Network_Meeting__c netMeet = New Network_Meeting__c();
                netMeet.Meeting_Agenda__c = wrapp.meetingAgenda;
                netMeet.Meeting_Venue__c = wrapp.meetingVenue;
                netMeet.Contact__c = wrapp.contact;
                if(wrapp.id != null){
                    netMeet.id = wrapp.id;
                }
                netMeet.Tentative_Date__c = Date.newInstance(wrapp.tentativeyear, wrapp.tentativemonth, wrapp.tentativeday);
                netMeet.Actual_Date__c = Date.newInstance(wrapp.actualyear, wrapp.actualmonth, wrapp.actualday);
                system.debug('viigughum -----'+netMeet);
                system.debug('netMeetID ---> '+netMeet.id);
                netMeetList.add(netMeet);
            }
            system.debug('netMeetList :: '+netMeetList);
            upsert netMeetList;
            return 'SUCCESS';
            
        }catch(Exception e){
           return 'ERROR'; 
        }
    }
    
    //************************************** Grant Application **********************************************************
    
    
    public static  contact getApplicantDetailsForGrant(string applicantHashCode){
        try{
            contact conRec = [select name,id,Title,Funding_Agency__c,Budget__c,Starting_Date__c,Duration__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
            return conRec;
        }catch(Exception e){
            return null;
        }
    }
    
    
    public static String insertGrantApplication(Contact applicantDetails){
        try{
            update applicantDetails;
            return 'SUCCESS';
        }catch(Exception e){
            return 'ERROR';
        }
    }

    
    public static Application_Proposal__c fetchProjectDetails(String projectId){
        try{
            Application_Proposal__c ProposalRec = [SELECT Id,Name,Project_Description__c,Reasons_For_And_Benefits_Of_Cooperation__c,Research_Approach_Objectives__c,
            Necessity_Of_Funding__c,Research_Scholars__c,Summary__c,Title_Of__c FROM Application_Proposal__c WHERE Id =: projectId];
            return ProposalRec;
        }catch(Exception e){
            return null;
        }
    }

    public class ConsortiaDetails{
        public Account company;
        public List<contact> partnerDetails;
    }

    //************************************** Coordinators Page **********************************************************

    public static List<Contact> getCoordinatorsDetails(string hashCode){
        Contact conRec = [Select Id,Name,Proposals__c FROM Contact WHERE Login_Hash_Code__c=: hashCode];
        List<Contact> conList = New List<Contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            conList = [SELECT Id,Name,FirstName,LastName,Department,Head_Of_Project__c,Homepage_URL__c,Email,Phone,
            MailingAddress,MailingStreet,MailingCity,MailingCountry,MailingState,MailingPostalCode,Indian__c,German__c,Proposals__c From Contact WHERE Proposals__c=: conRec.Proposals__c];
            return conList;
        }
        system.debug('conList --> '+conList);
        return conList;
    }


    public static String insertCoordinatorsInformation(List<Contact> contactDetails){
        try{
            upsert contactDetails;
            return 'SUCCESS';
        }catch(Exception e){
            return 'ERROR';
        }
    }

    //************************************** BasicDetails Page **********************************************************

    public static Application_Proposal__c getBasicDetails(string applicantHashCode){
       
        contact conRec = [select name,id,Proposals__c from contact where Login_Hash_Code__c =:applicantHashCode limit 1];
        system.debug('applicantHashCode' +applicantHashCode);
        Application_Proposal__c proposalRecord;
        if(!string.isBlank(conRec.Proposals__c)){
            proposalRecord = [SELECT id,Name,Acronym__c,Thematic_Area__c,Campaign__c,Title_Of__c,Title_In_German__c,Summary__c,Proposed_Venue__c,Proposed_Date__c FROM Application_Proposal__c WHERE Id=: conRec.Proposals__c];
            system.debug('proposalRecord----'+proposalRecord);
            return proposalRecord;
        }else{
            return proposalRecord;  
        }     
    }


    public static string insertBasicDetails (Application_Proposal__c applicantDetails, integer day, integer month, integer year, String conId){
        try{
            if(day==0 && month==0 && year==0){
                
            }else{
                applicantDetails.Proposed_Date__c = Date.newInstance(year, month, day);
                
            }
            upsert applicantDetails;
            Contact con = new Contact(Id=conId,Proposals__c = applicantDetails.Id);
            update con;
            return 'SUCCESS';
        }catch (Exception e){
            return 'ERROR';
        }
    }

    //************************************** Participants **********************************************************

    public static List<contact> getParticipantDetails(string hashcode){
        Contact conRec = [Select Id,Name,Proposals__c FROM Contact WHERE Login_Hash_Code__c=: hashCode];
        List<Contact> conList = New List<Contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            conList = [SELECT Id,Name,Proposals__c,Indian__c,German__c,(SELECT Id,Name,FirstName,LastName,Affiliation__c,Email,Phone,Presenting_Workshop__c,Proposals__c From Contacts1__r) From Contact WHERE Proposals__c=: conRec.Proposals__c];
            return conList;
        }
        system.debug('conList --> '+conList);
        return conList;
    }

    public static string insertParticipants(List<Contact> listOfAllContacts){
        try{
            system.debug('list --->'+listOfAllContacts);
            upsert listOfAllContacts;
            return 'SUCCESS';
        }catch(Exception e){
            System.debug('The Error is  :'+e.getMessage());
            return 'ERROR';
        }
    }

    public static  void deleteParticipant(string contactId){
        delete new Contact(id=contactId);
    }

    //************************************** CV of Coordinators **********************************************************


    public static List<Contact> getCurriculumDetails(string hashCode){
        Contact conRec = [Select Id,Name,Proposals__c FROM Contact WHERE Login_Hash_Code__c=: hashCode];
        List<Contact> conList = New List<Contact>();
        if(!string.isBlank(conRec.Proposals__c)){
        conList = [SELECT Id,Name,FirstName,LastName,Actual_Position__c,Department,Country__c,
        Head_Of_Project__c,Homepage_URL__c,Email,Phone,Indian__c,German__c,
        MailingAddress,MailingStreet,MailingCity,MailingCountry,MailingState,MailingPostalCode,
        (SELECT Id,Name,Institution_Name__c,Specialization__c,Degree__c,End_Year__c FROM Education_Details__r),
        (SELECT Id,Name,Organization_Name__c,Position__c,End_Year__c FROM Employment_Details__r),(select name,id,description__c from Publications_Patents__r)
        From Contact WHERE Proposals__c=: conRec.Proposals__c];
        return conList;
        }
        system.debug('conList --> '+conList);
        return conList;
    }

    public static String insertCurriculumDetails(List<Contact> contactDetails, List<Education_Details__c> educationDetails, List<Employment_Details__c> employmentDetails, List<Publications_Patents__c> publicationDetails){
        try{
            upsert contactDetails;
            upsert educationDetails;
            upsert employmentDetails;
            upsert publicationDetails;
            return 'SUCCESS';
        }catch(exception e){
            system.debug('error -->'+e.getMessage());
            return 'ERROR';
        }
    }

    //************************************** Financial_Details **********************************************************

    public static List<Contact> getAllFinancialDetails(string hashCode){
        Contact conRec = [Select Id,Name,Proposals__c From Contact Where Login_Hash_Code__c=: hashCode];
        List<Contact> conList = New List<Contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            conList = [SELECT Id,Indian__c,German__c,Proposals__c,(Select Id,Expanse_Head__c,Expanse_Name__c,Unit_Cost__c,Number__c,Total__c FROM Financial_Contribution__r) From Contact WHERE Proposals__c=: conRec.Proposals__c];
            return conList;
        }
        return conList;
    }

    public static string saveFinancialDetails(List<Financial_Contribution__c> financialList){
        try{
            upsert financialList;
            return 'Success';
        }catch(Exception e){
            return 'Error';
        }
    }

    //************************************** BankDetailsForCoordinators **********************************************************

    public static List<Contact> getBankDetails(string hashCode){
        Contact conRec = [Select Id,Name,Proposals__c From Contact Where Login_Hash_Code__c=: hashCode];
        List<Contact> conList = New List<Contact>();
        if(!string.isBlank(conRec.Proposals__c)){
            conList = [SELECT Id,Indian__c,German__c,Proposals__c,(Select Id,Bank_Name__c,Bank_Type__c,Bank_IFSC_Code__c,Bank_SWIFT_Code__c,Bank_HSN_Code__c,Bank_Branch_Name__c,Bank_Account_Number__c,Account_Name__c,Bank_Address__c From Bank_Details__r) From Contact WHERE Proposals__c=: conRec.Proposals__c];
            return conList;
        }
        return conList;
    }
}