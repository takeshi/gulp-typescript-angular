# gulp-typescript-angular
gulp plugin for class-based development in AngularJS with TypeScript.
This make TypeScript classes add [AngularJS](http://angularjs.org/) registration codes.

## Motivation
AngularJS and TypeScript works well with each other.
TypeScript is good langulage for class-based programing.

But TypeScript class codes must have glue codes to work with AngularJS.
This gulp plugin can remove the glue codes by to add generated angularjs code using gulp script.

## Usage

### Install
Install with [npm](https://npmjs.org/package/gulp-typescript-angular)

```
$ npm install gulp-typescript-angular
```

### modify gulpfile.js
add gulp-typescript-angular plugin to gulp pipe after typescript plugin.

```javascript
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
### Options
 - moduleName : AngularJS Module Name

## Example
### Controller
If class name matches <code> /Controller$/</code> or <code>/Ctrl$/</code>, gulp-typescript-angular add controller registration code,<code>angular.module('sample').controller('sampleController',['$scope',SampleController]);</code>,after class declaration.

#### TypeScript
```typescript
module sample {

    class SampleController {

        constructor(public $scope: angular.IScope) {
        }

    }

}
```
#### Compiled JavaScript
```javascript
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

### Service

If class name matches <code> /Service$/</code> or <code>/Manager$/</code>, gulp-typescript-angular add service registration code,<code>angular.module('sample').service('sampleService',['$q',SampleService]);</code>, after class declaration.


#### TypeScript
```typescript
module sample {

    class SampleService {
        constructor(public $q: angular.IQService) {

        }
    }

}

```
#### Compiled JavaScript
```javascript
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

### Provider

If class name matches <code> /Provider$/</code> , gulp-typescript-angular add provider registration code,<code>angular.module('sample').provider('sampleManager',[SampleManagerProvider]);</code>, after class declaration.
If class name start with '$', gulp-typescript-angular don't add the angularjs registration code.


#### TypeScript
```typescript
module sample {

    class SampleManagerProvider {

        $get() {
            return new $SampleManager();
        }

    }

    class $SampleManager {

    }
}


```
#### Compiled JavaScript
```javascript
var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider() {
        }
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager();
        };
        return SampleManagerProvider;
    })();
angular.module('sample').provider('sampleManager',[SampleManagerProvider]);
    var $SampleManager = (function () {
        function $SampleManager() {
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
```

### Directive
If class name matches /Directive$/, gulp-typescript-angular add directive instantination function,<code>angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);</code>, after class declaration.
Using directive class instance , Directive parameter is directive class's field variable.

#### TypeScript
```typescript
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
```
#### Compiled JavaScript
```javascript
var sample;
(function (sample) {
    var SampleDirective = (function () {
        function SampleDirective($compile) {
            this.$compile = $compile;
            this.restrict = 'A';
            this.templateUrl = '/sample.html';
            this.scope = {
                test: '='
            };
        }
        SampleDirective.prototype.link = function (scope, element) {
        };
        return SampleDirective;
    })();
angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);
})(sample || (sample = {}));
```
