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
        }/*<auto_generate>*/SampleDirective.$inject = ['$compile'];SampleDirective.$componentName = 'sample'/*</auto_generate>*/
        SampleDirective.prototype.link = function (scope, element, attr) {
        };
        return SampleDirective;
    })();/*<auto_generate>*/angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);/*</auto_generate>*/
})(sample || (sample = {}));
