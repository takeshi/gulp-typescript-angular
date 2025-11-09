/// <reference path="../../typings/angularjs/angular.d.ts" />
"use strict";
var SampleDirective = (function () {
    function SampleDirective($compile) {
        this.$compile = $compile;
        this.restrict = 'A';
        this.templateUrl = '/sample.html';
        this.scope = {
            text: '='
        };
    }/*<auto_generate>*/SampleDirective.$inject = ['$compile']; SampleDirective.$componentName = 'sample'/*</auto_generate>*/
    SampleDirective.prototype.link = function (scope, element, attr) {
        // directive logic
    };
    return SampleDirective;
}());/*<auto_generate>*/angular.module('sample').directive('sample',['$compile',function(){return new (Function.prototype.bind.apply(SampleDirective,[null].concat(Array.prototype.slice.call(arguments))));}]);/*</auto_generate>*/
exports.SampleDirective = SampleDirective;
