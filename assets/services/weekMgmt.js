(function() {
	'use strict';

	var app = angular.module('app');

	///
	// Week Management
	///

	app.factory('weekMgmt', service);
	
	service.$inject = [
		'$http', '$q', '$sce', 'configMgr', 'querystring'
	];
	
	function service(
		$http, $q, $sce, configMgr, querystring
	) {

		var service = {
			getWeek: function(entryId, week, year) {
				var url = '/weeks/' + entryId + '-' + week + '-' + year;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			}

		};

		function mergeIntoEntry(data, replace) {
			if(! weeks) {
				weeks = data;
				return;
			}

			// Delete all original keys
			if(replace) {
				angular.forEach(weeks, function(val, key) {
					delete weeks[key];
				});
			}

			angular.forEach(data, function(val, key) {
				weeks[key] = val;
			});
		};

		return service;
	}

}());
