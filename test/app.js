'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

var moduleTypes = {
  amd:[
    'src/js/requirejs'
  ],
  commonjs:[
    'webpack.config.js',
    'src/js/entry.js'
  ],
  cmd:[
    'src/js/seajs'
  ],
  kissy:[

  ]
};

var prompts = {
  name:'testGame',
  desc:'a test game',
  authorName:'06wj',
  authorEmail:'06wj@163.com',
  moduleType:'amd',
  license:'MIT'
};

var commonFiles = [
  'index.html',
  'package.json',
  'LICENSE',
  '.gitignore',
  'src/images',
  'src/js/testGame'
];

for(var moduleType in moduleTypes){
  (function(moduleType){
    var files = moduleTypes[moduleType];
    describe('generator-hilo:' + moduleType, function () {
      before(function (done) {
        prompts.moduleType = moduleType;
        helpers.run(path.join(__dirname, '../generators/app'))
          .withOptions({})
          .withPrompts(prompts)
          .on('end', done);
      });

      it('creates files', function () {
        assert.file(commonFiles.concat(files));
      });
    });
  })(moduleType);
}


