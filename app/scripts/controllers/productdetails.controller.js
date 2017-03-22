(function () {
    'use strict';
    angular
    .module('homer')
    .controller('productdetailsController', productdetailsController);

    productdetailsController.$inject = ['$location', '$scope', 'sweetAlert', 'adminService', '$stateParams'];

    function productdetailsController($location, $scope, sweetAlert, adminService, $stateParams) {
        var ctrl = this;
        console.log($stateParams);
        ctrl.product = $stateParams.product;

        ctrl.selectedItem= 'Select Category';
        ctrl.selectedvendor= 'Select Vendor';
        ctrl.PselectedItem= 'Select Parent Category';
        

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