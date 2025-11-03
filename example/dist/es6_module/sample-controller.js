/// <reference path="../../typings/angularjs/angular.d.ts" />
"use strict";
// ES6 module style - no module wrapper
var SampleController = (function () {
    function SampleController($scope) {
        this.$scope = $scope;
        console.log('SampleController initialized');
    }/*<auto_generate>*/SampleController.$inject = ['$scope']; SampleController.$componentName = 'SampleController'/*</auto_generate>*/
    return SampleController;
}());/*<auto_generate>*/angular.module('sample').controller('SampleController',SampleController);/*</auto_generate>*/
exports.SampleController = SampleController;
