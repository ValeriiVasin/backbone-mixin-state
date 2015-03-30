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

  describe('Set', () => {
    it('converts all values to booleans', () => {
      state.set('loading', []);
      expect(state.get('loading')).toBe(true);

      state.set('loading', [].length);
      expect(state.get('loading')).toBe(false);

      state.set('loading', '');
      expect(state.get('loading')).toBe(false);
    });

    it('#set object syntax', () => {
      state.set({
        loading: [].length,
        filled: ''
      });

      expect(state.get('loading')).toBe(false);
      expect(state.get('filled')).toBe(false);
    });

    it('fires change event once when setting with conversion', () => {
      let spy = jasmine.createSpy('change:loading');
      state.on('change:loading', spy);

      state.set('loading', 0);
      expect(spy.calls.count()).toBe(1);
    });

    it('allows to provide options', () => {
      let spy = jasmine.createSpy('change');

      state.set('loading', 0, { silent: true });
      state.set({ loading: 0 }, { silent: true });

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Toggle', () => {

  });
});
