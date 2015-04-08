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

## 1.Decorator Mode (TypeScript ~1.5)

Decorator,which is new feature of TypeScript 1.5, is called  after class declartion. It can remove glue codes to register angular component. But it can't handle paramters. so gulp-typescript-angular add $inject Property Annotation to annotated-classes.

### 1.1 create decorator functions
Create 4 decoratar functions (Controller,Service,Provider,Decorator) to register angular component.

```typescript
module sample {
    let angularModule = angular.module('sample');
    export function Controller(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }

    export function Service(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }

    export function Provider(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }

    export function Directive(clazz: any) {
        var args = [];
        args.push.apply(args, clazz.$inject);
        args.push(function() { return new clazz(arguments) });
        angularModule.directive(clazz.$componentName, args);
    }

}
```
### 1.2 modify gulpfile.js
Add gulp-typescript-angular plugin to gulp pipe after typescript plugin. And modify decoratorModuleName option to your angular module name.

```javascript
var gulp = require('gulp');

var typescript = require('gulp-typescript');
var typescriptAngular = require('gulp-typescript-angular');

gulp.task('scripts', function () {
  return gulp.src('./**/*.ts')
    .pipe(typescript())
    .pipe(typescriptAngular({
      decoratorModuleName:'sample'
    }))
    .pipe(gulp.dest('./dist'));
});
```
### Options
 - decoratorModuleName : Decorator Module Name

## 1.3 Examples
### 1.3.1 Controller
If class is annotated <code> @sample.Controller</code>, gulp-typescript-angular add $inject parameter annotation code,<code>SampleController.$inject = ['$scope'];SampleController.$componentName = 'SampleController'</code>,after class constructor declaration.

#### TypeScript
```typescript
module sample {

    @sample.Controller
    class SampleController {

        constructor(public $scope: angular.IScope) {
        }

    }

}
```
#### Compiled JavaScript
```javascript
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var sample;
(function (sample) {
    var SampleController = (function () {
        function SampleController($scope) {
            this.$scope = $scope;
        }/*<auto_generate>*/SampleController.$inject = ['$scope'];SampleController.$componentName = 'SampleController'/*</auto_generate>*/
        SampleController = __decorate([sample.Controller], SampleController);
        return SampleController;
    })();
})(sample || (sample = {}));

```

### 1.3.2 Service
If class is annotated <code> @sample.Service</code>, gulp-typescript-angular add $inject parameter annotation code,<code>SampleService.$inject = ['$q'];SampleService.$componentName = 'sampleService'</code>,after class constructor declaration.

#### TypeScript
```typescript
module sample {

    @sample.Service
    class SampleService {
        constructor(public $q: angular.IQService) {
        }
    }

}
```
#### Compiled JavaScript
```javascript
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var sample;
(function (sample) {
    var SampleService = (function () {
        function SampleService($q) {
            this.$q = $q;
        }/*<auto_generate>*/SampleService.$inject = ['$q'];SampleService.$componentName = 'sampleService'/*</auto_generate>*/
        SampleService = __decorate([sample.Service], SampleService);
        return SampleService;
    })();
})(sample || (sample = {}));


```

### 1.3.3 Provider
If class is annonated by <code> @sample.Provider</code> , gulp-typescript-angular add $inject parameter annotation code,<code>/*<auto_generate>*/SampleManagerProvider.$inject = ['$q'];SampleManagerProvider.$componentName = 'sampleManager'/*</auto_generate>*/</code>, after class constructor  declaration.

#### TypeScript
```typescript
module sample {

    @sample.Provide
    class SampleManagerProvider {

        constructor($q: angular.IQService) {
        }

        $get() {
            return new $SampleManager(this);
        }

    }

    class $SampleManager {
        constructor(public provider: SampleManagerProvider) {
        }
    }
}
```
#### Compiled JavaScript
```javascript
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var sample;
(function (sample) {
    var SampleManagerProvider = (function () {
        function SampleManagerProvider($q) {
        }/*<auto_generate>*/SampleManagerProvider.$inject = ['$q'];SampleManagerProvider.$componentName = 'sampleManager'/*</auto_generate>*/
        SampleManagerProvider.prototype.$get = function () {
            return new $SampleManager(this);
        };
        SampleManagerProvider = __decorate([sample.Provider], SampleManagerProvider);
        return SampleManagerProvider;
    })();
    var $SampleManager = (function () {
        function $SampleManager(provider) {
            this.provider = provider;
        }
        return $SampleManager;
    })();
})(sample || (sample = {}));
```

### 1.3.4 Directive
If class is annonated by <code>@sample.Directive</code>, gulp-typescript-angular add $inject parameter annotation,<code>SampleDirective.$inject = ['$compile'];SampleDirective.$componentName = 'sample'</code>, after class constructor declaration.

#### TypeScript
```typescript
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
```

#### Compiled JavaScript
```javascript
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
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
        }/*<auto_generate>*/SampleDirective.$inject = ['$compile'];SampleDirective.$componentName = 'sample'/*</auto_generate>*/
        SampleDirective.prototype.link = function (scope, element, attr) {
        };
        SampleDirective = __decorate([sample.Directive], SampleDirective);
        return SampleDirective;
    })();
})(sample || (sample = {}));

```


## 2. Naming Rule Mode
### 2.1 modify gulpfile.js
Add gulp-typescript-angular plugin to gulp pipe after typescript plugin. And modify moduleName option to your angular module name.

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

## 2.2 Examples
### 2.2.1 Controller
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

### 2.2.2 Service

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

### 2.2.3 Provider

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

### 2.2.4 Directive
If class name matches /Directive$/, gulp-typescript-angular add directive instantination function,<code>angular.module('sample').directive('sample',['$compile',function(){return new SampleDirective(arguments);}]);</code>, after class declaration.
Using directive class instance , Directive parameter is directive class's field.

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
