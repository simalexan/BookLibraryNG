/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.factory('BookFactory', function ($q) {
  var currentBook = {};
  var books = [];
  return {
    book: currentBook,
    books: books,
    /**
     * Adding a new book
     * @param {Object} newBook
     */
    addNewBook: function (newBook) {
      var deferred = $q.defer();
      if (newBook.id) {
        this.books.push(newBook);
        deferred.resolve();
      } else {
        deferred.reject();
        throw new Error('The new book you wanted to add is empty');
      }
      return deferred.promise;
    }
  };
});
