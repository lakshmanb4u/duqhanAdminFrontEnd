(function () {
    'use strict';
    angular
        .module('homer')
        .controller('DeepLinkCtrl', DeepLinkCtrl);

    DeepLinkCtrl.$inject = ['$location', '$scope', 'AdminServ', 'ITEM_PER_PAGE', '$sce', '$filter'];

    function DeepLinkCtrl($location, $scope, AdminServ, ITEM_PER_PAGE, $sce, $filter) {
        var ctrl = this;
        ctrl.startIndex = 0;
        // get categories when load view categories page
        $('.loader').show();
        AdminServ.getAllCategories(ctrl.startIndex, ITEM_PER_PAGE)
            .success(function (categoryListDto) {
                ctrl.categories = categoryListDto.categories;
                ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
                console.log(ctrl.categories);
                $('.loader').hide();
            })
            .error(function (error) {
                $('.loader').hide();
                console.log('Unable to load subject data');
            });
        ctrl.url = {};
        ctrl.createLink = function(category) {
            var param = {};
            param = {
                  branch_key: "key_live_jasN48mYmaWI5drVenGNykonrAe13jw7",
                  channel: "facebook",
                  feature: "onboarding",
                  campaign: "testing campaign",
                  stage: "new user",
                  data: {
                    $canonical_identifier: category.displayText + category.id,
                    $og_title: category.displayText,
                    $og_description: category.name + ' of good quality and very cheaper rate' ,
                    $og_image_url: category.imgUrl,
                    $desktop_url: "https://duqhan.com/#/products-by-category?categoryId="+category.id,
                    $android_url: "file:///android_asset/www/index.html#/store/products-by-category/"+category.id,
                    $ios_url: "#/store/products-by-category/"+category.id,
                    custom_boolean: true,
                    custom_integer: 1243,
                    custom_string: "everything",
                    custom_array: [1,2,3,4,5,6],
                    custom_object: { "random": "dictionary" }
                  }
            }
            
            AdminServ.getDeepLink(param)
                .success(function (responce) {
                    ctrl.url[category.id] = responce.url;
                    console.log(responce.url);
                    $('.loader').hide();
                })
                .error(function (error) {
                    $('.loader').hide();
                    console.log(error);
            });  
        }  
        // Go To Top Of Page
        ctrl.goToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        };
       
    }
})();