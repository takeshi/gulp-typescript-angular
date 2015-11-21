var sample;
(function (sample) {
    var SampleService = (function () {
        function SampleService($q) {
            this.$q = $q;
        }/*<auto_generate>*/SampleService.$inject = ['$q']; SampleService.$componentName = 'sampleService'/*</auto_generate>*/
        return SampleService;
    })();/*<auto_generate>*/angular.module('sample').service('sampleService',SampleService);/*</auto_generate>*/
})(sample || (sample = {}));
