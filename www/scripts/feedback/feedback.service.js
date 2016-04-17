(function () {
	'use strict';

	// NodeMailer-Mailgun Server-Side
	var SERVER_SIDE_URL = "<SERVER-SIDE-URL>"

	angular
		.module('barebone.feedback')
		.factory('feedbackService', feedbackService);

	feedbackService.$inject = [];

	/* @ngInject */
	function feedbackService($q, $http) {
		
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
