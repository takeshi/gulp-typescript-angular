var sample;
(function (sample) {
    var SampleService = (function () {
        function SampleService($q) {
            this.$q = $q;
        }
        return SampleService;
    }());/*<auto_generate>*/angular.module('sample').service('sampleService',['$q',function(){return new (Function.prototype.bind.apply(SampleService,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
})(sample || (sample = {}));
