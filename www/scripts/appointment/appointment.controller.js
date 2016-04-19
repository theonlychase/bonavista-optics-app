(function () {
	'use strict';

	angular
		.module('barebone.appointment')
		.controller('appointmentController', appointmentController);

	appointmentController.$inject = [
		'appointmentService', '$ionicActionSheet', '$scope', '$ionicLoading', '$timeout'];

	/* @ngInject */
	function appointmentController(
		appointmentService, $ionicActionSheet, $scope, $ionicLoading, $timeout) {
		var currentPosition = []; 
		
		$scope.onezoneDatepicker = {
			date: date, // MANDATORY                     
			mondayFirst: false,                
			months: months,                    
			daysOfTheWeek: daysOfTheWeek,     
			startDate: startDate,             
			endDate: endDate,                    
			disablePastDays: false,
			disableSwipe: false,
			disableWeekend: false,
			disableDates: disableDates,
			disableDaysOfWeek: disableDaysOfWeek,
			showDatepicker: true,
			showTodayButton: true,
			calendarMode: false,
			hideCancelButton: false,
			hideSetButton: false,
			highlights: highlights,
			callback: function(value){
				// your code
			}
		};
		
		// send email, use as input $scope.MailData
		initMailData();
		$scope.sendMail = function() {
			// validate
			if($scope.MailData.senderEmail && $scope.MailData.senderName && $scope.MailData.receiverEmail) {

			// send
			showMessage('Sending...');
			appointmentService.sendMail($scope.MailData).then(
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
			senderName: "",
			senderEmail: "",
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