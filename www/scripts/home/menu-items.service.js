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
			path: 'feedback',
			icon: 'ion-eye'
		}, {
			title: 'Products',
			path: 'products-extended',
			icon: 'ion-android-cart'
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