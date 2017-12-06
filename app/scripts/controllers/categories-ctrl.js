(function () {
    'use strict';
    angular
        .module('homer')
        .controller('CategoriesCtrl', CategoriesCtrl);

    CategoriesCtrl.$inject = ['$location', '$scope', 'AdminServ', 'ITEM_PER_PAGE', '$sce', '$filter'];
    function CategoriesCtrl($location, $scope, AdminServ, ITEM_PER_PAGE, $sce, $filter) {
    	var ctrl = this;
        ctrl.startIndex = 0; // when get list of product
        ctrl.isVisible = "true";
        ctrl.isNextHide = false;
        ctrl.isPrevHide = true;
        ctrl.category = null;

        // get categories when load view categories page
        $('.loader').show();
        AdminServ.getCategories(ctrl.startIndex, ITEM_PER_PAGE)
            .success(function (categoryListDto) {
                ctrl.category = categoryListDto.categories;
                ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
                console.log(ctrl.category);
                $('.loader').hide();
            })
            .error(function (error) {
                $('.loader').hide();
                console.log('Unable to load subject data');
            });
        // Go To Top Of Page
        ctrl.goToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        };
         // load more products
        ctrl.getMoreProduct = function () {
            $('.loader').show();
            console.log('ctrl.startIndex' + ctrl.startIndex);
            AdminServ.getCategories(parseInt(ctrl.startIndex), ITEM_PER_PAGE)
                .success(function (categoryListDto) {
                    if (!categoryListDto.categories || categoryListDto.categories.length < 1) {
                        ctrl.isNextHide = true;
                        console.log('--------------------------------');
                    } else {
                        ctrl.isPrevHide = false;
                        ctrl.category = categoryListDto.categories;
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
                AdminServ.getCategories((parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE)), ITEM_PER_PAGE)
                    .success(function (categoryListDto) {
                        if (!categoryListDto.categories || categoryListDto.categories.length < ITEM_PER_PAGE) {
                            ctrl.isPrevHide = true;
                            ctrl.isNextHide = false;
                            ctrl.startIndex = 0;
                        } else {
                            ctrl.startIndex = (parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE));
                            if (ctrl.startIndex < 1) {
                                ctrl.startIndex = 0;
                            }
                        }
                        if (categoryListDto.categories) {
                            ctrl.category = categoryListDto.categories;
                        }
                        $('.loader').hide();
                    })
                    .error(function (error) {
                        $('.loader').hide();
                        console.log('Unable to load subject data');
                    });
            }
        };
    }	
})();