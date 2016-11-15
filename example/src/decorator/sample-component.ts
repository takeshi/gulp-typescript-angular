module sample {

    @sample.Controller
    class SampleComponentController {
        constructor(public $compile:angular.ICompileService){
        }
    }

    @sample.Component
    class SampleComponent implements angular.IComponentOptions {

        templateUrl = '/sample.html'

        bindings: {[id:string]:string} = {
            text: '<'
        }

	controller = SampleComponentController

    }

}
