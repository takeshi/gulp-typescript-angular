module sample {

    class AbstractDirective{
        
    }

    class SampleDirective extends AbstractDirective {

        restrict = 'A'

        templateUrl = '/sample.html'

        scope = {
            text: '='
        }

        constructor(public $compile:angular.ICompileService){
            super();
        }


        link (scope:angular.IScope, element:JQuery,attr:angular.IAttributes) {

        }

    }

}
