var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    }());
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    }());
})(sample || (sample = {}));
