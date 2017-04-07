(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ProductCtrl', ProductCtrl);

  ProductCtrl.$inject = ['$location', '$scope', 'AdminServ', '$stateParams', '$state'];

  function ProductCtrl($location, $scope, AdminServ, $stateParams, $state) {
    //***********************On Load***************************//
    var ctrl = this;
    console.log($stateParams);
    ctrl.product = $stateParams.product;

    ctrl.selectedItem = 'Select Category';
    ctrl.selectedvendor = 'Select Vendor';
    ctrl.PselectedItem = 'Select Parent Category';

    AdminServ.getProductsInventory(ctrl.product.productId)
      .success(function(data) {
        console.log('Product Inventory =====================');
        console.log(data);
        ctrl.inventory = data;
        ctrl.product.images = data.imageDtos;
        console.log(ctrl.product.images);
      })
      .error(function(error) {});

    //******************Update product*************************//
    ctrl.updateProduct = function() {
      var res1 = JSON.stringify(ctrl.product.specificationsMap);
      var res = res1.replace(/"|{|}/gi, function myFunction(x) { return ''; });
      ctrl.product.specifications = res + ",";
      if (ctrl.product.categoryId != "" && ctrl.product.name != "" && ctrl.product.imgurl != "" && ctrl.product.categoryId != "" && ctrl.product.vendorId != "") {
        $('.loader').show();
        AdminServ.updateProduct(ctrl.product)
          .success(function(data) {
            ctrl.inventory.imageDtos = ctrl.product.images;
            AdminServ.updateProductInventory(ctrl.inventory)
              .success(function(data) {
                $('.loader').hide();
                $state.go('products');
              })
              .error(function(error) {
                $('.loader').hide();
                console.log('Unable to load subject data');
              });

          })
          .error(function(error) {
            $('.loader').hide();
          });
      }
    };

    //********************Add new Specification******************//
    ctrl.addNewSpecification = function() {
      ctrl.product.specificationsMap[ctrl.newSpecification] = ctrl.newSpecificationValue;
      ctrl.newSpecification = '';
      ctrl.newSpecificationValue = '';
    };

    //********************Remove Specification******************//
    ctrl.removeSpecification = function(key) {
      console.log(key);
      delete ctrl.product.specificationsMap[key];
      console.log(ctrl.product.specificationsMap);
    };

    //*******************For category dropdown********************//
    ctrl.categoryitemselected = function(item) {
      ctrl.selectedItem = item.categoryName;
      ctrl.product.categoryId = item.categoryId;
      console.log(item.categoryId);
    };

    ctrl.getCategory = function(clicked) {
      AdminServ.getCategory()
        .success(function(data) {
          ctrl.category = data.categoryDtos;
          if (!clicked) {
            angular.forEach(ctrl.category, function(item, key) {
              if (item.categoryId == ctrl.product.categoryId) {
                console.log(item);
                ctrl.categoryitemselected(item);
              }
            });
          }
          console.log(ctrl.category);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };

    ctrl.getCategory(false);

    ctrl.categoryDto = {};
    ctrl.categoryDto.categoryName = null;
    ctrl.categoryDto.patentId = null;
    ctrl.saveCategory = function() {
      console.log(ctrl.categoryDto);
      if (ctrl.categoryDto.categoryName && ctrl.categoryDto.patentId) {
        $('.loader').show();
        AdminServ.saveCategory(ctrl.categoryDto)
          .success(function(data) {
            ctrl.categoryDto.categoryName = null;
            ctrl.categoryDto.patentId = null;
            $('.loader').hide();
            ctrl.getCategory(false);
          })
          .error(function(error) {
            $('.loader').hide();
            console.log('Unable to load subject data');
          });
      }
    };

    //****************For vendor dropdown**********************//
    ctrl.Vendoritemselected = function(item2) {
      ctrl.selectedvendor = item2.contactName;
      ctrl.product.vendorId = item2.userId;
      console.log(item2.userId);
    };
    ctrl.getVendor = function(clicked) {
      AdminServ.getVendor()
        .success(function(data) {
          ctrl.vendor = data.vendorDtos;
          console.log(ctrl.vendor);
          if (!clicked) {
            angular.forEach(ctrl.vendor, function(item, key) {
              if (item.userId == ctrl.product.vendorId) {
                console.log(item);
                ctrl.Vendoritemselected(item);
              }
            });
          }
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };
    ctrl.getVendor(false);

    //*********************For parent category dropdown*********************//
    ctrl.Pcategoryitemselected = function(item) {
      ctrl.PselectedItem = item.categoryName;
      ctrl.categoryDto.patentId = item.categoryId;
    };

    ctrl.PgetCategory = function() {
      AdminServ.getCategory()
        .success(function(data) {
          ctrl.Pcategory = data.categoryDtos;
          console.log(ctrl.category);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };

    ctrl.PgetCategory();

    //******************ADD VENDOR MODAL**************************//
    ctrl.vendor = {
      contactName: '',
      streetOne: '',
      streetTwo: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phone: ''
    };

    ctrl.addVendorSubmit = function() {
      $('.loader').show();
      AdminServ.addVendorSubmit(ctrl.vendor)
        .success(function(response) {
          $('.loader').hide();
          console.log(response);
        })
        .error(function(error) {
          $('.loader').hide();
          console.log('!Error');
        });
    };

    //******************Image upload**************************//
    $scope.$watch('ctrl.thumbnail', function(newVal, oldVal) {
      if (ctrl.thumbnail != null || ctrl.thumbnail != undefined) {
        ctrl.uploadThumbnail(ctrl.thumbnail);
      }
    });
    ctrl.uploadThumbnail = function(file) {
      console.log(file);
      if (file) {
        $('.loader').show();
        AdminServ.uploadToCloudinary(file)
          .then(function(data) {
            console.log(data);
            ctrl.product.imgurl = data.url;
            $('.loader').hide();
          })
          .catch(function(error) {
            $('.loader').hide();
            console.log('Unable to load subject data');
          });
      }
    };
    $scope.$watch('ctrl.galleryImage', function(newVal, oldVal) {
      if (ctrl.galleryImage != null || ctrl.galleryImage != undefined) {
        ctrl.uploadGalleryImage(ctrl.galleryImage);
      }
    });
    ctrl.uploadGalleryImage = function(file) {
      console.log(file);
      if (file) {
        $('.loader').show();
        AdminServ.uploadToCloudinary(file)
          .then(function(data) {
            console.log(data);
            // ctrl.product.imgurl = data.url;
            var img = {};
            img.imgUrl = data.url;
            img.id = null;
            ctrl.product.images.push(img);
            $('.loader').hide();
          })
          .catch(function(error) {
            $('.loader').hide();
            console.log('Unable to load subject data');
          });
      }
    };
    //******************Image upload End**************************//

    ctrl.removeThumbnail = function() {
      ctrl.product.imgurl = null;
    };
  }
})();