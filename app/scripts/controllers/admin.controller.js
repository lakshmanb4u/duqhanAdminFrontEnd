(function () {
    'use strict';
    angular
            .module('homer')
            .controller('authenticationController', authenticationController);

    authenticationController.$inject = ['$location', '$scope', 'authService', 'sweetAlert', 'localStorageService', 'adminService'];

    /* @ngInject */
    function authenticationController($location, $scope, authService, sweetAlert, localStorageService, adminService) {
        var vm = this;
        var adminkey = 'spanesports-admin';
        vm.admin = JSON.parse(localStorageService.get(adminkey));
        vm.adminlogin = {
            email: '',
            password: ''
        };
        vm.login = function () {
            if ($scope.login_form.$valid) {
                var user = {};
                var $promise = authService.login(vm.adminlogin); //call login service
                $promise.then(
                        function (response) {
                            if (response.data.status === "success") {
                                user.email = response.data.email;
                                user.userId = response.data.userId;
                                user.userName = response.data.userName;
                                localStorageService.destroy(adminkey);
                                localStorageService.set(adminkey, JSON.stringify(user));
                                $location.path('/admin/dashboard');
                            } else {
                                sweetAlert.swal({
                                    title: "Error!",
                                    text: response.data.statusText,
                                    type: "error",
                                    confirmButtonColor: "#62CB31"
                                });
                            }
                        },
                        function (errResponse) {
                            sweetAlert.swal({
                                title: "Error!",
                                text: errResponse,
                                type: "error",
                                confirmButtonColor: "#62CB31"
                            });
                        }
                );
            } else {
                $scope.login_form.submitted = true;
            }
        };

        vm.adminuser = {
            newpassword: '',
            retypepassword: ''
        };

        vm.logout = function () {
            localStorageService.destroy(adminkey);
            $location.path('/login');

        };
    }
})();






