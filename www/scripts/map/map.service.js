(function() {
	'use strict';

	angular
		.module('barebone.map')
		.factory('mapService', mapService);

	mapService.$inject = [];

	/* @ngInject */
	function mapService() {
		var data = {
			origin: {
					latitude : 34.062707,
					longitude : -118.353911
			},
			zoomLevel: 15,
			annotations : [{
					title : 'Bonavista Optics',
					latitude : 34.062707,
					longitude : -118.353911
			}]
		};
		return data;
	}
})();
