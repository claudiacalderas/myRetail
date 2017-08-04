myRetailApp.controller('ProductController', ['$scope', 'DataService', function($scope, DataService) {

  console.log('ProductController loaded');

  DataService.getCatalogItem();

}]);
