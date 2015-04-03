var sample;
(function (sample) {
    var SampleDirective = (function () {
        function SampleDirective() {
            this.templateUrl = '/sample.html';
            this.scope = {
                test: '='
            };
        }
        return SampleDirective;
    })();
angular.module('sample').directive('sample',[function(){return new SampleDirective(arguments);}]);
})(sample || (sample = {}));
