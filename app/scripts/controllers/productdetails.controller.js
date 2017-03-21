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
    }
})();