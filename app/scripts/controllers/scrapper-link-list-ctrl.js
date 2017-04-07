(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ScrapperLinkListCtrl', ScrapperLinkListCtrl);

  ScrapperLinkListCtrl.$inject = ['AdminServ'];

  function ScrapperLinkListCtrl(AdminServ) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.listURL = '';
    ctrl.productLinks = [];

    ctrl.loadTempProductLinks = function() {
      ctrl.status = 'warning';
      ctrl.statusMsg = 'Crawling aliexpress.com';
      AdminServ.loadTempProductLinks()
        .success(function(response) {
          console.log(response);
          ctrl.productLinks = response.statusBeans;
          ctrl.status = 'success';
          ctrl.statusMsg = ctrl.productLinks.length + ' products crawled';
        })
        .error(function(error) {
          ctrl.status = 'danger';
          ctrl.statusMsg = 'Crawling products falied';
          console.log('!Error');
        });
    };
    ctrl.loadTempProductLinks();

    ctrl.scrapProduct = function(product, index) {
      console.log(index);
      ctrl.status = 'warning';
      ctrl.statusMsg = 'Crawling the product from aliexpress.com';
      var l = $('#ladda-button-crawl-' + product.id).ladda();
      l.ladda('start');
      var products = [];
      products.push(product);
      AdminServ.scrapProduct(products)
        .success(function(response) {
          console.log(response);
          if (response.status == 'failure') {
            ctrl.status = 'danger';
            ctrl.statusMsg = 'Unable to crawled the product from aliexpress.com';
          } else {
            ctrl.status = 'success';
            ctrl.statusMsg = 'Successfully crawled the product from aliexpress.com';
            ctrl.productLinks[index].status = 1;
          }
          l.ladda('stop');
        })
        .error(function(error) {
          // ctrl.processing = 2;
          ctrl.status = 'danger';
          ctrl.statusMsg = 'Unable to crawled the product from aliexpress.com';
          console.log('!Error');
          l.ladda('stop');
        });
    };
  }
})();