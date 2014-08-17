/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.factory('bookService', function() {
  var currentOpenedBook = {};
  var books = [];
  return {
    book: currentOpenedBook,
    books: books
  };
});
