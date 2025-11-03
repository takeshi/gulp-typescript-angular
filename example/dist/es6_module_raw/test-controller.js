"use strict";
// ES6 module style - no module wrapper
var TestController = (function () {
    function TestController($scope) {
        this.$scope = $scope;
    }
    return TestController;
}());
exports.TestController = TestController;
