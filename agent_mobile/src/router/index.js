import Vue from 'vue'
import Router from 'vue-router'
import Two from '@/components/Two'
import Three from '@/components/Three'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Two',
      name: 'Two',
      component: Two
    },
    {
      path: '/Three',
      name: 'Three',
      component: Three
    }
  ]
})
