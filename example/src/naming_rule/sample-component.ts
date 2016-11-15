module sample {

    class SampleComponentController {
        constructor(public $compile:angular.ICompileService){
        }
    }

    class SampleComponent implements angular.IComponentOptions {

        templateUrl = '/sample.html'

        bindings: {[id:string]:string} = {
            text: '<'
        }

	controller = SampleComponentController

    }

}
