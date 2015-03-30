import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.Model.extend({
  // redefine default setter
  set(key, value = {}, options = {}) {
    let attrs;

    if (typeof key === 'object') {
      attrs = key;
      options = value;
    } else {
      attrs = {
        [key]: value
      };
    }

    // convert to booleans
    _.each(attrs, (value, key) => {
      attrs[key] = Boolean(value);
    });

    Backbone.Model.prototype.set.call(this, attrs, options);
  },

  toggle() {

  }
});
