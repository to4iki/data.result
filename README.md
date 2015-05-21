data.result
===========

[![Build Status][travis-image]][travis-url]
[![NPM package][npm-image]][npm-url]
[![Bower package][bower-image]][bower-url]
[![License][license-image]][license-url]


Result[Value, Error] values are either successful or failed.

## Description
javascript Result Type like [antitypical/Result](https://github.com/antitypical/Result).

## Usage

```javascript
var Result = require('data.result');

function toInt(s) {
    var r = parseInt(s, 10);
    if (Number.isNaN(r)) {
        return Result.Failure('parsed error: ' + s);
    } else {
        return Result.Success(r);
    }
}

var resultS = toInt('1'); // Success(1)
var resultS2 = toInt('2'); // Success(2)
var resultF = toInt('abc'); // Failure(Error('parsed error: abc'))
```

### Predicates
```javascript
resultS.isSuccess // true
resultS.isFailure // false
```

### Eq
```javascript
resultS.isEqual(resultS2) // false
resultS.isEqual(Result.Success(1)) // true
```

### Show
```javascript
resultS.toString() // Result.Success(1)
resultF.toString() // Result.Faliure(Error: parsed error: abc)
```

### Fuctor
```javascript
resultS.map(function(n) { return n + 2; }) // Success(3)
resultF.map(function(n) { return n + 2; }) // Failure(Error('parsed error: abc'))
```

### Chain
```javascript
resultS.flatMap(function(n1) {
    return resultS2.map(function(n2) {
        return n1 + n2;
    })
}) // Success(3)

resultS.flatMap(function(n1) {
    return resultF.map(function(n2) {
        return n1 + n2;
    })
}) // Failure(Error('parsed error: abc'))
```

### Extracting
```javascript
// get()
resultS.get() // 1
resultF.get() // !!!TypeError: Can't extract the value of a Failure(a).!!!

// getOrElse(a)
resultS.getOrElse(-1) // 1
resultF.getOrElse(-1) // -1

// orElse(fn(a))
resultS.orElse(function(n) { return -1 } // Success(1)
resultF.orElse(function(error) { return -1 } // -1
```

### Folds
```javascript
// fold(fn(a), fn(Error))
resultS.fold(
    function(s) { return 'success' },
    function(e) { return 'error' }
) // 'success'

resultF.fold(
    function(s) { return 'success' },
    function(e) { return 'error' }
) // 'error'

// swap()
resultS.swap() // Failure(Error: 1))
resultF.swap() // Success('parsed error: abc')
```

## Installation
### npm
Install

```
$ npm install --save data.result
```

Use

```javascript
var Result = require('data.result');
```

### bower
Install

```
$ bower install --save data.result
```

Load (`data.result` function is exported)

```html
<script type="text/javascript" src="./path/to/bower_components/data.result/build/result.js"></script>
```

Use

```javascript
var success = Result.Success(123);
```

## Author

[to4iki](https://github.com/to4iki)

## Licence

[MIT](http://to4iki.mit-license.org/)

[travis-url]: http://travis-ci.org/to4iki/data.result
[travis-image]: https://secure.travis-ci.org/to4iki/data.result.svg?branch=master

[npm-url]: https://npmjs.org/package/data.result
[npm-image]: https://badge.fury.io/js/data.result.svg

[bower-url]: http://badge.fury.io/bo/data.result
[bower-image]: https://badge.fury.io/bo/data.result.svg

[license-url]: http://to4iki.mit-license.org/
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg
