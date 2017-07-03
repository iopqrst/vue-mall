// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
//import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(Vuex)

// doc -> https://github.com/hilongjw/vue-lazyload
//Vue.use(VueLazyLoad)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})

router.beforeEach((to, from , next)=>{ 
	
	console.info ( to.matched );
	
	next()
	
});