<template>
  <div class="tabs">
    <!--todo: 替换为router-link-->
    <router-link v-for="(link, index) in linkList"
                 :key="index"
                 :to="{ name: link.toName }">{{link.label}}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    linkList: {
      required: false,
      default: []
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
  .tabs {
    position: absolute;
    left: 0;
    top: 130px;
  }
  .tabs > a {
    display: block;
    margin-bottom: 9px;
    width: 27px;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    padding-top: 10px;
    color: #545454;
    border-radius: 2px;
    background-color: #eeeeee;
    height: 60px;
  }
  .tabs > a.router-link-active {
    background-color: #f17e2e;
    color: #FFFFFF;
  }
</style>
