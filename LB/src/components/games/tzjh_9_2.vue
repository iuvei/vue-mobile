<template>
  <div class="tzjh clear-fix">
    <box-tabs :linkList="linkList_smp_tzjh"></box-tabs>
    <div class="tzjh-left">
      <div class="tzjh-content-box">
        <div class="tzjh-content-tabs clear-fix">
          <a class="now-hov" :style="{ 'width': '9.09%' }" href="javascript:;">五星</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">四星</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">后三</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">中三</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">前三</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">二星</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">定位胆</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">不定位</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">大小单双</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">任选</a>
          <a :style="{ 'width': '9.09%' }" href="javascript:;">龙虎</a>
        </div>
        <div class="tzjh-content-container clear-fix">
          <div class="tzjh-content-container-left">
            <div class="header clear-fix">
              <img :src="noteImg" alt="noteImg">
              <span>我的收藏</span>
              <span>搜索：</span>
              <input type="text">
              <a href="javascript:;">
                <img :src="searchIcon" alt="searchIcon">
              </a>
              <span>显示:</span>
              <div class="show-types clear-fix">
                <a href="javascript:;">
                  <img :src="showTypeIcon1" alt="showTypeIcon_1">
                </a>
                <a href="javascript:;">
                  <img :src="showTypeIcon2" alt="showTypeIcon_2">
                </a>
              </div>
            </div>
            <!--todo : 添加另外的显示方式-->
            <div class="show-list clear-fix">
              <a href="javascript:">太阳神计划</a>
              <a href="javascript:">太阳神计划</a>
              <a href="javascript:">太阳神计划</a>
              <a href="javascript:">太阳神计划</a>
              <a href="javascript:">太阳神计划</a>
              <a href="javascript:">太阳神计划</a>
              <a href="javascript:">太阳神计划</a>
            </div>
          </div>
          <div class="tzjh-content-container-right">
            <div class="header clear-fix">
              <a href="javascript:;"><img :src="startIcon" alt="startIcon"> 加入收藏</a>
              <a href="javascript:;"><img :src="addIcon" alt="addIcon"> 加入群发</a>
              <a href="javascript:;"><img :src="cancelIcon" alt="cancelIcon"> 关闭群发</a>
              <a href="javascript:;"><img :src="refreshIcon" alt="refreshIcon"> 刷新计划</a>
              <a href="javascript:;"><img :src="copyIcon" alt="copyIcon"> 复制计划</a>
            </div>
            <table>
              <tr>
                <th>投注界面</th>
                <th>历史界面</th>
                <th>结果反集</th>
                <th>投注记录</th>
                <th>计划走势</th>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>123期 67899</td>
                <td>中</td>
              </tr>
              <tr>
                <td>321-123</td>
                <td>傲上600+</td>
                <td>(900注)</td>
                <td>等待1</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="confirmation-amount clear-fix">
          <div class="bonus-group clear-fix">
            <span>奖金组</span>
            <div>
              <el-select size="mini" v-model="bonusGroup" placeholder="">
                <el-option label="2元" :value="2"></el-option>
                <el-option label="5元" :value="5"></el-option>
                <el-option label="10元" :value="10"></el-option>
              </el-select>
            </div>
          </div>
          <div class="multiple clear-fix">
            <span>倍数</span>
            <div>
              <el-input-number v-model="multiple" size="mini" :min="1" :max="10" label=""></el-input-number>
            </div>
          </div>
          <div class="mode clear-fix">
            <span>模式</span>
            <div>
              <el-select size="mini" v-model="bonusGroup" placeholder="">
                <el-option label="2元" :value="2"></el-option>
                <el-option label="5元" :value="5"></el-option>
                <el-option label="10元" :value="10"></el-option>
              </el-select>
            </div>
          </div>
          <div class="betting-amount">
            您选择了 <i>1</i> 注,共 <i>2.00</i> 元
          </div>
        </div>
        <div class="amount-description">
          奖金 <i>4.35</i> 盈利 <i> 2.35 </i>元
        </div>
        <div class="btns clear-fix">
          <a class="betting-type now-hov" href="javascript:;">手动下注</a>
          <a class="betting-type" href="javascript:;">自动下注</a>
          <a href="javascript:;">
            确认下注
            <img :src="rightIcon" alt="rightIcon">
          </a>
        </div>
      </div>
    </div>
    <div class="tzjh-right">
      <div class="title">
        <a href="javascript:;">
          <img :src="userIcon" alt="userIcon">
        </a>
        <a href="javascript:;">
          <img :src="playIcon" alt="playIcon">
        </a>
        <h4>重庆时时彩</h4>
        <a href="javascript:;">
          <img :src="closeIcon" alt="closeIcon">
        </a>
      </div>
      <a href="javascript:;" class="poster">
        <img :src="rightPoster" alt="rightPoster">
      </a>
      <ul>
        <li class="right-info">
          <img :src="rightRecordAvatar" alt="rightRecordAvatar">
          <p>a********6</p>
          <div>
            <div>
              <img :src="rightRecordIcon1" alt="rightRecordIcon1">
              期数：【201805221010】
              <a href="javascript:;" class="more">更多</a>
            </div>
            <div>
              <img :src="rightRecordIcon2" alt="rightRecordIcon2">
              玩法：第一球单双
            </div>
            <div>
              <img :src="rightRecordIcon3" alt="rightRecordIcon3">
              内容：双
            </div>
            <div>
              <img :src="rightRecordIcon4" alt="rightRecordIcon4">
              金额：100元
            </div>
          </div>
        </li>
        <li class="right-info">
          <img :src="rightRecordAvatar" alt="rightRecordAvatar">
          <p>a********6</p>
          <div>
            <div>
              <img :src="rightRecordIcon1" alt="rightRecordIcon1">
              期数：【201805221010】
              <a href="javascript:;" class="more">更多</a>
            </div>
            <div>
              <img :src="rightRecordIcon2" alt="rightRecordIcon2">
              玩法：第一球单双
            </div>
            <div>
              <img :src="rightRecordIcon3" alt="rightRecordIcon3">
              内容：双
            </div>
            <div>
              <img :src="rightRecordIcon4" alt="rightRecordIcon4">
              金额：100元
            </div>
          </div>
        </li>
        <li class="red-envelope">
          <img :src="rightRecordAvatar" alt="rightRecordAvatar">
          <p>a********6</p>
          <a href="javascript:;">
            <p>恭喜发财，大吉大利...</p>
            <p>领取红包</p>
            <p>玩家a********8</p>
          </a>
        </li>
        <li class="right-info">
          <img :src="rightRecordAvatar" alt="rightRecordAvatar">
          <p>a********6</p>
          <div>
            <div>
              <img :src="rightRecordIcon1" alt="rightRecordIcon1">
              期数：【201805221010】
              <a href="javascript:;" class="more">更多</a>
            </div>
            <div>
              <img :src="rightRecordIcon2" alt="rightRecordIcon2">
              玩法：第一球单双
            </div>
            <div>
              <img :src="rightRecordIcon3" alt="rightRecordIcon3">
              内容：双
            </div>
            <div>
              <img :src="rightRecordIcon4" alt="rightRecordIcon4">
              金额：100元
            </div>
          </div>
        </li>
      </ul>
      <div class="betting-input">
        <a href="javascript:;">投注</a>
        <input type="text" placeholder="球号位置/下注内容/金额">
        <a href="javascript:;">
          <img :src="planeIcon" alt="planeIcon">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import boxTabs from '../../components/box-tabs/box-tabs'
import { lotteryMixin } from '../../common/js/mixin'

import noteImg from '../../statics/img/note_img.png'
import searchIcon from '../../statics/img/search_icon.png'
import showTypeIcon1 from '../../statics/img/show-type_1.png'
import showTypeIcon2 from '../../statics/img/show-type_2.png'
import startIcon from '../../statics/img/star_icon.png'
import addIcon from '../../statics/img/add_icon.png'
import cancelIcon from '../../statics/img/cancel_icon.png'
import refreshIcon from '../../statics/img/refresh_icon_2.png'
import copyIcon from '../../statics/img/copy_icon.png'
import rightIcon from '../../statics/img/determine_bet_white.png'
import userIcon from '../../statics/img/user_icon_black.png'
import playIcon from '../../statics/img/play_icon.png'
import closeIcon from '../../statics/img/close_icon.png'
import rightPoster from '../../statics/img/poster_tzjh_right.png'
import rightRecordAvatar from '../../statics/img/right_record_avatar.png'
import rightRecordIcon1 from '../../statics/img/right_record_info_icon_1.png'
import rightRecordIcon2 from '../../statics/img/right_record_info_icon_2.png'
import rightRecordIcon3 from '../../statics/img/right_record_info_icon_3.png'
import rightRecordIcon4 from '../../statics/img/right_record_info_icon_4.png'
import planeIcon from '../../statics/img/plane_icon.png'

export default {
  components: { boxTabs },
  mixins: [ lotteryMixin ],
  data () {
    return {
      noteImg,
      rightRecordIcon1,
      planeIcon,
      rightRecordIcon2,
      rightRecordIcon3,
      rightRecordIcon4,
      searchIcon,
      rightRecordAvatar,
      playIcon,
      rightIcon,
      userIcon,
      rightPoster,
      showTypeIcon1,
      closeIcon,
      startIcon,
      addIcon,
      cancelIcon,
      refreshIcon,
      copyIcon,
      showTypeIcon2,

      bonusGroup: '',
      multiple: 0
    }
  }
}
</script>

<style scoped>
  /*tzjh begin*/
  .tzjh {
    width: 1171px;
    margin: 0 auto;
    padding-bottom: 35px;
    position: relative;
  }
  /*tzjh-left begin*/
  .tzjh-left {
    float: left;
    width: 881px;
  }
  /*tzjh-content-box begin*/
  /*tzjh-content-tabs tabs begin*/
  .tzjh-left .tzjh-content-box {
    background-color: #eeeeee;
    padding-bottom: 29px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-tabs {
    height: 42px;
    line-height: 42px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-tabs a {
    float: left;
    height: 42px;
    background-color: #cbcbcb;
    position: relative;
    text-align: center;
    border-right: 1px solid #b2b2b2;
    color: #000;
    font-size: 14px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-tabs a.now-hov {
    background-color: #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-tabs a.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 3px;
    top: 0;
    left: 0;
    background-color: #b7ab81;
  }
  /*tzjh-content-tabs tabs end*/
  /*.tzjh-content-container begin*/
  .tzjh-left .tzjh-content-box .tzjh-content-container {
    background-color: #eeeeee;
    padding: 15px 11px 21px 13px;
    position: relative;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: url("../../statics/img/border_bottom_1px_table.png") no-repeat 0 0;
    left: 0;
  }
  /*.tzjh-content-container-left begin*/
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left {
    width: 438px;
    float: left;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header {
    height: 24px;
    line-height: 24px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > * {
    float: left;
    font-size: 12px;
    color: #000000;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > span:nth-of-type(1) {
    margin-right: 17px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > span:nth-of-type(2),
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > span:nth-of-type(3) {
    margin-right: 5px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > input:nth-of-type(1) {
    height: 24px;
    line-height: 24px;
    border: 1px solid #d4d3d1;
    border-radius: 3px 0 0 3px;
    padding-left: 10px;
    width: 182px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > a:nth-of-type(1) {
    height: 24px;
    line-height: 24px;
    width: 22px;
    background-color: #f6f4f0;
    border: 1px solid #d4d3d1;
    text-align: center;
    border-left: none;
    border-radius: 0 3px 3px 0;
    margin-right: 19px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > img:nth-of-type(1) {
    margin-top: 5px;
    margin-right: 5px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > .show-types {
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > .show-types > a {
    float: left;
    height: 24px;
    line-height: 24px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > .show-types > a img {
    vertical-align: text-top;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > .show-types > a:nth-of-type(1) {
    background-color: #fff;
    border-radius: 3px 0 0 3px;
    border: 1px solid #d4d3d1;
    border-right: none;
    width: 26px;
    text-align: center;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .header > .show-types > a:nth-of-type(2) {
    background-color: #f6f4f0;
    border-radius: 0 3px 3px 0;
    border: 1px solid #d4d3d1;
    width: 26px;
    text-align: center;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .show-list {
    margin-top: 13px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-left .show-list a {
    float: left;
    line-height: 27px;
    height: 27px;
    text-align: center;
    border: 1px solid #c3c3c3;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: #fff;
    border-radius: 4px;
    width: 82px;
  }
  /*.tzjh-content-container-left end*/
  /*.tzjh-content-container-right begin*/
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right {
    float: left;
    padding-left: 10px;
    position: relative;
    width: 419px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right::after {
    content: '';
    display: block;
    position: absolute;
    left: -11px;
    top: 0;
    width: 19px;
    height: 452px;
    background: url("../../statics/img/line_table_left.png") no-repeat 0 0;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header {
    font-size: 12px;
    color: #000;
    margin-bottom: 8px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header a {
    float: left;
    height: 24px;
    line-height: 24px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header a img{
    vertical-align: text-top;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header a:nth-of-type(1) {
    margin-right: 11px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header a:nth-of-type(2) {
    margin-right: 18px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header a:nth-of-type(3) {
    margin-right: 31px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right .header a:nth-of-type(4) {
    margin-right: 17px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right table {
    border-radius: 5px;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #c3c3c3;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right table tr th {
    background-color: #d0caa6;
    height: 31px;
    color: #000000;
    font-size: 13px;
    line-height: 31px;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right table tr th:nth-of-type(1) {
    color: #ff1e1e;
    text-decoration: underline;
  }
  .tzjh-left .tzjh-content-box .tzjh-content-container .tzjh-content-container-right table tr td {
    font-size: 13px;
    color: #666666;
    line-height: 25px;
    text-align: center;
  }
  /*.tzjh-content-container-right end*/
  /*confirmation-amount begin*/
  .confirmation-amount {
    margin-top: 31px;
    height: 35px;
    padding-left: 40px;
    padding-right: 84px;
    line-height: 35px;
    font-size: 13px;
    color: #545454;
  }
  .confirmation-amount > * {
    float: left;
  }
  .confirmation-amount > .bonus-group {
    margin-right: 13px;
  }
  .confirmation-amount > .bonus-group > span {
    float: left;
    margin-right: 8px;
  }
  .confirmation-amount > .bonus-group > div {
    float: left;
    width: 166px;
  }
  .confirmation-amount > .multiple {
    margin-right: 9px;
  }
  .confirmation-amount > .multiple > span {
    margin-right: 5px;
    float: left;
  }
  .confirmation-amount > .multiple > div {
    float: left;
  }
  .confirmation-amount > .mode {
  }
  .confirmation-amount > .mode > span {
    margin-right: 5px;
    float: left;
  }
  .confirmation-amount > .mode > div {
    float: left;
    width: 86px;
  }
  .confirmation-amount > .betting-amount {
    float: right;
    font-size: 14px;
    color: #545454;
  }
  .confirmation-amount > .betting-amount i {
    font-style: normal;
    color: #a68f4c;
    letter-spacing: 2px;
    font-weight: bold;
  }
  /*confirmation-amount end*/
  /*amount-description begin*/
  .tzjh-content-box .amount-description {
    text-align: right;
    padding-right: 84px;
    margin-bottom: 9px;
    font-size: 14px;
    color: #545454;
  }
  .tzjh-content-box .amount-description i {
    font-style: normal;
    color: #a68f4c;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .tzjh-content-box .btns  {
    width: 366px;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }
  .tzjh-content-box a {
    float: left;
  }
  .tzjh-content-box .btns .betting-type:nth-of-type(1)  {
    border-radius: 5px 0 0 5px;
    border: 1px solid #d4d3d1;
    width: 77px;
  }
  .tzjh-content-box .btns .betting-type:nth-of-type(2)  {
    border-radius: 0 5px 5px 0;
    border: 1px solid #d4d3d1;
    border-left: none;
  }
  .tzjh-content-box .btns .betting-type  {
    height: 36px;
    margin-top: 9px;
    line-height: 36px;
    text-align: center;
    width: 80px;
    color: #9d916e;
    background-color: #eeeadf;
  }
  .tzjh-content-box .btns .betting-type.now-hov  {
    background-color: #fff;
    color: #545454;
  }
  .tzjh-content-box .btns a:nth-of-type(3)  {
    margin-left: 47px;
    height: 50px;
    line-height: 50px;
    background-color: #f48f49;
    width: 162px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    border: 1px solid #f17e2e;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .3);
  }
  /*amount-description end*/
  /*.tzjh-content-container end*/
  /*tzjh-content-box end*/
  /*tzjh-left end*/
  /*tzjh-right begin*/
  .tzjh-right {
    float: left;
    background-color: #eeeeee;
    width: 278px;
    margin-left: 12px;
  }
  .tzjh-right .title {
    width: 100%;
    height: 28px;
    line-height: 28px;
    position: relative;
    background-color: #e5d25f;
  }
  .tzjh-right .title h4{
    text-align: center;
    color: #000000;
    font-weight: normal;
    font-size: 12px;
  }
  .tzjh-right .title img {
    position: absolute;
  }
  .tzjh-right .title a:nth-of-type(1) img {
    left: 8px;
    top: 6px;
  }
  .tzjh-right .title a:nth-of-type(2) img {
    left: 35px;
    top: 6px;
  }
  .tzjh-right .title a:nth-of-type(3) img {
    right: 8px;
    top: 6px;
  }
  .tzjh-right .poster {
    width: 100%;
    height: 127px;
    position: relative;
    display: block;
    overflow: hidden;
  }
  .tzjh-right .poster img {
    position: absolute;
    bottom: 0;
  }
  .tzjh-right > ul:nth-of-type(1) {
    padding: 13px 13px 23px 9px;
    border-bottom: 1px solid #d6d6d6;
    min-height: 484px;
    border-bottom: 1px solid #d6d6d6;
  }
  .tzjh-right > ul:nth-of-type(1) > li {
    padding-left: 33px;
    position: relative;
  }
  .tzjh-right > ul:nth-of-type(1) > li > img:nth-of-type(1) {
    position: absolute;
    left: 0;
    top: 0;
  }
  .tzjh-right > ul:nth-of-type(1) > li > p:nth-of-type(1) {
    font-size: 12px;
    color: #606b78;
    padding-left: 8px;
  }
  .tzjh-right > ul:nth-of-type(1) > li.right-info > div {
    width: 225px;
    height: 95px;
    padding-left: 8px;
    padding-top: 6px;
    padding-right: 15px;
    margin-top: 5px;
    margin-bottom: 6px;
    background: url("../../statics/img/session_box_bg.png") no-repeat 0 0;
  }
  .tzjh-right > ul:nth-of-type(1) > li.right-info > div > div {
    margin-bottom: 5px;
    font-size: 12px;
    color: #323131;
  }
  .tzjh-right > ul:nth-of-type(1) > li.red-envelope > a:nth-of-type(1) {
    display: block;
    width: 220px;
    height: 73px;
    padding-top: 13px;
    margin-bottom: 9px;
    background: url("../../statics/img/red_envelope_bg.png") no-repeat 0 0;
  }
  .tzjh-right > ul:nth-of-type(1) > li.red-envelope > p {
    margin-bottom: 5px;
  }
  .tzjh-right > ul:nth-of-type(1) > li.red-envelope > a:nth-of-type(1) p:nth-of-type(1) {
    padding-left: 50px;
    font-size: 13px;
    color: #fff;
    margin-bottom: 5px;
  }
  .tzjh-right > ul:nth-of-type(1) > li.red-envelope > a:nth-of-type(1) p:nth-of-type(2) {
    padding-left: 50px;
    color: #feecd8;
    font-size: 12px;
  }
  .tzjh-right > ul:nth-of-type(1) > li.red-envelope > a:nth-of-type(1) p:nth-of-type(3) {
    margin-top: 14px;
    color: #606b78;
    font-size: 12px;
    padding-left: 15px;
  }
  .tzjh-right > ul:nth-of-type(1) > li.right-info > div > div > img {
    vertical-align: middle;
  }
  .tzjh-right > ul:nth-of-type(1) > li.right-info > div > div:nth-of-type(1) > a {
    float: right;
    line-height: 20px;
    color: #888e96;
    font-size: 12px;
  }
  .tzjh-right > .betting-input {
    height: 41px;
    line-height: 41px;
    padding-left: 6px;
  }
  .tzjh-right > .betting-input > a:nth-of-type(1) {
    float: left;
    width: 50px;
    height: 27px;
    margin-top: 8px;
    line-height: 27px;
    text-align: center;
    background-color: #a99b73;
    border: 1px solid #8e8057;
    border-radius: 3px;
    color: #ffffff;
  }
  .tzjh-right > .betting-input > a:nth-of-type(2) {
    float: left;
    width: 50px;
    height: 27px;
    margin-top: 8px;
    line-height: 27px;
    text-align: center;
    background-color: #f17e2e;
    border: 1px solid #ef6c25;
    border-radius: 3px;
    margin-left: 4px;
  }
  .tzjh-right > .betting-input > a:nth-of-type(2) > img {
    vertical-align: sub;
  }
  .tzjh-right > .betting-input > input {
    float: left;
    margin-left: 3px;
    width: 160px;
    height: 27px;
    line-height: 27px;
    padding-left: 10px;
    border: 1px solid #888e96;
    border-radius: 4px;
    margin-top: 8px;
  }
  /*tzjh-right end*/
  /*tzjh end*/
</style>
