export default {
  /**
   * 函数防抖
   * debounde(fun, 500)
   * **/
  debounce: (fun, delay) => {
    let timer = null
    return () => {
      let that = this
      // let _args = args;
      clearTimeout(timer)
      timer = setTimeout(() => {
        fun.call(that, {})
      }, delay)
    }
  },
  /**
   * 函数节流
   * throttle(fun, 1000)
   * **/
  throttle: (fun, delay) => {
    let _lastTime = null

    return function () {
      let _nowTime = +new Date()
      if (_nowTime - _lastTime > delay || !_lastTime) {
        fun()
        _lastTime = _nowTime
      }
    }
  }
}
