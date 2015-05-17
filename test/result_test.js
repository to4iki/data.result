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

        it('#map', function() {
            var maped = result.map(function(v) {
                return v + '!'
            });
            assert(maped.value, 'abc!');
        });

        it('#flatMap', function() {
            var chained = result.flatMap(function(v) {
                return v + '!';
            });
            assert(chained, 'abc');
        });

        it('#get', function() {
            assert(result.get(), 'abc');
        });

        it('#getOrElse', function() {
            assert(result.getOrElse(-1), 'abc');
        });

        it('#orElse', function() {
          var called = false;
          var orElsed = result.orElse(function(v) {
              called = true;
              return v + '!';
          });
          assert(called !== true);
        });

        it('fold', function() {
            var folded = result.fold(
                function(s) { return 'success' },
                function(e) { return 'error' }
            )
            assert(folded, 'success');
        });

        it('#swap', function() {
            var swaped = result.swap();
            assert(swaped.value.message, 'abc');
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

        it('#map', function() {
            var called = false;
            var maped = result.map(function(e) {
                called = true;
                return e.message + '!'
            });
            assert(called !== true);
        });

        it('#flatMap', function() {
            var called = false;
            var chained = result.flatMap(function(v) {
                called = true;
                return e.message + '!'
            });
            assert(called !== true);
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

        it('fold', function() {
            var folded = result.fold(
                function(s) { return 'success' },
                function(e) { return 'error' }
            )
            assert(folded, 'error');
        });

        it('#swap', function() {
            var swaped = result.swap();
            assert(swaped.value, 'failure');
        });
    });
});
