(function () {
    'use strict';
    angular
    .module('homer')
    .controller('productinventoryController', productinventoryController);

    productinventoryController.$inject = ['$location', '$scope', 'sweetAlert', 'adminService', '$stateParams'];

    function productinventoryController($location, $scope, sweetAlert, adminService, $stateParams) {
        var ctrl = this;
        console.log($stateParams);
        ctrl.productId = $stateParams.id;

        ctrl.selectedSize= 'Select size';
        ctrl.selectedColor = 'Select Color';
        ctrl.SizeGrupselectedItem= 'Select size';

        // get products when load view product page
        adminService.getProductsInventory (ctrl.productId)
        .success(function (productBean) {
            ctrl.productInventory = productBean.sizeColorMaps;
            console.log(ctrl.productInventory);
        })
        .error(function (error) {
           console.log('Unable to load subject data');
       });

        ctrl.SizeSelected = function (item3) {
            ctrl.selectedSize = item3.sizeText;
        }
        ctrl.getSize = function (){
            adminService.getSize ()
            .success(function (data) {
                ctrl.size = data.sizeDtos;
                console.log(ctrl.size);
            })
            .error(function (error) {
               console.log('Unable to load subject data');
           });
        };

        ctrl.ColorSelected = function (item4) {
            ctrl.selectedColor = item4.colorText;
        }
        ctrl.getColor = function (){
            adminService.getColor ()
            .success(function (data) {
                ctrl.color = data.colorDtos;
                console.log(ctrl.color);
            })
            .error(function (error) {
             console.log('Unable to load subject data');
         });
        };

        ctrl.SizeGrupItemSelected = function (item) {
            ctrl.SizeGrupselectedItem = item.sizeGroupId;
        }

        ctrl.getSizeGroup = function (){
            adminService.getSizeGroup ()
            .success(function (data) {
                ctrl.Sizegroup = data.sizeGroupDtos;
                console.log(ctrl.Sizegroup);
            })
            .error(function (error) {
             console.log('Unable to load subject data');
         });
        };
    }
})();