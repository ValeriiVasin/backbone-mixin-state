'use strict';

import ViewMixin from '../src/view_mixin.es6';
import StateModel from '../src/model.es6';
import Backbone from 'backbone';
import $ from 'jquery';

describe('View Mixin', () => {
  let View;
  let view;

  beforeEach(() => {
    $('body').prepend(`
      <div class="view view-filled">
        <div class="view__inner"></div>
        <div class="view__multiple"></div>
      </div>
    `);

    View = Backbone.View.extend({
      states: {
        'loading': 'view-loading',
        'filled': 'view-filled',

        'filled .view__inner': 'view__inner-filled',
        'loading .view__inner': 'view__inner-loading',

        'multiple .view__inner, .view__multiple': 'view-multiple'
      },

      statesDefaults: {
        loading: true
      },

      initialize() {
        this.state = this.initStates(
          new StateModel(this.statesDefaults)
        );
      }
    });

    let ViewWithStates = View.extend(ViewMixin);

    view = new ViewWithStates({ el: '.view' });
  });

  afterEach(() => {
    view.remove();
  });

  describe('Root element', () => {
    it('initialization: add class that is listed in events and set to `true` by default', () => {
      expect(view.$el.hasClass('view-loading')).toBe(true);
    });

    it('initialization: remove class that is listed in events and set to `false` or not set by default', () => {
      expect(view.$el.hasClass('view-filled')).toBe(false);
    });

    it('update state using .set()', () => {
      view.state.set('loading', false);

      expect(view.$el.hasClass('view-loading')).toBe(false);
    });

    it('update state using .toggle()', () => {
      view.state.toggle('filled');

      expect(view.$el.hasClass('view-filled')).toBe(true);
    });
  });

  describe('Inner element', () => {
    it('initialization: add class that is listed in events and set to `true` by default', () => {
      expect(view.$('.view__inner').hasClass('view__inner-loading')).toBe(true);
    });

    it('initialization: remove class that is listed in events and set to `false` or not set by default', () => {
      expect(view.$('.view__inner').hasClass('view__inner-filled')).toBe(false);
    });

    it('update state using .set()', () => {
      view.state.set('loading', false);

      expect(view.$('.view__inner').hasClass('view__inner-loading')).toBe(false);
    });

    it('update state using .toggle()', () => {
      view.state.toggle('filled');

      expect(view.$('.view__inner').hasClass('view__inner-filled')).toBe(true);
    });

    it('supports multiple selectors', () => {
      view.state.set('multiple', true);

      expect(view.$('.view__inner').hasClass('view-multiple')).toBe(true);
      expect(view.$('.view__multiple').hasClass('view-multiple')).toBe(true);
    })
  });
});
