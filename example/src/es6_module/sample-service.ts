/// <reference path="../../typings/angularjs/angular.d.ts" />

export class SampleService {
    constructor(public $q: angular.IQService) {
    }
    
    getData() {
        return this.$q.when({ data: 'test' });
    }
}
