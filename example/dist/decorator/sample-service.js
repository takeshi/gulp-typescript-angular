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
    var SampleService = (function () {
        function SampleService($q) {
            this.$q = $q;
        }/*<auto_generate>*/SampleService.$inject = ['$q']; SampleService.$componentName = 'sampleService'/*</auto_generate>*/
        SampleService = __decorate([
            sample.Service
        ], SampleService);
        return SampleService;
    })();
})(sample || (sample = {}));
