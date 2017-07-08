(function() {
"use strict";

var app = angular.module('app');

///
// Controllers: Home
///

app.controller('HomeController', controller);

controller.$inject = [
	'$scope', '$http', '$routeParams', '$rootScope', '$location', 
	'$modal', '$timeout', '$window',

	'signupPrompter', 'deviceMgr', 'layoutMgmt',
	'entryMgmt', 'selectionsMgmt', 'weekMgmt', 
	'orderMgmt', 'messenger', 
	'lodash',
	// in angular, there are some angular-defined variables/functions/behaviors
	// that are prefaced with the dollar sign ($)
];

function controller(
	$scope, $http, $routeParams, $rootScope, $location,
	$modal, $timeout, $window,
	signupPrompter, deviceMgr, layoutMgmt, 
	entryMgmt, selectionsMgmt, weekMgmt,
	orderMgmt, messenger, 
	_
) {
	///
	// Variable declaration
	///

	var todayDate;

	///
	// Run initialization
	///

	init();


	///
	// Initialization
	///

	function init() {
		initEntries();

		$scope.showEntryDetails = orderMgmt.view;

		// For debugging
		$scope.debugLog = debugLog;
	}

	function initEntries() {
		entryMgmt.getTopEntries().then(
			onGetEntries
		);
	}

	///
	// Event handlers
	///
	
	function onGetEntries(entries) {
		$scope.entriesData = entries;
	}

	///
	// View methods
	///


	function showEntryDetails(entryId) {
console.log('showEntryDetails() called with: '+entryId);
		entryMgmt.getEntry(entryId).then(function(entryData) {
			$scope.entryData = entryData;
		});
	}

	setTimeout(function() { 
		initEntries();
	}, 300000);

	///
	// Debugging methods
	///
	
	function debugLog(msg) {
		var args = Array.prototype.slice.call(arguments);
		console.log.apply(console, args);
	}
}

}());
