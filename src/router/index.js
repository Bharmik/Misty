import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../page/Index.vue'
import Share from '../page/Share.vue'
import Test from '../page/test.vue'
import Test2 from '../page/test2.vue'
import Hom1e from '../page/home1.vue'
import Echarts from '../page/echarts.vue'
import Progress from '../page/progress.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: 'share',
      name: 'share',
      component: Share
    },
    {
      path: '/Hom1e',
      name: 'Hom1e',
      component: Hom1e
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/Test2',
      name: 'Test2',
      component: Test2
    },
    {
      path: '/Echarts',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/Progress',
      name: 'Progress',
      component: Progress
    }
  ]
})
