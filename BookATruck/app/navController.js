(function() {
    angular.module('app')
        .controller('navController', navController);

    navController.$inject = ['$location', '$http', '$scope'];

    function navController($location, $http, $scope) {
        $scope.loggedIn = loggedIn == 1 ? true : false;

        OAuth.initialize('jTgRorpWj4znaClTXsJvU9jAkHs');

        $scope.FacebookLogin = function () {
            if ($scope.loggedIn == false) {
                OAuth.popup('facebook')
                    .done(function(result) {
                        result.me(['firstname', 'lastname', 'email'])
                            .done(function(response) {
                                console.log('Firstname: ', response.firstname);
                                var cookieVal = {
                                    FirstName: response.firstName,
                                    LastName: response.lastName,
                                    Email: response.email
                                };
                                $scope.loggedIn = true;
                                $.cookie('BookTruck', JSON.stringify(cookieVal));
                                $scope.$apply();
                            })
                            .fail(function(err) {
                                //handle error with err
                            });
                    })
                    .fail(function(err) {
                        //handle error with err
                        console.log(err);
                    });
            }
        }

        $scope.Logout = function () {
            $.cookie("BookTruck", null, { path: '/' });
            $scope.loggedIn = false;
        }

        $scope.$watch(function() {
            return $scope.loggedIn;
        }, function () {
            console.log($location.path());
            if ($location.path() == '/postTruck') {
                $location.path('/');
            }
        });

        $scope.GoogleLogin = function () {
            if ($scope.loggedIn == false) {
                OAuth.popup('google').done(function(result) {
                        result.me(['firstname', 'lastname', 'email'])
                            .done(function(response) {
                                console.log('Firstname: ', response.firstname);
                                var cookieVal = {
                                    FirstName: response.firstName,
                                    LastName: response.lastName,
                                    Email: response.email
                                };
                                $scope.loggedIn = true;
                                $.cookie('BookTruck', JSON.stringify(cookieVal));
                                $scope.$apply();
                            })
                            .fail(function(err) {
                                //handle error with err
                            });
                    })
                    .fail(function(err) {
                        //handle error with err
                        console.log(err);
                    });
            }
        }

    }

})
();