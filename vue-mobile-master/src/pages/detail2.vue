<template>
  <div>
    <common-header :tittle="tittle" :showmore="true" :backtype="go"></common-header>
    <div class="page-content">
      <h1 @click="add">详情页面2</h1>
      <h1>{{data}}</h1>
      <h1>{{newdata}}</h1>
      <div style="height: 1000px;background-color: green"> </div>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '详情',
      data: 0,
      go:'go'
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
</style>
