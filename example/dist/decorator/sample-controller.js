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
    var SampleController = (function () {
        function SampleController($scope) {
            this.$scope = $scope;
        }/*<auto_generate>*/SampleController.$inject = ['$scope'];SampleController.$componentName = 'SampleController'/*</auto_generate>*/
        SampleController = __decorate([sample.Controller], SampleController);
        return SampleController;
    })();
})(sample || (sample = {}));
