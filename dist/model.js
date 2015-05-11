(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.StateModel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("underscore"));

var Backbone = _interopRequire(require("backbone"));

module.exports = Backbone.Model.extend({
  // redefine default setter
  set: function set(key) {
    var value = arguments[1] === undefined ? {} : arguments[1];
    var options = arguments[2] === undefined ? {} : arguments[2];

    var attrs = undefined;

    if (typeof key === "object") {
      attrs = key;
      options = value;
    } else {
      attrs = {};
      attrs[key] = value;
    }

    // convert to booleans
    _.each(attrs, function (value, key) {
      attrs[key] = Boolean(value);
    });

    return Backbone.Model.prototype.set.call(this, attrs, options);
  },

  /**
   * Toggle current value of attr
   * @param  {String|Array} attrs     Attr(s) to toggle
   * @param  {Object}      [options]  Options for setter, e.g. { silent: true }
   * @return {Model}                  Model instance
   */
  toggle: function toggle(attrs) {
    var _this = this;

    var options = arguments[1] === undefined ? {} : arguments[1];

    var attrsObj = {};

    if (!_.isArray(attrs)) {
      attrs = [attrs];
    }

    _.each(attrs, function (attr) {
      attrsObj[attr] = !_this.get(attr);
    });

    return this.set(attrsObj, options);
  }
});

},{"backbone":undefined,"underscore":undefined}]},{},[1])(1)
});