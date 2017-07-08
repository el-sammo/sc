(function() {
	'use strict';

	var app = angular.module('app');

	///
	// Entry Management
	///

	app.factory('entryMgmt', service);
	
	service.$inject = [
		'$http', '$q', '$sce', 'configMgr', 'querystring'
	];
	
	function service(
		$http, $q, $sce, configMgr, querystring
	) {

		var service = {
			getEntry: function(entryId) {
				var url = '/entries/' + entryId;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			getTopEntries: function() {
				var url = '/entries/getTopEntries/';
				return $http.get(url).then(function(leaders) {
					return leaders.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			}

		};

		function mergeIntoEntry(data, replace) {
			if(! entry) {
				entry = data;
				return;
			}

			// Delete all original keys
			if(replace) {
				angular.forEach(entry, function(val, key) {
					delete entry[key];
				});
			}

			angular.forEach(data, function(val, key) {
				entry[key] = val;
			});
		};

		return service;
	}

}());
