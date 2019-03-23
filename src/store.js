import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		icons: []
	},
	mutations: {
		updateIcons(state, icons) {
			state.icons = icons
		}
	},
	actions: {}
})
