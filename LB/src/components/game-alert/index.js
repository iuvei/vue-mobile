import Vue from 'vue'
import zhtzAlert from './src/zhtz-alert'
import qrzdxxAlert from './src/qrzzxx-alert'
import kxjeAlert from './src/kxje-alert'
import kszhAlert from './src/chasingNumberAlert'
import syyxAlert from './src/syyx-alert'
import zdxqAlert from './src/zdxq-alert'
import fqgdAlert from './src/fqgd-alert'

import { merge } from '../../util'
import store from '../../store'

let instanceZhtz
let instanceQrzdxx
let instanceKxje
let instanceKszh
let instanceSyyx
let instanceZdxq
let instanceFqgd
let GameZhtzAlertConstructor = Vue.extend(zhtzAlert)
let GameQrzdxxAlertConstructor = Vue.extend(qrzdxxAlert)
let GameKxjeAlertConstructor = Vue.extend(kxjeAlert)
let GameKszhAlertConstructor = Vue.extend(kszhAlert)
let GameSyyxAlertConstructor = Vue.extend(syyxAlert)
let GameZdxqAlertConstructor = Vue.extend(zdxqAlert)
let GameFqgdAlertConstructor = Vue.extend(fqgdAlert)

let initInstanceFqgd = () => {
  instanceFqgd = new GameFqgdAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceFqgd.$el)
}
let initInstanceZdxq = () => {
  instanceZdxq = new GameZdxqAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceZdxq.$el)
}
let initInstanceKszh = () => {
  instanceKszh = new GameKszhAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceKszh.$el)
}
let initInstanceZhtz = () => {
  instanceZhtz = new GameZhtzAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceZhtz.$el)
}
let initInstanceQrzdxx = () => {
  instanceQrzdxx = new GameQrzdxxAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceQrzdxx.$el)
}
let initInstanceKxje = () => {
  instanceKxje = new GameKxjeAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceKxje.$el)
}
let initInstanceSyyx = () => {
  instanceSyyx = new GameSyyxAlertConstructor({
    el: document.createElement('div'),
    store
  })
  document.body.appendChild(instanceSyyx.$el)
}

export const gameAlertFqgd = (options = {}) => {
  initInstanceFqgd()
  merge(instanceFqgd.$data, options)
  return new Promise((resolve, reject) => {
    instanceFqgd.show = true
    let success = instanceFqgd.success
    let cancel = instanceFqgd.cancel
    instanceFqgd.success = () => {
      success()
      resolve('ok')
    }
    instanceFqgd.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}
export const gameAlertZdxq = (options = {}) => {
  initInstanceZdxq()
  merge(instanceZdxq.$data, options)
  return new Promise((resolve, reject) => {
    instanceZdxq.show = true
    let success = instanceZdxq.success
    let cancel = instanceZdxq.cancel
    instanceZdxq.success = () => {
      success()
      resolve('ok')
    }
    instanceZdxq.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}
export const gameAlertKszh = (options = {}) => {
  initInstanceKszh()
  merge(instanceKszh.$data, options)
  return new Promise((resolve, reject) => {
    instanceKszh.show = true
    let success = instanceKszh.success
    let cancel = instanceKszh.cancel
    instanceKszh.success = () => {
      success()
      resolve('ok')
    }
    instanceKszh.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}
export const gameAlertZhtz = (options = {}) => {
  initInstanceZhtz()
  merge(instanceZhtz.$data, options)
  return new Promise((resolve, reject) => {
    instanceZhtz.show = true
    let success = instanceZhtz.success
    let cancel = instanceZhtz.cancel
    instanceZhtz.success = () => {
      success()
      resolve('ok')
    }
    instanceZhtz.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}

export const gameAlertQrzdxx = (options = {}) => {
  initInstanceQrzdxx()
  merge(instanceQrzdxx.$data, options)
  return new Promise((resolve, reject) => {
    instanceQrzdxx.show = true
    let success = instanceQrzdxx.success
    let cancel = instanceQrzdxx.cancel
    instanceQrzdxx.success = () => {
      success()
      resolve('ok')
    }
    instanceQrzdxx.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}

export const gameAlertKxje = (options = {}) => {
  initInstanceKxje()
  merge(instanceKxje.$data, options)
  return new Promise((resolve, reject) => {
    instanceKxje.show = true
    let success = instanceKxje.success
    let cancel = instanceKxje.cancel
    instanceKxje.success = () => {
      success()
      resolve('ok')
    }
    instanceKxje.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}
export const gameAlertSyyx = (options = {}) => {
  initInstanceSyyx()
  merge(instanceSyyx.$data, options)
  return new Promise((resolve, reject) => {
    instanceSyyx.show = true
    let success = instanceSyyx.success
    let cancel = instanceSyyx.cancel
    instanceSyyx.success = () => {
      success()
      resolve('ok')
    }
    instanceSyyx.cancel = (err) => {
      cancel()
      reject(err)
    }
  })
}
