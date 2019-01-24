import Vue from 'vue'
import router from './router'
import Vuelidate from 'vuelidate'
import App from './App'
import store from './store'
import i18n from './lang'

import './statics/css/reset.css'
import './statics/css/common.js.css'
import './statics/css/media/width-767/common.js.css'
import './statics/css/media/width-992/common.js.css'
import './statics/css/media/width-1200/common.js.css'
import './statics/css/fonts/style.css'
import './statics/css/fonts/font-ali.css'
import './common/js/date'

import * as filters from './filters'

import gameAlert from './components/index'
import { show, hide } from './util/loading'
// import './mock'

import { Carousel, CarouselItem, Slider, InputNumber, Dropdown, DropdownMenu, DropdownItem,
  Select, Option, DatePicker, Badge, Message, MessageBox, Form, FormItem, Input, Switch, Tooltip,
  Button, Table, TableColumn, Radio, RadioGroup, Cascader, Pagination, Checkbox, RadioButton,
  Autocomplete, Loading, Dialog } from 'element-ui'
Vue.use(Carousel)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CarouselItem)
Vue.use(Slider)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Badge)
Vue.use(Vuelidate)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cascader)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(RadioButton)
Vue.use(Autocomplete)
Vue.use(Dialog)

Vue.use(gameAlert)

Vue.prototype.$message = Message
Vue.prototype.$message_box = MessageBox
Vue.prototype.$loadingShow = show
Vue.prototype.$loadingHide = hide
Vue.config.productionTip = false
Vue.prototype.$loadingTip = Loading

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // window.scrollTo(0, 0)
  // if (to.meta.title) document.title = to.meta.title
  next()
})
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
export default new Vue({
  components: { App },
  template: '<App />',
  router,
  store,
  i18n
}).$mount('#app')
