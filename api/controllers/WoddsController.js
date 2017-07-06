/**
 * WoddsController
 *
 * @description :: Server-side logic for managing wodds
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
			var team = reqParamsIdPcs[0];
			var week = reqParamsIdPcs[1];
			var year = reqParamsIdPcs[2];

			Wodds.findOne({
				team: team, 
				week: week, 
				year: year
			}).then(function(results) {
				return res.send(results);
			});
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid weekOddsByYearWeek data'}));
		}
	},

  datatables: function(req, res) {
    var options = req.query;

    Wodds.datatables(options).then(function(results) {
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

