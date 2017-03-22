angular
.module('homer')
.factory('adminService', adminService);

function adminService($http, BASE_URL_CONSTANT) {
    return{
        getCategory: function () {
            return $http.get(BASE_URL_CONSTANT + 'admin/get-category');
        },
        getVendor: function () {
            return $http.get(BASE_URL_CONSTANT + 'admin/get-vendor');
        },
        getSize: function () {
            return $http.get(BASE_URL_CONSTANT + 'admin/get-size');
        },
        getColor: function () {
            return $http.get(BASE_URL_CONSTANT + 'admin/get-color');
        },
        getSizeGroup: function () {
            return $http.get(BASE_URL_CONSTANT + 'admin/get-sizegroup');
        },
        addVendorSubmit: function (vendor) {
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/save-vendor',
                headers: {'Content-Type': 'application/json'},
                data: vendor
            });
        },
        getProducts: function (start, limit) {
            var bean = {};
            bean.start = start;
            bean.limit = limit;
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/get-product-lise',
                headers: {'Content-Type': 'application/json'},
                data: bean
            });
        },
        getProductsInventory: function (id) {
            var bean = {};
            bean.productId = id;
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/get-product-inventory',
                headers: {'Content-Type': 'application/json'},
                data: bean
            });
        }
    };
}