angular
        .module('homer')
        .factory('adminService', adminService);

function adminService($http, BASE_URL_CONSTANT) {
    return{
        changePassword: function (id, newPassword) {
            return $http.get(BASE_URL_CONSTANT + 'admin/resetpassword' + '?id=' + id + '&newPassword=' + newPassword);
        },
       
        updaterules: function (rules) {
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/UpdateRules',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(rules)
            });
        },
    };


}