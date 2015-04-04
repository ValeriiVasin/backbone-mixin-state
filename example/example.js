import Backbone from 'backbone';
import ViewMixin from '../src/view_mixin.es6';

let View = Backbone.View.extend(ViewMixin);

let Button = View.extend({
  events: {
    'click': 'togglePauseState',
  },

  states: {
    pause: 'button-pause'
  },

  statesDefaults: {
    pause: false
  },

  initialize() {
    this.state = this.initStates();
  },

  togglePauseState() {
    this.state.toggle('pause');
  }
});

new Button({ el: '.button' });
