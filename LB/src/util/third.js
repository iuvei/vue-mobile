export function setTird (gameType, third) {
  return window.sessionStorage.setItem(gameType, JSON.stringify(third))
}
export function getTird (gameType) {
  return JSON.parse(window.sessionStorage.getItem(gameType))
}

export function setPlatFormLen (gameType, platform) {
  return window.sessionStorage.setItem(gameType, JSON.stringify(platform))
}

export function getPlatFormLen (gameType) {
  return JSON.parse(window.sessionStorage.getItem(gameType)) || []
}

export function setHeaderNavList (list) {
  return window.sessionStorage.setItem('headNavList', JSON.stringify(list))
}

export function getHeaderNavList () {
  return JSON.parse(window.sessionStorage.getItem('headNavList'))
}
