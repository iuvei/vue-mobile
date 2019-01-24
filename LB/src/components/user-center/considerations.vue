<template>
  <div class="considerations">
    <div class="titles">
      代理推广注意事项
    </div>
    <div class="text">
      <p>{{considerationsMsg.one}}</p>
      <p>{{considerationsMsg.two}}</p>
      <p>{{considerationsMsg.three}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'considerations',
  props: ['considerationsMsg']
}
</script>

<style scoped>
  .considerations{
    width: 420px;
    padding:  0 30px;
    overflow: hidden;
    float: left;
  }
  .considerations .titles{
    height: 46px;
    line-height: 38px;
    font-size: 15px;;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  .considerations .text{
    font-size: 12px;
    line-height: 26px;
    font-weight: 300;
    padding: 30px 0;
  }
</style>
