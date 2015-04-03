'use strict';

var through = require('through2');
var falafel = require('falafel');

module.exports = function angularify(opts) {
  opts = opts || {};

  if(typeof opts.ignore === 'undefined'){
    opts.ignore = /\$.*/;
  }

  if(typeof opts.moduleName === 'undefined'){
    opts.moduleName = '<Must set moduleName>';
  }
  if(typeof opts.firstLowerCase === 'undefined'){
    opts.firstLowerCase = true;
  }
  if(typeof opts.patterns === 'undefined'){
    var DEFAULT_PATTERNS = [
      {pattern:/Controller$/,type:'controller'},
      {pattern:/Ctrl$/,type:'controller'},
      {pattern:/Service$/,type:'service'},
      {pattern:/Manager$/,type:'service'},
      {pattern:/ServiceDelegate$/,type:'service'},
      {pattern:/Provider$/,type:'provider',removePattern:true},
      {pattern:/Directive$/,type:'directive',removePattern:true,firstLowerCase:true}
    ];
    opts.patterns = DEFAULT_PATTERNS;
  }

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // do nothing
    }

    if (file.isBuffer()) {
      var contents = file.contents.toString();
      contents = transform(contents,opts);
      file.contents = new Buffer(contents.toString());
    }

    this.push(file);

    return cb();
  });

  // returning the file stream
  return stream;
};

function transform(contents,opts){
   return falafel(contents, {tolerant: true}, function (node) {
     findClassDeclaration(node,opts);
   }).toString();
}

function findClassDeclaration(node,opts){
 var decls, decl;
 if (node.type === 'VariableDeclaration' &&
     (decls = node.declarations) && decls.length === 1 &&
     (decl = decls[0]) && decl.init && decl.init.type === 'CallExpression' ) {
       if(opts.ignore && decl.id.name.match(opts.ignore)){
         return;
       }
       opts.patterns.forEach(function(pattern){
         if(decl.id.name.match(pattern.pattern)){
          var firstLowerCase = pattern.firstLowerCase;
          if(typeof firstLowerCase === 'undefined'){
            firstLowerCase = opts.firstLowerCase;
          }
          addAngularModule(node,decl,opts.moduleName,pattern.type,pattern.pattern,pattern.removePattern,firstLowerCase);
         }
     });
 }
}

function addAngularModule(node,decl,moduleName,type,pattern,removePattern,firstLowerCase){
  var constructor = decl.init.callee.body.body[0];
  var constructorParams = constructor.params.map(function(param){
    return '\''+param.name + '\'';
  });
  var className = decl.id.name;
  var conponentName = className;
  if(removePattern){
    conponentName = decl.id.name.replace(pattern,'');
  }
  if(firstLowerCase){
    conponentName = conponentName.toLowerCase()[0] + conponentName.substring(1);
  }

  function functionModule(){
    constructorParams.push(className);
    var source = '\n';
    source += 'angular.module(\''+ moduleName +'\')';
    source += '.' + type + '(\''+conponentName+'\',['+constructorParams.join('\,')+']);';
    node.update(node.source()+source);
  }

  function createModule(){
    constructorParams.push('function(){return new ' +className +'(arguments);}');
    var source = '\n';
    source += 'angular.module(\''+ moduleName +'\')';
    source += '.' + type + '(\''+conponentName+'\',['+constructorParams.join('\,')+']);';
    node.update(node.source()+source);
  }

  if(type === 'directive'){
    createModule();
  }
  else if(type === 'value'){
    createModule();
  }
  else if(type === 'constant'){
    createModule();
  }
  else {
    functionModule()
  }
}
