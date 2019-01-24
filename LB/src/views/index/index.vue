<template>
  <div>
    <div class="index-content">
      <div class="carousel-wrapper" :style="{height:imgHeight}">
        <el-carousel :height="imgHeight"
                     :interval="5000"
                     arrow="always"
                     trigger="click"
                     :ref="`carousel`"
                     class="carousel">
          <el-carousel-item v-for="(item, index) in bannerList"
                            class="carousel-item"
                            :key="index">
            <a :href="item.url">
              <img :src="item.path" alt="banner"  ref="imgHeight">
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="play-types width play-types-2">
        <div class="types-top clear-fix">
          <div class="type-one type">
            <div class="type-title type-one-title">
              <img :src="typeOneTitleIcon" alt="typeOneTitleIcon">
              <span>数字彩票</span>
            </div>
            <div class="type-one-content">
              <ul class="szcp_types">
                <li v-for="(item, index) in showSzcpMenuList"
                    :key="index">
                  <h4>{{item.title}}</h4>
                  <ul class="ssc_items clear-fix">
                    <li v-for="(itemInner, indexInner) in item.list"
                        :class="{ 'hot': itemInner.hot, 'update': itemInner.new }"
                        :key="indexInner">
                      <a @click="$store.dispatch('playTypeGame', { upperName: item.upperName, menuLink: itemInner, lotteryId: itemInner.lotteryId, isJump: true })"
                         href="javascript:;">
                        {{itemInner.name}}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="type-two type">
            <div class="type-title type-two-title">
              <img :src="typeTwoTitleIcon" alt="typeTwoTitleIcon">
              <span>真人彩票</span>
            </div>
            <div class="type-two-content">
              <ul>
                <li @click="liveGaming">
                  <a href="javascript:;">
                    <img :src="typeTwoImg1" alt="typeTwoImg1">
                  </a>
                  <h4>Live Gaming | 1.5分真人视频彩</h4>
                </li>
                <li @click="liveGaming">
                  <a href="javascript:;">
                    <!--todo： 等待替换-->
                    <img :src="typeTwoImg2" alt="typeTwoImg2">
                  </a>
                  <h4>Live Gaming | 3分真人视频彩</h4>
                </li>
              </ul>
            </div>
          </div>
          <div class="type-three type">
            <div class="type-title type-three-title">
              直播
              <span>LIVE VIDEO</span>
              <a class="enter-anyone" href="javascript:;" @mouseenter="accessToLive('live-interaction')" @click="goToAccessToLive">随机进入</a>
            </div>
            <div class="type-three-content clear-fix">
              <video v-show="currentVideo === 0" loop="loop" autoplay="autoplay" muted id="lbVideo" class="lb-video">
                <source src="http://lvgirl.goodgaming.com/LV_006.mp4" type="video/mp4">
              </video>
              <video v-show="currentVideo === 1" loop="loop" autoplay="autoplay" muted id="lbVideo" class="lb-video">
                <source src="http://lvgirl.goodgaming.com/LV_004.mp4" type="video/mp4">
              </video>
              <video v-show="currentVideo === 2" loop="loop" autoplay="autoplay" muted id="lbVideo" class="lb-video">
                <source src="http://lvgirl.goodgaming.com/LV_003.mp4" type="video/mp4">
              </video>
              <video v-show="currentVideo === 3" loop="loop" autoplay="autoplay" muted id="lbVideo" class="lb-video">
                <source src="http://lvgirl.goodgaming.com/LV_002.mp4" type="video/mp4">
              </video>
              <a href="javascript:;" @mouseenter="accessToLive('live-interaction')" @click="goToAccessToLive">进入直播间</a>
              <ul class="live-list">
                <li @click="currentVideo = 0">
                  <a href="javascript:;">
                    <img class="fadeIn animated fadeInDownSmall live-list-01" :src="type3RightShowImg01" alt="type3RightShowImg01">
                  </a>
                </li>
                <li @click="currentVideo = 1">
                  <a href="javascript:;">
                    <img class="fadeIn animated fadeInDownSmall live-list-02" :src="type3RightShowImg02" alt="type3RightShowImg02">
                  </a>
                </li>
                <li @click="currentVideo = 2">
                  <a href="javascript:;">
                    <img class="fadeIn animated fadeInDownSmall live-list-03" :src="type3RightShowImg03" alt="type3RightShowImg03">
                  </a>
                </li>
                <li @click="currentVideo = 3">
                  <a href="javascript:;">
                    <img class="fadeIn animated fadeInDownSmall live-list-04" :src="type3RightShowImg04" alt="type3RightShowImg04">
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--老虎机开始-->
        <div class="qpyl width clear-fix" v-if="nowScreenStatus === 0">
          <div class="qpyl-left">
            <!--<img :src="pknlImg" alt="pknlImg">-->
            <!--左侧图片-->
            <img v-if="gameIndex === 0"  :src="tag1IconLeft" alt="tag1IconLeft">
            <img v-if="gameIndex === 1"  :src="tag2IconLeft" alt="tag2IconLeft">
            <img v-if="gameIndex === 2"  :src="tag3IconLeft" alt="tag3IconLeft">
            <img v-if="gameIndex === 3"  :src="tag4IconLeft" alt="tag4IconLeft">
            <img v-if="gameIndex === 4"  :src="cardIconLeft" alt="cardIconLeft">
          </div>
          <!--<div class="qpyl-center">
            <h3>
              <span>棋牌/电游</span>
              POKER / SLOT
            </h3>
            <p>棋牌游戏是世界上公认的最文明、最公平的娱乐项目。为您带来不一样的游戏体验，快来玩几局吧！</p>
            <ul class="qpyl-items clear-fix">
              <li>
                <div class="inner">
                  <h4>棋牌竞技场</h4>
                  <a class="game-name" href="javascript:;">斗地主</a>
                  <a class="game-name" href="javascript:;">扎金花</a>
                  <a class="game-name" href="javascript:;">二人麻将</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>
            </ul>
          </div>-->
          <div v-if="gameIndex === 0"  class="qpyl-center">
            <h3>
              <span>老虎机1</span>
              Slot machine 1
            </h3>
            <p>拉斯维加斯经典热门老虎机台都在这里，老虎机游戏首选，实体拉斯维加斯游艺场机台100%线上还原！快来体验最纯正的经典老虎机 !</p>
            <ul class="qpyl-items clear-fix">
              <li v-for="(qpylItem, index) in tag1" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 1" class="qpyl-center">
            <h3>
              <span>老虎机2</span>
              Slot machine 2
            </h3>
            <p>经典老虎机完美重现，简单的点击即可完成所有的操作，轻松上手，让你享受并愉快地完成游戏</p>
            <ul class="qpyl-items clear-fix">
              <li v-for="(qpylItem, index) in tag2" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 2"  class="qpyl-center">
            <h3>
              <span>老虎机3</span>
              Slot machine 3
            </h3>
            <p>极致的设计，给你不一样的视觉冲击，每个动画和界面都是高清、独一无二的，全新的视觉体验。</p>
            <ul class="qpyl-items clear-fix">
              <li v-for="(qpylItem, index) in tag3" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 3"  class="qpyl-center">
            <h3>
              <span>老虎机4</span>
              Slot machine 4
            </h3>
            <p>最好玩的独创故事老虎机游戏，操作简单但技巧性十足，随时随地都能体验紧张刺激的赌场感觉！</p>
            <ul class="qpyl-items clear-fix">
              <li  v-for="(qpylItem, index) in tag4" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 4"  class="qpyl-center">
            <h3>
              <span>棋牌/电游</span>
              POKER / SLOT
            </h3>
            <p>棋牌游戏是世界上公认的最文明、最公平的娱乐项目。为您带来不一样的游戏体验，快来玩几局吧！</p>
            <ul class="qpyl-items clear-fix">
              <li   v-for="(qpylItem, index) in cardData" :key="index">
                <div class="inner">
                  <h4 v-if="index === 0">棋牌竞技场</h4>
                  <h4 v-if="index === 1">棋牌百人场</h4>
                  <h4 v-if="index === 2">美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'card')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div class="qpyl-right clear-fix">
            <div class="qpyl-right-top">
              <!--todo: 图片待替换-->
              <ul class="qpyl-right-top-items clear-fix">
                <li @click="gameIndex = 0" :class="{'actives':gameIndex === 0}">
                  <a href="javascript:;">
                    <!--<img :src="btnQpyl" alt="btnQpyl">-->
                    <div class="items-content">老虎机1</div>
                  </a>
                </li>
                <li @click="gameIndex = 1" :class="{'actives':gameIndex === 1}">
                  <a href="javascript:;">
                    <!--<img :src="btnDzyy" alt="btnDzyy">-->
                    <div class="items-content">老虎机2</div>
                  </a>
                </li>
                <li @click="gameIndex = 2" :class="{'actives':gameIndex === 2}">
                  <a href="javascript:;">
                    <!--<img :src="btnTyss" alt="btnTyss">-->
                    <div class="items-content">老虎机3</div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="qpyl-right-bottom" v>
              <div class="qpyl-right-bottom-items clear-fix">
                <ul>
                  <li @click="gameIndex = 3" :class="{'actives':gameIndex === 3}">
                    <a href="javascript:;">
                      <!--<img :src="btnZrsx" alt="btnZrsx">-->
                      <div class="items-content">老虎机4</div>
                    </a>
                  </li>
                  <li @click="gameIndex = 4" :class="{'actives':gameIndex === 4}">
                    <a href="javascript:;">
                      <!--<img :src="btnDzjj" alt="btnDzjj">-->
                      <div class="items-content">棋牌娱乐</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a href="javascript:;">
              <!--<img :src="prizePoolImg" alt="prizePoolImg">-->
              <img v-if="gameIndex === 0" :src="tag1IconRight" alt="tag1IconRight">
              <img v-if="gameIndex === 1" :src="tag2IconRight" alt="tag2IconRight">
              <img v-if="gameIndex === 2" :src="tag3IconRight" alt="tag3IconRight">
              <img v-if="gameIndex === 3" :src="tag4IconRight" alt="tag4IconRight">
              <img v-if="gameIndex === 4" :src="cardIconRight" alt="cardIconRight">
            </a>
          </div>
        </div>
        <!---------------开始------->
        <div class="qpyl width clear-fix" v-if="nowScreenStatus === 1">
          <!--左侧按钮-->
          <div class="qpyl-left button clear-fix" style="width: 18%;height: 100%;">
            <ul style="flex-wrap: nowrap; height: 386px;padding: 20px 0">
              <li @click="gameIndex = 0" :class="{'actives':gameIndex === 0}">老虎机1</li>
              <li @click="gameIndex = 1" :class="{'actives':gameIndex === 1}">老虎机2</li>
              <li @click="gameIndex = 2" :class="{'actives':gameIndex === 2}">老虎机3</li>
              <li @click="gameIndex = 3" :class="{'actives':gameIndex === 3}">老虎机4</li>
              <li @click="gameIndex = 4" :class="{'actives':gameIndex === 4}">棋牌娱乐</li>
            </ul>
          </div>
          <!--<div class="qpyl-center">
            <h3>
              <span>棋牌/电游</span>
              POKER / SLOT
            </h3>
            <p>棋牌游戏是世界上公认的最文明、最公平的娱乐项目。为您带来不一样的游戏体验，快来玩几局吧！</p>
            <ul class="qpyl-items clear-fix">
              <li>
                <div class="inner">
                  <h4>棋牌竞技场</h4>
                  <a class="game-name" href="javascript:;">斗地主</a>
                  <a class="game-name" href="javascript:;">扎金花</a>
                  <a class="game-name" href="javascript:;">二人麻将</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>
            </ul>
          </div>-->
          <!--右侧内容-->
          <div v-if="gameIndex === 0"  class="qpyl-center qpyl-center-li">
            <h3>
              <span>老虎机1</span>
              Slot machine 1
            </h3>
            <p>拉斯维加斯经典热门老虎机台都在这里，老虎机游戏首选，实体拉斯维加斯游艺场机台100%线上还原！快来体验最纯正的经典老虎机 !</p>
            <ul class="qpyl-items clear-fix select-button">
              <li v-for="(qpylItem, index) in tag1" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 1" class="qpyl-center qpyl-center-li">
            <h3>
              <span>老虎机2</span>
              Slot machine 2
            </h3>
            <p>经典老虎机完美重现，简单的点击即可完成所有的操作，轻松上手，让你享受并愉快地完成游戏</p>
            <ul class="qpyl-items clear-fix">
              <li v-for="(qpylItem, index) in tag2" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 2"  class="qpyl-center qpyl-center-li">
            <h3>
              <span>老虎机3</span>
              Slot machine 3
            </h3>
            <p>极致的设计，给你不一样的视觉冲击，每个动画和界面都是高清、独一无二的，全新的视觉体验。</p>
            <ul class="qpyl-items clear-fix">
              <li v-for="(qpylItem, index) in tag3" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 3"  class="qpyl-center qpyl-center-li">
            <h3>
              <span>老虎机4</span>
              Slot machine 4
            </h3>
            <p>最好玩的独创故事老虎机游戏，操作简单但技巧性十足，随时随地都能体验紧张刺激的赌场感觉！</p>
            <ul class="qpyl-items clear-fix">
              <li  v-for="(qpylItem, index) in tag4" :key="index">
                <div class="inner">
                  <h4 v-if="index===0">神秘幻想</h4>
                  <h4 v-if="index===1">夺宝探险</h4>
                  <h4 v-if="index===2">财源滚滚</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'e_game')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
          <div v-if="gameIndex === 4"  class="qpyl-center qpyl-center-li">
            <h3>
              <span>棋牌/电游</span>
              POKER / SLOT
            </h3>
            <p>棋牌游戏是世界上公认的最文明、最公平的娱乐项目。为您带来不一样的游戏体验，快来玩几局吧！</p>
            <ul class="qpyl-items clear-fix">
              <li   v-for="(qpylItem, index) in cardData" :key="index">
                <div class="inner">
                  <h4 v-if="index === 0">棋牌竞技场</h4>
                  <h4 v-if="index === 1">棋牌百人场</h4>
                  <h4 v-if="index === 2">美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;" @click="GetThirdGameUrlFn(item.game_id, item.status, 'card')" v-for="(item, indexs) in qpylItem" :key="indexs">{{item.game_name}}</a>
                </div>
              </li>
              <!--<li>
                <div class="inner">
                  <h4>棋牌百人场</h4>
                  <a class="game-name" href="javascript:;">百人牛牛</a>
                  <a class="game-name" href="javascript:;">百家乐</a>
                  <a class="game-name" href="javascript:;">百人十点半</a>
                </div>
              </li>
              <li>
                <div class="inner">
                  <h4>美女主播棋牌</h4>
                  <a class="game-name" href="javascript:;">主播斗地主</a>
                  <a class="game-name" href="javascript:;">主播牛牛</a>
                  <a class="game-name" href="javascript:;">主播跑得快</a>
                </div>
              </li>-->
            </ul>
          </div>
        </div>
        <!----------------结束------------------>
        <ul class="game-type-names clear-fix">
          <li v-for="(gameItem, index) in gameShowList2" :key="index">
            <h4 v-if="gameItem[0].gameType === 'live'">
              <span>真人</span>
              LIVE CASINO
            </h4>
            <h4 v-if="gameItem[0].gameType === 'sport'">
              <span>体育</span>
              SPORTS
            </h4>
            <h4 v-if="gameItem[0].gameType === 'esports'">
              <span>电竞</span>
              ESPORTS
            </h4>
            <div class="game-type-content">
              <!--<a href="javascript:;" v-for="(itemInner, indexs) in gameItem" :key="indexs">{{itemInner.game_name}}</a>-->
              <div class="game-item-box"><a href="javascript:;" @click="GetThirdGameUrlFn(itemInner.game_id, itemInner.status, itemInner.gameType )" v-for="(itemInner, indexs) in gameItem" :key="indexs">{{itemInner.game_name}}</a></div>
              <p v-if="gameItem[0].gameType === 'live'">真人荷官面对面服务，激情现场赌场游戏，邀您享受最刺激的娱乐体验</p>
              <p v-if="gameItem[0].gameType === 'sport'">提供丰富多元的体育竞技投注，足球，棒球，篮球，橄榄球一网打尽，世界的主流体育尽在GG体育竞技</p>
              <p v-if="gameItem[0].gameType === 'esports'">年轻的我们紧跟时尚年轻潮流，提供丰富多元的电子竞技赛事竞猜服务</p>
              <div class="game-type-shows"></div>
            </div>
          </li>
          <!--<li>
            <h4>
              <span>体育</span>
              SPORTS
            </h4>
            <div class="game-type-content">
              <a href="javascript:;">进入游戏</a>
              <p>提供丰富多元的体育竞技投注，足球，棒球，篮球，橄榄球一网打尽，世界的主流体育尽在GG体育竞技</p>
              <div class="game-type-shows"></div>
            </div>
          </li>
          <li>
            <h4>
              <span>电竞</span>
              ESPORTS
            </h4>
            <div class="game-type-content">
              <a href="javascript:;">进入游戏</a>
              <p>年轻的我们紧跟时尚年轻潮流，提供丰富多元的电子竞技赛事竞猜服务</p>
              <div class="game-type-shows"></div>
            </div>
          </li>-->
        </ul>
        <div class="promotions width">
          <h4>优惠活动</h4>
          <ul class="promotions-list-poster clear-fix">
            <li>
              <a href="javascript:;">
                <el-button type="primary">查看详情</el-button>
                <img :src="promotions1Poster" alt="promotions1Poster">
              </a>
              <a href="javascript:;" class="description">完善资料绑定手机送礼金</a>
            </li>
            <li>
              <a href="javascript:;">
                <el-button type="primary">查看详情</el-button>
                <img :src="promotions2Poster" alt="promotions2Poster">
              </a>
              <a href="javascript:;" class="description">冰爽签到 畅游酷夏</a>
            </li>
          </ul>
        </div>
        <div class="width company-description clear-fix">
          <div class="company-description-left">
            <a href="javascript:;" class="get-money-time clear-fix">
              <img :src="getTimeIcon" alt="getTimeIcon">
              <div>
                <span>25<i>秒</i></span>
                <p>平均存款到帐时间</p>
              </div>
            </a>
            <a href="javascript:;" class="get-money-time clear-fix">
              <img :src="purseIcon" alt="purseIcon">
              <div>
                <span>90<i>秒</i></span>
                <p>平均取款到帐时间</p>
              </div>
            </a>
            <p>目前我们支持机构有34家</p>
            <ul class="pay_icons clear-fix">
              <li>
                <a href="javascript:;">
                  <img :src="wechartPayIcon" alt="wechartPayIcon">
                  <p>微信支付</p>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img :src="aliPayIcon" alt="aliPayIcon">
                  <p>支付宝支付</p>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img :src="yinlianIcon" alt="yinlianIcon">
                  <p>微信支付</p>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <img :src="zaixianIcon" alt="zaixianIcon">
                  <p>微信支付</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="company-description-center">
            <img :src="companyDescriptionCenterImg" alt="companyDescriptionCenterImg">
          </div>
          <div class="company-description-right">
            <p>本平台采不同于行业常见的软件随机数生成办法，所以本平台不存在暗箱操作，无法操控最终开奖结果，实现与公彩相同，甚至更公平公正的开奖结果！</p>
            <ul>
              <li>
                <img :src="goodIcon" alt="goodIcon">
                <h4>购彩保障</h4>
                <p>本平台根据官方开奖号码进行开奖，奖金自动派发，用户可随时在本站对帐户中的资金进行提现</p>
              </li>
              <li>
                <img :src="safetyIcon" alt="safetyIcon">
                <h4>购彩保障</h4>
                <p>本平台正确处理用户提供的私人信息。我们是用户个人信息的唯一拥有者，不会奖资料提供给、遗弃或出信给任何第三方。</p>
              </li>
              <li>
                <img :src="computerIcon" alt="computerIcon">
                <h4>购彩保障</h4>
                <p>HTML5及EWD技术已成熟被运用在本平台各项产品中，充分提升产品跨平台的浏览与操作流畅度，提供使用者更进阶的游戏体验。</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px">
      <div>是否激活游戏账户</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialgConfirm()">确 定</el-button>
        </span>
    </Dialog>
    <player-count></player-count>
  </div>
</template>

<script>

import top from '../main/components/top_2018_8_29'
import mainHeader from '../main/components/header_18_8_29'
import mainFooter from '../main/components/footer_18_8_29'
import H5Header from '../main/components/h5Heder'
import playerCount from '../../components/playerCount/playerCount'
import Dialog from '../../components/dialog/src/component'

import { getBannerList } from '@/api/homePage/home-page'
import { GetThirdFocusGameList, GetThirdGameUrl, ThirdGameUserInit, GetThirdGameList } from '@/api/game/game'
import { setTird, getTird } from '../../util/third'
import { mapGetters } from 'vuex'

import typeOneTitleIcon from '../../statics/img/type_one_title_icon.png'
import typeTwoTitleIcon from '../../statics/img/type_two_title_icon.png'
import typeTwoImg1 from '../../statics/img/type_2_img.jpg'
import typeTwoImg2 from '../../statics/img/live_2.jpg'
import type3LeftPoster from '../../statics/img/zbhd_left_poster.jpg'
import type3RightShowImg01 from '../../statics/img/type_3_right_img_01.png'
import type3RightShowImg02 from '../../statics/img/type_3_right_img_02.png'
import type3RightShowImg03 from '../../statics/img/type_3_right_img_03.png'
import type3RightShowImg04 from '../../statics/img/type_3_right_img_04.png'
import pknlImg from '../../statics/img/index_2_bg_left_img.png'
import qpylImgYlb from '../../statics/img/img _qpyl_ylb.png'
import qpylImgKyqp from '../../statics/img/img _qpyl_kyqp.png'
import qpylImgQtqp from '../../statics/img/img _qpyl_qtqp.png'
import qpylImgLiveGaming from '../../statics/img/img _qpyl_livegaming.png'
import btnQpyl from '../../statics/img/btn_qpyl_selected.png'
import btnQpylSelected from '../../statics/img/btn_qpyl.png'
import btnDzyy from '../../statics/img/btn_dzyy.png'
import btnDzyySelected from '../../statics/img/btn_dzyy_selected.png'
import btnTyss from '../../statics/img/btn_tyss.png'
import btnTyssSelected from '../../statics/img/btn_tyss_selected.png'
import btnZrsx from '../../statics/img/btn_zrsx.png'
import btnZrsxSelected from '../../statics/img/btn_zrsx_selected.png'
import btnDzjj from '../../statics/img/btn_dzjj.png'
import btnDzjjSelected from '../../statics/img/btn_dzjj_selected.png'
import tryPlayFreeImg from '../../statics/img/img_try_play_free_img.png'
import downloadCenterPoster from '../../statics/img/download_center_poster.png'
import prizePoolImg from '../../statics/img/prize_pool.jpg'
import promotions1Poster from '../../statics/img/promotions_1_poster.jpg'
import promotions2Poster from '../../statics/img/promotions_2_poster.jpg'
import getTimeIcon from '../../statics/img/get-money-time-icon.png'
import wechartPayIcon from '../../statics/img/pay_wechart_icon.png'
import companyDescriptionCenterImg from '../../statics/img/company-description-center-img.png'
import goodIcon from '../../statics/img/good_icon.png'
import purseIcon from '../../statics/img/purse-icon.png'
import aliPayIcon from '../../statics/img/alipay_icon.png'
import yinlianIcon from '../../statics/img/yinlian_icon.png'
import zaixianIcon from '../../statics/img/zaixian_icon.png'
import computerIcon from '../../statics/img/computer_icon.png'
import safetyIcon from '../../statics/img/Safety_icon.png'
import tag1IconLeft from '../../statics/img/tag1-left.png'
import tag1IconRight from '../../statics/img/tag1-right.jpg'
import tag2IconLeft from '../../statics/img/tag2-left.png'
import tag2IconRight from '../../statics/img/tag2-right.jpg'
import tag3IconLeft from '../../statics/img/tag3-left.png'
import tag3IconRight from '../../statics/img/tag3-right.jpg'
import tag4IconLeft from '../../statics/img/tag4-left.png'
import tag4IconRight from '../../statics/img/tag4-right.jpg'
import cardIconLeft from '../../statics/img/card-left.png'
import cardIconRight from '../../statics/img/card-right.jpg'
export default {
  components: {top, mainHeader, mainFooter, playerCount, Dialog, H5Header},
  data () {
    return {
      typeOneTitleIcon,
      safetyIcon,
      computerIcon,
      typeTwoTitleIcon,
      yinlianIcon,
      zaixianIcon,
      aliPayIcon,
      purseIcon,
      typeTwoImg1,
      typeTwoImg2,
      type3LeftPoster,
      type3RightShowImg01,
      type3RightShowImg02,
      type3RightShowImg03,
      type3RightShowImg04,
      pknlImg,
      promotions1Poster,
      promotions2Poster,
      qpylImgYlb,
      qpylImgKyqp,
      prizePoolImg,
      getTimeIcon,
      qpylImgQtqp,
      wechartPayIcon,
      qpylImgLiveGaming,
      goodIcon,
      companyDescriptionCenterImg,
      btnQpyl,
      btnQpylSelected,
      btnDzyy,
      btnDzyySelected,
      btnTyss,
      btnTyssSelected,
      btnZrsx,
      btnZrsxSelected,
      btnDzjj,
      btnDzjjSelected,
      tryPlayFreeImg,
      downloadCenterPoster,
      tag1IconRight,
      tag1IconLeft,
      tag2IconRight,
      tag2IconLeft,
      tag3IconRight,
      tag3IconLeft,
      tag4IconRight,
      tag4IconLeft,
      cardIconLeft,
      cardIconRight,
      bannerList: [],
      gameShowList: {},
      gameShowList2: [],
      tag1: [],
      tag2: [],
      tag3: [],
      tag4: [],
      cardData: [],
      gameIndex: 0,
      activeThirdGame: '',
      currentVideo: 0,
      toLiveList: [],
      toLiveId: '',
      dialogVisible: false,
      imgHeight: '495px',
      myWindow: window || null
    }
  },
  computed: {
    ...mapGetters([
      'szcpMenuList',
      'isLogin',
      'userInfo',
      'nowScreenStatus' // 当前的屏幕状态尺寸控制变量
    ]),
    showSzcpMenuList () {
      const szcpMenuList = this.szcpMenuList
      if (!szcpMenuList) return []
      let dataArr = []
      for (let key in szcpMenuList) {
        const obj = {
          title: szcpMenuList[key]['name'],
          upperName: key,
          list: []
        }
        for (let keyInner in szcpMenuList[key]) {
          if (keyInner === 'lotteries') {
            for (let innerKey in szcpMenuList[key][keyInner]) {
              const innerLink = szcpMenuList[key][keyInner][innerKey]
              innerLink.lotteryId = innerKey
              obj.list.push(innerLink)
            }
          }
        }
        dataArr.push(obj)
      }
      return dataArr.filter(item => {
        item.list = item.list.filter(itemInner => {
          return itemInner.new || itemInner.hot
        })
        return item.list.length
      })
    }
  },
  methods: {
    getBannerList () {
      getBannerList()
        .then(res => {
          const {errno, data} = res
          if (errno === 0) this.bannerList = data
          const _this = this
          setTimeout(() => {
            _this.imgHeight = _this.$refs.imgHeight[0].height + 'px'
          }, 0)
        })
    },
    GetThirdFocusGameListFn () {
      GetThirdFocusGameList()
        .then((res) => {
          this.gameShowList = res.data
          this.tag1 = this.gameShowList.e_game.tag_1
          this.tag2 = this.gameShowList.e_game.tag_2
          this.tag3 = this.gameShowList.e_game.tag_3
          this.tag4 = this.gameShowList.e_game.tag_4
          this.cardData = this.gameShowList.card
          for (let i in res.data) {
            if (i !== 'card' && i !== 'e_game') {
              for (var x = 0; x < res.data[i].length; x++) {
                res.data[i][x].gameType = i
              }
              this.gameShowList2.push(res.data[i])
            }
          }
        })
    },
    GetThirdGameUrlFn (gameId, status, type) {
      this.$loadingShow()
      if (!this.isLogin) {
        this.$loadingHide()
        this.$router.push('/index')
        return this.$message({message: '请先登录!', type: 'error'})
      }
      if (this.activeThirdGame === 1) {
        if (status === 0) {
          var newWindow = window.open('about:_blank')
          GetThirdGameUrl(gameId)
            .then((res) => {
              var gameUrl = res.data.game_url
              this.$loadingHide()
              if (type === 'live-interaction') {
                if (gameUrl.indexOf('https:') !== -1) {
                  newWindow.location = gameUrl
                } else {
                  newWindow.close()
                  this.$router.push({name: 'OTHER', query: {url: gameUrl}})
                }
              } else {
                newWindow.location = gameUrl
              }
            })
            .catch(() => {
              this.$loadingHide()
              newWindow.close()
            })
        } else {
          this.$message({message: '该游戏尚未开通！', type: 'warning', showClose: true})
          return this.$loadingHide()
        }
      } else {
        this.dialogVisible = !this.dialogVisible
      }
    },
    liveGaming () {
      this.$message({message: '游戏开发中，敬请期待！', type: 'warning', showClose: true})
    },
    accessToLive (gameType) {
      if (getTird(gameType) === null) {
        GetThirdGameList(gameType)
          .then((res) => {
            this.toLiveList = res.data
            this.toLiveId = this.toLiveList[0].id
            console.log(this.toLiveList)
            setTird(gameType, this.toLiveList)
          })
      } else {
        this.toLiveList = getTird(gameType)
        this.toLiveId = this.toLiveList[0].id
      }
    },
    goToAccessToLive () {
      this.GetThirdGameUrlFn(this.toLiveId, 0, this.toLiveList[0].game_type)
    },
    dialgConfirm () {
      ThirdGameUserInit()
        .then((res) => {
          this.$loadingHide()
          if (res.errno === 0) {
            this.$store.dispatch('updateUserInfo')
            this.$message({
              type: 'success',
              message: '激活成功'
            })
          }
        })
      this.dialogVisible = false
    },
    setCarouselHeight () {
      this.imgHeight = this.$refs.imgHeight[0].height + 'px'
    }
  },
  watch: {
    szcpMenuList (val, ol) {
    },
    userInfo (val, ol) {
      this.activeThirdGame = val.active_third_game
    }
  },
  filters: {
    gameNameFilter: function (val) {
      switch (val) {
        case 'esports':
          val = '电竞'
          break
        case 'live':
          val = '真人'
          break
        case 'sport':
          val = '体育'
          break
      }
    }
  },
  created () {
    this.getBannerList()
    this.GetThirdFocusGameListFn()
    this.$nextTick(() => {
      this.activeThirdGame = this.userInfo['active_third_game']
    })
  },
  mounted () {
    window.addEventListener('resize', this.setCarouselHeight)
    /* window.onresize = function () {
      _this.imgHeight = _this.$refs.imgHeight[0].height + 'px'
    } */
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setCarouselHeight)
  }
}
</script>

<style scoped>
  /* carousel-wrapper begin */
  .carousel-wrapper {
    height: 495px;
    background-color: #fff;
  }
  .carousel-wrapper .carousel,
  .carousel-item img {
    width: 100%;
  }
  /* carousel-wrapper end */
  /**/
  .hot::after {
    content: '';
    display: block;
    width: 10px;
    height: 14px;
    position: absolute;
    right: 0;
    transform: translate3d(50%, -50%, 0);
    top: 0;
    background: url("../../statics/img/hot_icon.png") no-repeat 0 0;
  }
  .update::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    position: absolute;
    background-color: #0acdc7;
    border-radius: 50%;
    right: 0;
    transform: translate3d(50%, -50%, 0);
    top: 0;
  }
  .index-content {
    background: url("../../statics/img/home_bg_8_29.jpg") no-repeat;
    background-size: cover;
    padding-bottom: 41px;
  }
  .play-types {
    margin-top: 62px;
  }
  .type {
    /*height: 501px;*/
    height: 525px;
    background: #fff;
    float: left;
  }
  .type-one {
    width: 305px;
    background-color: #f3f3f3;
  }
  .type-title {
    width: 100%;
    height: 56px;
    padding-left: 10px;
    line-height: 56px;
    font-size: 27px;
    color: #131313;
  }
  .type-title img {
    vertical-align: middle;
  }
  .type-one-title {
    background: url("../../statics/img/title_szcp_bg.jpg") no-repeat 0 0;
  }
  /*todo : 添加对应的数字彩票滚动的动画*/
  .type-one-content {
    padding: .1px 12px 0 17px;
    overflow: hidden;
    position: relative;
    border-right: 1px solid #cecece;
    height: 89%;
  }
  /* .type-one-content::after {
    content: '';
    display: block;
    height: 1px;
    width: 307px;
    background-color: #dbdbdb;
    position: absolute;
    left: 0;
    top: 175px;
  } */
  .type-one-content .szcp_types > li {
    margin-top: 15px;
  }
  .type-one-content .szcp_types > li > h4 {
    font-size: 16px;
    font-weight: normal;
  }
  .type-one-content .szcp_types > li > ul {}
  .type-one-content .szcp_types > li > ul > li {
    margin-top: 13px;
    position: relative;
    float: left;
    width: 84px;
    height: 31px;
    border: 1px solid #d7d7d7;
    border-radius: 1px;
    line-height: 31px;
    text-align: center;
  }
  .type-one-content .szcp_types > li > ul > li:hover {
    border-color: #f63e3e !important;
  }
  .type-one-content .szcp_types > li > ul > li:hover > a {
    color: #f63e3e !important;
  }
  .type-one-content .szcp_types > li:nth-of-type(2) > ul > li:nth-of-type(1),
  .type-one-content .szcp_types > li:nth-of-type(2) > ul > li:nth-of-type(2),
  .type-one-content .szcp_types > li:nth-of-type(2) > ul > li:nth-of-type(3),
  .type-one-content .szcp_types > li:nth-of-type(3) > ul > li:nth-of-type(1),
  .type-one-content .szcp_types > li:nth-of-type(3) > ul > li:nth-of-type(2),
  .type-one-content .szcp_types > li:nth-of-type(3) > ul > li:nth-of-type(3),
  .type-one-content .szcp_types > li:nth-of-type(4) > ul > li:nth-of-type(1),
  .type-one-content .szcp_types > li:nth-of-type(4) > ul > li:nth-of-type(2),
  .type-one-content .szcp_types > li:nth-of-type(4) > ul > li:nth-of-type(3){
    margin-top: 9px;
  }
  .type-one-content .szcp_types > li > ul > li > a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #242424;
  }
  .type-one-content .szcp_types > li:nth-of-type(1) > ul > li:nth-last-of-type(1) {
    margin-bottom: 13px;
  }
  .type-one-content .szcp_types > li > ul > li:nth-of-type(3n-1) {
    margin-left: 11px;
    margin-right: 12px;
  }
  /* ------------------------ */
  .type-two {
    width: 315px;
    background-color: #f3f3f3;
  }
  .type-two-title {
    background: url("../../statics/img/title_szcp_bg.jpg") no-repeat -305px 0;
  }
  .type-two-content {
    padding: 19px 9px 0px 9px;
  }
  .type-two-content li > h4 {
    text-align: center;
    font-size: 15px;
    color: #444444;
    margin-top: 14px;
  }
  .type-two-content li:nth-of-type(2) {
    margin-top: 13px;
  }
  /* ---------------------------- */
  .type-three {
    width: 620px;
  }
  .type-three-title {
    background: url("../../statics/img/title_3_bg.png") no-repeat 0 0;
    font-size: 24px;
    position: relative;
    color: #ffffff;
  }
  .type-three-title span {
    font-size: 17px;
    color: #cdc496;
  }
  .type-three-title .enter-anyone {
    position: absolute;
    width: 77px;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    line-height: 32px;
    text-align: center;
    background-color: #8d6e03;
    font-size: 14px;
    color: #ffffff;
  }
  .type-three-content {
    height: 445px;
    position: relative;
    /*background: url("../../statics/img/zbhd_content_bg.png") no-repeat 0 0;*/
    /*background-size: auto 100%;*/
    background: #fff;
  }
  .video-box {
    height:316px;
    overflow: hidden;
  }
  .type-three-content .lb-video {
    width: 100%;
    height: 79%;
    flex-basis: 100%;
    cursor: pointer;
    margin-top:-2px;
  }
  .type-three-content > a {
    position: absolute;
    width: 141px;
    line-height: 41px;
    background-color: rgba(155, 132, 3, .8);
    text-align: center;
    font-size: 18px;
    color: #fff;
    top: 157px;
    left: 50%;
    transform: translateX(-50%);
  }
  .type-three-content ul {
    width: 100%;
    height: 129px;
    /*padding: 11px 13px 0 17px;*/
    padding: 40px 13px 0 17px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  /*.type-three-content ul::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
  }*/
  .type-three-content ul > li {
    float: left;
    width: 142px;
    height: 100%;
  }
  .type-three-content ul > li:nth-of-type(2) {
    margin: 0 7px;
  }
  .type-three-content ul > li:nth-of-type(3) {
    margin: 0 7px 0 0;
  }
  .type-three-content ul > li > a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .zbhd-right-items li {
    margin: 12px 0 12px 0;
  }
  /* -----------------------------*/
  .qpyl {
    margin-top: 39px;
    height: 386px;
    background: url("../../statics/img/qpyl_bg_8_29.png") no-repeat 0 0;
  }
  .qpyl > div {
    float: left;
    height: 100%;
  }
  .qpyl > div:nth-of-type(1) {
    width: 434px;
  }
  .qpyl > div:nth-of-type(1) img {
    position: relative;
    top: -41px;
    left: -23px;
  }
  .qpyl-center {
    width: 526px;
  }
  .qpyl-center h3 {
    margin-top: 23px;
    color: #86899e;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 12px;
  }
  .qpyl-center h3 span {
    color: #ffffff;
    font-size: 24px;
    margin-right: 2px;
  }
  .qpyl-center > p {
    line-height: 24px;
    padding-right: 12px;
    margin-top: 6px;
    font-size: 15px;
    color: #9ea3c9;
    margin-bottom: 27px;
  }
  .qpyl-center > ul {}
  .qpyl-center > ul > li {
    float: left;
    padding: 3px;
    height: 218px;
    background: url("../../statics/img/border_image.png") no-repeat 0 0;
    width: 165px;
  }
  .qpyl-center > ul > li:nth-of-type(2) {
    margin: 0 15px;
  }
  .qpyl-center > ul > li > .inner {
  }
  .qpyl-center > ul > li > .inner h4 {
    text-align: center;
    margin-top: 15px;
    font-size: 18px;
    color: #19dfd6;
    font-weight: normal;
    margin-bottom: 3px;
  }
  .qpyl-center > ul > li > .inner a {
    display: block;
    width: 142px;
    border: 1px solid #5b5d81;
    height: 38px;
    background-color: #323461;
    text-align: center;
    line-height: 38px;
    margin: 16px auto 0 auto;
    border-radius: 3px;
    font-size: 14px;
    color: #ffffff;
    transition: 0.6s;
  }
  .qpyl-center > ul > li > .inner .game-name:hover,
  .qpyl-center > ul > li > .inner .game-name:focus{
    background-color: #fede0f;
    color: #000000;
  }
  .qpyl-right {
    width: 280px;
  }
  .qpyl-right li>a{
    color: white;
  }
  .qpyl-right-top-items li,
  .qpyl-right-bottom-items li {
    float: left;
    transition: all 0.2s ease-in-out;
  }
  .qpyl-right-bottom-items li, .qpyl-right-top-items li{
    flex-basis: 26.8%;
    background-color: #ff5361;
    color: white;
    margin:1px;
    transform: skewX(-10deg);
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qpyl-right-bottom-items li{
    flex-basis: 42.3%;
  }
  .qpyl-right-bottom-items li>a .items-content,
  .qpyl-right-top-items li>a .items-content{
    transform: skewX(10deg);
    font-size: 12px;
  }
  .qpyl-right-bottom-items ul, .qpyl-right-top-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .qpyl-right {
    float: right!important;
    position: relative;
  }
  .qpyl-right > a {
    position: absolute;
    bottom: 12px;
    right: 13px;
  }
  .qpyl-right-top-items li:nth-child(3) {
    margin-right: -1px;
    background: linear-gradient(-100deg, transparent 6px, #ff5361 0) right bottom;
  }
  .qpyl-right-bottom-items li:nth-child(2) {
    margin-right: -1px;
    flex-basis: 43.7%;
    background: linear-gradient(-100deg, transparent 6px, #ff5361 0) right bottom;
  }
  .qpyl-right-top-items li:hover,.qpyl-right-bottom-items li:hover,.qpyl-right-top-items li.actives,.qpyl-right-bottom-items li.actives {
    color: white;
    background: #c13831;
  }
  .qpyl-right-top-items li:nth-child(3):hover,.qpyl-right-bottom-items li:nth-child(2):hover,.qpyl-right-bottom-items li:nth-child(2):focus,
  .qpyl-right-top-items li:nth-child(3):focus,.qpyl-right-top-items li:nth-child(3).actives,.qpyl-right-bottom-items li:nth-child(2).actives {
    background: linear-gradient(-100deg, transparent 6px, #c13831 0) right bottom;
  }
  .live-list-01 {
    animation-delay:.2s;
  }
  .live-list-02 {
    animation-delay:.4s;
  }
  .live-list-03 {
    animation-delay:.6s;
  }
  .live-list-04 {
    animation-delay:.8s;
  }
  /*.qpyl-right-top-items li:nth-of-type(1),*/
  /*.qpyl-right-top-items li:nth-of-type(2) {*/
  /*margin-right: -9px;*/
  /*}*/
  /*.qpyl-right-top-items li:nth-of-type(1) {*/
  /*margin-left: 29px;*/
  /*}*/
  /*.qpyl-right-bottom-items li:nth-of-type(1) {*/
  /*margin-right: -13px;*/
  /*margin-left: 17px;*/
  /*}*/
  .game-type-names li {
    float: left;
    width: 413px;
    height: 349px;
  }
  .game-type-names li h4 {
    height: 56px;
    font-size: 17px;
    color: #c3c5d3;
    font-weight: normal;
    padding-left: 27px;
    line-height: 56px;
    width: 100%;
  }
  .game-type-names li span {
    color: #fff;
    font-size: 22px;
  }
  .game-type-names li:nth-of-type(1) h4 {
    background: url("../../statics/img/game_type_1_title_bg.jpg") no-repeat 0 0;
  }
  .game-type-names li:nth-of-type(2) h4 {
    background: url("../../statics/img/game_type_2_title_bg.jpg") no-repeat 0 0;
  }
  .game-type-names li:nth-of-type(3) h4 {
    background: url("../../statics/img/game_type_3_title_bg.jpg") no-repeat 0 0;
  }
  .game-type-names li > div {
    height: 293px;
    position: relative;
  }
  .game-type-names li >div > a,.game-type-names li >div >.game-item-box {
    position: absolute;
    bottom: 102px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    color: #fff;
    width: 100px;
    line-height: 31px;
    height: 31px;
    text-align: center;
    font-weight: bold;
    background-color: rgba(0, 0, 0, .8);
    z-index: 99;
  }
  .game-type-names li >div >.game-item-box{
    width:100%;
    background: none;
    bottom: 155px;
    display: none;
  }
  .game-type-names li >div >.game-item-box > a{
    background-color: rgba(0, 0, 0, .8);
    font-size: 16px;
    color: #fff;
    width: 100px;
    line-height: 31px;
    height: 31px;
    text-align: center;
    font-weight: 300;
    margin-right: 8px;
    display: inline-block;
  }
  .game-item-box > a:hover {
    color:#61d0ef !important;
  }
  .game-type-names li >div > p {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 77px;
    padding: 13px 30px 0 23px;
    background-color: rgba(0, 0, 0, .8);
    font-size: 14px;
    color: #fff;
    line-height: 22px;
    z-index: 2;
  }
  .game-type-names li >div >.game-type-shows {
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  .game-type-names li >div:hover .game-type-shows {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .game-type-names li >div:hover .game-item-box {
    display: block;
  }
  .game-type-names li:nth-of-type(1)>div {
    background: url("../../statics/img/game_type_1_bg.jpg") no-repeat 0 0;
  }
  .game-type-names li:nth-of-type(2)>div {
    background: url("../../statics/img/game_type_2_bg.jpg") no-repeat 0 0;
  }
  .game-type-names li:nth-of-type(3)>div {
    background: url("../../statics/img/game_type_3_bg.jpg") no-repeat 0 0;
  }
  .promotions {
    margin-top: 28px;
    height: 299px;
    background-color: #fff;
    padding: 20px 37px 0 34px;
  }
  .promotions h4 {
    font-size: 20px;
    margin-bottom: 16px;
    color: #272727;
  }
  .promotions ul {}
  .promotions ul > li {
    float: left;
    width: 573px;
  }
  .promotions ul > li > a:nth-of-type(1) {
    display: inline-block;
    margin-bottom: 14px;
  }
  .promotions ul > li > a:nth-of-type(2) {
    display: inline-block;
    font-size: 17.5px;
    color: #3b3b3b;
  }
  .promotions ul > li > a {
    position: relative;
    overflow: hidden;
  }
  .promotions ul > li:nth-of-type(1) {
    margin-right: 24px;
    margin-left: 24px;
  }
  .promotions-list-poster li a:hover img {
    opacity: .4;
    transform: scale(1.2);
    transition: all .6s;
  }
  .promotions-list-poster .el-button {
    position: absolute;
    width: 140px;
    top: calc(50% - 20px);
    left: calc(50% - 70px);
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
    color: #fff;
    visibility: hidden;
  }
  .promotions-list-poster li a:hover .el-button {
    visibility: visible;
    z-index: 4;
  }
  .company-description {
    margin-top: 27px;
  }
  .company-description > div {
    float: left;
    height: 321px;
  }
  .company-description > .company-description-left {
    width: 310px;
    background-color: #20222e;
  }
  .company-description > .company-description-left > a  {
    display: block;
    width: 100%;
    position: relative;
  }
  .company-description > .company-description-left > a > img  {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 48px;
  }
  .company-description > .company-description-left > a > div  {
    position: absolute;
    color: #fff;
    top: 25px;
    right: 35px;
  }
  .company-description > .company-description-left > a > div > span  {
    font-size: 35px;
  }
  .company-description > .company-description-left > a > div > span > i  {
    font-size: 14px;
    font-style: normal;
    margin-left: 3px;
  }
  .company-description > .company-description-left > a > div > p  {
    font-size: 18px;
    margin-top: 10px;
  }
  .company-description > .company-description-left > a:nth-of-type(1)  {
    height: 104px;
    background-color: #20222e;
  }
  .company-description > .company-description-left > a:nth-of-type(2)  {
    height: 99px;
    background-color: #303242;
  }
  .company-description > .company-description-left > p  {
    text-align: center;
    margin-top: 23px;
    color: #fff;
    margin-bottom: 16px;
    width: 100%;
  }
  .company-description > .company-description-left > ul {
    padding-left: 24px;
    padding-right: 16px;
  }
  .company-description > .company-description-left > ul > li  {
    float: left;
    text-align: center;
    margin-left: 15px;
    height: 55px;
  }
  .company-description > .company-description-left > ul > li:nth-of-type(1)  {
    margin-left: 0;
  }
  .company-description > .company-description-left > ul > li > a  {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .company-description > .company-description-left > ul > li > a > p  {
    font-size: 12px;
    color: #b3b4b8;
    position: absolute;
    width: 100%;
    bottom: 0;
    white-space: nowrap;
  }
  /*--------------------------- right*/
  .company-description-right {
    color: #b0b4cc;
    width: 609px;
    background: url("../../statics/img/company_description_bg_right.png") no-repeat 0 0;
    padding: 26px 50px 0 55px;
  }
  .company-description-right > p {
    font-size: 14px;
    text-indent: 2em;
    line-height: 24px;
  }
  .company-description-right > ul {}
  .company-description-right > ul > li {
    padding-left: 59px;
    position: relative;
    margin-top: 12px;
  }
  .company-description-right > ul > li > h4 {
    font-size: 18px;
    color: #eaeaea;
    margin-bottom: 7px;
  }
  .company-description-right > ul > li > img {
    position: absolute;
    left: 0px;
  }
  .company-description-right > ul > li > p {
    line-height: 20px;
    font-size: 14px;
  }
  /*视频下方列表动画开始*/
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @media (prefers-reduced-motion) {
    .animated {
      -webkit-animation: unset !important;
      animation: unset !important;
      -webkit-transition: none !important;
      transition: none !important;
    }
  }
  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
  .fadeInDownSmall {
    -webkit-animation-name: fadeInDownSmall;
    animation-name: fadeInDownSmall;
  }
  @keyframes fadeInDownSmall {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -20px, 0);
      -ms-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  /*-------自适应开始-----------*/
  .qpyl .qpyl-left.button>ul>li{
    background: -webkit-gradient(linear, left top, right top, from(#89ddf5), to(#1199bf));
    background: linear-gradient(to right, #89ddf5, #1199bf);
    color: white;
    width: 100%;
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-family: sans-serif;
    letter-spacing: 0.2em;
    border: 1px solid #0c81a2;
    border-radius: 2em;
    -webkit-transform: perspective(500px) rotateY(-15deg);
    transform: perspective(500px) rotateY(-15deg);
    text-shadow: 6px 3px 2px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 2px 0 0 5px rgba(0, 0, 0, 0.2);
    box-shadow: 2px 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-transition: 0.5s;
    transition: 0.5s;
    position: relative;
    overflow: hidden;
    margin: 25px 0!important;
  }
  .qpyl .qpyl-left.button>ul>li:hover{
    -webkit-transform: perspective(500px) rotateY(15deg);
    transform: perspective(500px) rotateY(15deg);
    text-shadow: -6px 3px 2px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: -2px 0 0 5px rgba(0, 0, 0, 0.2);
    box-shadow: -2px 0 0 5px rgba(0, 0, 0, 0.2);
    background: -webkit-gradient(linear, left top, right top, from(#1199bf), to(#89ddf5));
    background: linear-gradient(to right, #1199bf, #89ddf5);
  }
  .qpyl-center-li{
    width: 80%;
    padding-left: 50px;
  }
  .qpyl-center-li ul li{
    width: 170px;
  }
  .game-type-names.clear-fix li{
    width: 33.333% !important;
  }
  .promotions{
    padding: 0!important;
  }
  .width.company-description.clear-fix{
    padding: 0!important;
  }
  @media screen and (min-width:990px) and (max-width:1257px){
    .width {
      width: 970px;
      padding: 0 10px;
    }
    .index-content{
      background-size: cover;
    }
    .types-top.clear-fix .type-one.type,
    .types-top.clear-fix .type-two.type{
      width: 50%;
    }
    .type{
      height: 674px;
    }
    .type-one-content{
      height: 100%;
    }
    .type-two-content ul li a img,
    .fadeInDownSmall,
    .types-top.clear-fix .type-three.type{
      width: 100%;
    }
    .type-two-title{
      background: url("../../statics/img/title_szcp_bg.jpg") no-repeat 0 0;
    }
    .type-three-title{
      background-size: 100%;
    }
    .type-three.type{
      height: 580px;
    }
    .type-three-content ul{
      padding:40px 0 0;
    }
    .type-three-content ul > li:nth-of-type(1){
      margin: 0!important;
    }
    .type-three-content ul > li{
      width: 24%;
      margin:0 0 0 12px!important;
    }
    .game-type-names.clear-fix li{
      width: 33.333% !important;
    }
    .qpyl {
      width: 100%;
      height: 386px;
      background: url("../../statics/img/laohuji_bg_m.png") no-repeat 0 0;
    }
    .promotions{
      padding: 0!important;
      height: unset;
    }
    .promotions ul > li{
      width: 48%;
    }
    .promotions ul > li:nth-of-type(1) {
      margin-left: 0;
    }
    .promotions ul > li > a,
    .promotions ul > li > a img{
      width: 100%;
    }
    .company-description-left{
      width: 25% !important;
    }
    .company-description-right{
      padding:25px 20px 0;
      width: 40% !important;
    }
    .company-description-right > ul > li > img{
      display: none;
    }
    .company-description-right > ul > li{
      padding:0;
    }
    .company-description-right > ul > li p{
      line-height: 16px!important;
      font-size: 14px!important;
    }
    .company-description-right > p{
      font-size: 14px;
      text-indent: 1em;
      line-height: 16px;
    }
    .company-description > .company-description-left > a:nth-of-type(1),
    .company-description > .company-description-left > a:nth-of-type(2){
      height: 25%;
    }
    .company-description > .company-description-left > a img{
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      left: 15px;
    }
    .company-description > .company-description-left > a > div{
      position: absolute;
      color: #fff;
      top:20%;
      left: 80px;
      width: 60%;
    }
    .company-description > .company-description-left > a > div span{
      font-size: 25px;
    }
    .company-description > .company-description-left > a > div p{
      font-size: 16px;
    }
    .company-description > .company-description-left > p{
      text-align: center;
      margin: 15px 0;
      color: #fff;
      width: 100%;
    }
    .company-description > .company-description-left > ul > li:nth-of-type(1),
    .company-description > .company-description-left > ul > li:nth-of-type(3){
      margin-left: 0;
    }
    .company-description > .company-description-left > ul > li{
      float: left;
      text-align: center;
      margin-left: 15px;
      height: 55px;
      width: 42%;
      padding-top: 10px;
    }
    .type-one-content .szcp_types > li > ul > li{
      margin-right: 25px!important;
      margin-left: 0!important;
      width: 100px;
      height: 35px;
      line-height: 35px;
    }
  }
  @media screen and (min-width:762px) and (max-width:989px){
    .width {
      width: 750px;
      /*/width: 640px;    !*新*!*/
      padding: 0 10px;
    }
    .index-content{
      background-size: cover;
    }
    .promotions{
      height: unset;
    }
    .promotions ul > li:nth-of-type(1) {
      margin-left: 0;
    }
    .type-two-title{
      background: url("../../statics/img/title_szcp_bg.jpg") no-repeat 0 0;
    }
    .type-three-content ul{
      padding:40px 5px 0;
    }
    .type-two-content ul li a img,
    .fadeInDownSmall{
      width: 100%;
    }
    .type-title.type-three-title{
      background-size: 100%;
    }
    .types-top.clear-fix .type-one.type,
    .types-top.clear-fix .type-two.type{
      width: 50%;
    }
    .types-top.clear-fix .type-three.type,
    .promotions-list-poster.clear-fix li,
    .promotions-list-poster.clear-fix li a,
    .promotions-list-poster.clear-fix li a img{
      width: 100% !important;
    }
    .promotions ul > li{
      width: 48%;
    }
    .company-description-left{
      width: 20% !important;
      text-align: center;
    }
    .company-description-right{
      width:37%!important;
      padding: 15px 15px 0;
    }
    .company-description-right > ul{
      width: 100%;
    }
    .company-description-right > p{
      font-size: 12px;
      line-height: 17px;
      text-indent: 1em;
    }
    .company-description-right ul li p{
      line-height: 18px;
      font-size: 12px;
    }
    .company-description-right > ul > li > img{
      display: none;
    }
    .company-description-right > ul > li{
      padding-left: 0;
      margin: 0;
    }
    .company-description > .company-description-left > a > img{
      display: none;
    }
    .company-description > .company-description-left > a > div{
      position: absolute;
      color: #fff;
      top: 12px;
      right: 0;
      width: 100%;
    }
    .company-description > .company-description-left > a > div > span{
      font-size: 30px;
    }
    .company-description > .company-description-left > a > div > p{
      font-size: 14px;
      margin-top: 10px;
    }
    .company-description > .company-description-left > a:nth-of-type(1),
    .company-description > .company-description-left > a:nth-of-type(2){
      height: 25%;
    }
    .company-description > .company-description-left > ul{
      padding: 0 5px;
    }
    .company-description > .company-description-left > ul li{
      margin-left: 20px;
      padding-top: 5px;
    }
    .company-description > .company-description-left > ul > li:nth-of-type(3){
      margin-left: 0;
    }
    .company-description > .company-description-left > p{
      margin: 15px 0;
    }

    .type-three-content.clear-fix .live-list li{
      width: 24%!important;
    }
    .game-type-names.clear-fix{
      margin-top: 20px;
    }
    .qpyl.width.clear-fix{
      display: none;
    }
    .game-type-names li >div > p{
      line-height: 16px;
      font-size: 12px;
    }
  }
  @media screen and  (max-width:761px){
    .width {
      max-width: 714px;
      padding: 0 15px;
      width: 100%;
    }
    .index-content{
      background-size: cover;
    }
    .type-one-title,
    .game-type-names.clear-fix li h4,
    .game-type-names.clear-fix li div,
    .promotions.width ul > li,
    .promotions.width ul > li > a>img{
      background-size: 100%;
    }
    .type-one.type,
    .type-one-title,
    .game-type-names.clear-fix,
    .game-type-names.clear-fix li,
    .promotions.width ul > li,
    .promotions.width ul > li > a>img,
    .game-type-names.clear-fix li a img,
    .promotions ul > li > a{
      width: 100% !important;
    }
    .types-top.clear-fix{
      margin-bottom: 20px;
    }
    .header-wrapper div,
    .type-two.type,
    .type-three.type,
    .qpyl.width.clear-fix,
    .company-description-right,
    .width.company-description.clear-fix{
      display: none;
    }
    .promotions.width{
      padding: 0!important;
    }
    .promotions ul > li:nth-of-type(1) {
      margin-left: 0;
    }
    .type-one-content .szcp_types > li > ul > li{
      margin-right: 20px!important;
      margin-left: 0!important;
      width: 90px;
      height: 25px;
      line-height: 25px;
    }
    .type-title img{
      height: 24px;
    }
    .type-title{
      font-size: 16px;
      text-align: center;
      background: url("../../statics/img/title_szcp_bg.jpg") repeat 100% 100%;
    }
    .promotions{
      height: unset;
    }
  }
  /*-------自适应结束-----------*/
</style>
