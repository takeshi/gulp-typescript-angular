var sample;
(function (sample) {
    var SampleController = (function () {
        function SampleController($scope) {
            this.$scope = $scope;
        }
        return SampleController;
    })();
angular.module('sample').controller('sampleController',['$scope',SampleController]);
})(sample || (sample = {}));
