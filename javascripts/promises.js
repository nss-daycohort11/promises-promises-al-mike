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
  ["jquery", "hbs", "bootstrap", "q", "get-books", "get-book-types", "get-book-isbn", "lodash", "filter-books"], 
  function($, Handlebars, bootstrap, q, books, booktypes, isbn, _, filterbooks) {
  
    var typesObject = {};
    var isbnObject = {};

    /*jshint esnext: true */

    booktypes.loadTypes()
      .then(function(typesData) {
        console.log("typesData", typesData);
        typesObject = typesData;
        console.log("typesObject", typesObject);
        return isbn.getISBN();
      })
      .then(function(isbnData) {
        console.log("isbnData", isbnData);
        isbnObject = isbnData;
        console.log("isbnObject", isbnObject);
        return books.loadBooks();
      })
      .then(function(booksData) {
        console.log("booksData", booksData);
        console.log("isbnObject", isbnObject);
        console.log("typesObject", typesObject);

        typesObject = Object.keys( typesObject ).map(key => typesObject[ key ]);
        booksData = Object.keys( booksData ).map(key => booksData[ key ]);
        isbnData = Object.keys( isbnObject ).map(key => isbnObject[ key ]);

        console.log("booksData", booksData);
        console.log("isbnData", isbnData);
        console.log("typesObject", typesObject);

        var isbnbooks = booksData.map(book => {
          console.log("currentBook", book);
          console.log("currentBook.booktype", book.booktype);
          book.isbn = _.find(isbnData, { title:book.title }).isbn;
          console.log("currentBook", book);
          return book;
          }); 

        var newbooks = isbnbooks.map(book => {
          /*console.log("currentBook", book);
          console.log("currentBook.booktype", book.booktype);*/
          book.type = _.find(typesObject, { id:book.booktype }).label;
          /*console.log("currentBook", book);*/
          return book;
          }); 
        console.log("new booksData array", newbooks);

        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ newbooks }));
        });


        $(".all").on("click", function(event) {
          // load all songs from ajax calls
          filterbooks.filterAll(newbooks);
        });


        $(".fiction").on("click", function(event) {
          // load type=fiction songs from ajax calls
          filterbooks.filterFiction(newbooks);
        });


        $(".science").on("click", function(event) {
          //load type=science & technology from ajax calls
          filterbooks.filterScience(newbooks);
        });


      })
      .fail(function(error) {
        console.log("Oh no! Error!");

      });

  }
);
