import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Detail from '@/pages/detail'
import DetailAnalyPage from '@/pages/detail/analysis'
import DetailCountPage from '@/pages/detail/count'
import DetailForecastPage from '@/pages/detail/forecast'
import DetailPublishPage from '@/pages/detail/publish'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		component: Index
	}, {
		path: '/detail',
		component: Detail,
		redirect: '/detail/analysis',
		children: [{
			path: 'analysis',
			component: DetailAnalyPage,
			meta : {
				requireAuth : true
			}
		}, {
			path: 'count',
			component: DetailCountPage
		}, {
			path: 'forecast',
			component: DetailForecastPage
		}, {
			path: 'publish',
			component: DetailPublishPage
		}]
	}]
})