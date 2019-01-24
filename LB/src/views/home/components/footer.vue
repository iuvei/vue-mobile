<template>
  <div class="home-footer">
    <a href="javascript:;">
      <img :src="logoZh" alt="logoZh">
    </a>
    <p>Copyright ⓒ 2013-2018 System All Rights Reserved</p>
    <a href="javascript:;">
      <img :src="logoEn" alt="logoEn">
    </a>
    <p>The best online gaming system provider in the world !</p>
  </div>
</template>

<script>
import logoZh from '../../../statics/img/footer_logo.png'
import logoEn from '../../../statics/img/home_logo_EN.png'
export default {
  data () {
    return {
      logoZh,
      logoEn
    }
  }
}
</script>

<style scoped>
.home-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  right: 0;
  height: 65px;
  color: #939393;
  line-height: 65px;
  background-color: #262732;
}
.home-footer p {
  margin: 0 20px 0 9px;
}
.home-footer img {
  vertical-align: middle;
}
.home-footer > * {
  display: inline-block;
}
</style>
