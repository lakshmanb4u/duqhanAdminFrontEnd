(function() {
  'use strict';
  angular
    .module('homer')
    .controller('LogoutCtrl', LogoutCtrl);

  LogoutCtrl.$inject = ['AdminServ', '$state', '$timeout', '$localStorage'];

  function LogoutCtrl(AdminServ, $state, $timeout, $localStorage) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.logout = function() {
        AdminServ.logout($localStorage.email)
      .success(function(data) {
       $state.go('login');
      })
      .error(function(error) {
        $state.go('login');
      });
    };
    ctrl.logout();
  }
})();