var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    }());
})(sample || (sample = {}));
