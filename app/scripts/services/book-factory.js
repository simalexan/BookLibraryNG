/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.factory('bookFactory', function () {
  var currentOpenedBook = {};
  var books = [];
  return {
    book: currentOpenedBook,
    books: books,
    /**
     * Adding a new book
     * @param {Object} newBook
     */
    addNewBook: function (newBook) {
      if (newBook.id) {
        this.books.push(newBook);
      } else {
        throw new Error('The new book you wanted to add is empty');
      }
    }
  };
});
