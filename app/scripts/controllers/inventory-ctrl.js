(function() {
  'use strict';
  angular
    .module('homer')
    .controller('InventoryCtrl', InventoryCtrl);

  InventoryCtrl.$inject = ['$location', '$scope', 'AdminServ', '$stateParams'];

  function InventoryCtrl($location, $scope, AdminServ, $stateParams) {
    var ctrl = this;
    console.log($stateParams);
    ctrl.productId = $stateParams.product.productId;

    ctrl.selectedSize = 'Select size';
    ctrl.selectedColor = 'Select Color';
    ctrl.SizeGrupselectedItem = 'Select size group';

    // ******************get products when load view product page*********************//
    AdminServ.getProductsInventory(ctrl.productId)
      .success(function(productBean) {
        ctrl.productBean = productBean;
        ctrl.productInventory = ctrl.productBean.sizeColorMaps;
        console.log(ctrl.productInventory);
        if (!ctrl.productInventory[0].sizeText) {
          ctrl.selectedSize = 'No size';
        }
        if (!ctrl.productInventory[0].colorText) {
          ctrl.selectedColor = 'No Color';
        }
      })
      .error(function(error) {
        console.log('Unable to load subject data');
      });

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


    //*******************************Update inventory****************************//
    ctrl.updateInventory = function() {
      console.log(ctrl.productBean);
      var sizeColorMaps = ctrl.productBean.sizeColorMaps;
      var sizeCount = 0;
      var colorCount = 0;
      for (var i = 0; sizeColorMaps.length > i; i++) {
        if (sizeColorMaps[i].sizeId != null) {
          sizeCount++;
        }
        if (sizeColorMaps[i].colorId != null) {
          colorCount++;
        }
      }
      if ((sizeCount == 0 || sizeCount == sizeColorMaps.length) && (colorCount == 0 || colorCount == sizeColorMaps.length)) {
        console.log('hi...............');
        AdminServ.updateProductInventory(ctrl.productBean)
          .success(function(data) {})
          .error(function(error) {
            console.log('Unable to load subject data');
          });
      }
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

    ctrl.SizeGrupItemSelected = function(item) {
      ctrl.SizeGrupselectedItem = item.sizeGroupId;
    }

    ctrl.getSizeGroup = function() {
      AdminServ.getSizeGroup()
        .success(function(data) {
          ctrl.Sizegroup = data.sizeGroupDtos;
          console.log(ctrl.Sizegroup);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };
  }
})();