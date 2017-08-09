myRetailApp.factory('Utilities', [function() {

  // date formatting function.
  // receives a UTC date string and returns a formatted date "Month day, year"
  function getDate(dateString) {
    if (dateString) {
      date = new Date(dateString);
      var day = date.getDate();
      var monthNumber = date.getMonth() + 1; //Months are zero based
      var year = date.getFullYear();
      var monthText;
      switch (monthNumber) {
        case 1: month = "January"; break;
        case 2: month = "February"; break;
        case 3: month = "March"; break;
        case 4: month = "April"; break;
        case 5: month = "May"; break;
        case 6: month = "June"; break;
        case 7: month = "July"; break;
        case 8: month = "August"; break;
        case 9: month = "September"; break;
        case 10: month = "October"; break;
        case 11: month = "November"; break;
        case 12: month = "December"; break;
        default: month = "";
      }
      var formattedDate = month + " " + day + ", " + year;
      return formattedDate;
    }
  }

  return {
    getDate : getDate
  };

}]);
