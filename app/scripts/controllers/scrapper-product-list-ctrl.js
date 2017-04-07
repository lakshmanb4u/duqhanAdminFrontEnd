(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ScrapperProductListCtrl', ScrapperProductListCtrl);

  ScrapperProductListCtrl.$inject = ['AdminServ'];

  function ScrapperProductListCtrl(AdminServ) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.listURL = '';
    ctrl.processing = 0;
    ctrl.product = null;

    ctrl.loadCrawledProducts = function() {
      AdminServ.loadCrawledProducts(0, 150)
        .success(function(response) {
          console.log(response);
          ctrl.products = response.products;
        })
        .error(function(error) {
          console.log('!Error');
        });
    };
    ctrl.loadCrawledProducts();

    ctrl.showProduct = function(product) {
      ctrl.product = product;
      $('div.hpanel').removeClass('hide');
    }
  }
})();