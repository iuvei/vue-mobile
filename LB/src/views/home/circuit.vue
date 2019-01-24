<template>
  <!--todo： 图片加载页面抖动待优化-->
  <div class="circuit">
    <div class="circuit-container">
      <div class="circuit-container-top clear-fix">
        <a href="javascript:;">
          <img :src="logoImg" alt="logo">
        </a>
        <div class="btns">
          <router-link :to="{name: 'download'}">下载中心</router-link>
          <a href="javascript:;" @click="openNewCustomerServiceWindow">在线客服</a>
        </div>
      </div>
      <div class="circuit-container-content">
        <div class="circuit-container-content-title clear-fix">
          <h4>线路检测</h4>
          <div>
            <p>请选择最快的链接进入网站</p>
            <div><i >{{timer}}</i>秒后将自动跳到第一个链接</div>
          </div>
        </div>
        <ul class="circuit-list ">
          <li class="clear-fix"  v-for="item in items"  :key="item.id">
            <span class="input_show">{{item.time}}</span>
            <img :src="connectionIcon" alt="connectionIcon">
            <span class="input_show">{{item.location}}</span>
            <img :src="connectionIcon" alt="connectionIcon">
            <a :href="item.location" >打开网站</a>
          </li>

        </ul>
        <a href="javascript:;">
          <img :src="refreshIcon" alt="refreshIcon" @click="checkSpeed">
          点击重新刷新检测您的访问速度
        </a>
        <p>温馨提示：反映时间越小，网站速度越快，越快的网址排在越上面。</p>
      </div>
      <div class="choose-advice clear-fix">
        <div class="">
          <h4>浏览器推荐</h4>
          <p>为了保证最佳使用体验，请保证您的屏幕分辨率在1280及以上，</p>
          <p> 推荐您使用以下浏览器： 谷歌游览器</p>
        </div>
        <div class="">
          <h4>如果检测后不能登录请按以下方式操作：</h4>
          <p> ★打开IE游览器：</p>
          <p> 打开IE游览器，选择：工具 -> Internet选项 -> 再选择(删除游览记录)-> 删除 ->重启IE</p>
        </div>
        <div class="">
          <h4>如果您的体验过程中出现卡顿：</h4>
          <p> 请在您打开本界面选择其他线路看看。</p>
          <p>  如果您在访问我们的域名时被跳转到其他网站，那是您当地的电信运营商dns被劫持，您可以通过修改电脑本地dns来解决</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ping from 'ping.js'
import { getCircuitList } from '@/api/circuit/circuit'
import logoImg from '../../statics/img/header_logo_18_8_29.png'
import connectionIcon from '../../statics/img/connection_icon.png'
import refreshIcon from '../../statics/img/refresh_icon.png'
import { openNewCustomerServiceWindow } from '../../util/common'
export default {
  props: {
    time: {
      type: Number,
      default: 8
    }
  },
  data () {
    return {
      logoImg,
      connectionIcon,
      refreshIcon,
      items: [],
      timer: 8
    }
  },
  methods: {
    start () {
      this.timer = this.time
      this.startTimer()
    },
    startTimer () {
      // this.timer--
      // if (this.timer > 0) {
      //   setTimeout(this.startTimer.bind(this), 1000)
      // } else {
      //   location.href = this.items[0].location
      // }
    },
    compareFunction () {
      return function (object1, object2) {
        var value1 = parseInt(object1.time)
        var value2 = parseInt(object2.time)
        if (value1 < value2) {
          return 1
        } else if (value1 > value2) {
          return -1
        } else {
          return 0
        }
      }
    },
    checkSpeed () {
      getCircuitList()
        .then(res => {
          this.items = []
          if (res.errno === 0) {
            for (let key in res.data) {
              let link = 'http://' + res.data[key].domain
              new Ping().ping(link, (err, requestTime) => {
                console.log(link + 'ping', requestTime)
                if (err) {
                  this.items.push({
                    time: '10000ms',
                    location: link
                  })
                } else {
                  this.items.push({
                    time: requestTime + 'ms',
                    location: link
                  })
                }
              })
            }
            console.log(this.items.sort(this.compareFunction()))
          }
          /*eslint-disable*/
          this.start()
        }).catch(function (error) {
        console.log(error)
      })
    },
    openNewCustomerServiceWindow () {
      openNewCustomerServiceWindow()
    }
  },
  created () {
    this.checkSpeed()
  }
}
</script>

<style scoped>
  .circuit {
    position: relative;
    min-height: 978px;
    /*top: 0;
    left: 0;
    right: 0;
    bottom: 0;*/
    background: url("../../statics/img/circuit_bg.jpg") no-repeat 0 0;
    background-size: 100% 100%;
  }
  .circuit-container {
    position: absolute;
    width: 954px;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-50%);
    transform: translate3d(-50%, -50%, 0);
  }
  .circuit-container-top {
    position: relative;
  }
  .circuit-container-top > a {
    float: left;
  }
  .circuit-container-top > .btns {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .circuit-container-top > .btns a {
    font-size: 14px;
    color: #bfbfbf;
  }
  .circuit-container-top > .btns a:nth-of-type(1) {
    padding-right: 12px;
    border-right: 1px solid #bfbfbf;
    margin-right: 10px;
  }
  .circuit-container-content {
    width: 100%;
    height: 494px;
    border: 2px solid #8f8f92;
    margin-top: 22px;
    border-radius: 6px;
    padding: 37px 0;
    overflow: hidden;
  }
  .circuit-container-content .circuit-container-content-title {
    width: 80%;
    display: flex;
    justify-content: center;
    padding-bottom: 22px;
    margin: 0 auto;
    border-bottom: 1px solid #5b5c5f;
  }
  .circuit-container-content .circuit-container-content-title > h4 {
    font-size: 47px;
    margin-right: 20px;
    font-weight: normal;
    color: #44cce8;
  }
  .circuit-container-content .circuit-container-content-title > div > p{
    font-size: 20px;
    color: #c2c4ca;
    padding-top: 5px;
    margin-bottom: 8px;
  }
  .circuit-container-content .circuit-container-content-title > div > div {
    font-size: 14px;
    color: #c3c3c3;
  }
  .circuit-container-content .circuit-container-content-title > div > div > i {
    font-style: normal;
    color: #16b2c4;
    font-weight: bold;
    margin-right: 6px;
  }
  .circuit-container-content .circuit-list {
    margin-top: 30px;
  }
  .circuit-container-content .circuit-list > li {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    line-height: 40px;
    height: 40px;
  }
  .circuit-container-content .circuit-list > li span:nth-of-type(1) {
    float: left;
    width: 104px;
    text-align: center;
  }
  .circuit-container-content .circuit-list > li span.input_show {
    height: 40px;
    border: 2px solid #474a57;
    font-size: 14px;
    color: #080808;
    background-color: #ebebeb;
  }
  .circuit-container-content .circuit-list > li span:nth-of-type(2) {
    float: left;
    width: 201px;
    padding-left: 18px;
    color: #474a57;
  }
  .circuit-container-content .circuit-list > li img {
    width: 19px;
    height: 13px;
    margin: 14px 8px 0 8px;
  }

  .circuit-container-content .circuit-list > li a {
    float: left;
    width: 121px;
    height: 100%;
    background-color: #18889f;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
    color: #FFFFFF;
    font-weight: bold;
  }
  .circuit-container-content > a {
    margin: 24px auto 27px auto;
    display: block;
    line-height: 49px;
    background-color: #18889f;
    border-radius: 5px;
    padding-left: 12px;
    width: 332px;
    font-size: 18px;
    color: #ffffff;
    font-weight: bold;
  }
  .circuit-container-content > a > img {
    vertical-align: middle;
    margin-right: 7px;
  }
  .circuit-container-content > p {
    text-align: center;
    font-size: 14px;
    color: #7f7f7f;
  }
  /* --------------------------------------*/
  .choose-advice {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .choose-advice > div {
    width: 30%;
  }
  .choose-advice > div > h4 {
    font-size: 17px;
    color: #bdbdbe;
    margin-bottom: 5px;
  }
  .choose-advice > div > p {
    font-size: 14px;
    color: #8f8f90;
    line-height: 28px;
  }
  @media screen and (min-width:990px) and (max-width:1241px){
    .circuit-container{
      width: 80%;
    }
  }
  @media screen and (min-width:768px) and (max-width:991px){
    .circuit-container{
      width: 80%;
    }
  }
  @media screen and (max-width: 767px){
    .circuit-container{
      width: 90%;
    }
    .choose-advice > div{
      width: 100%;
    }
    .circuit-container-content .circuit-container-content-title > h4{
      font-size: 34px;
    }
    .circuit-container-content .circuit-container-content-title > div > p{
      font-size: 17px;
    }
  }
  @media screen and (max-width: 600px) {
    .circuit-container-content .circuit-container-content-title > h4{
      font-size: 24px;
    }
    .circuit-container-content .circuit-container-content-title > div > p{
      font-size: 12px;
    }
    .circuit-container-content .circuit-container-content-title > div > div{
      font-size: 12px;
    }
    .circuit-container-content .circuit-list > li img{
      display: none;
    }
  }
</style>
