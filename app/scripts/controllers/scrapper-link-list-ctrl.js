(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ScrapperLinkListCtrl', ScrapperLinkListCtrl);

  ScrapperLinkListCtrl.$inject = ['AdminServ', '$filter'];

  function ScrapperLinkListCtrl(AdminServ, $filter) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.listURL = '';
    ctrl.productLinks = [];
    ctrl.displayOption = 1;
    ctrl.displayOptions = [{
      text: 'Show All',
      val: true,
      id: 1
    }, {
      text: 'Only Crawled Links',
      val: false,
      id: 2
    }, {
      text: 'Only Uncrawled Links',
      val: false,
      id: 3
    }];

    ctrl.updateCrawlBtnStatus = function() {
      ctrl.disabledCrawl10 = $filter('filter')(ctrl.productLinks, { status: 0 }).length < 10;
      ctrl.disabledCrawl50 = $filter('filter')(ctrl.productLinks, { status: 0 }).length < 50;
      ctrl.disabledCrawl100 = $filter('filter')(ctrl.productLinks, { status: 0 }).length < 100;
    };

    ctrl.loadTempProductLinks = function() {
      ctrl.status = 'warning';
      ctrl.statusMsg = 'Crawling aliexpress.com';
      AdminServ.loadTempProductLinks()
        .success(function(response) {
          console.log(response);
          ctrl.productLinks = response.statusBeans;
          ctrl.status = 'success';
          ctrl.statusMsg = ctrl.productLinks.length + ' products crawled';
          ctrl.updateCrawlBtnStatus();
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
          ctrl.updateCrawlBtnStatus();
        })
        .error(function(error) {
          // ctrl.processing = 2;
          ctrl.status = 'danger';
          ctrl.statusMsg = 'Unable to crawled the product from aliexpress.com';
          console.log('!Error');
          l.ladda('stop');
        });
    };

    ctrl.scrapProducts = function(n) {
      var pendingProducts = $filter('filter')(ctrl.productLinks, { status: 0 });
      if (!n) {
        n = pendingProducts.length;
      }
      var products = pendingProducts.slice(0, n);
      console.log(products.length);
      console.log(products);
      ctrl.status = 'warning';
      ctrl.statusMsg = 'Crawling ' + n + ' products from aliexpress.com';
      angular.forEach(products, function(product, key) {
        var l = $('#ladda-button-crawl-' + product.id).ladda();
        l.ladda('start');
      });
      AdminServ.scrapProduct(products)
        .success(function(response) {
          console.log(response);
          if (response.status == 'failure') {
            ctrl.status = 'danger';
            ctrl.statusMsg = 'Unable to crawl products from aliexpress.com';
          } else {
            ctrl.status = 'success';
            ctrl.statusMsg = 'Successfully crawled products from aliexpress.com';
            angular.forEach(ctrl.productLinks, function(productLink, key) {
              angular.forEach(products, function(product, key) {
                if (productLink.id == product.id) {
                  productLink.status = 1;
                }
              });
            });
          }
          $.ladda('stopAll');
          ctrl.updateCrawlBtnStatus();
        })
        .error(function(error) {
          // ctrl.processing = 2;
          ctrl.status = 'danger';
          ctrl.statusMsg = 'Unable to crawled the product from aliexpress.com';
          console.log('!Error');
          $.ladda('stopAll');
        });
    };
  }
})();