(function () {
    angular.module('app')
        .controller('postTruckController', postTruckController);

    postTruckController.$inject = ['$location', '$q', '$http', '$timeout'];

    function postTruckController($location, $q, $http, $timeout) {
        var vm = this;
        vm.posted = false;
        vm.truckTypes = [];
        vm.today = new Date();

        activate();

        function activate() {
            initializeRoute();
            $http.get('api/booktruck/TruckTypes').then(function (response) {
                vm.truckTypes = response.data;
                vm.route.truckType = vm.truckTypes[0];
                vm.route.truckTypeId = vm.route.truckType.Id;
                });
        }

        function initializeRoute() {
            vm.route = {
                source: '',
                destination: '',
                fromDate: null,
                loadType: '',
                volume: 0,
                weight: 0,
                truckType: vm.truckTypes[0] ? vm.truckTypes[0] : { Id: 0, Name: 'Select Truck Type' },
                truckTypeId: 0,
                handlingRequirements: ''
            };
        }

        vm.postTruck = function (postTruckForm) {
            if (postTruckForm.$valid) {
                $http.post('api/booktruck/Route', vm.route).then(function() {
                    initializeRoute();

                    vm.posted = true;

                    $timeout(function() {
                        vm.posted = false;
                    }, 3000);
                });
            }
        }

        vm.truckTypeChanged = function() {
            vm.route.truckTypeId = vm.route.truckType.Id;
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