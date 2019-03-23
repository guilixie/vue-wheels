import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import './App.scss'

// auto import icons
import icons from './assets/icons'

// auto register components
import './autoreg'

Vue.config.productionTip = false

// store icons
store.commit('updateIcons', icons)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
