var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var sample;
(function (sample) {
    var SampleComponentController = (function () {
        function SampleComponentController($compile) {
            this.$compile = $compile;
        }/*<auto_generate>*/SampleComponentController.$inject = ['$compile']; SampleComponentController.$componentName = 'SampleComponentController'/*</auto_generate>*/
        SampleComponentController = __decorate([
            sample.Controller
        ], SampleComponentController);
        return SampleComponentController;
    }());
    var SampleComponent = (function () {
        function SampleComponent() {
            this.templateUrl = '/sample.html';
            this.bindings = {
                text: '<'
            };
            this.controller = SampleComponentController;
        }/*<auto_generate>*/SampleComponent.$inject = []; SampleComponent.$componentName = 'sample'/*</auto_generate>*/
        SampleComponent = __decorate([
            sample.Component
        ], SampleComponent);
        return SampleComponent;
    }());
})(sample || (sample = {}));
