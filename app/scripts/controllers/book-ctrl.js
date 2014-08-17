/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.controller('BookCtrl', function ($scope, $location, BookFactory) {

  $scope.books = BookFactory.books;
  $scope.book = $scope.books[0];
  $scope.newBook = {};
  $scope.addNewBook = function (newBook){
    BookFactory.addNewBook(newBook).then(function (){
      $scope.openPage('/');
    });
  };

  $scope.openPage = function (newPath) {
    $location.path(newPath);
  };
});