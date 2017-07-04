var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

console.info('prodEnv =' + JSON.stringify(prodEnv))
console.info(merge(prodEnv, {
	NODE_ENV: '"development"'
}))

// merge 功能与 $.extend 的功能类似
console.info(merge({
	"name": "zhangsan"
}, {
	"name": "lisi",
	age: 33
}))

// 为什么这里要使用merge ? 直接向prod.env.js里的那种写法不行吗？

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"'
})