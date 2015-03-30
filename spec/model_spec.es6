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

    it('returns model instance', () => {
      expect(state.set('loading', true)).toBe(state);
    });
  });

  describe('Toggle', () => {
    beforeEach(() => {
      state.set({
        loading: true,
        filled: false
      });
    })

    it('toggles single attr', () => {
      state.toggle('loading');

      expect(state.get('loading')).toBe(false);
    });

    it('toggles few attrs', () => {
      state.toggle(['loading', 'filled']);

      expect(state.get('loading')).toBe(false);
      expect(state.get('filled')).toBe(true);
    });

    it('allows provide setter options', () => {
      let spy = jasmine.createSpy('loading');

      state.on('change:loading', spy);
      state.toggle('loading', { silent: true });

      expect(state.get('loading')).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });

    it('toggles previously not defined attr to `true`', () => {
      state.toggle('non-existing');
      expect(state.get('non-existing')).toBe(true);
    });

    it('returns model instance', () => {
      expect(state.toggle('loading')).toBe(state);
    });
  });
});
