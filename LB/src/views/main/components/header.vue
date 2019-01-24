<template>
  <div class="header-wrapper">
    <div class="width header">
      <div class="header-left clear-fix">
        <a href="javascript:;">
          <img :src="logo" alt="logo">
        </a>
      </div>
      <div class="header-right clear-fix">
        <ul class="clear-fix">
          <li>
            <a href="javascript:;">
              <span>数字彩票</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>真人彩票</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>棋牌娱乐</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>电子游艺</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>真人视讯</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>体育赛事</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>电子竞技</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <span>直播互动</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>
        </ul>
        <a href="javascript:;">
          <img :src="navigationImg" alt="navigationImg">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../../../statics/img/index_logo.png'
import arrow from '../../../statics/img/ic_nav_arrow_down.png'
import navigationImg from '../../../statics/img/navigation_img.png'
export default {
  data () {
    return {
      logo,
      arrow,
      navigationImg
    }
  }
}
</script>

<style scoped>
  .header-wrapper {
    height: 63px;
    background-color: #262732;
  }
  .header {
    height: 100%;
    padding-left: 8px;
  }
  .header-left {
    float: left;
    height: 100%;
    position: relative;
  }
  .header-left > a {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .header-right {
    float: right;
    height: 100%;
  }
  .header-right > ul {
    float: left;
    height: 100%;
  }
  .header-right > ul > li {
    float: left;
    height: 100%;
    line-height: 63px;
    margin-left: 30px;
  }
  .header-right > ul > li > a {
    display: inline-block;
    font-size: 14px;
    letter-spacing: .5px;
    color: #eaeaeb;
  }
  .header-right > ul > li > a > span {
    margin-right: 5px;
  }
  .header-right > ul > li > a > img {
    vertical-align: middle;
  }
  .header-right > a {
    float: left;
    position: relative;
    height: 100%;
    margin-left: 15px;
    margin-right: 2px;
  }
  .header-right > a > img {
    margin-top: 4px;
  }
</style>
