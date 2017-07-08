/**
 * SelectionsController
 *
 * @description :: Server-side logic for managing selections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var Promise = require('bluebird');

var serverError = 'An error occurred. Please try again later.';

var httpAdapter = 'http';
var extra = {};

module.exports = {
	byYearWeek: function(req, res) {
		if(req.params.id) {
			var reqParamsIdPcs = req.params.id.split('-');
			var entryId = reqParamsIdPcs[0];
			var week = reqParamsIdPcs[1];
			var year = reqParamsIdPcs[2];

			Selections.find({entryId: entryId, week: week, year: year}).then(function(results) {
				return res.send(results);
			});
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid selectionsbyEntryIdYearWeek data'}));
		}
	},

	weekCount: function(req, res) {
		if(req.params.id) {
			var reqParamsIdPcs = req.params.id.split('-');
			var week = reqParamsIdPcs[0];
			var year = reqParamsIdPcs[1];

			Selections.find({week: week, year: year}).then(function(results) {
				return res.send(results);
			});
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid weekCount data'}));
		}
	},

	teamWeekCount: function(req, res) {
		if(req.params.id) {
			var reqParamsIdPcs = req.params.id.split('-');
			var team = reqParamsIdPcs[0];
			var week = reqParamsIdPcs[1];
			var year = reqParamsIdPcs[2];
console.log(' ');
console.log('team: ' + team);
console.log(' ');

			Selections.find({selections: team, week: week, year: year}).then(function(results) {
console.log(' ');
console.log('results:');
console.log(results);
console.log(' ');
				return res.send(results);
			});
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid selectionsbyEntryIdYearWeek data'}));
		}
	},

	oddsByYearWeek: function(req, res) {
		var reqParamsIdPcs = req.params.id.split('-');
		if(reqParamsIdPcs.length > 2) {
			return getTeamsOdds(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid oddsByEntryIdYearWeek data'}));
		}
	},

  datatables: function(req, res) {
    var options = req.query;

    Selections.datatables(options).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  }
};

function dynamicSort(property) {
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

function getTeamsOdds(req, res, self) {
	var reqParamsIdPcs = req.params.id.split('-');
	var entryId = reqParamsIdPcs[0];
	var week = reqParamsIdPcs[1];
	var year = reqParamsIdPcs[2];

	return Selections.find({entryId: entryId, week: week, year: year}).then(function(results) {
		return WoddsService.getTeamsOdds(results[0]).then(function(teamsOddsData) {
			res.send(JSON.stringify(teamsOddsData));
		});
	});
}




































