import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	mode: 'history',
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
			meta: {
				label: '树形控件',
				name: 'Tree'
			}
		},
		{
			path: '/icon',
			name: 'icon-demo',
			component: () => import(/* webpackChunkName: "icon-demo" */ './views/icon/index.vue'),
			meta: {
				label: '矢量图标',
				name: 'SvgIcon'
			}
		},
		{
			path: '/fullscreen',
			name: 'full-screen-demo',
			component: () =>
				import(/* webpackChunkName: "full-screen-demo" */ './views/fullscreen/index.vue'),
			meta: {
				label: '全屏盒子',
				name: 'FullScreenBox'
			}
		},
		{
			path: '/resizebox',
			name: 'resize-box-demo',
			component: () =>
				import(/* webpackChunkName: "resize-box-demo" */ './views/resizebox/index.vue'),
			meta: {
				label: '可变尺寸盒子',
				name: 'ResizableBox'
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	document.title = `基本组件 - ${to.meta.label}`
	next()
})

export default router
