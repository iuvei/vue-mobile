<template>
    <div class="announcement">
      <div class="width">
        <a style="position: relative;left: 60px;top: -24px;">平台公告</a>
        <div class="title">平台公告</div>
        <div class="content">
          <div v-for="(item, index) in list" :key="index">
            <header>{{item.title}}</header>
            <div class="date">
              <i class="iconfont icon-date"></i>
              <span>{{item.created_at}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getNoticeList} from '../../api/userCenter/systemCenter/announcement'
export default {
  name: 'announcement',
  data () {
    return {
      topping: [
        {
          title: '',
          date: '',
          author: '',
          text: '',
          list: []
        }
      ],
      list: [
        {},
        {}
      ]
    }
  },
  methods: {
    getList () {
      this.$loadingShow()
      getNoticeList()
        .then(data => {
          if (data.errno === 0) {
            this.list = data.data
            this.$loadingHide()
          }
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
  @import "../../statics/css/common.js.css";
  @media screen and (max-width: 1200px){
    .content>div{
      width: 40% !important;
    }
    .content>div:nth-child(odd){
      transform: translateX(-108.5%) !important;
    }
  }
  @media screen and (max-width: 981px){
    .content>div:nth-child(odd){
      transform: translateX(-111%) !important;
    }
  }
  @media screen and (max-width: 767px){
    .content>div:nth-child(odd){
      transform: translateX(-111.5%) !important;
    }
  }
.announcement{
  width: 100%;
}
.announcement .width{
  min-height: calc(100vh - 294px);
  /*overflow: hidden;*/
}
  .announcement .title{
    color: #333333;
    padding-top: 50px;
    width: 100%;
    font-size: 33px;
    font-weight: 700;
    line-height: 60px;
    border-image: linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0)) 1;
    border-bottom: 1px solid transparent;
  }
  .announcement .content{
    width: 100%;
    margin-bottom: 50px;
    min-height: 500px;
  }
  .announcement .content::before{
    content: '';
    display: block;
    min-height: 500px;
    /* min-height: calc(100vh - 494px); */
    width: 2px;
    background: #eaeaea;
    position: absolute;
    left: 50%;
  }
  .announcement .width .content>div{
    width: 530px;
    min-height: 83px;
    background-color: #fafafa;
    border: 1px solid #f1f1f1;
    border-radius: 3px;
    margin-left: 50%;
    transform: translateX(-50%);
    position: relative;
    margin-top: 40px;
    box-shadow: -1px 5px 7px #999999;
    padding: 20px 10px;
  }
  .announcement .width .content>div:hover{
    box-shadow: 0 2px 3px #9999996e;
  }
  .announcement .width .content>div::before{
    content: '';
    width: 30px;
    display: block;
    border: 1px solid #eaeaea;
    position: absolute;
    top: 25px;
  }
  .announcement .width .content>div::after{
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    background: #eaeaea;
    position: absolute;
    top: 20px;
    border-radius: 50%;
  }
  .announcement .width .content>div:nth-child(odd){
    transform: translateX(-562px)
  }
  .announcement .width .content>div:nth-child(odd)::before{
    right: -33px;
  }
  .announcement .width .content>div:nth-child(odd)::after{
    right: -39px;
  }
  .announcement .width .content>div:nth-child(even){
    transform: translateX(35px)
  }
  .announcement .width .content>div:nth-child(even)::before{
    left: -33px;
  }
  .announcement .width .content>div:nth-child(even)::after{
    left: -40px;
  }
  .announcement .width .content>div header{
    color: #333333;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
  }
  .announcement .width .content>div .date{
    padding-top: 10px;
  }
  .announcement .width .content>div .date i{
    font-size: 12px;
  }
</style>
