import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AppOverview from './views/AppOverview.vue'
import Error from './views/Error.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/error/:type',
            name: 'error',
            component: Error
        },
        {
            path: '/app/:id',
            name: 'appOverview',
            component: AppOverview
        }
    ]
})
