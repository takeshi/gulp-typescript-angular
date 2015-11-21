var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }/*<auto_generate>*/SampleManagerProvider.$inject = ['$q']; SampleManagerProvider.$componentName = 'sampleManager'/*</auto_generate>*/
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        SampleManagerProvider = __decorate([
            sample.Provider
        ], SampleManagerProvider);
        return SampleManagerProvider;
    })();
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
