'use strict';

var assert = require('assert');
var Result = require('../lib/result');

describe('Result', function() {

    it('#fromNullable', function() {
        var s = Result.fromNullable('not null');
        assert(s.isSuccess === true);

        var f = Result.fromNullable();
        assert(f.isFailure === true);
    });

    context('when Success', function() {

        var result = Result.Success('abc');

        it('#isSuccess', function() {
            assert(result.isSuccess === true);
        });

        it('#isFailure', function() {
            assert(result.isFailure === false);
        });

        it('#isEqual', function() {
            var rhs = Result.Success('abc');
            assert(result.isEqual(rhs) === true);
        });

        it('#toString', function() {
            assert(result.toString, 'Result.Success(abc)');
        });

        it('#get', function() {
            assert(result.get(), 'abc');
        });

        it('#getOrElse', function() {
            assert(result.getOrElse(-1), 'abc');
        });

        it('#orElse', function() {
        });

        it('#swap', function() {
            var swaped = result.swap();
            assert(swaped.value.message, 'abc');
        });

        it('#map', function() {
            var maped = result.map(function(v) {
                return v + '!'
            });
            assert(maped.value, 'abc!');
        });
    });

    context('when Failure', function() {

        var result = Result.Failure('failure');

        it('#isSuccess', function() {
            assert(result.isSuccess === false);
        });

        it('#isFailure', function() {
            assert(result.isFailure === true);
        });

        it('#isEqual', function() {
            var rhs = Result.Failure('failure');
            assert(result.isEqual(rhs) === true);
        });

        it('#toString', function() {
            assert(result.toString, 'Result.Failure(Error: failure)');
        });

        it('#get', function() {
            assert.throws(function() { result.get(); })
        });

        it('#getOrElse', function() {
            assert(result.getOrElse(-1), -1);
        });

        it('#orElse', function() {
            var orElsed = result.orElse(function(e) {
                return e.message + '!';
            });
            assert(orElsed, 'failure!');
        });

        it('#swap', function() {
            var swaped = result.swap();
            assert(swaped.value, 'failure');
        });

        it('#map', function() {
            var maped = result.map(function(e) {
                return e.message + '!'
            });
            assert(maped.value.message, 'failure!')
        });
    });
});
