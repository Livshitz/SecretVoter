(async ()=>{ /* init */
	if (window._libx_angular_boot != null) return;
	window.prerenderReady = false;

	window.global=window;
	window.app = {};

	window.bundular = libx.di.get('bundular');

	angular.module('templates', []);
	app = angular.module('myApp', ['bundular', 'ngAnimate', 'ngMaterial', 'ngCookies', 'ngResource', 'ngRoute', 'templates']);
	// angular-google-analytics

	app.api = {};
	app.layout = {};
	app.name = "BundularJS";
	app.desc = "BundularJS";
	app.titlePrefix = "BundularJS";
	app.isDarkMode = false;

	app.layout.title = 'BundularJS';
	app.getTitle = ()=> 'asd';

	app.firebase = libx.di.get('firebase');
	app.firebase.firebasePathPrefix = '/secret-voter';

	app.userManager = libx.di.get('userManager');

	libx.di.inject(firebase=>{
		firebase.onReady.subscribe(()=>{
			window.prerenderReady = true;
			console.log('!!! fib-ready')
		})
	});

	app.config(()=> {
		app.lazy = bundular.lazy;
	});

	app.run( ($rootScope, utils, $window) => {
		libx.log.debug('app:run')

		app.firebase.isConnected(()=> {
			bundular.broadcast('fib-ready');
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
