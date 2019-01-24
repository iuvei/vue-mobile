<template>
  <div class="footer">
    <div class="footer-wrapper width">
      <div class="link-list clear-fix">
        <ul class="functional-link">
          <li>
            <router-link :to="{ name: 'about' }">立博品牌</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'help-center' }">帮助中心</router-link>
          </li>
          <li>
            <a href="javascript:;" @click="openNewCustomerServiceWindow">联系我们</a>
          </li>
          <li>
            <router-link :to="{ name: 'download' }" href="javascript:;">手机客户端</router-link>
          </li>
          <!-- <li>
            <a href="javascript:;">PC客户端</a>
          </li> -->
          <li>
            <router-link :to="{ name: 'antiHijack' }">防劫持教程</router-link>
          </li>
        </ul>
        <ul class="icon_links">
          <li>
            <a href="javascript:;">
              <img :src="wechartIcon" alt="wechartIcon">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="facebookIcon" alt="facebookIcon">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="googleIcon" alt="googleIcon">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="birdeIcon" alt="birdeIcon">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="pIcon" alt="pIcon">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="vIcon" alt="vIcon">
            </a>
          </li>
        </ul>
      </div>
      <div class="group-links clear-fix">
        <ul class="clear-fix">
          <li>
            <a href="javascript:;">
              <img :src="companyIcon1" alt="companyIcon1">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon2" alt="companyIcon2">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon3" alt="companyIcon3">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon4" alt="companyIcon4">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon5" alt="companyIcon5">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon6" alt="companyIcon6">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon7" alt="companyIcon7">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon8" alt="companyIcon8">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon9" alt="companyIcon9">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img :src="companyIcon10" alt="companyIcon10">
            </a>
          </li>
        </ul>
        <a href="javascript:;" class="yy_icon">
          <img :src="yyjtLogo" alt="yyjtLogo">
        </a>
      </div>
      <div class="service-terms clear-fix">
        <p>立博网 Copyright© 2018 LB All Rights Reserved</p>
        <a href="javascript:;">博彩委员会监管服务条</a>
        <p>全球最优秀的博娱游戏系统供应商</p>
      </div>
    </div>
  </div>
</template>

<script>
import wechartIcon from '../../../statics/img/r_01_link.png'
import facebookIcon from '../../../statics/img/r_02_link.png'
import googleIcon from '../../../statics/img/r_03_link.png'
import birdeIcon from '../../../statics/img/r_04_link.png'
import pIcon from '../../../statics/img/r_05_link.png'
import vIcon from '../../../statics/img/r_06_link.png'
import wechartIconHov from '../../../statics/img/r_01_hover.png'
import facebookIconHov from '../../../statics/img/r_02_hover.png'
import googleIconHov from '../../../statics/img/r_03_hover.png'
import birdeIconHov from '../../../statics/img/r_04_hover.png'
import pIconHov from '../../../statics/img/r_05_hover.png'
import vIconHov from '../../../statics/img/r_06_hover.png'

import companyIcon1 from '../../../statics/img/l_01_link.png'
import companyIcon2 from '../../../statics/img/l_02_link.png'
import companyIcon3 from '../../../statics/img/l_03_link.png'
import companyIcon4 from '../../../statics/img/l_04_link.png'
import companyIcon5 from '../../../statics/img/l_05_link.png'
import companyIcon6 from '../../../statics/img/l_06_link.png'
import companyIcon7 from '../../../statics/img/l_07_link.png'
import companyIcon8 from '../../../statics/img/l_08_link.png'
import companyIcon9 from '../../../statics/img/l_09_link.png'
import companyIcon10 from '../../../statics/img/l_10_link.png'

import companyIcon1Hov from '../../../statics/img/l_01_hover.png'
import companyIcon2Hov from '../../../statics/img/l_02_hover.png'
import companyIcon3Hov from '../../../statics/img/l_03_hover.png'
import companyIcon4Hov from '../../../statics/img/l_04_hover.png'
import companyIcon5Hov from '../../../statics/img/l_05_hover.png'
import companyIcon6Hov from '../../../statics/img/l_06_hover.png'
import companyIcon7Hov from '../../../statics/img/l_07_hover.png'
import companyIcon8Hov from '../../../statics/img/l_08_hover.png'
import companyIcon9Hov from '../../../statics/img/l_09_hover.png'
import companyIcon10Hov from '../../../statics/img/l_10_hover.png'

import yyjtLogo from '../../../statics/img/yyjt_logo.png'

import { openNewCustomerServiceWindow } from '../../../util/common'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      yyjtLogo,
      wechartIcon,
      facebookIcon,
      googleIcon,
      birdeIcon,
      pIcon,
      vIcon,
      wechartIconHov,
      facebookIconHov,
      googleIconHov,
      birdeIconHov,
      pIconHov,
      vIconHov,
      companyIcon1,
      companyIcon2,
      companyIcon3,
      companyIcon4,
      companyIcon5,
      companyIcon6,
      companyIcon7,
      companyIcon8,
      companyIcon9,
      companyIcon10,
      companyIcon1Hov,
      companyIcon2Hov,
      companyIcon3Hov,
      companyIcon4Hov,
      companyIcon5Hov,
      companyIcon6Hov,
      companyIcon7Hov,
      companyIcon8Hov,
      companyIcon9Hov,
      companyIcon10Hov
    }
  },
  computed: {
    ...mapGetters([
      'customerServiceInfo'
    ])
  },
  methods: {
    openNewCustomerServiceWindow () {
      openNewCustomerServiceWindow()
    }
  },
  created () {
    if (!this.customerServiceInfo) this.$store.dispatch('getCustomerServiceInfo')
  }
}
</script>
<style scoped>
  .footer {
    background-color: #262732;
    padding-bottom: 28px;
  }
  .link-list {
    height: 52px;
    position: relative;
    line-height: 52px;
  }
  .link-list > .functional-link{
    height: 52px;
    float: left;
    line-height: 52px;
  }
  .link-list > .functional-link > li{
    float: left;
    text-align: center;
    font-size: 12px;
    padding: 0 10px;
    position: relative;
  }
  .link-list > .functional-link > li::after{
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 12px;
    background-color: #464646;
    right: 0;
    top: 51%;
    transform: translateY(-50%);
  }
  .link-list > .functional-link > li:nth-last-of-type(1)::after{
    display: none;
  }
  .link-list > .functional-link > li > a{
    color: #837e84;
    white-space: nowrap;
  }
  .link-list > .icon_links{
    position: absolute;
    right: 0;
    top: 0;
    height: 52px;
  }
  .link-list > .icon_links > li{
    float: left;
    margin-left: 12px;
    line-height: 52px;
  }
  .link-list > .icon_links > li > a{
    display: inline-block;
    height: 52px;
    line-height: 52px;
  }
  .link-list > .icon_links > li > a > img{
    vertical-align: middle;
  }
  /*-------------------------------*/
  .service-terms {
    background-color: #262732;
    padding-left: 9px;
  }
  .service-terms > p:nth-of-type(1) {
    float: left;
    font-size: 12px;
    color: #57575e;
  }
  .service-terms > a {
    float: left;
    font-size: 12px;
    color: #837e84;
    margin-left: 5px;
  }
  .service-terms > p:nth-of-type(2) {
    float: right;
    font-size: 12px;
    color: #6a676e;
  }
  /*------------------------------*/
  .group-links {
    margin-bottom: 10px;
  }
  .group-links > ul {
    float: left;
  }
  .group-links > a {
    float: right;
  }
  .group-links > ul > li {
    float: left;
    margin-right: 10px;
  }
</style>
