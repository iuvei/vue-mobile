<template>
  <div class="wrap three">
    <router-link to="/Two">返回</router-link>
    {{msg}}
    <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
      <h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1><h1>第3层</h1>
  </div>
</template>

<script>
export default {
  name: 'Three',
  data () {
    return {
      msg: 'Three'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
