(function () {
    angular.module('app')
        .controller('searchResultsController', searchResultsController);

    searchResultsController.$inject = ['$location', '$http', '$modal'];

    function searchResultsController($location, $http, $modal) {
        var vm = this;
        vm.routes = [];
        vm.isLoading = false;
        vm.truckTypes = [];
        
        vm.searchRoutes = function () {
            vm.isLoading = true;
            var search = $location.search();
            $http.get('api/booktruck/SearchRoute?Source=' + search.Source + '&Destination=' + search.Destination + '&SearchDate=' + search.FromDate + '&TruckTypeId=' + vm.filter.truckType.Id + '&loadType=' + vm.filter.loadType).then(function (response) {
                vm.routes = response.data;
                vm.isLoading = false;
            });
        }

        activate();
        
        function activate() {
            
            vm.filter = {
                loadType: null,
                volume: 0,
                weight: 0,
                truckType: {Id : 0 , Name : 'Select Truck Type'}
            };
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

        vm.truckTypeChanged = function (truckType) {
            vm.filter.truckType = truckType;
            vm.searchRoutes();
        };
    }
})();