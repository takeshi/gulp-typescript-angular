module sample {
    let angularModule = angular.module('sample');
    export function Controller(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }

    export function Service(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }

    export function Provider(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }

    export function Directive(clazz: any) {
        var args = [];
        args.push.apply(args, clazz.$inject);
        args.push(function() { return new clazz(arguments) });
        angularModule.directive(clazz.$componentName, args);
    }

}
