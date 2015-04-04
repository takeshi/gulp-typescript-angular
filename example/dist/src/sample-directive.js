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
        }
        SampleDirective.prototype.link = function (scope, element, attr) {
        };
        return SampleDirective;
    })();
angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);
})(sample || (sample = {}));
