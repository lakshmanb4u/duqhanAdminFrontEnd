(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ScrapperNewLinkCtrl', ScrapperNewLinkCtrl);

  ScrapperNewLinkCtrl.$inject = ['AdminServ', '$timeout', '$state'];

  function ScrapperNewLinkCtrl(AdminServ, $timeout, $state) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.listURL = '';
    ctrl.crawlError = false;
    ctrl.crawlErrorMsg = '';
    ctrl.scrapListURL = function() {
      var l = $('#ladda-button-crawl-new-link').ladda();
      l.ladda('start');
      if (ctrl.listURL) {
        AdminServ.scrapListURL(ctrl.listURL)
          .success(function(response) {
            console.log(response);
            l.ladda('stop');
            if ((response.statusBeans && response.statusBeans.length > 0)) {
              $state.go('scrapper.linklist');
            } else {
              ctrl.listURL = '';
              ctrl.crawlError = true;
              ctrl.crawlErrorMsg = 'Not able to crawl any product';
              $timeout(function() {
                ctrl.crawlError = false;
                ctrl.crawlErrorMsg = '';
              }, 5000);
            }
          })
          .error(function(error) {
            l.ladda('stop');
            ctrl.crawlError = true;
            ctrl.crawlErrorMsg = 'Please provide a valid link';
            $timeout(function() {
              ctrl.crawlError = false;
              ctrl.crawlErrorMsg = '';
            }, 5000);
            console.log('!Error');
          });
      } else {
        l.ladda('stop');
        ctrl.crawlError = true;
        ctrl.crawlErrorMsg = 'Please provide a valid link';
        $timeout(function() {
          ctrl.crawlError = false;
          ctrl.crawlErrorMsg = '';
        }, 5000);
      }
    };
  }
})();