var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider() {
        }
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager();
        };
        return SampleManagerProvider;
    })();
angular.module('sample').provider('sampleManager',[SampleManagerProvider]);
    var $SampleManager = (function () {
        function $SampleManager() {
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
