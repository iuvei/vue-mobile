import { gameAlertZhtz, gameAlertQrzdxx, gameAlertKxje, gameAlertKszh, gameAlertSyyx,
  gameAlertZdxq, gameAlertFqgd } from './game-alert/index'

const install = function (Vue) {
  Vue.component(gameAlertZhtz.name, gameAlertZhtz)
  Vue.component(gameAlertQrzdxx.name, gameAlertQrzdxx)
  Vue.component(gameAlertKxje.name, gameAlertKxje)
  Vue.component(gameAlertKszh.name, gameAlertKszh)
  Vue.component(gameAlertSyyx.name, gameAlertSyyx)
  Vue.component(gameAlertZdxq.name, gameAlertZdxq)
  Vue.component(gameAlertFqgd.name, gameAlertFqgd)
  Vue.prototype.$gameAlertZhtz = gameAlertZhtz
  Vue.prototype.$gameAlertQrzdxx = gameAlertQrzdxx
  Vue.prototype.$gameAlertKxje = gameAlertKxje
  Vue.prototype.$gameAlertKszh = gameAlertKszh
  Vue.prototype.$gameAlertSyyx = gameAlertSyyx
  Vue.prototype.$gameAlertZdxq = gameAlertZdxq
  Vue.prototype.$gameAlertFqgd = gameAlertFqgd
}

export default install
