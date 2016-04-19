(function () {
	'use strict';

	angular
		.module('barebone.contact-lens-refill')
		.factory('contactLensRefillService', contactLensRefillService);

	contactLensRefillService.$inject = ['$q', '$http', 'ENV'];

	/* @ngInject */
	function contactLensRefillService($q, $http, ENV) {
		
		// NodeMailer-Mailgun Server-Side
		var SERVER_SIDE_URL = ENV.apiEndpoint;
		
		 var self = this;

		/**
		 * Send Email
		* @mailObj: object with properties
		*      'senderName'
		*      'senderEmail'
		*      'receiverEmail'
		*      'subject'
		*      'html'
		*/
		self.sendMail = function(mailObj) {
			var qSend = $q.defer();
			$http.post(SERVER_SIDE_URL + "/email/send", mailObj)
			.success(
			function(response){
				qSend.resolve(response)
			}
			)
			.error(
			function(error){
				qSend.reject(error);
			}
			);
			return qSend.promise;
		};

		return self;
	}
})();
