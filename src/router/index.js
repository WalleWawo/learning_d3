import Vue from 'vue'
import Router from 'vue-router'

const { prefix } = require('~/config').route
const Index = r => require.ensure([], () => r(require('src/views/index.vue')), 'index')
Vue.use(Router)

export function createRouter (store) {
  let router = new Router({
    mode: 'history',
    base: `${prefix}/`,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { name: 'home', path: '/', component: Index }
    ]
  })
  router.beforeEach((to, from, next) => {
    Object.assign(to.params, { store })
    next()
  })
  return router
}
