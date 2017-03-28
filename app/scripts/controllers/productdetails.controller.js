(function () {
    'use strict';
    angular
    .module('homer')
    .controller('productdetailsController', productdetailsController);

    productdetailsController.$inject = ['$location', '$scope', 'sweetAlert', 'adminService', '$stateParams'];

    function productdetailsController($location, $scope, sweetAlert, adminService, $stateParams) {
        //***********************On Load***************************//
        var ctrl = this;
        console.log($stateParams);
        ctrl.product = $stateParams.product;

        ctrl.selectedItem= 'Select Category';
        ctrl.selectedvendor= 'Select Vendor';
        ctrl.PselectedItem= 'Select Parent Category';

        //******************Update product*************************//
        ctrl.updateProduct = function(){
            var res1 = JSON.stringify(ctrl.product.specificationsMap);
            var res = res1.replace(/"|{|}/gi, function myFunction(x){return '';});
            ctrl.product.specifications = res +",";
            if(ctrl.product.categoryId != "" && ctrl.product.name != "" && ctrl.product.imgurl != "" && ctrl.product.categoryId != "" && ctrl.product.vendorId != ""){
                console.log('hi....................');
                adminService.updateProduct(ctrl.product)
                .success(function(data){})
                .error(function(error){})
            }
        };

        //********************Add new Specification******************//
        ctrl.addNewSpecification = function(){
            ctrl.product.specificationsMap[ctrl.newSpecification] = ctrl.newSpecificationValue;
            ctrl.newSpecification = '';
            ctrl.newSpecificationValue = '';
        };

        //********************Remove Specification******************//
        ctrl.removeSpecification = function (key) {
            console.log(key);
            delete ctrl.product.specificationsMap[key];
            console.log(ctrl.product.specificationsMap);
        };

        //*******************For category dropdown********************//
        ctrl.categoryitemselected = function (item) {
            ctrl.selectedItem = item.categoryName;
            ctrl.product.categoryId = item.categoryId;
            console.log(item.categoryId);
        };

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

        ctrl.categoryDto = {};
        ctrl.categoryDto.categoryName = null;
        ctrl.categoryDto.patentId = null;
        ctrl.saveCategory = function(){
            console.log(ctrl.categoryDto);
            if(ctrl.categoryDto.categoryName && ctrl.categoryDto.patentId){
                adminService.saveCategory (ctrl.categoryDto)
                .success(function (data) {
                    ctrl.categoryDto.categoryName = null;
                    ctrl.categoryDto.patentId = null;
                })
                .error(function (error) {
                 console.log('Unable to load subject data');
                });
            }
        };

        //****************For vendor dropdown**********************//
        ctrl.Vendoritemselected = function (item2) {
            ctrl.selectedvendor = item2.contactName;
            ctrl.product.vendorId = item2.userId;
            console.log(item2.userId);
        };
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

        //*********************For parent category dropdown*********************//
        ctrl.Pcategoryitemselected = function (item) {
            ctrl.PselectedItem = item.categoryName;
            ctrl.categoryDto.patentId = item.categoryId;
        };

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