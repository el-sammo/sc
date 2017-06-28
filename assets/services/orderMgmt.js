(function() {
	'use strict';

	var app = angular.module('app');

	///
	// Order Management
	///

	app.factory('orderMgmt', service);
	
	service.$inject = [
		'$modal', '$rootScope', '$http', 'deviceMgr'
	];
	
	function service($modal, $rootScope, $http, deviceMgr) {
		var service = {
			checkout: function(order) {
				$modal.open({
					templateUrl: '/templates/checkout.html',
					backdrop: true,
					controller: 'CheckoutController',
					resolve: {
						args: function() {
							return {
								order: order
							}
						}
					}
				});
			},
			checkoutProhibited: function(order) {
				$modal.open({
					templateUrl: '/templates/checkoutProhibited.html',
					backdrop: true,
					controller: 'CheckoutController',
					resolve: {
						args: function() {
							return {
								order: order
							}
						}
					}
				});
			},
			delFeeExp: function(things, delFee) {
				$modal.open({
					templateUrl: '/templates/deliveryFeeExplained.html',
					backdrop: true,
					controller: 'ExplainerController',
					resolve: {
						args: function() {
							return {
								things: things,
								delFee: delFee
							}
						}
					}
				});
			},
			add: function(flavor) {
				if(deviceMgr.isBigScreen()) {
					$modal.open({
						templateUrl: '/templates/addFlavorOptions.html',
						backdrop: true,
						controller: 'OrderMgmtController',
						resolve: {
							args: function() {
								return {
									flavor: flavor
								}
							}
						}
					});
				} else {
					$modal.open({
						templateUrl: '/templates/addFlavorOptionsSmall.html',
						backdrop: true,
						controller: 'OrderMgmtController',
						resolve: {
							args: function() {
								return {
									flavor: flavor
								}
							}
						}
					});
				}
			},
			addBev: function(bev) {
				$modal.open({
					templateUrl: '/templates/addBevOptions.html',
					backdrop: true,
					controller: 'OrderMgmtController',
					resolve: {
						args: function() {
							return {
								bev: bev
							}
						}
					}
				});
			},
			remove: function(thing) {
				$modal.open({
					templateUrl: '/templates/removeItemOptions.html',
					backdrop: true,
					controller: 'OrderMgmtController',
					resolve: {
						args: function() {
							return {
								thing: thing
							}
						}
					}
				});
			},
			view: function(entry) {
				if(deviceMgr.isBigScreen()) {
					$modal.open({
						templateUrl: '/templates/viewEntryDetails.html',
						backdrop: true,
						controller: 'EntryViewController',
						resolve: {
							args: function() {
								return {
									entry: entry
								}
							}
						}
					});
				} else {
					$modal.open({
						templateUrl: '/templates/viewEntryDetailsSmall.html',
						backdrop: true,
						controller: 'EntryViewController',
						resolve: {
							args: function() {
								return {
									entry: entry
								}
							}
						}
					});
				}
			},
			removeBev: function(bevThing) {
				$modal.open({
					templateUrl: '/templates/removeBevOptions.html',
					backdrop: true,
					controller: 'OrderMgmtController',
					resolve: {
						args: function() {
							return {
								bevThing: bevThing
							}
						}
					}
				});
			}
		};
		return service;
	}

}());
