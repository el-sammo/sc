/**
* Games.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

var tablize = require('sd-datatables');

module.exports = {

  attributes: {
    tournamentId: {
      type: 'string',
      required: true
		},
    whitePlayerId: {
      type: 'string',
      required: true
		},
    blackPlayerId: {
      type: 'string',
      required: true
		},
    variant: {
      type: 'string',
      required: true
		}
  }

};

tablize(module.exports);

