/**
 * EntriesController
 *
 * @description :: Server-side logic for managing entries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var Promise = require('bluebird');

var serverError = 'An error occurred. Please try again later.';

var httpAdapter = 'http';
var extra = {};

module.exports = {
	resultsByEntryId: function(req, res) {
		if(req.params.id) {
			return getResultsByEntryId(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid resultsByPlayerId data'}));
		}
	},

	getTopEntries: function(req, res) {
		Entries.find().sort({total: 1, name: 1}).limit(25).then(function(results) {
console.log(' ');
console.log('getTopEntries results:');
console.log(results);
console.log(' ');
			return results;
		});
	},
	
  datatables: function(req, res) {
    var options = req.query;

    Entries.datatables(options).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  }
};

function getResultsByEntryId(req, res, self) {
	var entryId = req.params.id;
	return EntriesService.getResultsByEntryId(entryId).then(function(gtrResponse) {
		if(gtrResponse.success) {
			res.send(JSON.stringify(gtrResponse.resultsData));
		}
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}

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

