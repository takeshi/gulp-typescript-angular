/// <reference path="../../typings/angularjs/angular.d.ts" />
"use strict";
var SampleManagerProvider = (function () {
    function SampleManagerProvider($q) {
        this.$q = $q;
    }/*<auto_generate>*/SampleManagerProvider.$inject = ['$q']; SampleManagerProvider.$componentName = 'sampleManager'/*</auto_generate>*/
    SampleManagerProvider.prototype.$get = function () {
        return new SampleManager(this);
    };
    return SampleManagerProvider;
}());/*<auto_generate>*/angular.module('sample').provider('sampleManager',SampleManagerProvider);/*</auto_generate>*/
exports.SampleManagerProvider = SampleManagerProvider;
var SampleManager = (function () {
    function SampleManager(provider) {
        this.provider = provider;
    }/*<auto_generate>*/SampleManager.$inject = ['provider']; SampleManager.$componentName = 'sampleManager'/*</auto_generate>*/
    return SampleManager;
}());/*<auto_generate>*/angular.module('sample').service('sampleManager',SampleManager);/*</auto_generate>*/
