(function () {
	'use strict';

	angular
		.module('barebone.appointment')
		.controller('appointmentController', appointmentController);

	appointmentController.$inject = [
		'appointmentService', '$ionicActionSheet', '$scope', '$ionicLoading', '$timeout', '$filter'];

	/* @ngInject */
	function appointmentController(
		appointmentService, $ionicActionSheet, $scope, $ionicLoading, $timeout, $filter) {
		var currentPosition = []; 
		
		var currentDate = new Date();
		var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 23);
		$scope.date = date;
		
		$scope.myFunction = function (date) {
			alert(date);
		};
		
		$scope.onezoneDatepicker = {
			date: date, // MANDATORY                     
			mondayFirst: false,                
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],                    
			daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],     
			startDate: new Date(1989, 1, 26),             
			endDate: new Date(2024, 1, 26),                    
			disablePastDays: false,
			disableSwipe: false,
			disableWeekend: false,
			showDatepicker: false,
			showTodayButton: true,
			calendarMode: false,
			hideCancelButton: true,
			hideSetButton: false,
			// callback: function(value){
			// }
		};
		
		$scope.showDatepicker = function () {
			$scope.onezoneDatepicker.showDatepicker = true;
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
			$scope.date = $filter('date')($scope.date, "MM-dd-yyyy"); //format the date
			var htmlStrData = "Appointment Date: ";
			htmlStrData = htmlStrData + JSON.stringify($scope.date);

			$scope.MailData = {
			senderName: "",
			senderEmail: "",
			receiverEmail: "isleychase@gmail.com",
			html: htmlStrData // optionally, add html formatting
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