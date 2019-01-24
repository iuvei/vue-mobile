export const __TOKEN_KEY__ = '__token__'

export function getToken () {
  return window.sessionStorage.getItem(__TOKEN_KEY__)
}

export function saveToken (token) {
  return window.sessionStorage.setItem(__TOKEN_KEY__, token)
}
export function delToken () {
  return window.sessionStorage.removeItem(__TOKEN_KEY__)
}
export function logOut () {
  return window.sessionStorage.clear()
}

export function createGameRoutes (menus) {
  if (!menus || !menus.length) {
    menus.forEach(menu => {
    })
  }
}
