# generator-hilo  
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A Hilo game project template created by yeoman generator

## Installation

First, install [Yeoman](http://yeoman.io) and [generator-hilo][npm-url] using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-hilo
```

Then generate your new Hilo game project:

```bash
yo hilo
```

Run gulp for building your game

## Features

* Automagically lint your codes
* Provide Hilo script for multi-type modules
* Optional - RequiresJS, SeaJS, KISSY, CommonJS support. Choice any module type of your favorite

## Dev
* init & update submodule

    ```bash
    git submodule init
    git submodule update
    ```

* test
    ```
    npm run test
    ```

## License

MIT © [alibaba](www.alibaba.com)


[npm-image]: https://badge.fury.io/js/generator-hilo.svg
[npm-url]: https://npmjs.org/package/generator-hilo
[travis-image]: https://travis-ci.org/hiloteam/generator-hilo.svg?branch=master
[travis-url]: https://travis-ci.org/hiloteam/generator-hilo
[daviddm-image]: https://david-dm.org/hiloteam/generator-hilo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/hiloteam/generator-hilo
[coveralls-image]: https://coveralls.io/repos/hiloteam/generator-hilo/badge.svg
[coveralls-url]: https://coveralls.io/r/hiloteam/generator-hilo
