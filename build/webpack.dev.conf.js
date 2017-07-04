/**
 * webpack 开发环境配置
 */
var utils = require('./utils')
var webpack = require('webpack')
// config/index.js
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

// html-webpack-plugin 可以自动生成html,并且注入到.html文件中
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 将Hot-reload 相对路径添加到webpack.base.conf 对应的entry前
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
	baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.dev.cssSourceMap
		})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config.dev.env
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		// HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
		new webpack.HotModuleReplacementPlugin(),
		// 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		new FriendlyErrorsPlugin()
	]
})