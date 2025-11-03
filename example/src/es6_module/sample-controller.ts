/// <reference path="../../typings/angularjs/angular.d.ts" />

// ES6 module style - no module wrapper
export class SampleController {
    constructor(public $scope: angular.IScope) {
        console.log('SampleController initialized');
    }
}
