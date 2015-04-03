# gulp-typescript-angular
> automatic register TypeScript classes to [AngularJS](http://angularjs.org/) modules

## Install
Install with [npm](https://npmjs.org/package/gulp-typescript-angular)
```bash
$ npm install gulp-typescript-angular
```

## Usage

### JavaScript
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

## Table of Contents
* [Install](#install)
* [Usage](#usage)
	- [JavaScript](#javascript)

## Example
### Controller
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
