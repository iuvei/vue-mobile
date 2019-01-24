<template>
    <div class="download">
      <div class="head">
        <div class="width">
          <router-link to="/index" tag="div" class="logo">
            <img :src="logo" alt="">
          </router-link>
          <div class="typeBtn">
            <div v-for="(item, index) in typeList" :key="index" @click="downloadType = item.type">
              <div class="pic">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              <div class="text-box">
                <p class="title">{{item.title}}</p>
                <p class="text">{{item.text}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div v-show="downloadType==='ios'">
          <div class="content-box">
            <div class="title">IOS手机客户端</div>
            <div class="sub-title">IOS原生态开发，最新数据加密技术。<br>快捷操作体验。支持 在线存款，提款，转帐等功能。</div>
            <div class="QRCode">
              <!--<div>-->
                <!--<div class="QRTitlt">下载方式一(H5)</div>-->
                <!--<div class="QRimg">-->
                  <!--<img src="http://phdtestc.goodgaming.com/index.php?s=/Index/qrcodeAppDownload/apptype/IOS" alt="">-->
                <!--</div>-->
              <!--</div>-->
              <div>
                <div class="QRTitlt">原生APP下载</div>
                <div class="QRimg">
                  <img src="http://phdtestc.goodgaming.com/index.php?s=/Index/qrcodeAppDownload/apptype/IOS2" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="downloadType==='android'">
          <div class="content-box">
            <div class="title">ANDROID手机客户端</div>
            <div class="sub-title">Andriod原生态开发，最新移动安全技术。<br>快捷操作体验。支持 在线存款，提款，转帐等功能</div>
            <div class="QRCode">
              <!--<div>-->
                <!--<div class="QRTitlt">下载方式一(H5)</div>-->
                <!--<div class="QRimg">-->
                  <!--<img src="http://phdtestc.goodgaming.com/index.php?s=/Index/qrcodeAppDownload/apptype/Android" alt="">-->
                <!--</div>-->
              <!--</div>-->
              <div>
                <div class="QRTitlt">原生APP下载</div>
                <div class="QRimg">
                  <img src="http://phdtestc.goodgaming.com/index.php?s=/Index/qrcodeAppDownload/apptype/Android" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="downloadType === 'html5'">
          <div class="content-box">
            <div class="title">HTML5移动网页版</div>
            <div class="sub-title">最新HTML交互响应技术 无论您是使用iPad，<br>Surface或者其他移动设备 都将提供最安全的防范。</div>
            <div class="btn">
              <a href="javascript:;">防劫持网址发布器</a>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../main/components/footer_18_8_29'
export default {
  name: 'download',
  components: {Footer},
  data () {
    return {
      logo: require('../../statics/img/header_logo_18_8_29.png'),
      typeList: [
        {icon: 'icon-CombinedShapex', title: '立博IOS版', text: '原生应用 精彩掌控中', type: 'ios'},
        {icon: 'icon-ai-app', title: '立博ANDROID版', text: '最新技术 安全护航', type: 'android'},
        {icon: 'icon-html', title: '立博HTML5版', text: '原生应用 精彩掌控中', type: 'html5'}
      ],
      downloadType: 'ios'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "../../statics/css/common.js.css";
@media screen and (max-width: 1240px){
  .download .head .width .text-box .title{
    font-size: 16px !important;
  }
  .download .head .width .text-box .text{
    font-size: 12px !important;
  }
}
@media screen and (max-width: 1000px){
  .download .head .logo{
    flex: 1 !important;
  }
  .download .head .width .text-box .title{
    font-size: 16px !important;
  }
  .download .head .width .text-box .text{
    font-size: 10px !important;
  }
  .download .head .pic i{
    font-size: 38px !important;
  }
}
@media screen and (max-width: 771px){
  .download .head .logo{
    line-height: 90px;
  }
  .download .head .logo img{
    height: 70px;
  }
}
@media screen and (max-width: 700px){
  .download .head .logo{
    display: none !important;
  }
}
  .download{
    width: 100%;
  }
  .download .head{
    width: 100%;
    background: #21212e;
  }
  .download .head .width{
    display: flex;
  }
  .download .head .width>div{
    height: 90px;
  }
.download .head .width .logo{
  flex: 2;
  line-height: 90px;
  display: flex;
}
.download .head .width .logo img{
  align-self: center;
  cursor: pointer;
}
.download .head .width .typeBtn{
  flex: 3;
  display: flex;
}
.download .head .width .typeBtn .pic{
  width: 56px;
  height: 58px;
  align-self: center;
  text-align: right;
  line-height: 58px;
}
.download .head .width .typeBtn .pic i{
  font-size: 44px;
  color: white;
}
.download .head .width .typeBtn .text-box{
  height: 58px;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
}
.download .head .width .typeBtn .title{
  font-size: 19px;
}
.download .head .width .typeBtn .text{}
  .download .head .width .typeBtn>div{
    color: #ffffff;
    cursor: pointer;
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .download .head .width .typeBtn>div:hover{
    background: #29293a;
  }
  .download .content{
    width: 100%;
    height: calc(100vh - 230px);
    min-height: 550px;
    background: url("../../statics/img/download_bg.jpg") no-repeat 50% 50%;
    background-size: 100% 100%;
  }
.download .content>div{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.download .content .content-box{
  width: 400px;
  height: 278px;
  align-self: center;
}
.download .content .content-box .title{
  text-align: center;
  font-size: 33px;
  font-weight: 700;
  margin-bottom: 10px;
}
.download .content .content-box .sub-title{
  font-size: 15px;
  text-align: center;
  letter-spacing: 0.5px;
  font-weight: 300;
  line-height: 1.47;
}
.download .content .content-box .btn{
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 30px;
}
.download .content .content-box .btn a{
  display: block;
  background: #0c81a2;
  width: 170px;
  text-align: center;
  height: 34px;
  line-height: 34px;
  color: #ffffff;
  border-radius: 5px;
  font-size: 15px;
}
.download .content .content-box .btn a:hover{
  background: #09afdf;
}
</style>

<style>
  .download .content .content-box .QRCode{
    display: flex;
    justify-content: space-around;
  }
  .download .content .content-box .QRCode>div{
    width: 185px;
  }
  .download .content .content-box .QRCode .QRTitlt{
    text-align: center;
    font-weight: 600;
    color: black;
    font-size: 17px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .download .content .content-box .QRCode .QRimg{
    width: 100%;
    text-align: center;
  }
  .download .content .content-box .QRCode .QRimg img{
    width: 70%;
  }
</style>
