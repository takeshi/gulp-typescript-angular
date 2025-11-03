/// <reference path="../../typings/angularjs/angular.d.ts" />

export class SampleManagerProvider {
    constructor(public $q: angular.IQService) {
    }

    $get() {
        return new SampleManager(this);
    }
}

class SampleManager {
    constructor(public provider: SampleManagerProvider) {
    }
}
