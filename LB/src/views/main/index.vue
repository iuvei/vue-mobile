<template>
  <div>
    <h5-header v-if="$store.state.common.device === 'H5'"></h5-header>
    <side-bar v-if="$store.state.common.device === 'PC'"></side-bar>
    <top v-if="$store.state.common.device === 'PC'"></top>
    <main-header v-if="$store.state.common.device === 'PC'"></main-header>
    <router-view></router-view>
    <main-footer></main-footer>
  </div>
</template>

<script>
import top from './components/top_2018_8_29'
import mainHeader from './components/header_18_8_29'
import mainFooter from './components/footer_18_8_29'
import sideBar from '../side-bar/side-bar'
import H5Header from './components/h5Heder'
export default {
  components: { top, mainHeader, mainFooter, H5Header, sideBar }
}
</script>

<style scoped>
</style>
