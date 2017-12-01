(function () {
  'use strict';
  angular
    .module('homer')
    .controller('ProductsCtrl', ProductsCtrl);

  ProductsCtrl.$inject = ['$location', '$scope', 'AdminServ', 'ITEM_PER_PAGE'];
  
  function ProductsCtrl($location, $scope, AdminServ, ITEM_PER_PAGE) {
    var ctrl = this;
    ctrl.selectedSize = 'Select size';
    ctrl.selectedItem = 'Select Category';
    ctrl.selectedvendor = 'Select Vendor';
    ctrl.PselectedItem = 'Select Parent Category';
    ctrl.SizeGrupselectedItem = 'Select size';
    ctrl.selectedColor = 'Select Color';
    ctrl.startIndex = 0; // when get list of product
    ctrl.isVisible = "true";
    ctrl.isNextHide = false;
    ctrl.isPrevHide = true;


    // get products when load view product page
    $('.loader').show();
    AdminServ.getProducts(ctrl.startIndex, ITEM_PER_PAGE)
      .success(function (productBeans) {
        ctrl.products = productBeans.products;
        ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
        // console.log('onload' + ctrl.products);
        $('.loader').hide();
      })
      .error(function (error) {
        $('.loader').hide();
        console.log('Unable to load subject data');
      });

    // Go To Top Of Page
    ctrl.goToTop = function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    };
    // load more products
    ctrl.getMoreProduct = function () {
      $('.loader').show();
      console.log('ctrl.startIndex' + ctrl.startIndex);
      AdminServ.getProducts((parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE)), ITEM_PER_PAGE)
        .success(function (productBeans) {
          if (productBeans.products.length < 1) {
            ctrl.isNextHide = true;
          } else {
            ctrl.isPrevHide = false;
            ctrl.products = productBeans.products;
            ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
          }
          console.log(ctrl.products);
          $('.loader').hide();
        })
        .error(function (error) {
          $('.loader').hide();
          console.log('Unable to load subject data');
        });
    };

    // load privious products
    ctrl.getPreviousProduct = function () {
      $('.loader').show();
      console.log('ctrl.startIndex' + ctrl.startIndex);
      if ((parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE)) < 0) {
        console.log("hhhhhhhhhhhh");
        ctrl.isPrevHide = true;
        ctrl.isNextHide = false;
      } else {
        AdminServ.getProducts((parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE)), ITEM_PER_PAGE)
          .success(function (productBeans) {
            if (productBeans.products.length < ITEM_PER_PAGE) {
              ctrl.isPrevHide = true;
            } else {
               ctrl.isNextHide = false;
              ctrl.products = productBeans.products;
              ctrl.startIndex = (parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE));
            }
            console.log(ctrl.products);
            $('.loader').hide();
          })
          .error(function (error) {
            $('.loader').hide();
            console.log('Unable to load subject data');
          });
      }
    };

    ctrl.categoryitemselected = function (item) {
      ctrl.selectedItem = item.categoryName;
      console.log(item.categoryId);
    }

    ctrl.getCategory = function () {
      AdminServ.getCategory()
        .success(function (data) {
          ctrl.category = data.categoryDtos;
          console.log(ctrl.category);
        })
        .error(function (error) {
          console.log('Unable to load subject data');
        });
    };

    // --------------------------------- //

    ctrl.Vendoritemselected = function (item2) {
      ctrl.selectedvendor = item2.contactName;
    }
    ctrl.getVendor = function () {
      AdminServ.getVendor()
        .success(function (data) {
          ctrl.vendor = data.vendorDtos;
          console.log(ctrl.vendor);
        })
        .error(function (error) {
          console.log('Unable to load subject data');
        });
    };

    // --------------------------------- //

    ctrl.SizeSelected = function (item3) {
      ctrl.selectedSize = item3.sizeText;
    }
    ctrl.getSize = function () {
      AdminServ.getSize()
        .success(function (data) {
          ctrl.size = data.sizeDtos;
          console.log(ctrl.size);
        })
        .error(function (error) {
          console.log('Unable to load subject data');
        });
    };

    // --------------------------------- //

    ctrl.ColorSelected = function (item4) {
      ctrl.selectedColor = item4.colorText;
    }
    ctrl.getColor = function () {
      AdminServ.getColor()
        .success(function (data) {
          ctrl.color = data.colorDtos;
          console.log(ctrl.color);
        })
        .error(function (error) {
          console.log('Unable to load subject data');
        });
    };

    // --------------------------------- //

    ctrl.Pcategoryitemselected = function (item) {
      ctrl.PselectedItem = item.categoryName;

    }

    ctrl.PgetCategory = function () {
      AdminServ.getCategory()
        .success(function (data) {
          ctrl.Pcategory = data.categoryDtos;
          console.log(ctrl.category);
        })
        .error(function (error) {
          console.log('Unable to load subject data');
        });
    };

    // --------------------------------- //

    ctrl.SizeGrupItemSelected = function (item) {
      ctrl.SizeGrupselectedItem = item.sizeGroupId;
    }

    ctrl.getSizeGroup = function () {
      AdminServ.getSizeGroup()
        .success(function (data) {
          ctrl.Sizegroup = data.sizeGroupDtos;
          console.log(ctrl.Sizegroup);
        })
        .error(function (error) {
          console.log('Unable to load subject data');
        });
    };

    // ----------------ADD VENDOR MODAL----------------- //

    ctrl.vendor = {
      contactName: '',
      streetOne: '',
      streetTwo: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phone: '',
    };

    ctrl.addVendorSubmit = function () {
      AdminServ.addVendorSubmit(ctrl.vendor)
        .success(function (response) {
          console.log(response);
        })
        .error(function (error) {
          console.log('!Error');
        });
    };
  }
})();
