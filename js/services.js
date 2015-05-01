(function(){
	var myAppServices = angular.module('myAppServices', []);
	
	/**************************************
	* Data service
	***************************************/
	
	myAppServices.factory('myAppData', function(utility){
		return {
			getProfile : function() {
				var profileData = {
					title            : 'Innovative Design',
					name             : 'Berkeley, CA',
					tier 			 : 'Gold Tier',
					tierleader		 : 'Emily To',
					term 			 : 'Spring 2015',
					birthDate        : '12/16/1995',
					startWorkingDate : '09/01/2013',
					experience       : ""
				};
				var age = utility.getDurationInYears(false, profileData.birthDate);
				var workExperience = utility.getDurationInYears(true, profileData.startWorkingDate);
				var experience = utility.replaceParameters(profileData.experience, [age, workExperience]);
				var profile = {
					title      : profileData.title,
					name  	   : profileData.name,
					tier       : profileData.tier,
					tierleader : profileData.tierleader,
					term       : profileData.term,
					experience : experience
				};
				return profile;
			},
			getTagCloud : function() {
				var tagCloud = [
					{label:'HTML5', level:0}, {label:'AJAX', level:1}, {label:'Java/J2EE', level:2}, {label:'CSS3', level:0}, {label:'SONAR', level:0}, 
					{label:'CSS', level:0}, {label:'Shell', level:1}, {label:'Scrum', level:2}, {label:'Unix', level:0}, {label:'SQL', level:1}, {label:'REST', level:0},
					{label:'Javascript', level:1}, {label:'JQuery', level:2}, {label:'Tomcat', level:0}, {label:'Oracle', level:0}, {label:'AngularJS', level:0}, {label:'JSON', level:1},
					{label:'Spring', level:2}, {label:'JSP', level:0}, {label:'Maven', level:2}, {label:'UML', level:0}, {label:'Apache', level:1}, {label:'TDD', level:1}
				];
				return tagCloud;
			},
			getSkills : function() {
				var skills = [
					{
					 title:'Web',
					 specificSkills:['JAVA/J2EE (JSP, Spring, JSF)', 'REST', 'Javascript', 'JQuery', 'AJAX', 'JSON', 'HTML5', 'CSS3', 'AngularJS', 'Twitter Bootstrap', 'LESS', 'PHP', 'Velocity', 'Mustache', 'Extjs', 'Joomla', 'Webpshere Portal']
					},
					{
					 title:'Langages et outils',
					 specificSkills:['JAVA', 'Spring', 'Junit', 'Hibernate/JDBC', 'Maven', 'Eclipse', 'Jenkins', 'Sonar', 'Jira', 'Bazaar', 'CVS', 'SVN', 'Git', 'Jmeter', 'Selenium', 'Fitnesse', 'Quality Center', 'Clearcase', 'Clearquest', 'shell Unix']
					},
					{
					 title:'Serveurs',
					 specificSkills:['Apache', 'Tomcat', 'Jboss', 'NodeJS (lab)']
					},
					{
					 title:'Base de donnees',
					 specificSkills:['Oracle', 'MySql', 'SQL', 'PL/SQL', 'PL/SQL Developer']
					},
					{
					 title:'Méthodologies ',
					 specificSkills:['Agile Scrum', 'TDD', 'XP', 'Merise', 'UML']
					},
					{
					 title:'Systèmes',
					 specificSkills:['Windows', 'Linux Debian']
					}
				];
				return skills;
			},
			getHobbies : function() {
				var hobbies = {
					hobby1 : {
						title : '',
						desc1 : '',
						desc2 : ''
					},
					hobby2 : {
						title : '',
						desc1 : '',
						desc2 : ''
					},
					hobby3 : {
						title : '',
						desc1 : '',
						desc2 : ''
					}
				};
				return hobbies;
			},
			getContact : function() {
				var contact = {
					form : {
						error   : '',
						name    : '',
						email   : '',
						message : '',
						send    : '',
						confirm : {
							part1 : '',
							part2 : '',
							back  : ''
						}
					},
					address : {
						city    : '',
						zipCode : '',
						email   : ''
					}
				};
				return contact;
			},
			getNavigation : function(){
				var nav = {
					home : 'Tier',
					brian  : 'Brian',
					catherine  : 'Catherine',
					eric : 'Eric', 
					jocelyn  : 'Jocelyn',
					joy : 'Joy',
					monica : 'Monica',
					ziqi: 'Ziqi'

				};
				return nav;
			},
			getTimeline : function(){
				var timeline = {
					lang    : '',
					content : '' 
				}
				return timeline;
			},
			getLinks : function(){
				var links = {
					github   : 'https://github.com/dsuryakusuma',
					linkedin : '',
					twitter  : '',
					resume   : '',
					facebook : '',
					website  : 'http://innovativedesign.club',
				}
				return links;
			},
			getTechnos : function(){
				var technos = {
					img : [
						{
							src   : '/img/technos/angularjs.png',
							title : 'AngularJS'
						},
						{
							src   : '/img/technos/html5.png',
							title : 'HTML5'
						},
						{
							src   : '/img/technos/css3.png',
							title : 'CSS3'
						},
						{
							src   : '/img/technos/bootstrap.jpg',
							title : ''
						},
						{
							src   : '/img/technos/ascensorjs.jpg',
							title : ''
						}
					],
					source : {
						text     : '',
						link     : ''
					}				
				}
				return technos;
			}
		};
	});
	
	/**************************************
	* Mail service
	***************************************/
	
	myAppServices.factory('mailManager', function($http){
		return {
			getContactTemplates : function(){
				return {contactForm:'views/contactForm.html', contactConfirm:'views/contactConfirmation.html'};
			},
			submitContactForm : function(data, callbackSuccess, callbackError){
				$http.post('/application/email.php', {name:data.name, email:data.email, message:data.message})
				.success(function(){
					callbackSuccess();
				})
				.error(function(){
					callbackError();
				});
			}
		};
	});
	
	/**************************************
	* Timeline service
	***************************************/
	
	myAppServices.factory('timelineManager', function(){
		return {
			launchTimeline : function(dataUrl, lang){
				MY_APP.launchTimeline(dataUrl, lang);
			}
		};
	});
	
	/**************************************
	* Utility service
	***************************************/
	
	myAppServices.factory('utility', function(){
		return {
			contains : function(value1, value2){
				return MY_APP.contains(value1, value2);
			},
			getDurationInYears : function(greater, startDate, endDate){
				return MY_APP.getDurationInYears(greater, startDate, endDate);
			},
			replaceParameters : function(string, values){
				return MY_APP.replaceParameters(string, values);
			}
		};
	});
	
	/**************************************
	* Loader management
	***************************************/
	
	// http method for which we want to display a spinner 
	var httpMethodWithSpinner = 'POST';
	// intercept http methods to add treatment
	myAppServices.factory('myHttpInterceptor', function($q, $rootScope){
		return {
			'request': function(config) {
				if(config.method == httpMethodWithSpinner){
					// show loader
					$rootScope.$broadcast("show_loader");
				}
				return config || $q.when(config);
			},
			'response': function(response) {
				if(response.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return response || $q.when(response);
			},
			'responseError': function (rejection) {
				if(rejection.config.method == httpMethodWithSpinner){
					$rootScope.$broadcast("hide_loader");
				}
				return $q.reject(rejection);
			}
		};
	});
	myAppServices.config(function($httpProvider){
		$httpProvider.interceptors.push('myHttpInterceptor');
	});
	myAppServices.directive("loader", function(){
		return {
			link : function($scope, element){
				// hide the element initially
				element.hide();
				$scope.$on("show_loader", function () {
					element.show();
				});
				$scope.$on("hide_loader", function () {
					element.hide();
				});
			}
		};
	});
	
})();