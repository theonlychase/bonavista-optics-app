(function () {
	'use strict';

	angular
		.module('barebone.feedback')
		.controller('FeedbackController', FeedbackController);

	FeedbackController.$inject = [
		'feedbackService', '$ionicActionSheet', '$scope', '$ionicLoading', '$timeout'];

	/* @ngInject */
	function FeedbackController(
		feedbackService, $ionicActionSheet, $scope, $ionicLoading, $timeout) {
		var currentPosition = []; 
		
		// send email, use as input $scope.MailData
		initMailData();
		$scope.sendMail = function() {
			// validate
			if($scope.MailData.senderEmail && $scope.MailData.senderName && $scope.MailData.receiverEmail) {

			// send
			showMessage('Sending...');
			feedbackService.sendMail($scope.MailData).then(
				function(success){
				showMessage('Mail sent!', 1500);
				initMailData();
				},
				function(error){
				console.log(error);
				showMessage('Oooops... something went wrong', 1500);
				}
			); 

			} else {

			// notify the user
			showMessage('Please fill in the required (*) fields', 2000);

			};
		};

		// init maildata
		function initMailData() {
			$scope.MailData = {
			senderName: "Chase Isley",
			senderEmail: "chaseisley@live.com",
			receiverEmail: "isleychase@gmail.com",
			html: "", // optionally, add html formatting
			};
		};

		// fn show loading dialog
		function showMessage(optMessage, optTime){

			// prepare the dialog content
			var templateStr;
			if(optTime != undefined) {templateStr = optMessage};
			if(optMessage != undefined && optTime != undefined) {
				templateStr = optMessage;
			} else if(optMessage != undefined && optTime == undefined) {
				templateStr = optMessage + '<br><br>' + '<ion-spinner icon="dots"></ion-spinner>';
			} else {
				templateStr = '<ion-spinner icon="dots"></ion-spinner>';
			};

			// prompt
			$ionicLoading.show({
				template: templateStr
			});

			// hide if input provided
			if(optTime != undefined) {
				$timeout(function(){
					$ionicLoading.hide();
			}, optTime)
			};

		};
	}
})();