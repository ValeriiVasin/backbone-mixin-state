/*eslint-env node*/
module.exports = {
  entry: {
    app: [
      './example.js'
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js|\.es6?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
