angular.module('cp_app').controller('SignatureSealsSing_Ctrl', function($scope,$rootScope) {
$scope.previousProjectDetSingh=function(){
    var link=document.createElement("a");
                          link.id = 'someLink'; //give it an ID!
                          link.href="#/ProjectDetailsSing";
                          link.click();
}
});