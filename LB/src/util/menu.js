const __MENU_KEY__ = 'menu'
const __LOTTERY_KEY__ = 'lotteryId'
const __CREDIT_KEY__ = 'creditMenu'
const __TYPE_LIST_KEY__ = 'playTypeList'

export function getMenu () {
  return JSON.parse(window.sessionStorage.getItem(__MENU_KEY__))
}
export function getTypeList () {
  return JSON.parse(window.sessionStorage.getItem(__TYPE_LIST_KEY__))
}
export function getCreditMenu () {
  return JSON.parse(window.sessionStorage.getItem(__CREDIT_KEY__))
}
export function saveMenu (menu) {
  return window.sessionStorage.setItem(__MENU_KEY__, JSON.stringify(menu))
}
export function saveTypeList (typeList) {
  return window.sessionStorage.setItem(__TYPE_LIST_KEY__, JSON.stringify(typeList))
}
export function saveCreditMenu (menu) {
  return window.sessionStorage.setItem(__CREDIT_KEY__, JSON.stringify(menu))
}
export function saveLotteryId (lotteryId) {
  return window.sessionStorage.setItem(__LOTTERY_KEY__, lotteryId)
}
export function getLotteryId () {
  return window.sessionStorage.getItem(__LOTTERY_KEY__)
}
