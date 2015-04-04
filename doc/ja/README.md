# TypescriptのクラスをGulpを使ってAngularJSに自動登録する
[前回の「Typescriptで書いたAngularJSのControllerをgulpで自動登録する」](http://qiita.com/takeshi@github/items/31f6dfdb2bcbf236bc6e)を汎用化 & gulpのプラグイン化しました。Controller だけでなく、Service や Provider, Directive も TypeScript のクラスとして作成すると、AngularJSのモジュールに自動登録することができます。

## npm パッケージ
[gulp-typescript-angular](https://www.npmjs.com/package/gulp-typescript-angular)

## 使い方
npm で gulp-typescript-angularをインストールします。

```bash:インストール
npm install gulp-typescript-angular --save-dev
```
gulp-typescript-angularをgulpのスクリプトに仕込みます。

```js:gulpfile.js
var gulp = require('gulp');

var typescript = require('gulp-typescript');
var typescriptAngular = require('gulp-typescript-angular');


gulp.task('scripts', function () {
  return gulp.src('./**/*.ts')
    .pipe(typescript())
    .pipe(typescriptAngular({
      moduleName:'sample'
    }))
    .pipe(gulp.dest('./dist'));
});
```

## サンプルコードによる説明
### コントローラーの場合
TypeScriptの<code>/Controller$/</code>または<code>/Ctrl$/</code>にマッチするクラスがあると、自動的に<code>angular.module('sample').controller('sampleController',['$scope',SampleController]);</code>が追加されて、Angularのモジュールに登録されます。

```ts:sample-controller.ts
module sample {

    class SampleController {

        constructor(public $scope: angular.IScope) {
        }

    }

}
```

```js:コンパイル後のJavaScript
var sample;
(function (sample) {
    var SampleController = (function () {
        function SampleController($scope) {
            this.$scope = $scope;
        }
        return SampleController;
    })();
angular.module('sample').controller('sampleController',['$scope',SampleController]);
})(sample || (sample = {}));
```
### サービスの場合
サービスの場合もコントローラーの場合と同じように、<code>/Service$/</code>または<code>/Manager$/</code>にマッチするクラスを見つけると、<code>angular.module('sample').service('sampleService',['$q',SampleService]);</code> が追加されます。

```ts:sample-service.ts
module sample {

    class SampleService {
        constructor(public $q: angular.IQService) {

        }
    }

}
```

```js:コンパイル後のJavaScript
var sample;
(function (sample) {
    var SampleService = (function () {
        function SampleService($q) {
            this.$q = $q;
        }
        return SampleService;
    })();
angular.module('sample').service('sampleService',['$q',SampleService]);
})(sample || (sample = {}));
```

### プロバイダーの場合
プロバイダーの場合はProviderのクラスと$getで取得できるクラスを作る。プロバイダーは、<code>/Provider$/</code>にマッチしたクラスを見つけると<code>angular.module('sample').provider('sampleManager',['$q',SampleManagerProvider]);</code>が追加される。
$getで取得できるクラス は、Angularのモジュールに登録してはいけないので、$から始まっているクラス(<code>/^\$/</code>にマッチするクラス)は登録しないことで重複登録を回避する。

``` ts:service-manager-provider.ts
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
```

```js:コンパイル後のJavaScript
var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        return SampleManagerProvider;
    })();
angular.module('sample').provider('sampleManager',['$q',SampleManagerProvider]);
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
```

### ディレクティブの場合
ディレクティブの場合は、<code>/Directive$/</code>にマッチするクラスを見つけたら自動的に、<code>angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);</code> を追加するようにしました。
クラスのインスタンスを返す関数をDirectiveに登録することで、Directiveのパラメーターは、下記のコードのようにクラスのフィールドとして宣言することで対応させることができます。

```ts:sample-directive.ts
module sample {

    class SampleDirective {

        restrict = 'A'

        templateUrl = '/sample.html'

        scope = {
            text: '='
        }

        constructor(public $compile:angular.ICompileService){
        }


        link (scope:angular.IScope, element:JQuery,attr:angular.IAttributes) {

        }

    }

}
```

```コンパイル後のJavaScript
var sample;
(function (sample) {
    var SampleDirective = (function () {
        function SampleDirective($compile) {
            this.$compile = $compile;
            this.restrict = 'A';
            this.templateUrl = '/sample.html';
            this.scope = {
                text: '='
            };
        }
        SampleDirective.prototype.link = function (scope, element, attr) {
        };
        return SampleDirective;
    })();
angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);
})(sample || (sample = {}));
```
