
// ----- *** :Config: *** -----
app.config(function ($mdThemingProvider, $mdProgressCircularProvider) {

	$mdThemingProvider.theme('default').primaryPalette('light-blue').accentPalette('grey')
		// .dark()

	// Extend the red theme with a different color and make the contrast color black instead of white.
	// For example: raised button text will be black instead of white.
	var myThemeMap = $mdThemingProvider.extendPalette('light-blue', {
		// '500': '#ff0000',
		'contrastDefaultColor': 'dark'
	});

	// Register the new color palette map with the name <code>neonRed</code>
	$mdThemingProvider.definePalette('myTheme', myThemeMap);

	// Use that theme for the primary intentions
	var t = $mdThemingProvider.theme('default')
		.primaryPalette('myTheme')
		.accentPalette('orange');
		
	if (app.isDarkMode) t.dark();

	// Enable browser color
    $mdThemingProvider.enableBrowserColor({
		theme: 'myTheme', // Default is 'default'
		palette: 'blue-grey', // Default is 'primary', any basic material palette and extended palettes are available
		hue: '200' // Default is '800'
	});

	// $mdProgressCircularProvider.configure({
	// 	// progressSize: 100,
	// 	// strokeWidth: 20,
	// 	duration: 1000
	// });

});
