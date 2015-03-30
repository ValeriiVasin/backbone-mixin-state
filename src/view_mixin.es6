import StateModel from './model.es6';
import _ from 'underscore';

/**
 * @todo Optimize state update
 */
export default {
  initStates() {
    let defaults = _.extend(this._statesFromClasses(), this.statesDefaults || {});

    this.__state = new StateModel(defaults);

    this.listenTo(this.__state, 'change', this.updateStates);

    // set initial states
    this.updateStates();

    return this.__state;
  },

  /**
   * Return all states from classnames as `false` values
   * @return {Object} { [state]: false }
   */
  _statesFromClasses() {
    return _.chain(this.states || {})
      .keys()
      .reduce((memo, key) => {
        let state = _.first(key.split(' '));

        memo[state] = false;

        return memo;
      }, {})
      .value();
  },

  updateStates() {
    _.each(this.states, (className, stateWithSelector) => {
      let split = stateWithSelector.split(' ');
      let state = split.shift();
      let selector = split.join(' ');

      if (selector) {
        this.$(selector).toggleClass(className, this.__state.get(state));
      } else {
        this.$el.toggleClass(className, this.__state.get(state));
      }
    });
  }
};
