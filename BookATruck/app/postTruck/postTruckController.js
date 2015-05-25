(function () {
    angular.module('app')
        .controller('postTruckController', postTruckController);

    postTruckController.$inject = ['$location', '$q'];

    function postTruckController($location, $q) {
        var vm = this;
        
        activate();

        function activate() {
            $q.all([
                
            ]).then(function () {
                vm.isDataLoaded = true;
            });
        }

        
    }
})();