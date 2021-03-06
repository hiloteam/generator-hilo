'use strict';
var generator = require('yeoman-generator');
var _ = require('lodash');
var gulpTransformModule = require('gulp-transform-module');
var gulpFilter = require('gulp-filter');
require('colors');

module.exports = generator.Base.extend({
  constructor: function () {
    generator.Base.apply(this, arguments);
    this.props = {};
  },

  initializing: function () {
    this.log('Welcome to the Game world created by Hilo Enginee. You\'re using the fantastic Hilo generator.'.magenta);
  },

  prompting: function () {
    var done = this.async();
    this.log('Please check your preferene of your game project'.magenta);

    var prompts = [{
      name: 'name',
      message: 'Your game name',
      default: 'game'
    }, {
      name: 'desc',
      message: 'Description',
      default: 'a game'
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email(),
      store: true
    }, {
      name: 'moduleType',
      type: 'list',
      choices: ['amd', 'commonjs', 'kissy', 'cmd'],
      store: true,
      message: 'Which kind of module defined do you want to use in your project?',
      default: 'amd'
    }];

    this.prompt(prompts, function (props) {
      this.props = _.merge(this.props, props);
      done();
    }.bind(this));
  },

  default: {
    license: function () {
      if (!this.props.license) {
        this.composeWith('license', {
          options: {
            name: this.props.authorName,
            email: this.props.authorEmail
          }
        }, {
          local: require.resolve('generator-license/app')
        });
      }
    }
  },

  writing: {
    copy: function () {
      this.props.license = this.props.license || false;

      var noTplPath = ['src/images'];
      var tplPath = ['package.json', 'README.md'];

      var that = this;

      var copy = function (templatePath, destinationPath) {
        destinationPath = destinationPath || templatePath;
        that.fs.copy(that.templatePath(templatePath), that.destinationPath(destinationPath));
      };
      var copyTpl = function (templatePath, destinationPath, props) {
        destinationPath = destinationPath || templatePath;
        props = props || that.props;
        that.fs.copyTpl(that.templatePath(templatePath), that.destinationPath(destinationPath), props);
      };
      noTplPath.forEach(function (path) {
        copy(path);
      });
      tplPath.forEach(function (path) {
        copyTpl(path);
      });

      //gitignore
      copy('gitignore', '.gitignore');

      //index.html
      copyTpl('modules/' + this.props.moduleType + '/index.html', that.destinationPath('index.html'));
      //app js
      copyTpl('src/js/app/', 'src/js/' + this.props.name + '/');
      //hilo
      copy('src/js/hilo/' + that.props.moduleType + '/', 'src/js/hilo/');

      //module
      switch (that.props.moduleType) {
        case 'amd':
          copy('modules/amd/requirejs/', 'src/js/requirejs/');
          break;
        case 'cmd':
          copy('modules/cmd/seajs/', 'src/js/seajs/');
          break;
        case 'commonjs':
          copyTpl('modules/commonjs/entry.js', 'src/js/entry.js');
          copyTpl('modules/commonjs/webpack.config.js', 'webpack.config.js');
          break;
      }
    },
    transformStream: function () {
      var moduleFilter = gulpFilter('src/js/' + this.props.name + '/**/*.js', {
        restore: true
      });
      this.registerTransformStream(moduleFilter);
      this.registerTransformStream(gulpTransformModule(this.props.moduleType));
      this.registerTransformStream(moduleFilter.restore);
    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  },

  end: function () {
    this.log('goodbye!');
  }
});
