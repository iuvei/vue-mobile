<template>
    <div class="home">
      <h4>
        <a href="javascript:;">
          <img :src="homeLogo" alt="homeLogo">
        </a>
      </h4>
      <div class="home-container">
        <div class="line-check">
          <ul>
            <li v-for="(item, index) in 11"
                :key="item">
              <span class="connect-time">11ms</span>
              <span class="url">https://vip1.gg.com</span>
              <a href="javascript:;" class="recommended-button" :class="{ 'green': index === 0 }">推荐进入</a>
            </li>
          </ul>
          <div class="check-again">
            <a href="javascript:;">重新检测</a>
          </div>
        </div>
        <div class="software-download">
          <h4 class="home-right-logo">
            <a href="javascript:;">
              <img :src="homeRightLogo" alt="homeRightLogo">
            </a>
          </h4>
          <h3>防劫持软件下载</h3>
          <p>守护您的浏览器安全，创造安心游戏的最佳环境</p>
          <div class="actions">
            <div class="use-tutorial">
              <div>
                <img :src="useTutorialIcon" alt="useTutorialIcon">
              </div>
              <a href="javascript:;">使用教程</a>
            </div>
            <div class="download">
              <div>
                <img :src="downloadIcon" alt="downloadIcon">
              </div>
              <a href="javascript:;">软件下载</a>
            </div>
          </div>
        </div>
      </div>
      <home-footer></home-footer>
    </div>
</template>

<script>
import homeFooter from './components/footer'
import homeLogo from '../../statics/img/home_logo.png'
import homeRightLogo from '../../statics/img/home_right_logo.png'
import useTutorialIcon from '../../statics/img/use-tutorial-icon.png'
import downloadIcon from '../../statics/img/download_icon.png'
export default {
  components: { homeFooter },
  data () {
    return {
      homeLogo,
      homeRightLogo,
      useTutorialIcon,
      downloadIcon
    }
  },
  methods: {
    // init () {
    //   if (document.body.scrollWidth > (window.screen.availWidth - 100)) {
    //     window.dialogWidth = (window.screen.availWidth - 100).toString() + 'px'
    //   } else {
    //     window.dialogWidth = (document.body.scrollWidth + 10).toString() + 'px'
    //   }
    //   if (document.body.scrollHeight > (window.screen.availHeight - 70)) {
    //     window.dialogHeight = (window.screen.availHeight - 50).toString() + 'px'
    //   } else {
    //     window.dialogHeight = (document.body.scrollHeight + 10).toString() + 'px'
    //   }
    //   window.dialogLeft = ((window.screen.availWidth - document.body.clientWidth) / 2).toString() + 'px'
    //   window.dialogTop = ((window.screen.availHeight - document.body.clientHeight) / 2).toString() + 'px'
    // }
  }
}
</script>

<style scoped>
.home {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../../statics/img/home_bg.jpg") no-repeat 0 0;
  background-size: 100% 100%;
}
.home h4 {
  text-align: center;
  margin: 20px 0 10px 0;
}
.home-container {
  text-align: center;
}
.home-container > div {
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #727272;
  background-color: rgba(255, 255, 255, .5);
}
.line-check {
  width: 693px;
  position: relative;
  padding-top: 49px;
  height: 677px;
  border: 1px solid #000;
}
.line-check::after {
  content: '';
  display: block;
  position: absolute;
  background: url("../../statics/img/left_fillet.png") no-repeat 0px 0px;
  left: -5px;
  top: -5px;
  width: 136px;
  height: 97px;
}
.software-download {
  width: 466px;
  vertical-align: top;
  margin-left: 20px;
  height: 475px;
}
.line-check > ul > li {
  width: 570px;
  height: 42px;
  line-height: 42px;
  margin: 0 auto 10px auto;
}
.line-check > ul > li > * {
  float: left;
}
.line-check > ul > li > .connect-time {
  width: 105px;
  text-align: center;
  background: url("../../statics/img/connect_time_bg.png");
  color: #f4fbf6;
  font-size: 15px;
}
.line-check > ul > li > .url {
  width: 364px;
  background-color: #fbfbfb;
  height: 39px;
  margin-top: 1px;
  text-align: left;
  padding-left: 20px;
  border: 1px solid #d1d2d0;
  font-size: 15px;
  color: #8d8d8d;
  line-height: 39px;
}
.line-check > ul > li > .recommended-button {
  background-color: #ffc000;
  height: 41px;
  margin-top: 1px;
  width: 100px;
  text-align: center;
  font-size: 15px;
  border-bottom: 1px solid #dba068;
  color: #4a3322;
  line-height: 41px;
}
.check-again {
  text-align: center;
  margin-top: 10px;
}
.check-again > a {
  display: inline-block;
  width: 117px;
  height: 39px;
  background-color: #ffc000;
  line-height: 39px;
  font-size: 15px;
  color: #4a3322;
  border-top: 1px solid #d5ab2b;
}
.home .home-right-logo {
  margin: 48px 0 23px 0 ;
}
.software-download > h3 {
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.software-download > p {
  font-size: 14px;
  letter-spacing: 1px;
  color: #ffffff;
  margin-bottom: 25px;
}
.actions {
  text-align: center;
}
.actions > div {
  padding-top: 28px;
  display: inline-block;
  width: 158px;
  height: 188px;
  border: 1px solid #3d3d3d;
  border-radius: 10px;
  background-color: #000000;
}
.actions > div > div {
  margin-bottom: 30px;
}
.actions > div > a {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  color: #404040;
  font-size: 15px;
  background-color: #e1e1e1;
  border-radius: 5px;
  border: 1px solid #bababa;
}
.actions > .use-tutorial {
}
.actions > .download {
  vertical-align: top;
  margin-left: 27px;
}
.green {
  background-color: #09ac1c!important;
  color: #ffffff!important;
  border-bottom: 1px solid #5b9161!important;
}
</style>
