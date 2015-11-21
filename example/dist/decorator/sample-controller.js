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
    var SampleController = (function () {
        function SampleController($scope) {
            this.$scope = $scope;
        }/*<auto_generate>*/SampleController.$inject = ['$scope']; SampleController.$componentName = 'SampleController'/*</auto_generate>*/
        SampleController = __decorate([
            sample.Controller
        ], SampleController);
        return SampleController;
    })();
})(sample || (sample = {}));
