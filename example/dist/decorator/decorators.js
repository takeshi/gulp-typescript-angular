var sample;
(function (sample) {
    var angularModule = angular.module('sample');
    function Controller(clazz) {
        angularModule.controller(clazz.$componentName, clazz);
    }
    sample.Controller = Controller;
    function Service(clazz) {
        angularModule.controller(clazz.$componentName, clazz);
    }
    sample.Service = Service;
    function Provider(clazz) {
        angularModule.controller(clazz.$componentName, clazz);
    }
    sample.Provider = Provider;
    function Directive(clazz) {
        var args = [];
        args.push.apply(args, clazz.$inject);
        args.push(function () { return new clazz(arguments); });
        angularModule.directive(clazz.$componentName, args);
    }
    sample.Directive = Directive;
})(sample || (sample = {}));
