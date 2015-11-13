 define(function(require) {
  	var _ = require("lodash");
  	var $ = require("jquery");

 	return {
 		getTypes: function() {
			$.ajax("https://nss-book-store.firebaseio.com/booktypes.json").done(function(types) {
				return types;
			});
		}
	};
});