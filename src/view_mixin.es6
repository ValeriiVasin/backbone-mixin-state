import _ from 'underscore';

/**
 * @todo Optimize state update
 */
export default {
  initStates(stateModel) {
    let defaults = _.extend(this._statesFromClassNames(), stateModel.toJSON());

    stateModel.set(defaults);

    this.listenTo(stateModel, 'change', this._updateStates);

    // set initial states
    this._updateStates(stateModel);

    return stateModel;
  },

  /**
   * Return all states from classnames as `false` values
   * @return {Object} { [state]: false }
   */
  _statesFromClassNames() {
    return _.chain(this.states || {})
      .keys()
      .reduce((memo, key) => {
        let state = _.first(key.split(' '));

        memo[state] = false;

        return memo;
      }, {})
      .value();
  },

  _updateStates(stateModel) {
    _.each(this.states, (className, stateWithSelector) => {
      let split = stateWithSelector.split(' ');
      let state = split.shift();
      let selector = split.join(' ');

      // global component state
      if (!selector) {
        this.$el.toggleClass(
          className,
          Boolean(stateModel.get(state))
        );

        return this;
      }

      // internal component state
      this.$(selector).toggleClass(
        className,
        Boolean(stateModel.get(state))
      );

      return this;
    });
  }
};
