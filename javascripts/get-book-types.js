define(function(require) {
  var _ = require("lodash");
  var Q = require("q");

  return {
    loadTypes: function(fn) {
      console.log("loading types");
      var deferred = Q.defer();

      $.ajax("https://nss-book-store.firebaseio.com/booktypes.json")
        .done(function(typesData) {
          //success
          console.log("Go you! Success!");
          deferred.resolve(typesData);
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