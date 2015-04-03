var sample;
(function (sample) {
    var SampleCtrl = (function () {
        function SampleCtrl($scope) {
            this.$scope = $scope;
        }
        return SampleCtrl;
    })();
angular.module('sample').controller('sampleCtrl',['$scope',SampleCtrl]);
})(sample || (sample = {}));
