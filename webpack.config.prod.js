 path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
	    extensions: ['.js','.json']
	},
  module: {
		rules: [
			 {
		      test: /\.js$/,
		      exclude: /(node_modules)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['react','es2015'],
		          plugins: [require('babel-plugin-transform-object-rest-spread')]
		        }
		      }
		    }
		]
	}
};