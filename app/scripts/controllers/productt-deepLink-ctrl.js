(function () {
    'use strict';
    angular
        .module('homer')
        .controller('ProductDeepLinkCtrl', ProductDeepLinkCtrl);

    ProductDeepLinkCtrl.$inject = ['$location', '$scope', 'AdminServ', 'ITEM_PER_PAGE', '$sce', '$filter'];

    function ProductDeepLinkCtrl($location, $scope, AdminServ, ITEM_PER_PAGE, $sce, $filter) {
        var ctrl = this;
        ctrl.startIndex = 0;
        ctrl.searchText = "";
        ctrl.isVisible = "true";
        ctrl.isNextHide = false;
        ctrl.isPrevHide = true;

        $('.loader').show();
        ctrl.searchProduct = function (searchText) {
           ctrl.searchText = searchText;
           $('.loader').show(); 
           AdminServ.searchProduct(ctrl.startIndex, ITEM_PER_PAGE,ctrl.searchText)
            .success(function (responce) {
                ctrl.products = responce.products;
                console.log(ctrl.products);
                ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
                console.log(ctrl.categories);
                $('.loader').hide();
            })
            .error(function (error) {
                $('.loader').hide();
                console.log('Unable to load subject data');
            }); 
        }

        ctrl.searchkeyWord = function (searchText){
            ctrl.startIndex = 0;
            ctrl.isVisible = "true";
            ctrl.isNextHide = false;
            ctrl.isPrevHide = true;
            ctrl.searchProduct(searchText);
        }
        // load more products
        ctrl.getMoreProduct = function () {
            $('.loader').show();
            console.log('ctrl.startIndex' + ctrl.startIndex);
            AdminServ.searchProduct(parseInt(ctrl.startIndex), ITEM_PER_PAGE ,ctrl.searchText)
                .success(function (responce) {
                    if (!responce.products || responce.products.length < 1) {
                        ctrl.isNextHide = true;
                        console.log('--------------------------------');
                    } else {
                        ctrl.isPrevHide = false;
                        ctrl.products = responce.products;
                        ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
                    }
                    $('.loader').hide();
                })
                .error(function (error) {
                    $('.loader').hide();
                    console.log('Unable to load subject data');
                });
        };

        // load privious products
        ctrl.getPreviousProduct = function () {
            $('.loader').show();
            console.log('ctrl.startIndex' + ctrl.startIndex);
            if (parseInt(ctrl.startIndex) < 1) {
                console.log("hhhhhhhhhhhh");
                ctrl.isPrevHide = true;
                ctrl.isNextHide = false;
                $('.loader').hide();
            } else {
                AdminServ.searchProduct((parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE)), ITEM_PER_PAGE, ctrl.searchText)
                    .success(function (responce) {
                        if (!responce.products || responce.products.length < ITEM_PER_PAGE) {
                            ctrl.isPrevHide = true;
                            ctrl.isNextHide = false;
                            ctrl.startIndex = 0;
                        } else {
                            ctrl.startIndex = (parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE));
                            if (ctrl.startIndex < 1) {
                                ctrl.startIndex = 0;
                            }
                        }
                        if (responce.products) {
                            ctrl.products = responce.products;
                        }
                        $('.loader').hide();
                    })
                    .error(function (error) {
                        $('.loader').hide();
                        console.log('Unable to load subject data');
                    });
            }
        };

        ctrl.searchProduct("earring");
        ctrl.url = {};
        ctrl.createLink = function(product) {
            var param = {};
            param = {
                  branch_key: "key_live_jasN48mYmaWI5drVenGNykonrAe13jw7",
                  channel: "facebook",
                  feature: "onboarding",
                  campaign: "testing campaign",
                  stage: "new user",
                  data: {
                    $canonical_identifier: product.name + product.productId,
                    $og_title: product.name,
                    $og_description: product.description,
                    $og_image_url: product.imgUrl,
                    $desktop_url: "https://www.duqhan.com/#/product/"+product.productId+"/overview",
                    $android_url: "file:///android_asset/www/index.html#/store/product/"+product.productId+"/overview",
                    $ios_url: "#/store/product/"+product.productId+"/overview",
                    custom_boolean: true,
                    custom_integer: 1243,
                    custom_string: "everything",
                    custom_array: [1,2,3,4,5,6],
                    custom_object: { "random": "dictionary" }
                  }
            }
            
            AdminServ.getDeepLink(param)
                .success(function (responce) {
                    ctrl.url[product.productId] = responce.url;
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