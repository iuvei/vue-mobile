<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="loading" v-if="isLoading">
      <div class="loading-container">
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
        <p>请求中...</p>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {},
  computed: {
    ...mapState('common', ['isLoading']),
  },
  mounted(){
    
  }
}

</script>
<style lang="scss">
@import 'assets/scss/global';

</style>
