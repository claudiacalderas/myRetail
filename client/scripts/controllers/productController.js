myRetailApp.controller('ProductController', ['$scope','$http', 'DataService',
                      function($scope, $http, DataService) {

  console.log('ProductController loaded');
  // $scope.returnDescription = 

  // Calls Factory function that gets catalog information from the database
  DataService.getCatalogItem().then(function(data){
    // Using only one item in DB loaded from JSON file for this case study
    $scope.catalogItem = data.data[0].CatalogEntryView[0];
    console.log("CATALOG ITEM:", $scope.catalogItem);
  })
  .catch(function(response){
      console.log(response.status);
  });

}]);
