(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'Contact Lens Refills',
			path: 'contact-lens-refill',
			icon: 'ion-eye'
		}, {
			title: 'Schedule Appointment',
			path: 'appointment',
			icon: 'ion-calendar'
		}, {
			title: 'Galleries',
			path: 'galleries',
			icon: 'ion-images'
		}, {
			title: 'Map',
			path: 'map',
			icon: 'ion-map'
		}];

		return data;
	}
})();