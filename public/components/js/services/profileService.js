angular.module('app').factory('profileService', function() {
    var userField = localStorage.getItem('userField');
    var authField = localStorage.getItem('authField');
    return {
        getAuthProfile: function() {
            return JSON.parse(localStorage.getItem('authField'));
        },
        setAuthProfile: function(profile) {//SHOULD ONLY BE CALLED FROM AUTH SERVICE
            localStorage.setItem('authField', JSON.stringify(profile));
        },
        getUserProfile: function() {
            return JSON.parse(localStorage.getItem('userField'));
        },
        setUserProfile : function(profile){//SHOULD ONLY BE CALLED FROM USER SERVICE
            localStorage.setItem('userField', JSON.stringify(profile));
        },
        logout : function(){
            localStorage.removeItem('userField');
            localStorage.removeItem('authField');
        }
    }
});
