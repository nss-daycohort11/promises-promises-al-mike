define(function(require) {
  var _ = require("lodash");
  var $ = require("jquery");
  var Q = require("q");

  return {
		getTypes: function(){  
			var deferred = Q.defer();
			$.ajax("https://nss-book-store.firebaseio.com/booktypes.json")
				.done(function(jsontypes) {
				  console.log("jsontypes", jsontypes);
				  // return jsontypes;
				  deferred.resolve(jsontypes);
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