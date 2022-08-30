public class IndustrialFellowshipHelper {
public String updateIndusrianFellowshipBasicDet(String contactId,Contact InstanceCon,Integer birthDay,Integer birthMonth,Integer birthYear,
Integer phdEnrollYear,Integer phdEnrollMonth,Integer phdEnrollDay,Integer phdAwardYear,Integer phdAwardMonth,Integer phdAwardDay
,Integer phdThesisYear,Integer phdThesisMonth,Integer phdThesisDay){
    try {
        Date newBirthDate;
        Date newPhdEnrollDate;
        Date newAwardDate;
        Date newThesisDate;
        if(birthDay!=0){
            newBirthDate=Date.newInstance(birthYear,birthMonth,birthDay);
        }
        if(birthDay!=0){
            InstanceCon.Birthdate=newBirthDate;
        }
        if(phdEnrollYear!=0){
            newPhdEnrollDate=Date.newInstance(phdEnrollYear,phdEnrollMonth,phdEnrollDay);
        }
        if(phdEnrollYear!=0){
            InstanceCon.PhD_Enroll_Date__c=newPhdEnrollDate;
        }
        if(phdAwardYear!=0){
            newAwardDate=Date.newInstance(phdAwardYear,phdAwardMonth,phdAwardDay);
        }
        if(phdAwardYear!=0){
            InstanceCon.PhD_Awarded_Date__c=newAwardDate;
        }
        if(phdThesisYear!=0){
            newThesisDate=Date.newInstance(phdThesisYear,phdThesisMonth,phdThesisDay);
        }
        if(phdThesisYear!=0){
            InstanceCon.Thesis_Submission_Date__c=newThesisDate;
        }
        InstanceCon.Login_Hash_Code__c=contactId;
        update InstanceCon;
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
        return 'ERROR';
    }
}
public String updatePersonalInfoIF(String ContactId,Contact InstanceCon,Integer birthDay,Integer birthMonth,Integer birthYear,Integer pasExYear,Integer pasExMonth,Integer pasExDay)
{
    try {
        Date newBirthDate;
        Date newPasExpDate;
        if(birthDay!=0){
            newBirthDate=Date.newInstance(birthYear,birthMonth,birthDay);
            InstanceCon.Birthdate=newBirthDate;
        }
        if(pasExYear!=0){
            newPasExpDate=Date.newInstance(pasExYear,pasExMonth,pasExDay);
            InstanceCon.Passport_Expiry__c=newPasExpDate;
        }
        InstanceCon.Login_Hash_Code__c=contactId;
        update InstanceCon;
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
        return 'ERROR';
    }
}
public String saveEduDetailIF(String loginHashCode,List<Education_Details__c> instanceEduDet){
try {
    // if(masterStartDate!=null){
    //  for(Education_Details__c ed:instanceEduDet){
    //     if(ed.Recordtype.name=='Thesis' && ed.Thesis_Type__c=='Master Thesis'){
            
    //     }
    //  }   
    // }
    update instanceEduDet;
    return 'Detail updated successfully!';
} catch (DmlException e) {
    system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
    return 'ERROR';
}
}
public String upsertAchievements(String loginHashCode,Achievement__c instanceAchiev,String flag){
    try {
        if(flag=='update'){
        update instanceAchiev;
        }
        else {
            Contact instanceCon = [SELECT ID FROM Contact WHERE Login_Hash_Code__c=:loginHashCode limit 1];
            instanceAchiev.contact__c=instanceCon.id;
            insert instanceAchiev;
        }
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
    return 'ERROR';
    }
}
public String saveContactEmployement(String loginHashCode,Contact con){
    try {
        update con;
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
    return 'ERROR';
    }
}
public String saveFellowshipDetails(String loginHashCode,Contact[] con,Contact pContact,Application_Proposal__c prop){
    try {
        upsert prop;
        pContact.Proposals__c = prop.Id;
        update pContact;
        upsert con;        
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        //system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
    return 'exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'';
    }
}
public String saveApplicantPortalSingh(String loginHashCode,Contact con){
    try {
        update con;
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
    return 'ERROR';
    }
}
public String saveApplicantPortalSingh(String loginHashCode,Contact InstanceCon,Integer year,Integer month,Integer day)
{
    try {
        Date newBirthDate;
        if(year!=0){
            newBirthDate=Date.newInstance(year,month,day);
            InstanceCon.Birthdate=newBirthDate;
        }
        update InstanceCon;
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
        return 'ERROR';
    }
}
public String saveProjectDetailsSing(String loginHashCode,Contact pContact,Application_Proposal__c prop){
    try {
        upsert prop;
        pContact.Proposals__c = prop.Id;
        update pContact;
        return 'Detail updated successfully!';
    } catch (DmlException e) {
        //system.debug('exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'');
    return 'exception: '+e.getMessage()+' line no. '+e.getLineNumber()+'';
    }
}

// Wiser
public string saveApplicantPortalWiser(String loginHashCode, Contact con){
    try{
        update con;
        return 'Record Updated Successfully';
    }catch(Exception e){
        system.debug('The Error :: '+e.getMessage()+' AND Line No :: '+e.getLineNumber()+'');
        return 'Error Occured';
        }
}

// Wiser
public String saveApplicantPortalWiser(String loginHashCode, Contact InstanceCon, Integer year, Integer month, Integer day){
    try{
        Date newBirthDate;
        if(year !=0){
            newBirthDate = Date.newInstance(year,month,day);
            InstanceCon.Birthdate = newBirthDate;
        }
        update InstanceCon;
        return 'Record Updated Successfully';
    }catch(Exception e){
         system.debug('The Error :: '+e.getMessage()+' AND Line No :: '+e.getLineNumber()+'');
         return 'Error Occured';
        }
   }

}