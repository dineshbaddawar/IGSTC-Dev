angular.module('cp_app').controller('projectCtrl', function($scope,$rootScope) {
    debugger;
    $scope.siteURL = siteURL;  
    $scope.proposalDetails = {};
    $scope.disable = false;
    $rootScope.secondstage;
    $scope.saveDetails = function(){
        debugger;
        ApplicantPortal_Contoller.insertProjectDetails($scope.proposalDetails, function(result,event){
            if(event.status){
                debugger;
                Swal.fire(
                    'Success',
                    'Submitted successfully.',
                    'success'
                );
                $scope.redirectPageURL('WorkPackages');
                $scope.proposalDetails = result;
                $scope.$apply();
            }
        },
       {escape: true}
        )
    }
    
    $scope.uploadFile = function (proposalId, fileId) {
        debugger;
        $scope.showSpinner = true;
        var file = document.getElementById('attachmentFiles').files[0];
        /* if (type == 'profilePic') {
                    file = document.getElementById('profilePic').files[0];
                } else if (type == 'resume') {
                    file = document.getElementById('resumeAttachmentFile').files[0];
                }
                else { */
                    //file = ;
                    //}
                    
                    console.log(file);
                    if (file != undefined) {
                        if (file.size <= maxFileSize) {
                            
                            attachmentName = file.name;
                            const myArr = attachmentName.split(".");
                            if (myArr[1] != "pdf") {
                                alert("Please upload in PDF format only");
                                return;
                            }
                            var fileReader = new FileReader();
                            fileReader.onloadend = function (e) {
                                attachment = window.btoa(this.result);  //Base 64 encode the file before sending it
                                positionIndex = 0;
                                fileSize = attachment.length;
                                $scope.showSpinner = false;
                                console.log("Total Attachment Length: " + fileSize);
                                doneUploading = false;
                                if (fileSize < maxStringSize) {
                                    $scope.uploadAttachment(proposalId, fileId); //Attachment, proposalId, 
                                } else {
                                    alert("Base 64 Encoded file is too large.  Maximum size is " + maxStringSize + " your file is " + fileSize + ".");
                                }
                                
                            }
                            fileReader.onerror = function (e) {
                                alert("There was an error reading the file.  Please try again.");
                            }
                            fileReader.onabort = function (e) {
                                alert("There was an error reading the file.  Please try again.");
                            }
                            
                            fileReader.readAsBinaryString(file);  //Read the body of the file
                            
                        } else {
                            alert("File must be under 4.3 MB in size.  Your file is too large.  Please try again.");
                            $scope.showSpinner = false;
                        }
                    } else {
                        alert("You must choose a file before trying to upload it");
                        $scope.showSpinner = false;
                    }
                }
                
                $scope.uploadAttachment = function (proposalId, fileId) { //fileId = conVer id , proposalId = userDocumentId;
                    var attachmentBody = "";
                    if (fileId == undefined) {
                        fileId = "";
                    }
                    if (fileSize <= positionIndex + chunkSize) {
                        attachmentBody = attachment.substring(positionIndex);
                        doneUploading = true;
                    } else {
                        attachmentBody = attachment.substring(positionIndex, positionIndex + chunkSize);
                    }
                    console.log("Uploading " + attachmentBody.length + " chars of " + fileSize);
                    
                    //console.log("Type----",type);
                    console.log("attachmentBody----", attachmentBody);
                    console.log("attachmentName----", attachmentName);
                    console.log("candidateId----", candidateId);
                    console.log("proposalId----", proposalId);
                    console.log("fileId----", fileId);
                    
                    
                    ApplicantPortal_Contoller.doCUploadAttachment(attachmentBody, attachmentName, fileId, proposalId,
                                                                 function (cvId, event) {
                                                                     console.log(cvId);
                                                                     if(cvId === 'ERROR') {
                                                                         alert('Something went wrong, please contact support@ondonte.com');
                                                                         return;
                                                                     }
                                                                     if (event.type === 'exception') {
                                                                         console.log("exception");
                                                                         console.log(event);
                                                                     } else if (event.status) {
                                                                         if (doneUploading == true) {
                                                                             // debugger;
                                                                             if ($scope.isExpirable) {
                                                                                 $scope.updateDocExpiryDate();
                                                                             }
                                                                             Swal.fire(
                                                                                 '',
                                                                                 'Uploaded Successfully!',
                                                                                 'success'
                                                                             )
                                                                             $("#fileUploadModel").modal('hide');
                                                                             $("#resumeUploadModel").modal('hide');
                                                                             $scope.showUplaodUserDoc = false;
                                                                             debugger;
                                                                             CandidateDashboard_Controller.updateUserDoc(proposalId, fileId, function(result, evnet) {
                                                                                 if(result === "success") {
                                                                                     $scope.getContactUserDoc();
                                                                                 }else {
                                                                                     alert('Something went wrong, please contact support@ondonte.com');
                                                                                 }
                                                                                 
                                                                             });
                                                                             // $scope.getCandidateDetails();
                                                                         } else {
                                                                             debugger;
                                                                             positionIndex += chunkSize;
                                                                             $scope.uploadAttachment(proposalId, cvId);
                                                                         }
                                                                     } else {
                                                                         console.log(event.message);
                                                                     }
                                                                 },
                                                                 
                                                                 
                                                                 { buffer: true, escape: true, timeout: 120000 }
                                                                );
                }   
                
                $scope.getProjectdetils = function(){
                    debugger;
                    ApplicantPortal_Contoller.getProjectdetils($rootScope.userId, function(result,event){
                        if(event.status){
                            $scope.proposalDetails = result;
                            $scope.$apply();
                        }
                    },
                                                              {escape: true}
                                                             )
                }
                $scope.getProjectdetils();
                $scope.uploadFileToUserDoc = function () {
                    debugger;
                    $scope.selecteduDoc;
                    if ($scope.fileId != undefined) {
                        $scope.uploadFile($scope.proposalDetails.Id, $scope.fileId);
                    } else {
                        $scope.uploadFile($scope.proposalDetails.Id, "");                    
                    } 
                }
                
                $scope.redirectPageURL = function(pageName){
                    debugger;
                    var link=document.createElement("a");
                    link.id = 'someLink'; //give it an ID!
                    link.href="#/"+pageName;
                    link.click();
                }
                
            });