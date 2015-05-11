(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.StateViewMixin = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("underscore"));

/**
 * @todo Optimize state update
 */
module.exports = {
  initStates: function initStates(stateModel) {
    var defaults = _.extend(this._statesFromClassNames(), stateModel.toJSON());

    stateModel.set(defaults);

    this.listenTo(stateModel, "change", this._updateStates);

    // set initial states
    this._updateStates(stateModel);

    return stateModel;
  },

  /**
   * Return all states from classnames as `false` values
   * @return {Object} { [state]: false }
   */
  _statesFromClassNames: function _statesFromClassNames() {
    return _.chain(this.states || {}).keys().reduce(function (memo, key) {
      var state = _.first(key.split(" "));

      memo[state] = false;

      return memo;
    }, {}).value();
  },

  _updateStates: function _updateStates(stateModel) {
    var _this = this;

    _.each(this.states, function (className, stateWithSelector) {
      var split = stateWithSelector.split(" ");
      var state = split.shift();
      var selector = split.join(" ");

      // global component state
      if (!selector) {
        _this.$el.toggleClass(className, Boolean(stateModel.get(state)));

        return _this;
      }

      // internal component state
      _this.$(selector).toggleClass(className, Boolean(stateModel.get(state)));

      return _this;
    });
  }
};

},{"underscore":undefined}]},{},[1])(1)
});