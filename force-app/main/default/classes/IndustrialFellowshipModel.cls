public class IndustrialFellowshipModel {
public List<Education_Details__c> getEduQualification(String loginHashCode){
    // List<Education_Details__c> lEduDet=
    return [SELECT Name,Degree__c,Start_Year__c,End_Year__c,End_Date__c,Start_Date__c,Institution_Name__c,Specialization__c,Percentage__c,
    Thesis_Supervisor__c,Thesis_Type__c,Recordtype.Name,RecordTypeId,Title_Thesis__c FROM Education_Details__c where contact__r.Login_Hash_Code__c=:loginHashCode]; 
    // return lEduDet;
}
public Achievement__c getAchievementsDet(String loginHashCode){
    // List<Education_Details__c> lEduDet=
    return [SELECT id,contact__c,Awards_Honours__c,List_of_Publications__c,List_of_Patents_filed__c,Book_Chapters__c,Any_other_achievements__c FROM Achievement__c where contact__r.Login_Hash_Code__c=:loginHashCode]; 
    // return lEduDet;
}
public Contact getContactEmployement(String loginHashCode){
    return [SELECT Id,Name,Previous_industrial_internship__c,Availing_Fellowship__c,Fellowship_Details__c,Associated_with_IGSTC__c,Associated_Details__c,Abstract_of_Ongoing_Work__c,
        (SELECT Id,Name,Organization_Name__c,Position__c,Start_Date__c,End_Date__c,Nature_of_Job__c FROM Employment_Details__r)
         From Contact WHERE Login_Hash_Code__c=: loginHashCode Limit 1];
}
public Contact getContactDetailsFellowDet(String loginHashCode){
    return [SELECT Id,Name,Proposals__r.Title_Of__c,Proposals__r.Research_Approach_Objectives__c,Proposals__r.Host_industry__c,
    Proposals__r.Brief_Statement_of_Purpose__c,Proposals__r.Expected_Deliverables__c,Proposals__r.Proposed_area__c,Proposals__r.Parent_organisation__c,
    Proposals__r.Fellowship_Duration__c,Proposals__r.Work_plan__c,(select id,FirstName,LastName,Addess_same_as__c,MailingCity,MailingState,MailingCountry,MailingPostalCode,MailingStreet,OtherStreet,OtherCity,OtherState,OtherCountry,OtherPostalCode,Position_of_the_Mentor__c,Brief_portfolio__c from Contacts__r),
    (select id,FirstName,LastName,Addess_same_as__c,MailingCity,MailingState,MailingCountry,MailingPostalCode,MailingStreet,Position_of_the_Mentor__c,Brief_portfolio__c,OtherStreet,OtherCity,OtherState,OtherCountry,OtherPostalCode from Contacts1__r) From Contact WHERE Login_Hash_Code__c=: loginHashCode Limit 1];
}
public Contact getContactSingh(String loginHashCode){
    return [SELECT id,FirstName,LastName,MailingCity,MailingState,MailingCountry,MailingPostalCode,MailingStreet,Nationality__c,Institute_Name__c,Department,Designation__c,Phone,Email,Homepage_URL__c,Birthdate 
    From Contact WHERE Login_Hash_Code__c=: loginHashCode Limit 1];
}
public Contact getProposalDet(String loginHashCode){
    return [SELECT Id,Name,Proposals__r.Id,Proposals__r.Brief_Statement_of_Purpose__c,Proposals__r.Proposed_area__c,Proposals__r.Purpose_for_applying__c,Proposals__r.KeyWords__c,Proposals__r.Project_Description__c,Proposals__r.Indo_German_Colloboration__c,Proposals__r.Abstract_of_proposed__c
     From Contact WHERE Login_Hash_Code__c=: loginHashCode Limit 1];
}

// Wiser
public  Contact getContactWiser(String loginHashCode){
    Contact con = [SELECT Id,FirstName,LastName, MailingCity, MailingState,MailingCountry,MailingPostalCode, MailingStreet,Nationality__c,Institute_Name__c,Department, Designation__c,Phone,Email, Homepage_URL__c, Birthdate FROM Contact WHERE Login_Hash_Code__c =: loginHashCode LIMIT 1];
    System.debug('con Data::'+con);
    return con;
}

// Host Information
public Contact getContactHostInfo(String loginHashCode){
    Contact con = [SELECT Id,FirstName,LastName, MailingCity, MailingState,MailingCountry,MailingPostalCode, MailingStreet,Nationality__c,Institute_Name__c,Department, Designation__c,Phone,Email, Homepage_URL__c, Birthdate FROM Contact WHERE Login_Hash_Code__c =: loginHashCode LIMIT 1];
    System.debug('con Data::'+con);
    return con;
}

}