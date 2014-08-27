var DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
  entry: './lib/main.js',
  output: {
    filename: './build/bundle.js',
    library: "ReactDraggable",
    libraryTarget: "var"
  },
  externals: {
    'react/addons': 'React'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV ? process.env.NODE_ENV : '')
      }
    })
  ]
};