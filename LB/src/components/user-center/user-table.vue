<template>
  <div class="user-table">
    <div class="table-head">
      <div :class="{userActive:userActive === index}" v-for="(item, index) in tablehade" :key="index">{{item.title}}</div>
    </div>
    <ul class="table-body">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'user-table',
  props: ['tablehade', 'userActive']
}
</script>

<style scoped>
  .user-table{
    width: 100%;
    text-align: center;
  }
  .table-head{
    width: 100%;
    height: 33px;
    background-color: #eb7e00;
    display: flex;
  }
  .table-head div{
    width: 100px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    line-height: 33px;
    flex: auto;
    overflow: hidden;
  }
  .table-head .userActive{
    width: 160px;
  }
  .table-body{
    width: 100%;
    border-bottom: 2px solid #eb7e00;
  }
  .table-body li{
    padding: 8px 0;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
  }
  .table-body li div{
    width: 100px;
    font-size: 12px;
    font-weight: 500;
    color: #777;
    flex: auto;
    overflow: hidden;
  }
  .table-body li div p{
    line-height: 17px;
    margin: 0 5px;
    word-break:break-all;
  }
  .table-body li:nth-of-type(odd){
    background-color: #f9f9f9;
  }
  .actions{
    color: #f17e2e;
    cursor: pointer;
    margin: 0 5px;
  }
  .green{
    color: green;
  }
  .red{
    color: red;
  }
  .nomsg{
    line-height: 32px;
    display: flex;
    justify-content: center;
  }
  .account-bonus .content .user-table .table-head div:nth-child(1){
    width: 30px;
  }
  .account-bonus .content .user-table .table-head div:nth-child(2){
    width: 30px;
  }
  .account-bonus .content .user-table .table-head div:nth-child(5){
    width: 30px;
  }
  .account-bonus .content .user-table .table-body li div:nth-child(1){
    width: 30px;
  }
  .account-bonus .content .user-table .table-body li div:nth-child(2){
    width: 30px;
  }
  .account-bonus .content .user-table .table-body li div:nth-child(5){
    width: 30px;
  }
</style>
