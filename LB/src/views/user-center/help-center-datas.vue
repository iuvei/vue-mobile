<template>
    <div class="help-center-datas">
      <div class="width" style="position: relative">
        <router-link :to="{name: 'help-center'}" style="position: absolute;top: -24px;left: 60px;">帮助中心</router-link>
        <a style="position: absolute;top: -24px;left: 115px"><i class="el-icon-d-arrow-right" style="color: #ccc"></i>&nbsp;{{title}}</a>
        <div class="title">帮助中心</div>
        <div class="left">
          <div class="logo">
            <i class="iconfont" :class="icon"></i>
          </div>
        </div>
        <div class="right">
          <div class="head">
            <span>{{title}}</span>
            <router-link to="help-center">回帮助中心</router-link>
          </div>
          <div class="content">
            <div class="title">{{data.title}}</div>
            <div v-html="data.content"></div>
          </div>
          <div class="back">
            <router-link to="help-center">回帮助中心</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {GetCmsArticleDetail} from '../../api/userCenter/systemCenter/help-center.js'
export default {
  name: 'help-center-datas',
  data () {
    return {
      title: null,
      data: {},
      icon: '',
      details: {}
    }
  },
  methods: {
    GetCmsArticleDetail () {
      this.$loadingShow()
      const details = this.$route.query
      this.title = details.title
      this.icon = details.icon
      GetCmsArticleDetail(details.id)
        .then(res => {
          this.$loadingHide()
          // console.log(res)
          this.data = res.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created () {
    this.GetCmsArticleDetail()
  }
}
</script>

<style>
@import "../../statics/css/common.js.css";
@media screen and (max-width: 741px) {
  .help-center-datas .width .left{
    display: none !important;
  }
  .help-center-datas .width .right{
    margin: 0 auto;
  }
}
table tbody{
  border: 1px solid rgb(119, 119, 119);
}
table tbody tr{
  border-top: 1px solid rgb(119, 119, 119);
}
table tbody tr td{
  vertical-align: middle;
  border-right: 1px solid rgb(119, 119, 119);
}
.help-center-datas{
  background-color: #39384a;
  min-height: calc(100vh - 284px);
}
.help-center-datas .width{
  min-height: calc(100vh - 284px);
  display: flex;
  flex-wrap: wrap;
  background-color: white;
}
.help-center-datas .width>.title{
  padding: 0 33px;
  width: 100%;
  height: 68px;
  background: url('../../statics/img/help_center_title_bg.jpg');
  background-size: 100% 100%;
  font-size: 33px;
  font-weight: 600;
  line-height: 68px;
  color: black;
}
/* .help-center-datas .width .left,.right{
  padding-top: 70px;
} */
.help-center-datas .width .left{
  height: calc(100vh - 400px);
  width: 10%;
}
.help-center-datas .width .left .logo{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  color: white;
  background-color: #4babbf;
  margin-left: 30%;
  margin-right: 15px;
}
.help-center-datas .width .left .logo i{
  font-size: 32px;
}
.help-center-datas .width .right{
  width: 90%;
}
.help-center-datas .width .right .head{
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(left, #cacaca , #fff) 5% stretch;
}
.help-center-datas .width .right .head span{
  line-height: 50px;
  font-size: 24px;
  color: #333333;
  font-weight: 500;
}
.help-center-datas .width .right .head a{
  display: inline-block;
  line-height: 36px;
  color: white;
  background-color: #00a7eb;
  border: 1px solid #00a7eb;
  font-size: 14px;
  cursor: pointer;
  width: 112px;
  text-align: center;
  border-radius: 3px;
  margin-left: 20px;
}
.help-center-datas .width .right .head a:hover{
  background-color: #0282b4;
}
.help-center-datas .width .right .content{
  padding-bottom: 30px;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(left, #cacaca , #fff) 5% stretch;
}
.help-center-datas .width .right .content .title{
  color: #eb7e00;
  margin-bottom: 30px;
  margin-top: 10px;
  font-size: 19px;
}
.help-center-datas .width .right .content .subTitle{
  background-color: #eb7e00;
  padding-left: 15px;
  color: white;
  font-size: 13px;
  height: 26px;
  line-height: 26px;
  margin-top: 40px;
}
.help-center-datas .width .right .content .dataHtml{
  color: #777777;
  font-size: 13px;
}
.help-center-datas .width .right .content .dataHtml p{
  line-height: 26px;
   color: #777777;
}
.help-center-datas .width .right .content .dataHtml p .font{
  color: #eb7e00;
}
.help-center-datas .width .right .content .dataHtml p .mark{
  color: white;
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #eb7e00;
  border-radius: 50%;
}
.help-center-datas .width .right .content .dataHtml ol li{
  line-height: 26px;
  color: #777777;
}
.help-center-datas .width .right .content .dataHtml ol li i{
  margin-right: 10px;
}
.help-center-datas .width .right .content .dataHtml .img img{
  margin: 10px 0;
  border-radius: 10px;
  border: 2px solid #eb7e00;
}
.help-center-datas .width .right .back{
  padding: 20px 0;
  display: flex;
  justify-content: center;
}
.help-center-datas .width .right .back a{
  display: inline-block;
  line-height: 36px;
  color: white;
  background-color: #00a7eb;
  border: 1px solid #00a7eb;
  font-size: 14px;
  cursor: pointer;
  width: 112px;
  text-align: center;
  border-radius: 3px;
  margin-left: 20px;
}
.help-center-datas .width .right .back a:hover{
  background-color: #0282b4;
}
</style>
