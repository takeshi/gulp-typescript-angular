/// <reference path="./typings/tsd.d.ts"/>
'use strict';
var through = require('through2');
var falafel = require('falafel');
function setDefaultValue(opts) {
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
            { pattern: /Directive$/, type: 'directive', removePattern: true, firstLowerCase: true },
            { pattern: /Component$/, type: 'component', removePattern: true, firstLowerCase: true }
        ];
    }
    if (typeof opts.decoratorPatterns === 'undefined') {
        opts.decoratorPatterns = [
            { pattern: /Controller$/, func: 'Controller', firstLowerCase: false },
            { pattern: /Service$/, func: 'Service' },
            { pattern: /Provider$/, func: 'Provider', removePattern: true },
            { pattern: /Directive$/, func: 'Directive', removePattern: true, firstLowerCase: true },
            { pattern: /Component$/, func: 'Component', removePattern: true, firstLowerCase: true }
        ];
    }
}
module.exports = function angularify(opts) {
    opts = opts || {};
    setDefaultValue(opts);
    // creating a stream through which each file will pass
    var stream = through.obj(function (file, enc, cb) {
        if (file.isNull()) {
        }
        if (file.isBuffer()) {
            var contents = file.contents.toString();
            contents = transform(contents, opts);
            file.contents = new Buffer(contents.toString());
        }
        this.push(file);
        return cb();
    });
    // returning the file stream
    return stream;
};
function transform(contents, opts) {
    return falafel(contents, { tolerant: true }, function (node) {
        findClassDeclaration(node, opts);
    }).toString();
}
function findClassDeclaration(node, opts) {
    var decls, decl;
    if ((node.type === 'ClassDeclaration' && (decl = node)) || (node.type === 'VariableDeclaration' &&
        (decls = node.declarations) && decls.length === 1 &&
        (decl = decls[0]) && decl.init && decl.init.type === 'CallExpression' && decl.init.callee.body)) {
        if (opts.ignore && decl.id.name.match(opts.ignore)) {
            return;
        }
        if (opts.decorator) {
            var decorators = findDecorator(decl);
            decorators.forEach(function (decorator) {
                opts.decoratorPatterns.forEach(function (decoratorPattern) {
                    if (decorator === opts.decoratorModuleName + '.' + decoratorPattern.func) {
                        addAngularModule(node, decl, opts, decoratorPattern);
                    }
                });
            });
        }
        else {
            opts.patterns.forEach(function (pattern) {
                if (decl.id.name.match(pattern.pattern)) {
                    addAngularModule(node, decl, opts, pattern);
                }
            });
        }
    }
}
function findDecorator(decl) {
    var body = decl.init.callee.body;
    var decoratorBlock = body.body[body.body.length - 2];
    var decorators = decoratorBlock.expression.right;
    return decorators.arguments[0].elements.map(function (element) {
        return element.source();
    });
}
function addAngularModule(node, decl, opts, ptn) {
    var moduleName = opts.moduleName, type = ptn.type, pattern = ptn.pattern, removePattern = ptn.removePattern;
    var firstLowerCase = ptn.firstLowerCase;
    if (typeof firstLowerCase === 'undefined') {
        firstLowerCase = opts.firstLowerCase;
    }
    var constructor = (decl.body && decl.body.body) ? (decl.body.body[0].kind === 'constructor' ? decl.body.body[0].value : { params: [] }) : (decl.init.callee.body.body[0].type === 'FunctionDeclaration' ? decl.init.callee.body.body[0] : decl.init.callee.body.body[1]);
    var constructorParams = constructor.params.map(function (param) {
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
    function add$inject(body, className, componentName, constructor, constructorParams) {
        if (!constructorParams) {
            return;
        }
        var source = '/*<auto_generate>*/';
        source += className + ".$inject = [" + constructorParams.join('\,') + "]; ";
        source += className + ".$componentName = '" + componentName + "'";
        source += '/*</auto_generate>*/';
        constructor.update(constructor.source() + source);
    }
    if (opts.decoratorModuleName) {
        add$inject(decl.init.callee.body, className, conponentName, constructor, constructorParams);
        return;
    }
    var source = '/*<auto_generate>*/';
    if (type === 'directive') {
        source += functionModule();
    }
    else if (type === 'component') {
        source += createModule();
    }
    else if (type === 'value') {
        source += functionModule();
    }
    else if (type === 'constant') {
        source += functionModule();
    }
    else {
        source += functionModule();
    }
    source += '/*</auto_generate>*/';
    node.update(node.source() + source);
    function createModule() {
        var source = '';
        source += "angular.module('" + moduleName + "')";
        source += "." + type + "('" + conponentName + "',new " + className + "());";
        return source;
    }
    function functionModule() {
        constructorParams.push("function(){return new (Function.prototype.bind.apply(" + className + ",[null].concat(Array.prototype.slice.apply(arguments))));}");
        var source = '';
        source += "angular.module('" + moduleName + "')";
        source += "." + type + "('" + conponentName + "',[" + constructorParams.join('\,') + "]);";
        return source;
    }
}
