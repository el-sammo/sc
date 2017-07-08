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

		$scope.processWeek = function(entryName, week, year) {
			$scope.entryName = args.entry.name;

			$scope.selectionsWeek = week;
			$scope.selectionsYear = year;

			$scope.noDataAvailable = false;
			$scope.noSelectionsAvailable = false;

			var selectionCount = 0;
			var firstTeamCount = 0;
			var secondTeamCount = 0;
			var thirdTeamCount = 0;
			var fourthTeamCount = 0;
			var fifthTeamCount = 0;
			var allWeekCountData;

			var teamsCounts = [];

			selectionsMgmt.getWeekCount(week, year).then(function(weekCountData) {
				if(weekCountData.length < 1) {
					$scope.noDataAvailable = true;
					$scope.noSelectionsAvailable = true;
				}
				allWeekCountData = weekCountData;
				weekCountData.forEach(function(week) {
					selectionCount += week.selections.length;
					$scope.selectionCount = selectionCount;
				});
			}).then(function() {

				selectionsMgmt.getSelectionsOdds(args.entry.id, week, year).then(function(results) {
					if(results.length < 1) {
						$scope.noSelectionsAvailable = true;
					}
					$scope.selectionsOdds = results;
					allWeekCountData.forEach(function(weekCount) {
						weekCount.selections.forEach(function(weekTeam) {
							if(weekTeam === results[0].team) {
								firstTeamCount ++;
							}
							if(weekTeam === results[1].team) {
								secondTeamCount ++;
							}
							if(weekTeam === results[2].team) {
								thirdTeamCount ++;
							}
							if(weekTeam === results[3].team) {
								fourthTeamCount ++;
							}
							if(weekTeam === results[4].team) {
								fifthTeamCount ++;
							}
						});
					});
					teamsCounts.push(firstTeamCount);
					teamsCounts.push(secondTeamCount);
					teamsCounts.push(thirdTeamCount);
					teamsCounts.push(fourthTeamCount);
					teamsCounts.push(fifthTeamCount);
					$scope.allTeamsCounts = teamsCounts;
				});
			});
		}

		if(args.entry) {
			var entryName = args.entry.name;
			var week = 17;
			var year = 2016;

			$scope.processWeek(entryName, week, year);
		} else {
			$scope.closeReservation = function() {
				$modalInstance.dismiss('done');
			}
		}

	}

}());
