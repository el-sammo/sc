/**
 * Selections.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    entryId: {
      type: 'string',
      required: true
		},
    week: {
      type: 'integer',
      required: true
		},
    year: {
      type: 'integer',
      required: true
		},
		selections: {
			type: 'array',
			required: false
		}
  }
};

