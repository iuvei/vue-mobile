module.exports = file => () => {
  try {
    return import('@/views/' + file + '.vue')
  } catch (e) {
    console.log(e)
    return import('@/views/errorPage/404.vue')
  }
}
