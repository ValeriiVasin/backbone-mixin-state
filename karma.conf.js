'use strict';

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    reporters: ['dots'],

    files: [
      'spec/**/*_spec.es6'
    ],

    preprocessors: {
      'spec/**/*_spec.es6': ['webpack']
    },

    webpack: {
      // webpack configuration
      module: {
        loaders: [
          { test: /\.es6$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ]

  });
};
