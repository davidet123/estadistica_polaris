import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Resum from '../views/Resum.vue'
import Settings from '../views/Settings.vue'
import Test from '../views/Test.vue'
import Control from '../views/Control.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resum',
    name: 'Resum',
    component: Resum
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/control',
    name: 'Control',
    component: Control
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
