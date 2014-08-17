var bookLibApp = angular.module('bookLib', ['ngRoute']).
  config(function ($routeProvider) {
    $routeProvider.
      when('/', {controller: 'BookCtrl', templateUrl: 'views/book/list.html'}).
      when('/book/new', {controller: 'BookCtrl', templateUrl: 'views/book/new.html'}).
      when('/book/:bookId', {controller: 'BookCtrl', templateUrl: 'views/book/detail.html'}).
      otherwise({redirectTo: '/'});
  });

