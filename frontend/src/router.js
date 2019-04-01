import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AppOverview from './views/AppOverview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/app/:id',
      name: 'appOverview',
      component: AppOverview
    }
  ]
})
