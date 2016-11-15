var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        return SampleManagerProvider;
    }());/*<auto_generate>*/angular.module('sample').provider('sampleManager',['$q',function(){return new (Function.prototype.bind.apply(SampleManagerProvider,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    }());
})(sample || (sample = {}));
