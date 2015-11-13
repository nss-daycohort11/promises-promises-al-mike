define(function(require) {
  var _ = require("lodash");
  var $ = require("jquery");
  var Q = require("q");

  
  return{
    getBooks: function() {  
      var deferred = Q.defer();
      $.ajax("https://nss-book-store.firebaseio.com/books.json")
        .done(function(booksjson) {
          console.log("books json", booksjson);
          deferred.resolve(booksjson);
        })
        .fail(function(xhr, status, error) {
      // Since the call failed, we have to reject the promise
          deferred.reject(error);
          console.log("error", error);
        });
        return deferred.promise;
    }
  };
      
});