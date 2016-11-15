var sample;
(function (sample) {
    var SampleComponentController = (function () {
        function SampleComponentController($compile) {
            this.$compile = $compile;
        }
        return SampleComponentController;
    }());/*<auto_generate>*/angular.module('sample').controller('SampleComponentController',['$compile',function(){return new (Function.prototype.bind.apply(SampleComponentController,[null].concat(Array.prototype.slice.apply(arguments))));}]);/*</auto_generate>*/
    var SampleComponent = (function () {
        function SampleComponent() {
            this.templateUrl = '/sample.html';
            this.bindings = {
                text: '<'
            };
            this.controller = SampleComponentController;
        }
        return SampleComponent;
    }());/*<auto_generate>*/angular.module('sample').component('sample',new SampleComponent());/*</auto_generate>*/
})(sample || (sample = {}));
