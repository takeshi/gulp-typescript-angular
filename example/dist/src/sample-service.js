var sample;
(function (sample) {
    var SampleService = (function () {
        function SampleService($q) {
            this.$q = $q;
        }
        return SampleService;
    })();
angular.module('sample').service('sampleService',['$q',SampleService]);
})(sample || (sample = {}));
