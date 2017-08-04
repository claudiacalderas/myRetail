var myRetailApp = angular.module('myRetailApp', ['ngRoute','ngMaterial']);

// Angular Material Theme Configuration
myRetailApp.config(['$mdThemingProvider', function($mdThemingProvider) {
   $mdThemingProvider.theme('altTheme').primaryPalette('grey').accentPalette('blue-grey');
}]);

/// Routes ///
myRetailApp.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/product.html',
      controller: 'ProductController',
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
