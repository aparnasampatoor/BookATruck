(function () {
    angular.module('app')
        .controller('postTruckController', postTruckController);

    postTruckController.$inject = ['$location', '$q', '$http', '$timeout'];

    function postTruckController($location, $q, $http, $timeout) {
        var vm = this;
        vm.source = '';
        vm.destination = '';
        vm.fromDate = null;
        vm.posted = false;
        vm.loadType = '';
        vm.volume = '';
        vm.weight = '';
        vm.truckType = '';
        vm.handlingRequirements = '';

        activate();

        function activate() {
        }

        vm.postTruck = function () {
            console.log(vm.source);
            console.log(vm.destination);
            var route = { 'Source': vm.source, 'Destination': vm.destination, 'FromDate': vm.fromDate };
            $http.post('api/booktruck/Route', route).then(function () {
                vm.source = '';
                vm.destination = '';
                vm.fromDate = null;
                vm.posted = true;

                $timeout(function() {
                    vm.posted = false;
                }, 3000);
            });
        }

        vm.getCities = function (q) {

            return $.getJSON('http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=IN&q=' + q).then(function (results) {
                var cities = [];
                $.each(results, function (index, item) {
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