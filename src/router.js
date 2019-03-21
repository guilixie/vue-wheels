import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/tree'
		},
		{
			path: '/tree',
			name: 'tree-demo',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "tree-demo" */ './views/tree/index.vue'),
			// a meta field
			meta: { label: '树形控件', name: 'Tree' }
		}
	]
})
