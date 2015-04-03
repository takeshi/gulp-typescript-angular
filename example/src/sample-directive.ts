module sample {

    class SampleDirective {
        restrict = 'A'
        templateUrl = '/sample.html'
        scope = {
            test: '='
        }
        constructor(public $compile:angular.ICompileService){
        }

        link (scope:angular.IScope, element:JQuery) {

        }

    }

}
