<template>
  <div class="documentary-ranking">
    <div class="box-title">
      <h4>跟单排行榜</h4>
    </div>
    <el-carousel class="documentary" ref="carousel" trigger="click" height="192px" :autoplay="false" indicator-position="none" arrow="never" >
      <el-carousel-item v-for="(item) in 4" :key="item">
        <div class="user-card">
          <div class="user-card-top clear-fix">
            <img :src="avatarIconUser" alt="avatarIconUser">
            <div class="betting-overview">
                <span>
                  小苹果
                  <i>计划宗师</i>
                </span>
              <p>用户跟投: <i>0.85</i></p>
            </div>
            <div class="btns">
              <a href="javascript:;">关注</a>
              <a href="javascript:;">跟单</a>
            </div>
          </div>
          <div class="user-card-bottom clear-fix">
            <img :src="goldImg" alt="goldImg">
            <ul class="clear-fix">
              <li>
                彩种：<span>腾讯分分彩</span>
              </li>
              <li>
                玩法：<span>五星 直选复式</span>
              </li>
              <li>
                佣金：<span>0</span>
              </li>
              <li>
                金额：<span class="count">0.002</span>
              </li>
            </ul>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="next-pre">
      <a class="pre" href="javascript:;" @click="carouselNext()">
        <img :src="preIcon" alt="preIcon">
      </a>
      <a class="next" href="javascript:;" @click="carouselPre()">
        <img :src="nextIcon" alt="nextIcon">
      </a>
    </div>
  </div>
</template>

<script>
import avatarIconUser from '../../statics/img/avatar_user_ranking.png'
import goldImg from '../../statics/img/gold_img.png'
import nextIcon from '../../statics/img/next_icon_2.png'
import preIcon from '../../statics/img/pre_icon.png'
export default {
  name: 'ranking-documentary',
  data () {
    return {
      avatarIconUser,
      goldImg,
      nextIcon,
      preIcon
    }
  },
  methods: {
    carouselPre () {
      this.$refs.carousel.prev()
    },
    carouselNext () {
      this.$refs.carousel.next()
    }
  }
}
</script>

<style scoped>
  .documentary-ranking {
    margin-top: 14px;
  }
  .documentary-ranking .user-card {
    background-color: #ffffff;
    position: relative;
    padding-top: 22px;
  }
  .documentary-ranking .user-card::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 42px;
    background: url("../../statics/img/bg_left_top_user.png") no-repeat 0 0;
  }
  .documentary-ranking .user-card .user-card-top {
    width: 100%;
    padding-right: 14px;
    padding-left: 42px;
    margin-bottom: 13px;
  }
  .documentary-ranking .user-card .user-card-top > img {
    float: left;
    margin-top: 3px;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(1) {
    float: left;
    margin-left: 17px;
    margin-top: 10px;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(1) span {
    font-size: 12px;
    display: block;
    color: #545454;
    margin-bottom: 7px;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(1) span > i {
    color: #ff9000;
    font-style: normal;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(1) p {
    font-size: 12px;
    color: #545454;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(1) p > i {
    color: #fe0000;
    font-style: normal;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(2).btns {
    float: right;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(2).btns a {
    display: block;
    width: 50px;
    text-align: center;
    line-height: 27px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(2).btns a:nth-of-type(1) {
    background-color: #f17e2e;
    border: 1px solid #ef6c25;
  }
  .documentary-ranking .user-card .user-card-top > div:nth-of-type(2).btns a:nth-of-type(2) {
    background-color: #a2956f;
    margin-top: 9px;
    border: 1px solid #c3c3c3;
  }
  .documentary-ranking .user-card .user-card-bottom {
    padding-bottom: 15px;
  }
  .documentary-ranking .user-card .user-card-bottom > img {
    float: left;
    margin-right: 5px;
  }
  .documentary-ranking .user-card .user-card-bottom > ul {
    float: left;
    width: 237px;
    border: 1px solid #eeeeee;
  }
  .documentary-ranking .user-card .user-card-bottom > ul > li {
    float: left;
    line-height: 20px;
    font-size: 12px;
    color: #545454;
  }
  .documentary-ranking .user-card .user-card-bottom > ul > li .count {
    color: #fe0000;
  }
  .documentary-ranking .user-card .user-card-bottom > ul > li:nth-of-type(2n-1) {
    width: 112px;
  }
  .documentary-ranking .user-card .user-card-bottom > ul > li:nth-of-type(1),
  .documentary-ranking .user-card .user-card-bottom > ul > li:nth-of-type(2) {
    border-bottom: 1px solid #eeeeee;
  }
  .documentary-ranking .user-card .user-card-bottom > ul > li:nth-of-type(2n) {
    width: 123px;
  }
  .documentary-ranking .next-pre {
    height: 32px;
    text-align: center;
    background-color: #eeeeee;
  }
  .documentary-ranking .next-pre a {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    margin-top: 4px;
    line-height: 20px;
  }
  .documentary-ranking .next-pre .pre {
    margin-right: 76px;
  }
  .documentary {
    background: #fff;
  }
</style>
