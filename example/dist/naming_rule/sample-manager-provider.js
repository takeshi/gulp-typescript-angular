var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }/*<auto_generate>*/SampleManagerProvider.$inject = ['$q']; SampleManagerProvider.$componentName = 'sampleManager'/*</auto_generate>*/
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        return SampleManagerProvider;
    })();/*<auto_generate>*/angular.module('sample').provider('sampleManager',SampleManagerProvider);/*</auto_generate>*/
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
