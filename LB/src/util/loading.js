import { Loading } from 'element-ui'
import getScrollBarWidth from 'element-ui/src/utils/scrollbar-width'

let loading

export function show () {
  if (loading) return
  loading = Loading.service({
    lock: false,
    background: 'rgba(0, 0, 0, .8)'
  })
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${getScrollBarWidth()}px`
  return loading
}

export function hide () {
  if (!loading) return
  if (loading) {
    loading.close()
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = `0px`
  }
  loading = null
}

export function setStyleWhenMask () {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${getScrollBarWidth()}px`
}

export function cancelStyleWhenMask () {
  document.body.style.paddingRight = `0px`
  document.body.style.overflow = 'auto'
}
