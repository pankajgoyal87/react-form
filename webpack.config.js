var debug = true;
var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: "./main.js",
	context: path.join(__dirname,"src"),
	devtool: debug?"inline-sourcemap":null,
	output: {
		filename: "bundle.js"
	},
	resolve: {
	    extensions: ['.js','.json']
	},
	devServer: { inline: true },
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
