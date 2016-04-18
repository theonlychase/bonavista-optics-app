(function() {
	'use strict';

	angular
		.module('barebone.home')
		.factory('homeDataService', homeDataService);

	homeDataService.$inject = [];

	/* @ngInject */
	function homeDataService() {
		return {
			phoneNumber: '+18009239730',
			email: 'optician1@bonavistaoptics.com',
			officeLocation: '34.062707,-118.353911',
			facebookPage: 'https://www.facebook.com/bonavistaoptics'
		};
	}
})();
