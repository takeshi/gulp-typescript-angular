module sample {

    class SampleManagerProvider {

        $get() {
            return new $SampleManager();
        }

    }

    class $SampleManager {

    }
}
