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
    var SampleDirective = (function () {
        function SampleDirective($compile) {
            this.$compile = $compile;
            this.restrict = 'A';
            this.templateUrl = '/sample.html';
            this.scope = {
                text: '='
            };
        }/*<auto_generate>*/SampleDirective.$inject = ['$compile']; SampleDirective.$componentName = 'sample'/*</auto_generate>*/
        SampleDirective.prototype.link = function (scope, element, attr) {
        };
        SampleDirective = __decorate([
            sample.Directive
        ], SampleDirective);
        return SampleDirective;
    })();
})(sample || (sample = {}));
