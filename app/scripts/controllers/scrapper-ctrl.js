(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ScrapperCtrl', ScrapperCtrl);

  ScrapperCtrl.$inject = ['AdminServ'];

  function ScrapperCtrl(AdminServ) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.listURL = '';
    ctrl.processing = 0;
    ctrl.scrapListURL = function() {
      if (ctrl.listURL) {
        ctrl.processing = 1;
        AdminServ.scrapListURL(ctrl.listURL)
          .success(function(response) {
            console.log(response);
            ctrl.productLinks = response.statusBeans;
            ctrl.processing = 2;
          })
          .error(function(error) {
            ctrl.processing = 2;
            console.log('!Error');
          });
      }
    };

    ctrl.loadTempProductLinks = function() {
      ctrl.processing = 1;
      AdminServ.loadTempProductLinks()
        .success(function(response) {
          console.log(response);
          ctrl.productLinks = response.statusBeans;
          ctrl.processing = 2;
        })
        .error(function(error) {
          ctrl.processing = 2;
          console.log('!Error');
        });
    };
    ctrl.loadTempProductLinks();

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

    ctrl.scrapProduct = function(product) {
      var l = $('#ladda-button-crawl-' + product.id).ladda();
      l.ladda('start');
      var products = [];
      products.push(product);
      AdminServ.scrapProduct(products)
        .success(function(response) {
          console.log(response);
          ctrl.loadCrawledProducts();
          ctrl.loadTempProductLinks();
          l.ladda('stop');
        })
        .error(function(error) {
          // ctrl.processing = 2;
          console.log('!Error');
          l.ladda('stop');
        });
    };
  }
})();