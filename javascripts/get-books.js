define(function(require) {
  var _ = require("lodash");
  var $ = require("jquery");
  var Q = require("q");

  return {
    loadBooks: function() {
      // console.log("loading books");
      var deferred = Q.defer();

      $.ajax({
        url: "https://nss-book-store.firebaseio.com/books.json",
      }).done(function(booksData) {
          console.log("got books");
          console.log("booksData -", booksData);
          deferred.resolve(booksData);
        })
        .fail(function(xhr, status, error) {
          // console.log("Sorry, AJAX failed!");
          deferred.reject(error);
      });
      return deferred.promise;

    }
  };
      
});
