(function() {
    angular.module('app')
        .controller('findTruckController', findTruckController);

    findTruckController.$inject = ['$location', '$q', '$http'];

    function findTruckController($location, $q, $http) {
        var vm = this;
        vm.source = '';
        vm.destination = '';
        vm.fromDate=null;
        activate();

        function activate() {
            console.log('test');
        }

        vm.searchTrucks = function() {
            console.log(vm.source);
            console.log(vm.destination);
            console.log(vm.fromDate);

            $location.url('/searchResults?Source=' + vm.source + '&Destination=' + vm.destination + '&FromDate=' + vm.fromDate.getTime());
        }

        vm.getCities = function(q) {

            return $http.get("api/Lookups/Cities/" + q).then(function(response) {
                return response.data;
            });

        };

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };

    }
})();