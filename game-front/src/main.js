import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'

//引入路由js
import routes from './routes'

import Mock from './mock'
// Mock.bootstrap();
import './assets/fonts/iconfont.css'
//剪贴板插件
import VueClipboard from 'vue-clipboard2'

//引入vuex
import store from './store/index.js'

import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = '/api/'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueClipboard)
//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//http request 拦截器
axios.interceptors.request.use(
  config => {
    store.commit('common/SET_ISLOADING',true);
    return config;
  },
  err => {
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
    window.setTimeout(()=>{
    store.commit('common/SET_ISLOADING',false);
  },1000)
    return response.data;
  },
  error => {
  store.commit('common/SET_ISLOADING',false);
});

window.onresize = function temp() {
    //针对1366分辨率屏幕 
    if(document.body.clientWidth < 1366){
        store.commit('common/SET_ISSMALLWINDOW',true);
    }else{
        store.commit('common/SET_ISSMALLWINDOW',false);
    }
};

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

