(function(){
	var myApp = angular.module('myApp', ['myAppServices']);
		

	
	myApp.controller('MyCtrl', function($scope, myAppData, mailManager, timelineManager){
		
		// Data mangement
		$scope.links = myAppData.getLinks();
		$scope.nav = myAppData.getNavigation();
		$scope.profile = myAppData.getProfile();	
		$scope.tagCloud = myAppData.getTagCloud();
		$scope.skills = myAppData.getSkills();
		$scope.hobbies = myAppData.getHobbies();
		$scope.contact = myAppData.getContact();
		$scope.technos = myAppData.getTechnos();
		
		// Style management
		var labelClassName = ['', 'label-success', 'label-warning', 'label-inverse', 'label-info', 'label-important'];
		var textColorClassName = ['muted', 'text-warning', 'text-info', 'text-success', 'text-error'];
		var tagSizeClassName = ['small-tag', 'medium-tag', 'big-tag'];
		
		$scope.labelClass = function(index){
			var labelClass = 'label';
			if(typeof labelClassName[index] !== undefined){
				labelClass += ' ' + labelClassName[index];
			}
			return labelClass;
		};
		
		$scope.tagClass = function(index, level){
			var tagClass;
			var colorClassNameId = index % 5;
			
			if(typeof textColorClassName[colorClassNameId] === undefined){
				colorClassNameId = 0;
			}
			tagClass = textColorClassName[colorClassNameId];

			if(typeof tagSizeClassName[level] === undefined){
				level = 0;
			}
			tagClass += ' ' + tagSizeClassName[level];

			return tagClass;			
		};
		
		// launch timeline
		var timelineData = myAppData.getTimeline();
		timelineManager.launchTimeline(timelineData.content, timelineData.lang);
		
		// mail management	
		var contactTemplates = mailManager.getContactTemplates();
		var mailSendingSuccess = function(){
			$scope.emailSent = true;
			$scope.contactTemplate = contactTemplates.contactConfirm;
		}
		var mailSendingError = function(){
			$scope.emailSent = false;
		}
		
		$scope.mail = {name:'', email:'', message:''};
		$scope.contactTemplate = contactTemplates.contactForm;
		$scope.emailSent = true;
		$scope.submitContactForm = function(){
			mailManager.submitContactForm($scope.mail, mailSendingSuccess, mailSendingError)
		};
		$scope.backToContactForm = function(){
			for(key in $scope.mail){
				$scope.mail[key] = '';
			}
			$scope.contactTemplate = contactTemplates.contactForm;
		}
	});
	
})();