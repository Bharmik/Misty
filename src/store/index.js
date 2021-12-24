import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations
})

// import Vue from 'vue'
// import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import state from './state'
// import mutations from './mutations'
// import address from './modules/address'
// import search from './modules/search'
// import cart from './modules/cart'
// import detail from './modules/detail'
// import user from './modules/user'
// import order from './modules/order'
// import cardAccount from './modules/cardAccount'
// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//   },
//   actions: {
//     imgUrl ({ commit }, imageUrl) {
//       commit('sjd', imageUrl)
//     }
//   },
//   getters,
//   state: {
//     imgUrl: ''
//   },
//   // return {
//   //   width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,//兼容性获取屏幕宽度
//   //   height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight//兼容性获取屏幕高度
//   // }
//   mutations: {
//     sjd (state, imgUrl) {
//       state.imgUrl = imgUrl
//     }
//   }
// })
