(function() {
	'use strict';

	var app = angular.module('app');

	///
	// Selections Management
	///

	app.factory('selectionsMgmt', service);
	
	service.$inject = [
		'$http', '$q', '$sce', 'configMgr', 'querystring'
	];
	
	function service(
		$http, $q, $sce, configMgr, querystring
	) {

		var service = {
			getSelections: function(entryId, week, year) {
				var url = '/selections/byYearWeek/' + entryId + '-' + week + '-' + year;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			getWeekCount: function(week, year) {
				var url = '/selections/weekCount/' + week + '-' + year;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			getTeamWeekCount: function(team, week, year) {
				var url = '/selections/teamWeekCount/' + team + '-' + week + '-' + year;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			getSelectionsOdds: function(entryId, week, year) {
				var url = '/selections/oddsByYearWeek/' + entryId + '-' + week + '-' + year;
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
			if(! selections) {
				selections = data;
				return;
			}

			// Delete all original keys
			if(replace) {
				angular.forEach(selections, function(val, key) {
					delete selections[key];
				});
			}

			angular.forEach(data, function(val, key) {
				selections[key] = val;
			});
		};

		return service;
	}

}());
