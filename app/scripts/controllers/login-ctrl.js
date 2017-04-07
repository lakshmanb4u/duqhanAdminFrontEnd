(function() {
  'use strict';
  angular
    .module('homer')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['AdminServ', '$state', '$timeout'];

  function LoginCtrl(AdminServ, $state, $timeout) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.user = {};
    ctrl.loginFailed = false;

    ctrl.signin = function() {
      AdminServ.login(ctrl.user)
        .success(function(data) {
          console.log(data);
          if (data.aouthToken) {
            $state.go('products');
          } else {
            ctrl.loginFailed = true;
            $timeout(function() {
              ctrl.loginFailed = false;
            }, 5000);
          }

        })
        .error(function(error) {
          console.log('Unable to login');
          ctrl.loginFailed = true;
          $timeout(function() {
            ctrl.loginFailed = false;
          }, 5000);
        });
    };
  }
})();