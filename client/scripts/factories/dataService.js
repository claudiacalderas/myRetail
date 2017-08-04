myRetailApp.factory('DataService', ['$http', function($http){

  console.log('DataService Loaded');

  var currentItem = {};

  // Gets all Catalog items
  getCatalogItem = function(){
    console.log('in getCatalogItems');
    $http.get('/catalog').then(function(response) {
      console.log('Back from the server with:', response);
      currentItem = response.data;
      console.log('currentItem is:', currentItem);
    });
  };

  newCatalogItem = function() {
    console.log('in newCatalogItem');
    var catalogItem = {};
    catalogItem.test = 'dog';
    catalogItem.CatalogEntryView = [3,4];
    $http.post('/catalog/add', catalogItem).then(function(response) {
      console.log('Back from server after creating catalogItem:', response);
    });
  };


  return {
    currentItem : currentItem,
    getCatalogItem : getCatalogItem,
    newCatalogItem : newCatalogItem
  };

}]);
