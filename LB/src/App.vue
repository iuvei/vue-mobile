<template>
    <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
import { screenShowMap } from './config/game-default-config'
import { SET_SCREEN_STATUS, SET_DEVICE } from './store/nameSpace'
import Auxiliary from './common/Auxiliary/auxiliary/index'

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    getScreenStatus () {
      const that = this
      if (window.addEventListener) {
        let changNowStatusFunc = () => {
          const windowWidth = document.body.clientWidth
          if (windowWidth > screenShowMap.first) { // 设置为状态0
            that.$store.commit(SET_SCREEN_STATUS, 0)
            that.$store.commit(SET_DEVICE, 'PC')
          } else if (windowWidth < screenShowMap.first && windowWidth > screenShowMap.second) { // 状态2
            that.$store.commit(SET_SCREEN_STATUS, 1)
            that.$store.commit(SET_DEVICE, 'PC')
          } else if (windowWidth < screenShowMap.second && windowWidth > screenShowMap.third) { // 状态3
            that.$store.commit(SET_SCREEN_STATUS, 2)
            that.$store.commit(SET_DEVICE, 'PC')
          } else if (windowWidth < screenShowMap.third) { // 状态4
            that.$store.commit(SET_SCREEN_STATUS, 3)
            that.$store.commit(SET_DEVICE, 'H5')
          }
          // console.log(screenShowMap.first, windowWidth)
        }
        let windowResizeFunc = Auxiliary.throttle(changNowStatusFunc, 100)
        window.addEventListener('resize', windowResizeFunc)
        changNowStatusFunc()
      }
    }
  },
  created () {
    this.getScreenStatus()
  }
}
</script>

<style scoped>

</style>
