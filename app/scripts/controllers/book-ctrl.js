/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.controller('BookCtrl', function ($scope, $location, bookFactory) {

  $scope.books = bookFactory.books;
  $scope.book = $scope.books[0];
  $scope.newBook = {};
  $scope.addNewBook = function (newBook){
    bookFactory.addNewBook(newBook);
  };

  $scope.openPage = function (newPath) {
    $location.path(newPath);
  };
});