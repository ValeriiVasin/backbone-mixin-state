'use strict';

import StateModel from '../src/model.es6';

describe('State Model', () => {
  let state;

  beforeEach(() => {
    state = new StateModel();
  });

  it('state model defined', () => {
    expect(state).toBeDefined();
  });

  it('converts all values to booleans', () => {
    pending('realization is not ready');

    state.set('loading', []);
    expect(state.get('loading')).toBe(true);

    state.set('loading', [].length);
    expect(state.get('loading')).toBe(false);

    state.set('loading', '');
    expect(state.get('loading')).toBe(false);
  });

});
