(function angularConfig() {
    angular.module('app')
    .config(config);

    config.$inject = [
        '$routeProvider'
    ];
    function config($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: '/app/findTruck/findtruck.html',
                controller: 'findTruckController',
                controllerAs: 'vm'
            })
            .when('/postTruck', {
                templateUrl: '/app/postTruck/postTruck.html',
                controller: 'postTruckController',
                controllerAs: 'vm'
            })
            .when('/searchResults', {
                templateUrl: '/app/searchResults/searchResults.html',
                controller: 'searchResultsController',
                controllerAs: 'vm'
            });
        //.when('/measureSelection/recommendMeasures', {
        //    templateUrl: '/app/measureSelection/views/recommendMeasures.html',
        //    controller: 'MeasureSelectionController'
        //})
        //.when('/measureSelection/searchMeasures', {
        //    templateUrl: '/app/measureSelection/views/searchMeasures.html',
        //    controller: 'MeasureSelectionController'
        //});
    }

})();