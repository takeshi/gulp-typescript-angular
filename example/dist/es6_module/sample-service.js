/// <reference path="../../typings/angularjs/angular.d.ts" />
"use strict";
var SampleService = (function () {
    function SampleService($q) {
        this.$q = $q;
    }/*<auto_generate>*/SampleService.$inject = ['$q']; SampleService.$componentName = 'sampleService'/*</auto_generate>*/
    SampleService.prototype.getData = function () {
        return this.$q.when({ data: 'test' });
    };
    return SampleService;
}());/*<auto_generate>*/angular.module('sample').service('sampleService',SampleService);/*</auto_generate>*/
exports.SampleService = SampleService;
