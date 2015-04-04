var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        return SampleManagerProvider;
    })();
angular.module('sample').provider('sampleManager',['$q',SampleManagerProvider]);
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
