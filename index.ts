/// <reference path="./typings/tsd.d.ts"/>
'use strict';

import * as through from 'through2';
import * as falafel from 'falafel';

interface Pattern {
  pattern?: RegExp;
  type?: string;
  firstLowerCase?: boolean;
  removePattern?: boolean;
}

interface DecoratorPattern extends Pattern {
  func?: string;
}

interface Options {
  ignore?: RegExp;
  moduleName?: string;
  firstLowerCase?: boolean;
  patterns?: Pattern[];
  decoratorPatterns?: DecoratorPattern[];
  decoratorModuleName?: string;
  decorator?: boolean;
}

function setDefaultValue(opts: Options) {
  if (typeof opts.ignore === 'undefined') {
    opts.ignore = /^\$/;
  }

  if (typeof opts.moduleName === 'undefined') {
    opts.moduleName = '<Must set moduleName>';
  }
  if (typeof opts.firstLowerCase === 'undefined') {
    opts.firstLowerCase = true;
  }

  if (typeof opts.patterns === 'undefined') {
    opts.patterns = [
      { pattern: /Controller$/, type: 'controller', firstLowerCase: false },
      { pattern: /Ctrl$/, type: 'controller', firstLowerCase: false },
      { pattern: /Service$/, type: 'service' },
      { pattern: /Manager$/, type: 'service' },
      { pattern: /ServiceDelegate$/, type: 'service' },
      { pattern: /Provider$/, type: 'provider', removePattern: true },
      { pattern: /Directive$/, type: 'directive', removePattern: true, firstLowerCase: true }
    ];
  }

  if (typeof opts.decoratorPatterns === 'undefined') {
    opts.decoratorPatterns = [
      { pattern: /Controller$/, func: 'Controller', firstLowerCase: false },
      { pattern: /Service$/, func: 'Service' },
      { pattern: /Provider$/, func: 'Provider', removePattern: true },
      { pattern: /Directive$/, func: 'Directive', removePattern: true, firstLowerCase: true }
    ];
  }

}

module.exports = function angularify(opts: Options) {
  opts = opts || {};
  setDefaultValue(opts);

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // do nothing
    }

    if (file.isBuffer()) {
      var contents: string = file.contents.toString();
      contents = transform(contents, opts);
      file.contents = new Buffer(contents.toString());
    }

    this.push(file);

    return cb();
  });

  // returning the file stream
  return stream;
};

interface Node {
  type: string;
  declarations: Declaration[];
  update(source:string);
  source():string;
}

interface Declaration {
  id: {
    name: string
  }
  init: {
    type: string,
    callee: {
      body: Body
    }
  }
}

interface Body {
  body: DecoratorBlock[];
}

interface DecoratorBlock{
  expression:{
    right:any,
    left:any
  }
  params:{
    name:string
  }[],
  type:string
}

function transform(contents: string, opts: Options): string {
  return falafel(contents, { tolerant: true }, function(node: Node) {
    findClassDeclaration(node, opts);
  }).toString();
}

function findClassDeclaration(node: Node, opts: Options) {
  var decls: Declaration[], decl: Declaration;
  if (node.type === 'VariableDeclaration' &&
    (decls = node.declarations) && decls.length === 1 &&
    (decl = decls[0]) && decl.init && decl.init.type === 'CallExpression') {
    if (opts.ignore && decl.id.name.match(opts.ignore)) {
      return;
    }
    if (!decl.init.callee.body) {
      return;
    }
    if (opts.decorator) {
      var decorators = findDecorator(decl);
      decorators.forEach(function(decorator) {
        opts.decoratorPatterns.forEach(function(decoratorPattern) {
          if (decorator === opts.decoratorModuleName + '.' + decoratorPattern.func) {
            addAngularModule(node, decl, opts, decoratorPattern);
          }
        });
      });
    }
    else {
      opts.patterns.forEach(function(pattern) {
        if (decl.id.name.match(pattern.pattern)) {
          addAngularModule(node, decl, opts, pattern);
        }
      });
    }
  }
}

function findDecorator(decl: Declaration) {
  var body = decl.init.callee.body;
  var decoratorBlock = body.body[body.body.length - 2];
  var decorators = decoratorBlock.expression.right;
  return decorators.arguments[0].elements.map(function(element) {
    return element.source();
  })
}

function addAngularModule(node:Node, decl:Declaration, opts:Options, ptn:Pattern) {
  var moduleName = opts.moduleName,
    type = ptn.type,
    pattern = ptn.pattern,
    removePattern = ptn.removePattern

  var firstLowerCase = ptn.firstLowerCase;
  if (typeof firstLowerCase === 'undefined') {
    firstLowerCase = opts.firstLowerCase;
  }

  var constructor = decl.init.callee.body.body[0].type === 'FunctionDeclaration' ? decl.init.callee.body.body[0] : decl.init.callee.body.body[1];
  var constructorParams = constructor.params.map(function(param) {
    return '\'' + param.name + '\'';
  });


  var className = decl.id.name;
  var conponentName = className;


  if (removePattern) {
    conponentName = decl.id.name.replace(pattern, '');
  }
  if (firstLowerCase) {
    conponentName = conponentName.toLowerCase()[0] + conponentName.substring(1);
  }

  add$inject(decl.init.callee.body, className, conponentName, constructor, constructorParams);

  function add$inject(body, className, componentName, constructor, constructorParams) {
    if (!constructorParams) {
      return;
    }
    var source = '/*<auto_generate>*/';
    source += `${className}.$inject = [${constructorParams.join('\,')}]; `;
    source += `${className}.$componentName = '${componentName}'`;
    source += '/*</auto_generate>*/';

    constructor.update(constructor.source() + source);
  }

  if (opts.decoratorModuleName) {
    return;
  }

  var source = '/*<auto_generate>*/';
  if (type === 'directive') {
    source += createModule();
  }
  else if (type === 'value') {
    source += createModule();
  }
  else if (type === 'constant') {
    source += createModule();
  }
  else {
    source += functionModule()
  }
  source += '/*</auto_generate>*/';
  node.update(node.source() + source);

  function functionModule() {
    var source = '';
    source += `angular.module('${moduleName}')`;
    source += `.${type}('${conponentName}',${className});`;
    return source;
  }

  function createModule() {
    constructorParams.push(`function(){return new (Function.prototype.bind.apply(${className},[null].concat(Array.prototype.slice.call(arguments))));}`);    
    var source = '';
    source += `angular.module('${moduleName}')`;
    source += `.${type}('${conponentName}',[${constructorParams.join('\,')}]);`;
    return source;
  }

}
