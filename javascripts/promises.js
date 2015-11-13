requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "q", "get-books", "get-book-types", "lodash"], 
  function($, Handlebars, bootstrap, q, books, booktypes, _) {
  
    var typesObject = {};

    /*jshint esnext: true */

    booktypes.loadTypes()
      .then(function(typesData) {
        console.log("typesData", typesData);
        typesObject = typesData;
        console.log("typesObject", typesObject);
        return books.loadBooks();
      })
      .then(function(booksData) {
        console.log("booksData", booksData);

        typesObject = Object.keys( typesObject ).map(key => typesObject[ key ]);
        booksData = Object.keys( booksData ).map(key => booksData[ key ]);

        var newbooks = booksData.map(book => {
          console.log("currentBook", book);
          console.log("currentBook.booktype", book.booktype);
          book.type = _.find(typesObject, { id:book.booktype }).label;
          console.log("currentBook", book);
          return book;
          }); 
        console.log("new booksData array", newbooks);

        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ newbooks }));
        });
      })
      .fail(function(error) {
        console.log("Oh no! Error!");

      });

  }
);
