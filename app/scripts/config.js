/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

function configState($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider, $localStorageProvider, cloudinaryProvider) {

  // Optimize load start with remove binding information inside the DOM element
  $compileProvider.debugInfoEnabled(true);
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //Inject the interceptor
  $httpProvider.interceptors.push('HttpInterceptor');

  // localStorage Prefix
  $localStorageProvider.setKeyPrefix('duqhan');

  // Cloudinary configuration
  cloudinaryProvider.config({
    cloud_name: 'duqhan',
    api_key: '211572778157664',
    api_secret: 'BjqvouftX41P4NHFbAEPFaBWFog' // optional
  });

  // Set default state
  $urlRouterProvider.otherwise("/login");
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: 'LoginCtrl as ctrl',
      data: {
        pageTitle: 'Login',
      }
    })
    .state('logout', {
      url: "/logout",
      template: "<div>logging out</div>",
      controller: 'LogoutCtrl as ctrl',
      data: {
        pageTitle: 'Logout',
      }
    })
    .state('products', {
      url: "/products",
      templateUrl: "views/products.html",
      controller: 'ProductsCtrl as ctrl',
      data: {
        pageTitle: 'Products',
      }
    })
    .state('product', {
      url: "/products/details",
      templateUrl: "views/product.html",
      controller: 'ProductCtrl as ctrl',
      params: {
        product: null
      },
      data: {
        pageTitle: 'Product',
      }
    })
    .state('inventory', {
      url: "/products/inventory",
      templateUrl: "views/inventory.html",
      controller: 'InventoryCtrl as ctrl',
      params: {
        product: null
      },
      data: {
        pageTitle: 'Inventory',
      }
    })
    .state('newProduct', {
      url: "/new-product",
      templateUrl: "views/new-product.html",
      controller: 'NewProductCtrl as ctrl',
      data: {
        pageTitle: 'New Product',
      }
    })
    .state('scrapper', {
      abstract: true,
      url: "/scrapper",
      templateUrl: "views/common/content.html",
      data: {
        pageTitle: 'Crawler'
      }
    })
    .state('scrapper.newlink', {
      url: "/newlink",
      templateUrl: "views/scrapper/newlink.html",
      controller: 'ScrapperNewLinkCtrl as ctrl',
      data: {
        pageTitle: 'New Link',
        pageDesc: 'Crawl a new list page'
      }
    })
    .state('scrapper.linklist', {
      url: "/linklist",
      templateUrl: "views/scrapper/linklist.html",
      controller: 'ScrapperLinkListCtrl as ctrl',
      data: {
        pageTitle: 'Crawled Links',
        pageDesc: 'List of all the product links crawled'
      }
    })
    .state('scrapper.productlist', {
      url: "/productlist",
      templateUrl: "views/scrapper/productlist.html",
      controller: 'ScrapperProductListCtrl as ctrl',
      data: {
        pageTitle: 'Crawled Products',
        pageDesc: 'List of all the product crawled'
      }
    })
    .state('orders', {
      url: "/orders",
      templateUrl: "views/orders.html",
      controller: 'OrdersCtrl as ctrl',
      data: {
        pageTitle: 'Orders'
      }
    })
    .state('deepLink', {
      url: "/deepLink",
      templateUrl: "views/deepLink.html",
      controller: 'DeepLinkCtrl as ctrl',
      data: {
        pageTitle: 'Categories'
      }
    })
    .state('product_deepLink', {
      url: "/product_deepLink",
      templateUrl: "views/product-deepLink.html",
      controller: 'ProductDeepLinkCtrl as ctrl',
      data: {
        pageTitle: 'Products'
      }
    })
    .state('categories', {
      url: "/categories",
      templateUrl: "views/categories.html",
      controller: 'CategoriesCtrl as ctrl',
      data: {
        pageTitle: 'Categories'
      }
    });
};


angular
  .module('homer')
  .config(configState)
  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });