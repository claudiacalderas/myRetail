myRetailApp.factory('DataService', ['$http', '$q', function($http, $q) {

  console.log('DataService Loaded');

  return {
    // function that uses a promise to handle the $http call to get
    // the catalog item from the database
    getCatalogItem : function(purchasingChannelCode) {
      var deferred = $q.defer();
      $http.get('/catalog')
      .then(function(response) {
          deferred.resolve(response);
          console.log(response);
      })
      .catch(function(response) {
        deferred.reject(response);
      });
      return deferred.promise;
    }
  };

}]);
