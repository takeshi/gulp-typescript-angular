var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }/*<auto_generate>*/SampleManagerProvider.$inject = ['$q'];SampleManagerProvider.$componentName = 'sampleManager'/*</auto_generate>*/
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        SampleManagerProvider = __decorate([sample.Provider], SampleManagerProvider);
        return SampleManagerProvider;
    })();
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
