# Backbone-mixin-state
Backbone mixin that helps you easily manage you view states.

# Installation
NPM
```sh
npm install backbone-mixin-state --save
```

Bower
```sh
bower install backbone-mixin-state --save
```

# State Model

* Usual Backbone model
* Provided value will always be converted to boolean
* Contains convenience methods like .toggle()

# Add view mixin
Add `StateViewMixin` mixin to you core view.

```js
// lib/view.js
var StateViewMixin = require('backbone-mixin-state');
var View = Backbone.View.extend(StateView);

module.exports = View;
```

# Example
```js
var View = require('lib/view');
var StateModel = require('backbone-mixin-state/model');

var MyView = View.extend({
  events: {
    'click .js-change-loading': 'changeLoadingState',
    'click .js-toggle-filled': 'toggleFilledState'
  },

  // required field that contains states definition
  states: {
    // root element states
    'loading': 'view-loading',
    'filled': 'view-filled',

    // child element state
    'filled .inner__block': 'is-filled'
  },

  statesDefaults: {
    loading: true,
    filled: false
  }

  initialize: function() {
    this.states = this.initStates(
      new StateModel(this.statesDefaults);
    );
  },

  changeLoadingState: function() {
    this.state.set({ loading: false });
  },

  toggleFilledState: function() {
    this.state.toggle('filled');
  }
})
```
