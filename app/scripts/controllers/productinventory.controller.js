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

        // get products when load view product page
        adminService.getProductsInventory (ctrl.productId)
            .success(function (productBean) {
                ctrl.productInventory = productBean.sizeColorMaps;
                
                console.log(ctrl.productInventory);
            })
            .error(function (error) {
             console.log('Unable to load subject data');
         });
    }
})();