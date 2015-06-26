(function () {
    angular.module('app')
        .controller('postTruckController', postTruckController);

    postTruckController.$inject = ['$location', '$q', '$http', '$timeout'];

    function postTruckController($location, $q, $http, $timeout) {
        var vm = this;
        vm.posted = false;
        vm.truckTypes = [];

        activate();

        function activate() {
            initializeRoute();
            $http.get('api/booktruck/TruckTypes').then(function (response) {
                vm.truckTypes = response.data;
                vm.route.truckType = vm.truckTypes[0];
                vm.route.truckTypeId = vm.truckTypes.Id;
                });
        }

        function initializeRoute() {
            vm.route = {
                source: '',
                destination: '',
                fromDate: null,
                loadType: '',
                volume: '',
                weight: '',
                truckType: vm.truckTypes[0] ? vm.truckTypes[0] : { Id: 0, Name: 'Select Truck Type' },
                truckTypeId: 0,
                handlingRequirements: ''
            };
        }

        vm.postTruck = function () {
            $http.post('api/booktruck/Route', vm.route).then(function () {
                initializeRoute();

                vm.posted = true;

                $timeout(function() {
                    vm.posted = false;
                }, 3000);
            });
        }

        vm.truckTypeChanged = function(truckType) {
            vm.route.truckType = truckType;
            vm.route.truckTypeId = vm.route.truckType.Id;
        };

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