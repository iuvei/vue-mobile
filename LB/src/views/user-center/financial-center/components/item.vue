<template>
    <div class="item iconfont" :class="icon">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'item',
  props: {
    icon: {
      type: String
    }
  }
}
</script>

<style scoped>
.item{
  position: relative;
  padding-left: 50px;
  margin-bottom: 25px;
}
.item:before{
  /* content: "\xe7e3;"; */
  display: block;;
  position: absolute;
  left: -23px;
  top: 30px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #f17e2e;
  color: #ffffff;
  font-size: 28px;
  text-align: center;
  line-height: 46px;
}
.item .content{
  box-shadow: 0 5px 7px #999999;
  min-height: 110px;
  width: 85%;
  background: #efefef;
  border-radius: 5px;
  padding: 25px 20px;
}
.item .content:hover{
  box-shadow: 0 5px 7px #c4c4c4;
}
  .item .content:before{
    content: '';
    display: block;
    position: absolute;
    left: 40px;
    top: 43px;
    width: 20px;
    height: 20px;
    background: #efefef;
    transform: rotate(45deg);
    box-shadow: -1px 3px 1px #d3d3d3;
  }
</style>
