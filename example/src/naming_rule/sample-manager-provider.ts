module sample {

    class SampleManagerProvider {

        constructor($q:angular.IQService){
        }

        $get() {
            return new $SampleManager(this);
        }

    }

    class $SampleManager {
        constructor(public provider:SampleManagerProvider){
        }
    }
}
