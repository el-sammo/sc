(function() {
	'use strict';

	var app = angular.module('app');

	app.factory('entrySchema', service);
	
	service.$inject = [ ];
	
	function service() {
		function nameTransform(entry) {
			if(! entry || ! entry.name || entry.name.length < 1) {
				return 'entry-name';
			}
			return (entry.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '-')
				.toLowerCase()
			);
		}

		var service = {
			defaults: {
				entry: {
					name: '',
					year: ''
				}
			},

			populateDefaults: function(entry) {
				$.map(service.defaults.entry, function(value, key) {
					if(entry[key]) return;
					if(typeof value === 'object') {
						entry[key] = angular.copy(value);
						return;
					}
					entry[key] = value;
				});
				return entry;
			}
		};

		return service;
	}

}());
