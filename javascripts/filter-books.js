define(function(require) {
  var _ = require("lodash");
  var Q = require("q");
  var promises = require("promises");

  return {
  	filterAll: function (newbooks) {
  		// reload all data
  		require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ newbooks }));
        });
  	},
  	filterFiction: function (newbooks) {
  		var fictionbooks = [];
  		// target fiction books and push to array
  		_.forEach(newbooks, function(currentbook) {
  			console.log("currentbook---------------", currentbook);
  			if (currentbook.type === "Fiction") {
  				fictionbooks.push(currentbook);
  			}
  		});
  		// rename array to match handlebars template
  		var newbooks = fictionbooks;
  		// run through handlebars
		require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ newbooks }));
        });
  	},
  	filterScience: function (newbooks) {
  		var sciencebooks = [];
  		// target science books and push to array
  		_.forEach(newbooks, function(currentbook) {
  			if (currentbook.type === "Science & Technology") {
  				sciencebooks.push(currentbook);
  			}
  		})
  		// rename array to match handlebars template
  		var newbooks = sciencebooks;
  		// run through handlebars
		require(['hbs!../templates/books'], function(bookTpl) {
	      $("#bookList").html(bookTpl({ newbooks }));
	    });
  	}
  };
});