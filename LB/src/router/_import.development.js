module.exports = file => {
  try {
    return require('@/views/' + file + '.vue').default
  } catch (e) {
    console.log(e)
    return require('@/views/errorPage/404.vue').default
  }
}
