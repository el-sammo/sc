
var Promise = require('bluebird');

module.exports = {
	getTeamsOdds: function(teams) {
		var combined = [];

		// first team
		Wodds.find({
			team: teams.selections[0],
			week: teams.week,
			year: teams.year
		}).then(function(teamOdds) {
			combined.push(teamOdds[0]);
		});

		// second team
		Wodds.find({
			team: teams.selections[1],
			week: teams.week,
			year: teams.year
		}).then(function(teamOdds) {
			combined.push(teamOdds[0]);
		});

		// third team
		Wodds.find({
			team: teams.selections[2],
			week: teams.week,
			year: teams.year
		}).then(function(teamOdds) {
			combined.push(teamOdds[0]);
		});

		// fourth team
		return Wodds.find({
			team: teams.selections[3],
			week: teams.week,
			year: teams.year
		}).then(function(teamOdds) {
			combined.push(teamOdds[0]);

			// fifth team
			return Wodds.find({
				team: teams.selections[4],
				week: teams.week,
				year: teams.year
			}).then(function(teamOdds) {
				combined.push(teamOdds[0]);
				return combined;
			});
		});

	}
},

dynamicSort = function(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

