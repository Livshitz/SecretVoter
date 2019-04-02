app.run( ($rootScope, utils, $window) => {
	libx.log.debug('app:user.js')

	libx.browser.userManager.onDataChanged.subscribe((x)=>{
		libx.log.verbose('app:userManager:onDataChanged: ', x)
		$rootScope.user = libx.browser.userManager.data;
		$rootScope.safeApply();
	})
	libx.browser.userManager.onProfileChanged.subscribe((data)=>{
		libx.log.verbose('app:userManager:onDataChanged: ', data)
		$rootScope.profile = data;
		$rootScope.safeApply();
		libx.browser.angular.broadcast('user-ready');
	})
	libx.browser.userManager.onSignIn.subscribe((x)=>{
		libx.log.verbose('app:userManager:onSignIn: ', x)
		$rootScope.user = libx.browser.userManager.data;
		libx.log.verbose('app:profile: user is ready');
		if (window.ga) 
			ga('send', {
				hitType: 'event',
				eventCategory: 'user',
				eventAction: 'login',
				eventLabel: 'id',
				eventId: $rootScope.user.id,
			});
		libx.browser.angular.broadcast('user-ready');
		$rootScope.safeApply();
	})
	libx.browser.userManager.onSignOut.subscribe(()=>{
		libx.log.verbose('app:userManager:onSignOut: ')
		$rootScope.user = null;
		if (window.ga) ga('send', 'event', 'user', 'logout');
		$rootScope.safeApply();
	})

	$rootScope.listenPresence = ()=>{
		libx.modules.firebase.listen(`/presence`, data=>{
			$rootScope.participants = data; //_.toPairs(data);
			$rootScope.safeApply();
		});
	}

	libx.browser.angular.on('user-ready', ()=> {
		libx.modules.firebase.isConnected(()=> {
			var ref = libx.modules.firebase.getRef(`/presence/${$rootScope.user.id}`);
			ref.onDisconnect().remove();
			ref.set($rootScope.user.email); //$rootScope.profile.displayName);

			$rootScope.listenPresence();
		});
	});

	$rootScope.$on('$viewContentLoaded', function () {
		if ($rootScope.user != null) libx.browser.angular.broadcast('user-ready');
		libx.browser.angular.broadcast('view-changed');
		if (window.ga) ga('send', 'pageview');
	});

});