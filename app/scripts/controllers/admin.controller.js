(function () {
    'use strict';
    angular
    .module('homer')
    .controller('adminController', adminController);

    adminController.$inject = ['$location', '$scope', 'sweetAlert', 'adminService'];

    function adminController($location, $scope, sweetAlert, adminService) {
        var ctrl = this;
        ctrl.selectedSize= 'Select size';
        ctrl.selectedItem= 'Select Category';
        ctrl.selectedvendor= 'Select Vendor';
        ctrl.PselectedItem= 'Select Parent Category';
        ctrl.SizeGrupselectedItem= 'Select size';
        ctrl.selectedColor = 'Select Color'

        ctrl.categoryitemselected = function (item) {
            ctrl.selectedItem = item.categoryName;
            console.log(item.categoryId);
        }

        ctrl.getCategory = function (){
            adminService.getCategory ()
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
        ctrl.getVendor = function (){
            adminService.getVendor ()
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

        // --------------------------------- //

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

        // --------------------------------- //

        ctrl.Pcategoryitemselected = function (item) {
            ctrl.PselectedItem = item.categoryName;
            
        }

        ctrl.PgetCategory = function (){
            adminService.getCategory ()
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
            adminService.addVendorSubmit (ctrl.vendor)
            .success(function (response) {
                console.log(response);
            })
             .error(function (error) {
             console.log('!Error');
         });
        };
    }
})();






