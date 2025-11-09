/// <reference path="../../typings/angularjs/angular.d.ts" />

export class SampleDirective {
    restrict = 'A'
    templateUrl = '/sample.html'
    scope = {
        text: '='
    }

    constructor(public $compile: angular.ICompileService) {
    }

    link(scope: angular.IScope, element: JQuery, attr: angular.IAttributes) {
        // directive logic
    }
}
