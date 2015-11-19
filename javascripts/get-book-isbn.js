define(function(require) {
  var _ = require("lodash");
  var Q = require("q");
  var $ = require("jquery");

  return {
  	getISBN: function() {
      console.log("loading isbn");
      var deferred = Q.defer();

      $.ajax("./data/isbns.json")
        .done(function(isbnData) {
          //success
          console.log("Go you! Success!");
          deferred.resolve(isbnData);
        })
        .fail(function(xhr, status, error) {
          //failure
          console.log("Sorry, AJAX failed!");
          deferred.reject(error);
        });
      return deferred.promise;
    }
  };
});