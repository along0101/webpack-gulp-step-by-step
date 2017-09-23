const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	entry: {
		index: ['./index.js'],
		vendors: ['jquery', 'moment', 'bootstrap']
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'web-[name]-[hash:8].js'
	},

	plugins: [

		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false, // remove all comments
			},
			compress: {
				warnings: false
			}
		}),

		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
			filename: 'web-[name]-[hash:8].js',
			chunks: [
				'index', 'vendors'
			]
		}),

		new HtmlWebpackPlugin({
			template: './index.html',
			filename: './index.html',
			chunks: ['vendors', 'index']
		})
	]
}