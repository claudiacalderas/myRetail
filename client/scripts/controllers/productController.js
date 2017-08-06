myRetailApp.controller('ProductController', ['$scope','$http', 'DataService',
                      function($scope, $http, DataService) {

  // Number of visible images for carousel
  NUM_VISIBLE_IMAGES = 3;

  // Array of alternate images for carousel
  $scope.slides = [];

  // Calls Factory function that gets catalog information from the database
  DataService.getCatalogItem().then(function(data){
    // Using only one item in DB loaded from JSON file for this case study
    $scope.catalogItem = data.data[0].CatalogEntryView[0];
    console.log("CATALOG ITEM:", $scope.catalogItem);
    // build array of alternate images for carousel
    buildArrayOfImages();
    console.log('$scope.slides', $scope.slides);
  })
  .catch(function(response){
      console.log(response.status);
  });

  // CAROUSEL

  // build array of images
  function buildArrayOfImages() {
    for (var i = 0; i < $scope.catalogItem.Images[0].AlternateImages.length; i++) {
      var imageObject = {};
      imageObject.image = $scope.catalogItem.Images[0].AlternateImages[i].image;
      if (i < NUM_VISIBLE_IMAGES) {
        imageObject.i = i;
        imageObject.visible = true;
      } else {
        imageObject.i = i;
        imageObject.visible = false;
      }
      $scope.slides.push(imageObject);
    }
  }

  // slice index
  var slideIndex = 0;

  // moves slides back or forth depending on parameter n (+1, -1)
  $scope.moveSlides = function(n) {
    if (n == 1) {
      $scope.slides[slideIndex].visible = false;

      if ((slideIndex + NUM_VISIBLE_IMAGES + n) >= $scope.slides.length) {
        slideIndex = 0;
      } else if ((slideIndex + n) <= 0) {
        slideIndex = $scope.slides.length - 1;
      } else {
        slideIndex += n;
      }

      $scope.slides[slideIndex + NUM_VISIBLE_IMAGES].visible = true;
    }

  }

}]);
