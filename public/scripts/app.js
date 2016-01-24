var app = angular.module('authSampleApp', ['ngRoute', 'satellizer']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'templates/home.html'
    	})
    	.when('/signup', {
    		templateUrl: 'templates/signup.html',
        controller: 'AuthCtrl'
    	})
    	.when('/login', {
    		templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
    	})
      .when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

app.controller('MainCtrl', ['$scope', '$auth', '$http', '$location',
	function ($scope, $auth, $http, $location) {
    $scope.isAuthenticated = function() {
      // send GET request to '/api/me'

        // if response.data comes back, set $scope.currentUser = response.data

        // otherwise remove token (https://github.com/sahat/satellizer#authremovetoken)
    };

    $scope.isAuthenticated();

    $scope.logout = function() {
      // logout (https://github.com/sahat/satellizer#authlogout)

        // remove token

        // set $scope.currentUser = null

        // redirect to '/'
    };
  }]
);

app.controller('AuthCtrl', ['$scope', '$auth', '$location',
  function ($scope, $auth, $location) {
    // if $scope.currentUser, redirect to '/profile'

    // clear sign up / login forms

    $scope.signup = function() {
      // signup (https://github.com/sahat/satellizer#authsignupuser-options)

        // set token (https://github.com/sahat/satellizer#authsettokentoken)

        // call $scope.isAuthenticated to set $scope.currentUser

        // clear sign up form

        // redirect to '/profile'
    };

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function (response) {
          $auth.setToken(response.data.token);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/profile');
        }, function (error) {
          console.error(error);
        });
    };
  }]
);

app.controller('ProfileCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	  if (!$scope.currentUser) {
	  	$location.path('/login');
	  }
}]);