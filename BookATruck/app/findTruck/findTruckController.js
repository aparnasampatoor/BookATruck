(function() {
    angular.module('app')
        .controller('findTruckController', findTruckController);

    findTruckController.$inject = ['$location', '$q'];

    function findTruckController($location, $q) {
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
            if (q.length < 3) {
                return [];
            }
            return $.getJSON('http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=IN&q=' + q).then(function(results) {
                var cities = [];
                $.each(results, function(index, item) {
                    if (item !== "%s") {
                        var citySplit = item.split(',');
                        cities.push(citySplit[0]);
                    }
                });
                
                return cities;
            });

        }
        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };

    }
})();