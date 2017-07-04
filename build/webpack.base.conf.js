/**
 * webpack 基础配置 
 */
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
	console.info ( '__dirname = ' + __dirname)
	
	//var d = path.resolve(__dirname, '../../dist')
	//console.info (d)

	return path.join(__dirname, '..', dir)
}

// path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// /foo/bar/baz/asdf

console.log (resolve('src'))

module.exports = {
  entry: {
  	// 编译文件入口
    app: './src/main.js'
  },
  output: {
  	// 编译输出的根路径
    path: config.build.assetsRoot,
    // 输入文件名
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
  	// 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    //fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
