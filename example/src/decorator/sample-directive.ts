module sample {

    @sample.Directive
    class SampleDirective {

        restrict = 'A'

        templateUrl = '/sample.html'

        scope = {
            text: '='
        }

        constructor(public $compile: angular.ICompileService) {
        }


        link(scope: angular.IScope, element: JQuery, attr: angular.IAttributes) {

        }

    }

}
