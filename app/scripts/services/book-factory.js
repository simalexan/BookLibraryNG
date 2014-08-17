/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.factory('bookService', function() {
  var currentOpenedBook = {};
  var books = [];
  return {
    book: currentOpenedBook,
    books: books,
    /**
     * Adding a new book
     * @param {Object} newBook
     */
    addNewBook: function (newBook){
      if(newBook.id){
        this.books.push(newBook);
      } else {
        throw new Error('The book you wanted to create is empty');
      }
    }
  };
});
