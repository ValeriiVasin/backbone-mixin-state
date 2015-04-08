import _ from 'underscore';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  // redefine default setter
  set(key, value = {}, options = {}) {
    let attrs;

    if (typeof key === 'object') {
      attrs = key;
      options = value;
    } else {
      attrs = {};
      attrs[key] = value;
    }

    // convert to booleans
    _.each(attrs, (value, key) => {
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
  toggle(attrs, options = {}) {
    let attrsObj = {};

    if (!_.isArray(attrs)) {
      attrs = [attrs];
    }

    _.each(attrs, (attr) => {
      attrsObj[attr] = !this.get(attr);
    });

    return this.set(attrsObj, options);
  }
});
