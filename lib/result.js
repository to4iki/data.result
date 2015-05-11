'use strict';

/**
 * @module lib/result
 */
module.exports = Result;

// -- Alias

var clone = Object.create;
var noop = function() { return this };

// -- Implementation

function Result() {}

Success.prototype = clone(Result.prototype);
function Success(a) {
    this.value = a;
}

Failure.prototype = clone(Result.prototype);
function Failure(a) {
    this.value = new Error(a);
}

// -- Constructors

/**
 * Constructs a new `Result[A, Error]` structure holding a `Success` value
 * @param {A} a [description]
 */
Result.Success = function(a) {
    return new Success(a);
}
Result.prototype.Success = Result.Success;

/**
 * Constructs a new `Result[A, Error]` structure holding a `Failure` value
 * @param {A} value [description]
 */
Result.Failure = function(value) {
    return new Failure(value);
}
Result.prototype.Failure = Result.Failure;

// -- Conversions

/**
 * Constructs a new `Result[A, Error]` structure from a nullable type.
 * @param {A} a generic
 */
Result.fromNullable = function(a) {
    return a != null ? this.Success(a) : this.Failure();
};
Result.prototype.fromNullable = Result.fromNullable;

// -- Predicates

/**
 * True if the `Result[A, Error]` contains a `Success` value.
 * @type {Boolean}
 */
Success.prototype.isSuccess = true;
Failure.prototype.isSuccess = false;

/**
 * True if the `Result[A, Error]` contains a `Failure` value.
 * @type {Boolean}
 */
Success.prototype.isFailure = false;
Failure.prototype.isFailure = true;

// -- Eq

Success.prototype.isEqual = function(a) {
    return a.isSuccess && (a.value === this.value);
};
Failure.prototype.isEqual = function(a) {
    return a.isFailure && (a.value.message === this.value.message);
};

// -- Show

/**
 * Returs a text of the `Result[A, Error] structure.
 */
Success.prototype.toString = function() {
    return 'Result.Success(' + this.value + ')';
};
Failure.prototype.toString = function() {
    return 'Result.Faliure(' + this.value + ')';
};

// -- Methods

// get
Success.prototype.get = function() {
    return this.value
};
Failure.prototype.get = function() {
    throw new TypeError("Can't extract the value of a Failure(a).")
};

// getOrElse
Success.prototype.getOrElse = function(_) {
    return this.value;
};
Failure.prototype.getOrElse = function(or) {
    return or;
};

// orElse
Success.prototype.orElse = noop;
Failure.prototype.orElse = function(f) {
    return f(this.value);
};

// swap
Success.prototype.swap = function() {
    return this.Failure(this.value)
};
Failure.prototype.swap = function() {
    return this.Success(this.value.message);
};

// map
Success.prototype.map = function(f) {
    return this.Success(f(this.value));
};
Failure.prototype.map = function(f) {
    return this.Failure(f(this.value));
};
