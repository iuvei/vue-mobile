import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 和togo一样，但是不能返回，用于登陆页
Router.prototype.toLogin = function (path) {
  this.isleft = true
  this.isright = false
  this.replace(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack2 = function () {
  this.isright = false
  this.isleft = true
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: (resolve) => require(['@/pages/index/home'], resolve)
        },
        {
          path: '/story',
          name: 'story',
          component: (resolve) => require(['@/pages/index/story'], resolve)
        },
        {
          path: '/footprints',
          name: 'footprints',
          component: (resolve) => require(['@/pages/index/footprints'], resolve)
        },
        {
          path: '/day',
          name: 'day',
          component: (resolve) => require(['@/pages/index/day'], resolve)
        }
      ]
    },
    {
      path: '/Home/Detail',
      name: 'Detail',
      component: (resolve) => require(['@/pages/detail'], resolve)
    },
    {
      path: '/Home/Detail2',
      name: 'Detail2',
      component: (resolve) => require(['@/pages/detail2'], resolve)
    },
    {
      path: '/Login',
      name: 'Login',
      component: (resolve) => require(['@/pages/login'], resolve)
    },
    {
      path: '/List',
      name: 'List',
      component: (resolve) => require(['@/pages/list'], resolve)
    }
  ]
})
