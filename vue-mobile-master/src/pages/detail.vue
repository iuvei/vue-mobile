<template>
  <div>
    <common-header :tittle="tittle" :showmore="true"></common-header>
    <div class="page-content">
      <h1 @click="add">详情页面</h1>
      <mt-button @click="todetail2">详情2</mt-button>
      <h1>{{data}}</h1>
      <h1>{{newdata}}</h1>
      <div style="height: 1000px;background-color: red"> </div>
    </div>
  </div>
</template>

<script>
import commonHeader from '../components/common-header'
export default {
  data() {
    return {
      tittle: '详情',
      data: 0
    }
  },
  components: {
    commonHeader
  },
  computed: {
    newdata: function() {
      return this.data + 1
    }
  },
  methods: {
    tohome() {
      this.$router.goBack()
    },
    add() {
      this.data++
    },
    todetail2() {
      this.$router.togo('/Home/Detail2')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
</style>
