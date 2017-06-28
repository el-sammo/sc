(function() {
	'use strict';

	var app = angular.module('app');

	app.controller('EntryViewController', controller);
	
	controller.$inject = [
		'$q', '$scope', '$modalInstance', '$http', '$rootScope', '$timeout',
		'$window', 'entryMgmt', 'clientConfig', 'args', 'selectionsMgmt',
		'weekMgmt', 'weekOddsMgmt', 'signupPrompter', 'layoutMgmt'
	];

	function controller(
		$q, $scope, $modalInstance, $http, $rootScope, $timeout,
		$window, entryMgmt, clientConfig, args, selectionsMgmt,
		weekMgmt, weekOddsMgmt, signupPrompter, layoutMgmt
	) {
		var combined = [];

		if(args.entry) {
			$scope.entryName = args.entry.name;
			var week = 17;
			var year = 2016;
			$scope.selectionsWeek = week;
			selectionsMgmt.getSelections(args.entry.id, week, year).then(function(selections) {
				selections[0].selections.forEach(function(team) {
					var thisCombined = {};
					thisCombined.team = team;
					weekOddsMgmt.getOdds(team, week, year).then(function(odds) {
console.log('odds:');
console.log(odds);
						thisCombined.odds = odds.spread;
						combined.push(thisCombined);
console.log('combined (a):');
console.log(combined);
						$scope.combined = combined;
					});
				});
				$scope.selections = selections;
			});
		} else {

			$scope.closeReservation = function() {
				$modalInstance.dismiss('done');
			}
		}
	}

}());
