public withOut sharing class IndustrialFellowshipController {
    public IndustrialFellowshipController(){
        
    }
    @RemoteAction
    public static List<Education_Details__c> getEduQualification(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getEduQualification(loginHashCode);
    }
    @RemoteAction
    public static String saveEduDetailIF(String loginHashCode,List<Education_Details__c> instanceEduDet){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.saveEduDetailIF(loginHashCode,instanceEduDet);
    }
    @RemoteAction
    public static Achievement__c getAchievementsDet(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getAchievementsDet(loginHashCode);
    }
    @RemoteAction
    public static String upsertAchievements(String loginHashCode,Achievement__c instanceAchiev,String flag){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.upsertAchievements(loginHashCode,instanceAchiev,flag);
    }
    @RemoteAction
    public static Contact getContactEmployement(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getContactEmployement(loginHashCode);
    }
    @RemoteAction
    public static String saveContactEmployement(String loginHashCode,Contact con){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.saveContactEmployement(loginHashCode,con);
    }
    @RemoteAction
    public static Contact getContactDetailsFellowDet(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getContactDetailsFellowDet(loginHashCode);
    }
    @RemoteAction
    public static String saveFellowshipDetails(String loginHashCode,Contact[] con,Contact pContact,Application_Proposal__c prop)
    {
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.saveFellowshipDetails(loginHashCode,con,pContact,prop);
    }
    @RemoteAction
    public static Contact getContactSingh(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getContactSingh(loginHashCode);
    }
    @RemoteAction
    public static String saveApplicantPortalSingh(String loginHashCode,Contact con,Integer year,Integer month,Integer day){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.saveApplicantPortalSingh(loginHashCode,con,year,month,day);
    }
    @RemoteAction
    public static Contact getProposalDet(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getProposalDet(loginHashCode);
    }
    @RemoteAction
    public static String saveProjectDetailsSing(String loginHashCode,Contact pContact,Application_Proposal__c prop){
        IndustrialFellowshipHelper instanceIFH=new IndustrialFellowshipHelper();
        return instanceIFH.saveProjectDetailsSing(loginHashCode,pContact,prop);
    }

    // Wiser
    @RemoteAction 
    public static Contact getContactWiser(String loginHashCode){
        IndustrialFellowshipModel instanceIFM = new IndustrialFellowshipModel();
        return instanceIFM.getContactWiser(loginHashCode);
    }
   // Wiser
    @RemoteAction 
    public static String saveApplicantPortalWiser(String loginHashCode, Contact con, Integer year, Integer month, Integer day){
        IndustrialFellowshipHelper instanceIFH = new IndustrialFellowshipHelper();
        return instanceIFH.saveApplicantPortalWiser(loginHashCode, con, year, month, day);
    }

    // Wiser
    @RemoteAction
    public static Contact getProposalDetWiser(String loginHashCode){
        IndustrialFellowshipModel instanceIFM=new IndustrialFellowshipModel();
        return instanceIFM.getProposalDetWiser(loginHashCode);
    }
    
}