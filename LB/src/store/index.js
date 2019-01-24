import Vuex from 'vuex'
import Vue from 'vue'

import getters from './getters'

import user from './modules/user'
import menu from './modules/menu'
import game from './modules/game'
import ssc from './modules/ssc'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    game,
    common,
    ssc
  },
  getters
})

export default store
