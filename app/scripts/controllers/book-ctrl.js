/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.controller('BookCtrl', function ($scope, $location, bookService){

  $scope.books = bookService.books;
  $scope.book = $scope.books[0];
  $scope.newBook = {};
  $scope.addNewBook = bookService.addNewBook;

  $scope.openPage = function(newPath) {
    $location.path(newPath);
  };
});