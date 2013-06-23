var bookLibApp = angular.module('bookLib', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:BookCtrl, templateUrl:'bookDetail.html'}).
            when('/new', {controller:BookCtrl, templateUrl:'addBook.html'}).
            otherwise({redirectTo:'/'});
    });

function BookCtrl($scope, $location, bookService){
    console.log("Book controller initalized");
    $scope.books = bookService.books;
    console.log(JSON.stringify($scope.books));
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
        console.log(JSON.stringify($scope.books));
        console.log("about to open a new path");
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

