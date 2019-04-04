var componentName = libx.angular.tryGetComponentName(__moduleUri); // <------ Edit this or let __moduleUri (injected by `libx.browser.require`)
var componentTemplate = 'resources/components/' + componentName.kebabCase() + '/template.html'; 

libx.angular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		templateUrl: componentTemplate
	};
});
