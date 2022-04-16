import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component (resolve) {
        require.ensure(['../view/index.vue'], () => {
          resolve(require('../view/index.vue'))
        })
      }
    },
    {
      path: '/Upload',
      name: 'Upload',
      component (resolve) {
        require.ensure(['../view/media/upload.vue'], () => {
          resolve(require('../view/media/upload.vue'))
        })
      }
    },
    {
      path: 'Share',
      name: 'Share',
      component (resolve) {
        require.ensure(['../view/media/share.vue'], () => {
          resolve(require('../view/media/share.vue'))
        })
      }
    },
    {
      path: '/Hom1e',
      name: 'Home1',
      component (resolve) {
        require.ensure(['../view/test/home1.vue'], () => {
          resolve(require('../view/test/home1.vue'))
        })
      }
    },
    {
      path: '/Echarts',
      name: 'Echarts',
      // component: Echarts
      component (resolve) {
        require.ensure(['../view/media/echarts.vue'], () => {
          resolve(require('../view/media/echarts.vue'))
        })
      }
    },
    {
      path: '/Progress',
      name: 'Progress',
      // component: Progress
      component (resolve) {
        require.ensure(['../view/media/progress.vue'], () => {
          resolve(require('../view/media/progress.vue'))
        })
      }
    },
    {
      path: '/Test3',
      name: 'Test3',
      // component: Progress
      component (resolve) {
        require.ensure(['../view/test/test3.vue'], () => {
          resolve(require('../view/test/test3.vue'))
        })
      }
    },
    {
      path: '/*',
      name: 'Index',
      // component: Index
      component (resolve) {
        require.ensure(['../view/index.vue'], () => {
          resolve(require('../view/index.vue'))
        })
      }
    }
  ]
})
