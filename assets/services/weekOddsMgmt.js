(function() {
	'use strict';

	var app = angular.module('app');

	///
	// WeekOdds Management
	///

	app.factory('weekOddsMgmt', service);
	
	service.$inject = [
		'$http', '$q', '$sce', 'configMgr', 'querystring'
	];
	
	function service(
		$http, $q, $sce, configMgr, querystring
	) {

		var service = {
			getOdds: function(selection, week, year) {
				var url = '/wodds/byYearWeek/' + selection + '-' + week + '-' + year;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			getWeekOdds: function(week, year) {
				var url = '/wodds/weekYear/' + week + '-' + year;
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
			if(! weekOdds) {
				weekOdds = data;
				return;
			}

			// Delete all original keys
			if(replace) {
				angular.forEach(weekOdds, function(val, key) {
					delete weekOdds[key];
				});
			}

			angular.forEach(data, function(val, key) {
				weekOdds[key] = val;
			});
		};

		return service;
	}

}());
