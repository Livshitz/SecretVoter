app.run( ($rootScope, utils, $window) => {
	libx.log.debug('app:user.js')

	var userManager = libx.di.get('userManager');

	userManager.onDataChanged.subscribe((x)=>{
		libx.log.verbose('app:userManager:onDataChanged: ', x)
		$rootScope.user = userManager.data;
		$rootScope.safeApply();
	})
	userManager.onProfileChanged.subscribe((data)=>{
		libx.log.verbose('app:userManager:onDataChanged: ', data)
		$rootScope.profile = data;
		$rootScope.safeApply();
		bundular.broadcast('user-ready');
	})
	userManager.onSignIn.subscribe((x)=>{
		libx.log.verbose('app:userManager:onSignIn: ', x)
		$rootScope.user = userManager.data;
		libx.log.verbose('app:profile: user is ready');
		if (window.ga) 
			ga('send', {
				hitType: 'event',
				eventCategory: 'user',
				eventAction: 'login',
				eventLabel: 'id',
				eventId: $rootScope.user.id,
			});
		bundular.broadcast('user-ready');
		$rootScope.safeApply();
	})
	userManager.onSignOut.subscribe(()=>{
		libx.log.verbose('app:userManager:onSignOut: ')
		$rootScope.user = null;
		if (window.ga) ga('send', 'event', 'user', 'logout');
		$rootScope.safeApply();
	})

	$rootScope.listenPresence = ()=>{
		app.firebase.listen(`/presence`, data=>{
			$rootScope.participants = data; //_.toPairs(data);
			$rootScope.safeApply();
		});
	}

	bundular.on('user-ready', ()=> {
		app.firebase.isConnected(()=> {
			var ref = app.firebase.getRef(`/presence/${$rootScope.user.id}`);
			ref.onDisconnect().remove();
			ref.set($rootScope.user.email); //$rootScope.profile.displayName);

			$rootScope.listenPresence();
		});
	});

	$rootScope.$on('$viewContentLoaded', function () {
		if ($rootScope.user != null) bundular.broadcast('user-ready');
		bundular.broadcast('view-changed');
		if (window.ga) ga('send', 'pageview');
	});

	$rootScope.userManager = app.userManager;

});