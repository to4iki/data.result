(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Result = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @module lib/result
 */
module.exports = Result;

// -- Alias

var clone = Object.create;
var noop = function() { return this };

// -- Implementation

/**
 * Result[A, Error] <: Functor[A], Chain[A], Show, Eq
 */
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
 * Returs a text of the `Result[A, Error]` structure.
 */
Success.prototype.toString = function() {
    return 'Result.Success(' + this.value + ')';
};
Failure.prototype.toString = function() {
    return 'Result.Faliure(' + this.value + ')';
};

// -- Fuctor

/**
 * Transforms the `Success` value of the `Result[A, Error]` structure using a regular
 * unary function.
 * @param  {Fuction(A)} f transform
 * @return {Success[A]}
 */
Success.prototype.map = function(f) {
    return this.Success(f(this.value));
};
Failure.prototype.map = noop;

// -- Chain

/**
 * Transforms the `Success` value of the `Result[A, Error]` structure using a regular
 * unary function to monads.
 * @param  {Function(A)} f transform
 * @return {}
 */
Success.prototype.flatMap = function(f) {
    return f(this.value)
};
Failure.prototype.flatMap = noop;

// -- Extracting

/**
 * Extracts the `Success` value out of the `Result[A, Error]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 * @return {A} value
 */
Success.prototype.get = function() {
    return this.value
};
Failure.prototype.get = function() {
    throw new TypeError("Can't extract the value of a Failure(a).")
};

/**
 * Extracts the `Success` value out of the `Result[A, Error]` structure. If the
 * structure doesn't have a `Success` value, returns the given default.
 * @param {A} default
 */
Success.prototype.getOrElse = function(_) {
    return this.value;
};
Failure.prototype.getOrElse = function(or) {
    return or;
};

/**
 * Transforms a `Failure` value into a new `Result[A, Error]` structure. Does nothing
 * if the structure contain a `Success` value.
 * @type {Fuction(A)}
 */
Success.prototype.orElse = noop;
Failure.prototype.orElse = function(f) {
    return f(this.value);
};

// -- Folds

/**
 * Applies a function to each case in this data structure.
 * @param  {Function(A)} f transform Success value
 * @param  {Function(Error)} g transform Failure Error
 * @return {A}
 */
Success.prototype.fold = function(f, _) {
    return f(this.value);
};
Failure.prototype.fold = function(_, g) {
    return g(this.value);
};

/**
 * Swaps the disjunction values.
 */
Success.prototype.swap = function() {
    return this.Failure(this.value)
};
Failure.prototype.swap = function() {
    return this.Success(this.value.message);
};

},{}]},{},[1])(1)
});