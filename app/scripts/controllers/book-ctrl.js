/**
 * Created by simalexan on 8/17/14.
 */
bookLibApp.controller('BookCtrl', function ($scope, $location, bookService){

  $scope.books = bookService.books;
  $scope.book = $scope.books[0];
  $scope.newBook = {};
  $scope.addNewBook = function() {
    // first we validate the book
    if($scope.newBook.id){
      // then we push it to the service
      bookService.books.push($scope.newBook);
      // then open the index
      $scope.openPage('/');
    } else {
      alert("ERROR: bookIsEmpty");
    }
  };

  $scope.openPage = function(newPath) {
    $location.path(newPath);
  };
});