const __LANG_KEY__ = 'language'

export function getLang () {
  return window.localStorage.getItem(__LANG_KEY__)
}

export function saveLang (lang) {
  return window.localStorage.setItem(__LANG_KEY__, lang)
}
