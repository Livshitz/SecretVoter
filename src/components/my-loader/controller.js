var componentName = libx.browser.angular.tryGetComponentName(__moduleUri); // <------ Edit this or let __moduleUri (injected by `libx.browser.require`)
var componentTemplate = 'resources/components/' + componentName.kebabCase() + '/template.html'; 

libx.browser.angular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		templateUrl: componentTemplate
	};
});
