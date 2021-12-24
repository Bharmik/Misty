// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入echarts
import * as echarts from 'echarts'
// 引入progress
import VueProgress from 'vue-progress-path'
// 引入vuex-store
import store from './store/index'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(VueProgress, {
  // defaultShape: 'circle'
})

// require('./mock.js')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
