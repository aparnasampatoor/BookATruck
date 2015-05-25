(function() {
    angular.module('app')
        .controller('findTruckController', findTruckController);

    findTruckController.$inject = ['$location', '$q'];

    function findTruckController($location, $q) {
        var vm = this;
        vm.source = '';
        vm.destination = '';
        vm.fromDate = '';
        activate();

        function activate() {
            console.log('test');
        }

        vm.searchTrucks = function() {
            console.log(vm.source);
            console.log(vm.destination);
        }

        vm.getCities = function(q) {

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

    }
})();