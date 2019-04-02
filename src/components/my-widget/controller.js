var componentName = libx.browser.angular.tryGetComponentName(__moduleUri); // <------ Edit this or let __moduleUri (injected by `libx.browser.require`)
var componentTemplate = 'resources/components/' + componentName.kebabCase() + '/template.html'; 

libx.browser.angular.lazy.directive(componentName, function () {
	return {
		restrict: 'E',
		controller: componentController,
		transclude: true,
		//template: '<div ng-transclude></div>',
		templateUrl: componentTemplate,
		scope: {
			content: "=",
			text: '@',
		},
		link: function ($scope, $element, $attr) {

			// Broadcast when component is ready
			$scope.$broadcast('$' + componentName + 'Loaded', $element);
		}
	};

	function componentController($scope, $element) {
		libx.log.debug('componentController:' + componentName + ':');
		this.$scope = $scope;
		this.$element = $element;

		// Component logic here <------
	}
});
