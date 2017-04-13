(function() {
  'use strict';
  angular
    .module('homer')
    .controller('ScrapperProductListCtrl', ScrapperProductListCtrl);

  ScrapperProductListCtrl.$inject = ['$scope', 'AdminServ'];

  function ScrapperProductListCtrl($scope, AdminServ) {
    //***********************On Load***************************//
    var ctrl = this;
    ctrl.listURL = '';
    ctrl.processing = 0;
    ctrl.product = null;

    ctrl.updateCrawlBtnStatus = function() {
      ctrl.disabledCrawl10 = ctrl.products.length < 10;
      ctrl.disabledCrawl50 = ctrl.products.length < 50;
      ctrl.disabledCrawl100 = ctrl.products.length < 100;
    };

    ctrl.loadCrawledProducts = function() {
      AdminServ.loadCrawledProducts(0, 150)
        .success(function(response) {
          console.log(response);
          ctrl.products = response.products;
          ctrl.updateCrawlBtnStatus();
        })
        .error(function(error) {
          console.log('!Error');
        });
    };
    ctrl.loadCrawledProducts();

    ctrl.showProduct = function(product) {
      product.isCollapsed = !product.isCollapsed
      ctrl.product = product;
      AdminServ.getTempProductsInventory(ctrl.product.productId)
        .success(function(data) {
          console.log('Product Inventory =====================');
          console.log(data);
          ctrl.productInventory = data.sizeColorMaps;
          ctrl.inventory = data;
          ctrl.product.sizeColorMaps = data.sizeColorMaps;
          ctrl.product.imageDtos = data.imageDtos;
          ctrl.getVendor(false);
          ctrl.getCategory(false);
          console.log(ctrl.product.imageDtos);
        })
        .error(function(error) {});



      console.log(ctrl.product);
      $('div.hpanel').removeClass('hide');
    };

    //********************************Add new product in inventory list******************//
    ctrl.newInventory = {
      discount: 0,
      mapId: null,
      colorId: null,
      colorText: null,
      count: 1,
      orginalPrice: 0,
      productHeight: 1,
      productLength: 1,
      productWeight: 1,
      productWidth: 1,
      salesPrice: 0,
      sizeId: null,
      sizeText: null
    };

    ctrl.addNewProduct = function() {
      console.log(ctrl.productInventory);
      ctrl.productInventory.push(ctrl.newInventory);
    };

    //***********************************Size block*******************************//
    ctrl.thisSizeSelected = function(siz, map) {
      map.sizeText = siz.sizeText;
      map.sizeId = siz.sizeId;
    };

    ctrl.SizeSelected = function(item3) {
      ctrl.selectedSize = item3.sizeText;
      ctrl.newInventory.sizeText = item3.sizeText;
      ctrl.newInventory.sizeId = item3.sizeId;
    }
    ctrl.getSize = function() {
      AdminServ.getSize()
        .success(function(data) {
          ctrl.size = data.sizeDtos;
          console.log(ctrl.size);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };
    ctrl.getSize();

    //***********************************Color block*******************************//
    ctrl.thisColorSelected = function(color, map) {
      map.colorText = color.colorText;
      map.colorId = color.colorId;
    }
    ctrl.ColorSelected = function(item4) {
      ctrl.selectedColor = item4.colorText;
      ctrl.newInventory.colorText = item4.colorText;
      ctrl.newInventory.colorId = item4.colorId;
    }
    ctrl.getColor = function() {
      AdminServ.getColor()
        .success(function(data) {
          ctrl.color = data.colorDtos;
          console.log(ctrl.color);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };
    ctrl.getColor();

    //*******************For category dropdown********************//
    ctrl.Pcategoryitemselected = function(item) {
      console.log(item);
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
          ctrl.vendors = data.vendorDtos;
          console.log(ctrl.vendors);
          if (!clicked) {
            angular.forEach(ctrl.vendors, function(item, key) {
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

    ctrl.addVendorSubmit = function() {
      console.log(ctrl.vendor);
      AdminServ.addVendorSubmit(ctrl.vendor)
        .success(function(response) {

        })
        .error(function(error) {
          console.log('!Error');
        });
    };

    //********************Add new Specification******************//
    ctrl.addNewSpecification = function() {
      ctrl.product.specificationsMap[ctrl.newSpecification] = ctrl.newSpecificationValue;
      ctrl.newSpecification = '';
      ctrl.newSpecificationValue = '';
      console.log(ctrl.product.specificationsMap);
    };

    //********************Remove Specification******************//
    ctrl.removeSpecification = function(key) {
      console.log(key);
      delete ctrl.product.specificationsMap[key];
      console.log(ctrl.product.specificationsMap);
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
            ctrl.product.imageDtos.push(img);
            $('.loader').hide();
          })
          .catch(function(error) {
            $('.loader').hide();
            console.log('Unable to load subject data');
          });
      }
    };
    //******************Image upload End**************************//

    ctrl.removeThumbnail = function(index) {
      // ctrl.productBean.imgurl = null;
      ctrl.product.imageDtos.splice(index, 1);
    };

    //******************Update product*************************//
    ctrl.updateTempProduct = function() {
      var res1 = JSON.stringify(ctrl.product.specificationsMap);
      var res = res1.replace(/"|{|}/gi, function myFunction(x) { return ''; });
      ctrl.product.specifications = res + ",";
      if (ctrl.product.categoryId != "" && ctrl.product.name != "" && ctrl.product.imgurl != "" && ctrl.product.categoryId != "" && ctrl.product.vendorId != "") {
        $('.loader').show();
        AdminServ.updateTempProduct(ctrl.product)
          .success(function(data) {
            // ctrl.inventory.imageDtos = ctrl.product.imageDtos;
            AdminServ.updateTempProductInventory(ctrl.product)
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

    //******************Commit product*************************//
    ctrl.commitTempProduct = function() {
      if (ctrl.product.productId != null) {
        var statusBeans = [];
        var statusBean = {};
        statusBean.id = ctrl.product.productId;
        statusBeans.push(statusBean);
        $('.loader').show();
        console.log(statusBeans);
        AdminServ.commitTempProduct(statusBeans)
          .success(function(data) {

            console.log(data);
            $('.loader').hide();
            ctrl.product = null;
            ctrl.loadCrawledProducts();
          })
          .error(function(error) {
            $('.loader').hide();
          });
      }
    };

    ctrl.commitTempProducts = function(n) {
      var pendingProducts = ctrl.products;
      if (!n) {
        n = pendingProducts.length;
      }
      var products = pendingProducts.slice(0, n);
      var statusBeans = [];
      angular.forEach(products, function(product, key) {
        var statusBean = {};
        statusBean.id = product.productId;
        statusBeans.push(statusBean);
      });
      $('.loader').show();
      AdminServ.commitTempProduct(statusBeans)
        .success(function(response) {
          $('.loader').hide();
            ctrl.product = null;
            ctrl.loadCrawledProducts();
        })
        .error(function(error) {
          console.log('!Error');
          $('.loader').hide();
        });
    };
  }
})();