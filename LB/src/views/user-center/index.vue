<template>
  <div class="main-wrapper">
    <div class="user-center-hader">
      <div class="width bread-crumbs">
        <i class="el-icon-menu"></i>
        <router-link :to="{name: 'account-management'}">首页</router-link>
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {isLogin} from '../../util/common'
export default {
  name: 'user-center',
  computed: {
    getLoginState () {
      isLogin()
      return this.$store.state.user.islogin
    }
  },
  watch: {
    getLoginState (e) {
      isLogin()
    }
  }
}
</script>

<style scoped>
  div{
    color: #777;
  }
  .user-center-hader{
    background-color: #f8f8f8;
    border-bottom: 1px solid #f4f4f4;
  }
  .bread-crumbs {
    line-height: 36px;
    height: 36px;
  }
  a{
    color: #f17e2e;
  }
  .el-icon-menu{
    color: #777;
  }
  .el-icon-d-arrow-right{
    color: #ccc;
    transform: scale(0.9);
  }
  .main-wrapper {
    background-color: #fff;
    min-height: 722px;
  }
</style>
