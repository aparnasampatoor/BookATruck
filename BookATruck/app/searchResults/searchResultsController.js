(function () {
    angular.module('app')
        .controller('searchResultsController', searchResultsController);

    searchResultsController.$inject = ['$location', '$http', '$modal'];

    function searchResultsController($location, $http, $modal) {
        var vm = this;
        vm.routes = [];
        vm.isLoading = false;
        vm.truckTypes = [];
        vm.showFilters = false;

        vm.toggleFilter = function() {
            vm.showFilters = !vm.showFilters;
        }
        
        vm.searchRoutes = function (filterForm) {

            if (!filterForm || filterForm.$valid) {
                vm.isLoading = true;
                var search = $location.search();
                $http.get('api/booktruck/SearchRoute?Source=' + search.Source + '&Destination=' + search.Destination + '&SearchDate=' + search.FromDate + '&TruckTypeId=' + vm.filter.truckType.Id + '&loadType=' + vm.filter.loadType
                    + "&VolumeStart=" + vm.filter.volumeStart + "&VolumeEnd=" + vm.filter.volumeEnd + "&WeightStart=" + vm.filter.weightStart + "&WeightEnd=" + vm.filter.weightEnd).then(function(response) {
                    vm.routes = response.data;
                    vm.isLoading = false;
                });
            }
        }

        vm.clearFilter = function () {
            vm.filter = {
                loadType: null,
                volumeStart: null,
                volumeEnd: null,
                weightStart: null,
                weightEnd: null,
                truckType: vm.truckTypes[0] ? vm.truckTypes[0] : ''
            };

        };

        activate();
        
        function activate() {
            vm.clearFilter();
             $http.get('api/booktruck/TruckTypes').then(function (response) {
                vm.truckTypes = response.data;
                vm.filter.truckType = vm.truckTypes[0] ? vm.truckTypes[0] : '';

            });
            vm.searchRoutes();

        }

        
        vm.booktruck = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'app/searchresults/modalContent.html',
                size: 'sm'

            });
        }

        
    }
})();