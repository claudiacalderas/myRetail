myRetailApp.controller('ProductController', ['$scope','$http', 'DataService',
                      function($scope, $http, DataService) {

  // Number of visible images for carousel
  NUM_VISIBLE_IMAGES = 3;
  // array of indexes of alternate images displayed
  $scope.arrayOfVisibleSlides = [];
  for (var i = 0; i < NUM_VISIBLE_IMAGES; i++) {
    $scope.arrayOfVisibleSlides.push(i);
  }
  // number of Alternate Images available
  var numOfAlternateImages;

  // variables to show/noshow addToCart and pickUp buttons
  $scope.pickUpVisible = false;
  $scope.addToCartVisible = false;


  // Calls Factory function that gets catalog information from the database
  DataService.getCatalogItem().then(function(data){
    // Using only one item in DB loaded from JSON file for this case study
    $scope.catalogItem = data.data[0].CatalogEntryView[0];
    console.log("CATALOG ITEM:", $scope.catalogItem);
    // sets variables to show/noshow buttons depending on purchasingChannelCode value
    switch (parseInt($scope.catalogItem.purchasingChannelCode)) {
      case 0:
        $scope.pickUpVisible = true;
        $scope.addToCartVisible = true;
        break;
      case 1:
        $scope.pickUpVisible = false;
        $scope.addToCartVisible = true;
        break;
      case 2:
        $scope.pickUpVisible = true;
        $scope.addToCartVisible = false;
        break;
      default:
        $scope.pickUpVisible = false;
        $scope.addToCartVisible = false;
    }
    // build array of alternate images for carousel
    numOfAlternateImages = $scope.catalogItem.Images[0].AlternateImages.length;
    console.log('Alternate images:', $scope.catalogItem.Images[0].AlternateImages);
  })
  .catch(function(response){
      console.log(response.status);
  });

  // CAROUSEL: moves slides back or forth depending on parameter n (+1, -1)
  $scope.moveSlides = function(n) {
    if (n == 1) {
      // Right arrow clicked
      // evaluates if last image displayed is the last one and in that case
      // circles to the first image of the array
      console.log('comparando:',$scope.arrayOfVisibleSlides[NUM_VISIBLE_IMAGES - 1], (numOfAlternateImages - 1));
      if ($scope.arrayOfVisibleSlides[NUM_VISIBLE_IMAGES - 1] == (numOfAlternateImages - 1)) {
        $scope.arrayOfVisibleSlides.shift();
        $scope.arrayOfVisibleSlides.push(0);
        console.log('1: arreglo es:', $scope.arrayOfVisibleSlides);
      } else {
        $scope.arrayOfVisibleSlides.shift();
        $scope.arrayOfVisibleSlides.push($scope.arrayOfVisibleSlides[$scope.arrayOfVisibleSlides.length - 1] + 1);
        console.log('2: arreglo es:', $scope.arrayOfVisibleSlides);
      }
    } else {
      // Left arrow clicked
      // evaluates if first image displayed is the last one and in that case
      // circles to the last image of the array
      console.log('comparando:',$scope.arrayOfVisibleSlides[NUM_VISIBLE_IMAGES - 1], (numOfAlternateImages - 1));
      if ($scope.arrayOfVisibleSlides[0] == 0) {
        $scope.arrayOfVisibleSlides.pop();
        $scope.arrayOfVisibleSlides.unshift(numOfAlternateImages - 1);
        console.log('1: arreglo es:', $scope.arrayOfVisibleSlides);
      } else {
        $scope.arrayOfVisibleSlides.pop();
        $scope.arrayOfVisibleSlides.unshift($scope.arrayOfVisibleSlides[0] - 1);
        console.log('2: arreglo es:', $scope.arrayOfVisibleSlides);
      }
    }
  }

}]);
