myRetailApp.controller('ProductController', ['$scope','$http','$routeParams','DataService','Utilities',
                      function($scope, $http, $routeParams, DataService, Utilities) {

  // Number of visible images for carousel
  NUM_VISIBLE_IMAGES = 3;
  // quantity max value
  QUANTITY_MAX = 20;
  // array of indexes of alternate images displayed
  $scope.arrayOfVisibleSlides = [];
  for (var i = 0; i < NUM_VISIBLE_IMAGES; i++) {
    $scope.arrayOfVisibleSlides.push(i);
  }
  // number of Alternate Images available
  var numOfAlternateImages;
  // number of stars for ratings
  $scope.numberOfStars = [1,2,3,4,5];
  // quantity max value
  $scope.quantity = 1;
  // variables to show/noshow addToCart and pickUp buttons
  $scope.pickUpVisible = false;
  $scope.addToCartVisible = false;
  // Primary Image URL
  $scope.primaryImageURL;
  // Date format function from Utilities factory
  $scope.getDate = Utilities.getDate;

  // Calls Factory function that gets catalog information from the database
  DataService.getCatalogItem().then(function(data){
    // Using routeParams to get CatalogItem from DB with different values for
    // purchasingChannelCode
    // $routeParams valid codes: 0,1
    console.log('$routeParams.code',data.data[$routeParams.code]);
    if ($routeParams.code == 0 || $routeParams.code == 1 || $routeParams.code == 0 ||
        data.data[$routeParams.code]) {
      $scope.validData = true;
      $scope.catalogItem = data.data[$routeParams.code].CatalogEntryView[0];
      console.log("CATALOG ITEM:", $scope.catalogItem);
      // sets value of primaryImage
      $scope.primaryImageURL = $scope.catalogItem.Images[0].PrimaryImage[0].image;
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
      // save number of alternate images in a variable for carousel functionality
      numOfAlternateImages = $scope.catalogItem.Images[0].AlternateImages.length;
    } else {
      // product not found (not a valid route)
      console.log('product not found (not a valid route)');
      $scope.validData = false;
    }
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
      if ($scope.arrayOfVisibleSlides[NUM_VISIBLE_IMAGES - 1] == (numOfAlternateImages - 1)) {
        $scope.arrayOfVisibleSlides.shift();
        $scope.arrayOfVisibleSlides.push(0);
      } else {
        $scope.arrayOfVisibleSlides.shift();
        $scope.arrayOfVisibleSlides.push($scope.arrayOfVisibleSlides[$scope.arrayOfVisibleSlides.length - 1] + 1);
      }
    } else {
      // Left arrow clicked
      // evaluates if first image displayed is the last one and in that case
      // circles to the last image of the array
      if ($scope.arrayOfVisibleSlides[0] == 0) {
        $scope.arrayOfVisibleSlides.pop();
        $scope.arrayOfVisibleSlides.unshift(numOfAlternateImages - 1);
      } else {
        $scope.arrayOfVisibleSlides.pop();
        $scope.arrayOfVisibleSlides.unshift($scope.arrayOfVisibleSlides[0] - 1);
      }
    }
  }

  // changes primaryImage
  $scope.changePrimaryImage = function(imageURL) {
    $scope.primaryImageURL = imageURL;
  }

  // increases quantity by 1
  $scope.addQuantity = function() {
    if($scope.quantity < QUANTITY_MAX) {
      $scope.quantity++;
    }
  }

  // decreases quantity by 1
  $scope.removeQuantity = function() {
    if($scope.quantity > 1) {
      $scope.quantity--;
    }
  }

}]);
