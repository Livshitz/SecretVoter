(async ()=>{ /* init */
	if (window._libx_angular_boot != null) return;

	window.global=window;
	window.app = {};
	window.prerenderReady = false;

	angular.module('templates', []);
	app = angular.module('myApp', ['libx.angular', 'ngAnimate', 'ngMaterial', 'ngCookies', 'ngResource', 'ngRoute', 'templates']);
	// angular-google-analytics

	app.api = {};
	app.layout = {};
	app.name = "BundularJS";
	app.desc = "BundularJS";
	app.titlePrefix = "BundularJS";
	app.isDarkMode = false;

	app.layout.title = 'BundularJS';
	app.getTitle = ()=> 'asd';

	libx.modules.firebase.firebasePathPrefix = '/secret-voter';

	app.run( ($rootScope, utils, $window) => {
		libx.log.debug('app:run')

		libx.modules.firebase.isConnected(()=> {
			libx.browser.angular.broadcast('fib-ready');
		});


		// Load components ahead of time (otherwise, require them from the specific controller)
		libx.browser.require('resources/components/my-loader/controller.js')
		libx.browser.require('resources/components/my-widget/controller.js')
		libx.browser.require('resources/scripts/lib/ng-inline-edit.js')
	});

	app.controller('layoutEx', ($scope, $sce, $compile, $templateCache, $templateRequest, $rootScope, $timeout, $mdSidenav, $location, $cookies) => {
		libx.log.verbose('app:layoutEx');

		$scope.layout = app.layout;
	});

	libx.browser.require('resources/scripts/user.js')
})();
