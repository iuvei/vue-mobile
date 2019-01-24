<template>
    <div class="activity-list-item">
      <div class="text">
        <span class="title">{{title}}</span>
        <p class="subtitle">活动日期</p>
        <p class="start-date" v-if="startDate !== ''">开始时间: {{startDate}}</p>
        <p class="end-date" v-if="endDate !== ''">结束时间: {{endDate}}</p>
        <a class="btn" :href="btnUrl">立即加入</a>
      </div>
      <div class="img">
        <img :src="BGIMG" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: 'activity-list-item',
  props: {
    title: String,
    BGIMG: String,
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    btnUrl: String
  }
}
</script>

<style scoped>
@media screen and (max-width: 1200px){
  .activity-list-item div{
  height: 200px !important;
}
.text p{
  font-size: 12px !important;
}
.title{
  font-size: 16px !important;
}
}
@media screen and (max-width: 981px){
  .text p {
    margin-bottom: 5px !important;
  }
  .title {
    margin: 6px 0 !important;
    line-height: 24px !important;
  }
}
.activity-list-item{
  width: 100%;
  padding: 35px;
  background: #ffffff;
  /*margin: 25px 0;*/
  margin-top: 25px;
  display: flex;
}
.activity-list-item div{
  height: 250px;
}
  .text{
    flex: 3;
    background: #3b3b47;
    text-align: center;
    color: #ffffff;
    padding-top: 15px;
    position: relative;
  }
  .text a{
    color: #ffffff;
    display: block;
    background: #ff7312;
    text-align: center;
    width: 50%;
    box-shadow: 0 4px 5px #15151554;
    padding: 4px 0;
    height: 30px;
    line-height: 22px;
    font-size: 15px;
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .text p{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .title{
    line-height: 30px;
    display: block;
    margin: 15px 0;
    font-size: 20px;
    font-weight: 600;
  }
  .img{
    flex: 7;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
</style>
