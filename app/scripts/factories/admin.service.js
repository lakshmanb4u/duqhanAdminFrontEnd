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
        },
        updateProduct: function(product){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/update-product-details',
                headers: {'Content-Type': 'application/json'},
                data: product
            });
        },
        updateProductInventory: function(productBean){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/update-product-inventory',
                headers: {'Content-Type': 'application/json'},
                data: productBean
            });
        },
        uploadImage: function(imgBean){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/save-product-image',
                headers: {'Content-Type': 'application/json'},
                data: imgBean
            });
        },
        getSpecifications: function(categoryId){
            var bean = {};
            bean.categoryId = categoryId;
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/get-specifications',
                headers: {'Content-Type': 'application/json'},
                data: bean
            });
        },
        getSpecificationsValue: function(categoryId){
            var bean = {};
            bean.categoryId = categoryId;
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/get-specification-value',
                headers: {'Content-Type': 'application/json'},
                data: bean
            });
        },
        saveProduct: function(productBean){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/save-product',
                headers: {'Content-Type': 'application/json'},
                data: productBean
            });
        },
        saveCategory: function(categoryDto){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/save-category',
                headers: {'Content-Type': 'application/json'},
                data: categoryDto
            });
        },
        addSpecification: function(specificationDto){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/save-specification',
                headers: {'Content-Type': 'application/json'},
                data: specificationDto
            });
        },
        addSpecificationValue: function(specificationDto){
            return $http({
                method: 'POST',
                url: BASE_URL_CONSTANT + 'admin/save-specification-value',
                headers: {'Content-Type': 'application/json'},
                data: specificationDto
            });
        }
    };
}