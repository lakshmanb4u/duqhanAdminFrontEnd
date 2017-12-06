(function () {
    'use strict';
    angular
        .module('homer')
        .controller('OrdersCtrl', OrdersCtrl);

    OrdersCtrl.$inject = ['$location', '$scope', 'AdminServ', 'ITEM_PER_PAGE', '$sce', '$filter'];

    function OrdersCtrl($location, $scope, AdminServ, ITEM_PER_PAGE, $sce, $filter) {
        var ctrl = this;
        ctrl.startIndex = 0; // when get list of product
        ctrl.isVisible = "true";
        ctrl.isNextHide = false;
        ctrl.isPrevHide = true;
        ctrl.order = null;
        ctrl.orderStatusFilter = "";
        ctrl.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

        // get products when load view product page
        $('.loader').show();
        AdminServ.getOrders(ctrl.startIndex, ITEM_PER_PAGE, ctrl.orderStatusFilter)
            .success(function (orderListDto) {
                ctrl.order = orderListDto.orderDtos;
                ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
                // console.log(ctrl.order);
                $('.loader').hide();
            })
            .error(function (error) {
                $('.loader').hide();
                console.log('Unable to load subject data');
            });

       
        /*Get OrderWorkFlow Data*/    
        AdminServ.orderWorkFlow()
           .success(function (data) {
                ctrl.orderWorkFlow = data.orderWorkflowList;
           })
           .error(function (error) {
                console.log("error",error);
           })
        /*End*/
        /*Set order status*/
        ctrl.changeOrderStatus1 = function () {

        }
        /*End*/

        ctrl.changeOrderStatus = function (orderStatus, orderId) {
            AdminServ.changeOrderStatus(orderStatus, orderId)
                .success(function (status) {
                    if (status.statusCode == '200') {
                        var newTemp = $filter("filter")(ctrl.order, { id: orderId });
                        newTemp[0].orderStatus = orderStatus;
                    }
                })
                .error(function (error) {

                });
        }

        // Go To Top Of Page
        ctrl.goToTop = function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        };
        // load more products
        ctrl.getMoreProduct = function () {
            $('.loader').show();
            console.log('ctrl.startIndex' + ctrl.startIndex);
            AdminServ.getOrders(parseInt(ctrl.startIndex), ITEM_PER_PAGE ,ctrl.orderStatusFilter)
                .success(function (orderListDto) {
                    // console.log(orderListDto.orderDtos);
                    if (!orderListDto.orderDtos || orderListDto.orderDtos.length < 1) {
                        ctrl.isNextHide = true;
                        console.log('--------------------------------');
                    } else {
                        ctrl.isPrevHide = false;
                        ctrl.order = orderListDto.orderDtos;
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
                AdminServ.getOrders((parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE)), ITEM_PER_PAGE, ctrl.orderStatusFilter)
                    .success(function (orderListDto) {
                        if (!orderListDto.orderDtos || orderListDto.orderDtos.length < ITEM_PER_PAGE) {
                            ctrl.isPrevHide = true;
                            ctrl.isNextHide = false;
                            ctrl.startIndex = 0;
                        } else {
                            ctrl.startIndex = (parseInt(ctrl.startIndex) - parseInt(ITEM_PER_PAGE));
                            if (ctrl.startIndex < 1) {
                                ctrl.startIndex = 0;
                            }
                        }
                        if (orderListDto.orderDtos) {
                            ctrl.order = orderListDto.orderDtos;
                        }
                        $('.loader').hide();
                    })
                    .error(function (error) {
                        $('.loader').hide();
                        console.log('Unable to load subject data');
                    });
            }
        };
         // load filtered products
        ctrl.getProductByFilter = function () {
            AdminServ.getOrders(ctrl.startIndex, ITEM_PER_PAGE, ctrl.orderStatusFilter)
            .success(function (orderListDto) {
                ctrl.order = orderListDto.orderDtos;
                ctrl.startIndex = (parseInt(ctrl.startIndex) + parseInt(ITEM_PER_PAGE));
                // console.log(ctrl.order);
                $('.loader').hide();
            })
            .error(function (error) {
                $('.loader').hide();
                console.log('Unable to load subject data');
            });
        };
    }
})();