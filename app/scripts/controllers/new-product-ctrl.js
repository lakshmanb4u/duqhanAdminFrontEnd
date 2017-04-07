(function() {
  'use strict';
  angular
    .module('homer')
    .controller('NewProductCtrl', NewProductCtrl);

  NewProductCtrl.$inject = ['$location', '$scope', 'AdminServ'];

  function NewProductCtrl($location, $scope, AdminServ) {
    var ctrl = this;
    ctrl.selectedSize = 'Select size';
    ctrl.selectedItem = 'Select Category';
    ctrl.selectedvendor = 'Select Vendor';
    ctrl.PselectedItem = 'Select Parent Category';
    ctrl.SizeGrupselectedItem = 'Select size';
    ctrl.selectedColor = 'Select Color';
    ctrl.selectedspecifications = null;
    ctrl.selectedspecificationValue = null;

    //**********************category module**************************//

    ctrl.Pcategoryitemselected = function(item) {
      console.log(item);
      ctrl.PselectedItem = item.categoryName;
      ctrl.categoryDto.patentId = item.categoryId;
    }

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
      ctrl.productBean.categoryId = item.categoryId;
      ctrl.specificationDto.id = item.categoryId;
    }

    ctrl.getCategory = function() {
      AdminServ.getCategory()
        .success(function(data) {
          ctrl.category = data.categoryDtos;
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
      if (ctrl.categoryDto.categoryName && ctrl.categoryDto.patentId) {
        AdminServ.saveCategory(ctrl.categoryDto)
          .success(function(data) {
            ctrl.categoryDto.categoryName = null;
            ctrl.categoryDto.patentId = null;
          })
          .error(function(error) {
            console.log('Unable to load subject data');
          });
      }
    };

    //***************************Vendor module*************************//

    ctrl.Vendoritemselected = function(item2) {
      console.log(item2);
      ctrl.selectedvendor = item2.contactName;
      ctrl.productBean.vendorId = item2.userId;
    }
    ctrl.getVendor = function() {
      AdminServ.getVendor()
        .success(function(data) {
          ctrl.vendor = data.vendorDtos;
          console.log(ctrl.vendor);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };

    //***********************************Specifications block*******************************//

    ctrl.specificationValueSelected = function(value) {
      ctrl.selectedspecificationValue = value;
    };

    ctrl.specificationsSelect = function(id, value) {
      ctrl.selectedspecifications = value;
      ctrl.specificationDto1.id = id;
      AdminServ.getSpecificationsValue(id)
        .success(function(data) {
          ctrl.specificationValue = data.values;
          console.log(ctrl.specifications);
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };
    ctrl.getSpecifications = function() {
      ctrl.selectedspecifications = null;
      ctrl.selectedspecificationValue = null;
      if (ctrl.productBean.categoryId != null) {
        AdminServ.getSpecifications(ctrl.productBean.categoryId)
          .success(function(data) {
            ctrl.specifications = data.specifications;
            console.log(ctrl.specifications);
          })
          .error(function(error) {
            console.log('Unable to load subject data');
          });
      }
    };
    ctrl.addSpecifications = function() {
      if (ctrl.selectedspecifications != null && ctrl.selectedspecificationValue != null) {
        if (ctrl.productBean.specifications != null) {
          ctrl.productBean.specifications = ctrl.productBean.specifications + ctrl.selectedspecifications + ":" + ctrl.selectedspecificationValue + ",";
        } else {
          ctrl.productBean.specifications = ctrl.selectedspecifications + ":" + ctrl.selectedspecificationValue + ",";
        }
      }
    };

    //==================================save new specification=================================//
    ctrl.specificationDto = {}
    ctrl.specificationDto.id;
    ctrl.specificationDto.name;
    ctrl.specificationDto.value;

    ctrl.specificationDto1 = {}
    ctrl.specificationDto1.id;
    ctrl.specificationDto1.value;
    ctrl.addSpecification = function() {
      AdminServ.addSpecification(ctrl.specificationDto)
        .success(function(data) {

        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };

    ctrl.addSpecificationValue = function() {
      AdminServ.addSpecificationValue(ctrl.specificationDto1)
        .success(function(data) {

        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
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

    // --------------------------------- //

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

    ctrl.addVendorSubmit = function() {
      console.log(ctrl.vendor);
      AdminServ.addVendorSubmit(ctrl.vendor)
        .success(function(response) {

        })
        .error(function(error) {
          console.log('!Error');
        });
    };

    //*************************save Product module**************************//
    // ctrl.imgBean = {
    // 	frontImage:null
    // };
    //   ctrl.sizeColorMap = {
    //   	colorId:null,
    // sizeId:null,
    // salesPrice:null,
    // orginalPrice:null,
    // count:null,
    // productHeight:null,
    // productLength:null,
    // productWeight:null,
    // productWidth:null
    //   };
    ctrl.isFirst = true;
    ctrl.isSizee = true;
    ctrl.isColor = true;


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
    ctrl.imageDto = {
      imgUrl: null
    };
    ctrl.productBean = {
      categoryId: null,
      name: null,
      imgurl: null,
      description: null,
      vendorId: null,
      externalLink: null,
      specifications: null,
      shippingTime: null,
      shippingRate: null,
      sizeColorMaps: [],
      imageDtos: []
    };

    //********************************imgage upload*****************************//
    ctrl.uploadImage = function() {
      console.log(ctrl.frontimage);
      var imgBean = {};
      imgBean.frontImage = ctrl.frontimage;

      AdminServ.uploadImage(imgBean)
        .success(function(data) {
          if (ctrl.productBean.imgurl != null) {
            ctrl.imageDto.imgUrl = data.status;
            ctrl.productBean.imageDtos.push(ctrl.imageDto);
          } else {
            ctrl.imgBean
            ctrl.productBean.imgurl = data.status;
          }
        })
        .error(function(error) {
          console.log('Unable to load subject data');
        });
    };

    //********************************Add new product in inventory list******************//
    ctrl.addNewProduct = function() {
      console.log(ctrl.newInventory);
      console.log(ctrl.productBean.sizeColorMaps);
      ctrl.addPermit = true;

      if (ctrl.isFirst) {
        if (ctrl.newInventory.sizeId == null) {
          ctrl.isSizee = false;
          // $("#szbid").prop('disabled', true);
          ctrl.sizeDisabled = true;
        }
        if (ctrl.newInventory.colorId == null) {
          ctrl.isColor = false;
          // $("#clbid").prop('disabled', true);
          ctrl.colorDisabled = true;
        }
        if (ctrl.newInventory.sizeId == null && ctrl.newInventory.colorId == null) {
          // $("#add").prop('disabled', true);
          ctrl.addinvDisabled = true;
        }
        ctrl.isFirst = false;
      } else {
        if (ctrl.newInventory.sizeId == null && ctrl.isSizee) {
          alert("Please enter size");
          ctrl.addPermit = false;
        }
        if (ctrl.newInventory.colorId == null && ctrl.isColor) {
          alert("Please enter color");
          ctrl.addPermit = false;
        }
      }


      if (ctrl.addPermit) {
        if (ctrl.newInventory.salesPrice !== null && ctrl.newInventory.orginalPrice !== null) {
          ctrl.productBean.sizeColorMaps.push(ctrl.newInventory);
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
        }
      }
    };

    //************************************Save producr*********************************//
    ctrl.saveProduct = function() {
      console.log(ctrl.productBean);

      if (ctrl.productBean.sizeColorMaps.length > 0 && ctrl.productBean.categoryId != null && ctrl.productBean.name != null && ctrl.productBean.imgurl != null && ctrl.productBean.categoryId != null && ctrl.productBean.vendorId != null) {
        console.log(JSON.stringify(ctrl.productBean));
        AdminServ.saveProduct(ctrl.productBean)
          .success(function(data) {

          })
          .error(function(error) {
            console.log('Unable to load subject data');
          });
      }
    };

  }
})();
