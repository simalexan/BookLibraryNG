var bookLibApp = angular.module('bookLib', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:BookCtrl, templateUrl:'app/partials/book/list.html'}).
            when('/book/new', {controller:BookCtrl, templateUrl:'app/partials/book/new.html'}).
            when('/book/:bookId', {controller:BookCtrl, templateUrl:'app/partials/book/detail.html'}).
            otherwise({redirectTo:'/'});
    });

function BookCtrl($scope, $location, bookService){
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
}

bookLibApp.factory('bookService', function() {
    var currentOpenedBook = {};
    var books = [];
    return {
        book: currentOpenedBook,
        books: books
    };
});

