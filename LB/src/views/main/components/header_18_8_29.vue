<template>
  <div class="header-wrapper">
    <div class="width header">
      <div class="header-left clear-fix">
        <a @click="$router.push('/index')"
            href="javascript:;">
          <img :src="logo" alt="logo">
        </a>
      </div>
      <div class="header-right clear-fix">
        <ul class="clear-fix">
          <li :class="{'now-hov':nowHow === 'szcp'}" @mouseleave="setNowColor()" @mouseenter="GetThirdGameListFn('szcp')">
            <a href="javascript:;">
              <span>{{$t('header.digitalLottery')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="szcp_detail menu_detail szcp">
              <div v-for="(menuItem, index) in szcpMenuItemList"
                    :key="index"
                    class="szcp_links_item clear-fix">
                <div>
                  <span :style="{ 'width': menuItem.count > 5 ? 'auto' : '50px' }">{{menuItem.name}}</span>
                </div>
                <a v-for="(innerLink, innerIndex) in menuItem['lotteries']"
                    @click="$store.dispatch('playTypeGame', { upperName: index, menuLink: innerLink, lotteryId: innerIndex, isJump: true })"
                    :key="innerIndex"
                    :class="{ 'red': innerLink.hot === 1, 'blue': innerLink.new === 1 }"
                    href="javascript:;">{{innerLink.name}}</a>
              </div>
            </div>
          </li>
          <li :class="{'now-hov':nowHow === 'zrcp'}" @mouseleave="setNowColor()"  @mouseenter="GetThirdGameListFn('zrcp')">
            <a href="javascript:;">
              <span>{{$t('header.liveLottery')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="zrcp_detail menu_detail zrcp" id="caonima">
              <a class="pre" href="javascript:;">
                <img :src="menuDetailPreIcon" alt="menuDetailPreIcon">
              </a>
              <a class="zrcp_detail_item" href="javascript:;" title="LG | 1.5分真人视频彩">
                <img class="person" :src="zrcpPerson1" alt="person">
                <img class="ball" :src="ballImg1" alt="ball">
                <h4>
                  <img :src="zrcpItemIcon" alt="zrcpItemIcon">
                  LG | 1.5分真人视频彩
                </h4>
              </a>
              <a class="zrcp_detail_item" href="javascript:;" title="LG | 3分真人视频彩">
                <img class="person" :src="zrcpPerson2" alt="person">
                <img class="ball" :src="ballImg2" alt="ball">
                <h4>
                  <img :src="zrcpItemIcon" alt="zrcpItemIcon">
                  LG | 3分真人视频彩
                </h4>
              </a>
              <a class="zrcp_detail_item" href="javascript:;" title="LG | 5分真人视频彩">
                <img class="person" :src="zrcpPerson3" alt="person">
                <img class="ball" :src="ballImg3" alt="ball">
                <h4>
                  <img :src="zrcpItemIcon" alt="zrcpItemIcon">
                  LG | 5分真人视频彩
                </h4>
              </a>
              <a class="zrcp_detail_item" href="javascript:;" title="LG | VR分真人视频彩">
                <img class="person" :src="zrcpPerson4" alt="person">
                <img class="ball" :src="ballImg4" alt="ball">
                <h4>
                  LG | VR分真人视频彩
                </h4>
              </a>
              <a class="next" href="javascript:;">
                <img :src="menuDetailNextIcon" alt="menuDetailNextIcon">
              </a>
            </div>
          </li>
          <!--<li>
            <a href="javascript:;">
              <span>{{$t('header.chessEntertainment')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="qpyl_detail menu_detail">
              <div class="qpyl_detail_item clear-fix">
                <img :src="qpylItemImg1" alt="qpylItemImg1">
                <a href="javascript:;">德州扑克</a>
                <a href="javascript:;">吹牛</a>
                <a href="javascript:;">斗地主</a>
                <a href="javascript:;">扎金花</a>
                <a href="javascript:;">梭哈</a>
                <a href="javascript:;">牛牛</a>
                <a href="javascript:;">跑得快</a>
                <a href="javascript:;">GG大话骰</a>
                <a href="javascript:;">GG德州扑克</a>
              </div>
              <div class="qpyl_detail_item clear-fix">
                <img :src="qpylItemImg2" alt="qpylItemImg2">
                <a href="javascript:;">都抵制</a>
                <a href="javascript:;">二人麻将</a>
                <a href="javascript:;">跑得快</a>
                <a href="javascript:;">扎金花</a>
                <a href="javascript:;">二人牛牛</a>
                <a href="javascript:;">黑杰克</a>
                <a href="javascript:;">梭哈</a>
                <a href="javascript:;">抢庄牛牛</a>
                <a href="javascript:;">四川麻将</a>
                <a href="javascript:;">推倒胡</a>
                <a href="javascript:;">中国象棋</a>
                <a href="javascript:;">大众麻将</a>
              </div>
              <div class="qpyl_detail_item clear-fix">
                <img :src="qpylItemImg3" alt="qpylItemImg3">
                <a href="javascript:;">百人牛牛</a>
                <a href="javascript:;">龙虎斗</a>
                <a href="javascript:;">跑得快</a>
                <a href="javascript:;">百家乐</a>
                <a href="javascript:;">三公</a>
                <a href="javascript:;">黑杰克</a>
                <a href="javascript:;">百人十点半</a>
                <a href="javascript:;">推筒子</a>
                <a href="javascript:;">四川麻将</a>
                <a href="javascript:;">赛马</a>
                <a href="javascript:;">牌九</a>
                <a href="javascript:;">大众麻将</a>
                <a href="javascript:;">赛狗</a>
                <a href="javascript:;">骰宝</a>
              </div>
              <div class="qpyl_detail_item clear-fix">
                <img :src="qpylItemImg4" alt="qpylItemImg4">
                <a href="javascript:;">主播斗地主</a>
                <a href="javascript:;">主播骰宝</a>
                <a href="javascript:;">主播扎金花</a>
                <a href="javascript:;">主播牛牛</a>
                <a href="javascript:;">主播三公</a>
                <a href="javascript:;">主播推筒子</a>
                <a href="javascript:;">主播跑得快</a>
                <a href="javascript:;">主播德州扑克</a>
                <a href="javascript:;">主播吹牛</a>
              </div>
              <div class="other-links clear-fix">
                <a href="javascript:;">
                  <img :src="qpylOtherLinkIcon1" alt="qpylOtherLinkIcon1">
                  <p>娱乐吧</p>
                </a>
                <a href="javascript:;">
                  <img :src="qpylOtherLinkIcon2" alt="qpylOtherLinkIcon2">
                  <p>开元棋牌</p>
                </a>
                <a href="javascript:;">
                  <img :src="qpylOtherLinkIcon3" alt="qpylOtherLinkIcon3">
                  <p>LiveGaming</p>
                </a>
                <a href="javascript:;">
                  <img :src="qpylOtherLinkIcon4" alt="qpylOtherLinkIcon4">
                  <p>其他棋牌</p>
                </a>
              </div>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <span>{{$t('header.electronicEntertainment')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="dzyy_detail menu_detail">
              <div class="dzyy_detail_item clear-fix">
                <img :src="dzyyMenuItemLhj1" alt="dzyyMenuItemLhj1">
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
              </div>
              <div class="dzyy_detail_item clear-fix">
                <img :src="dzyyMenuItemLhj2" alt="dzyyMenuItemLhj2">
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
              </div>
              <div class="dzyy_detail_item clear-fix">
                <img :src="dzyyMenuItemLhj3" alt="dzyyMenuItemLhj2">
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">三小丑刮刮乐</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
                <a href="javascript:;">神的时代:雷霆4神</a>
              </div>
              <div class="page-count">
                <a href="javascript:;">[第一页]</a>
                <a href="javascript:;">[第二页]</a>
                <a class="now-hov" href="javascript:;">[第三页]</a>
                <a href="javascript:;">[第四页]</a>
                <a href="javascript:;">[第五页]</a>
              </div>
              <div class="other-links clear-fix">
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon1" alt="dzyyMenuOtherLinkIcon1">
                  <p>PlayTech</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon2" alt="dzyyMenuOtherLinkIcon2">
                  <p>Betsoft</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon3" alt="dzyyMenuOtherLinkIcon3">
                  <p>LiveGaming</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon4" alt="dzyyMenuOtherLinkIcon4">
                  <p>其他游戏</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon1" alt="dzyyMenuOtherLinkIcon1">
                  <p>PlayTech</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon2" alt="dzyyMenuOtherLinkIcon2">
                  <p>Betsoft</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon3" alt="dzyyMenuOtherLinkIcon3">
                  <p>LiveGaming</p>
                </a>
                <a href="javascript:;">
                  <img :src="dzyyMenuOtherLinkIcon4" alt="dzyyMenuOtherLinkIcon4">
                  <p>其他游戏</p>
                </a>
              </div>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <span>{{$t('header.liveVideo')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="zrsx_detail menu_detail">
              <a class="pre" href="javascript:;">
                <img :src="menuDetailPreIcon" alt="menuDetailPreIcon">
              </a>
              <a class="zrsx_detail_item" href="javascript:;">
                <img :src="zrsxPersonImg1" alt="zrsxPersonImg1">
                <img :src="iconCommonZrsx" alt="iconCommonZrsx">
                <img :src="zrsxAgIconImg" alt="zrsxAgIconImg">
                <p>AG旗舰厅</p>
              </a>
              <a class="zrsx_detail_item" href="javascript:;">
                <img :src="zrsxPersonImg2" alt="zrsxPersonImg2">
                <img :src="iconCommonZrsx" alt="iconCommonZrsx">
                <img :src="zrsxEbatIconImg" alt="zrsxEbatIconImg">
                <p>移动娱乐
                  <br>第一品牌</p>
              </a>
              <a class="zrsx_detail_item" href="javascript:;">
                <img :src="zrsxPersonImg3" alt="zrsxPersonImg3">
                <img :src="iconCommonZrsx" alt="iconCommonZrsx">
                <img :src="zrsxSunIconImg" alt="zrsxSunIconImg">
                <p>SUNCITY</p>
              </a>
              <a class="next" href="javascript:;">
                <img :src="menuDetailNextIcon" alt="menuDetailNextIcon">
              </a>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <span>{{$t('header.sportsEvent')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="tyss_detail menu_detail">
              <a class="pre" href="javascript:;">
                <img :src="menuDetailPreIcon" alt="menuDetailPreIcon">
              </a>
              <div class="tyss_detail_items clear-fix">
                <a class="clear-fix" href="javascript:;">
                  <img :src="tyssImg1" alt="tyssImg1">
                  <div>
                    <div>
                      <img :src="tyssIcon1" alt="tyssIcon1">
                    </div>
                    <h4>体育竞技</h4>
                    <p>多元化滚球，最受欢迎的线上体育</p>
                  </div>
                </a>
                <a class="clear-fix" href="javascript:;">
                  <img :src="tyssImg2" alt="tyssImg2">
                  <div>
                    <div>
                      <img :src="tyssIcon2" alt="tyssIcon2">
                    </div>
                    <h4>UG体育</h4>
                    <p>足球篮球等世界主要体育投注专家</p>
                  </div>
                </a>
                <a class="clear-fix" href="javascript:;">
                  <img :src="tyssImg3" alt="tyssImg3">
                  <div>
                    <div><img :src="tyssIcon3" alt="tyssIcon3"></div>
                    <h4>沙巴体育</h4>
                    <p>最受欢迎的线上体育专家</p>
                  </div>
                </a>
              </div>
              <a class="next" href="javascript:;">
                <img :src="menuDetailNextIcon" alt="menuDetailNextIcon">
              </a>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <span>{{$t('header.eSports')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="dzjj_detail menu_detail">
              <a class="pre" href="javascript:;">
                <img :src="menuDetailPreIcon" alt="menuDetailPreIcon">
              </a>
              <div class="dzjj_detail_items clear-fix">
                <a href="javascript:;">
                  <img :src="dzjjPersonImg1" alt="dzjjPersonImg1">
                  <div>
                    <div><img :src="dzjjIcon1" alt="dzjjIcon1"></div>
                    <h4>HC电竞</h4>
                  </div>
                </a>
                <a href="javascript:;">
                  <img :src="dzjjPersonImg2" alt="dzjjPersonImg2">
                  <div>
                    <div><img :src="dzjjIcon2" alt="dzjjIcon2"></div>
                    <h4>牛电竞</h4>
                  </div>
                </a>
                <a href="javascript:;">
                  <img :src="dzjjPersonImg3" alt="dzjjPersonImg3">
                  <div>
                    <div><img :src="dzjjIcon3" alt="dzjjIcon3"></div>
                    <h4>AVIA电竞</h4>
                  </div>
                </a>
              </div>
              <a class="next" href="javascript:;">
                <img :src="menuDetailNextIcon" alt="menuDetailNextIcon">
              </a>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <span>{{$t('header.liveInteraction')}}</span>
              <img :src="arrow" alt="arrow">
            </a>
          </li>-->
          <li :class="{'now-hov': nowHow === gameTypeItem.identify}" v-for="(gameTypeItem, index) in ThirgameType" :key="index"
              @mouseleave="setNowColor()"
              @mouseenter= "GetThirdGameListFn(gameTypeItem.identify, index)"
              @click="goToLiveBroadcast(liveInteractionId, gameTypeItem.identify)">
            <a href="javascript:;">
              <span>{{gameTypeItem.name}}</span>
              <img :src="arrow" alt="arrow">
            </a>
            <div class="zrsx_detail menu_detail" :class="gameTypeItem.identify" v-if="gameTypeItem.name == '真人视讯'">
              <el-carousel :autoplay="false" arrow="always" height="219px" indicator-position="none">
                <el-carousel-item v-for="(item, indexx) in x" :key="indexx">
                    <!--<a class="zrcp_detail_item" href="javascript:;"
                       v-for="(listItem, index) in ThirGameList"
                       :key="index" v-if="4*item>index&&index>=4*(item-1)">
                      <img class="person" :src="listItem.logo" alt="person">
                      &lt;!&ndash;<img class="ball" :src="ballImg1" alt="ball">&ndash;&gt;
                      <h4 :style="{'background-color':menColor[index%menColor.length]}">
                        <img :src="zrcpItemIcon" alt="zrcpItemIcon">
                        {{listItem.name}}
                      </h4>
                    </a>-->
                    <a class="zrsx_detail_item" href="javascript:;"
                       v-for="(listItem, index) in ThirGameList"
                       :key="index" v-if="3*item>index&&index>=3*(item-1)" @click="GetThirdGameUrlFn(listItem.id)" :title="listItem.name">
                      <img :src="listItem.logo" alt="">
                      <!--<img :src="zrsxPersonImg1" alt="zrsxPersonImg1">
                      <img :src="iconCommonZrsx" alt="iconCommonZrsx">
                      <img :src="zrsxAgIconImg" alt="zrsxAgIconImg">
                      <p>AG旗舰厅</p>-->
                      <!--<p>{{listItem.name}}</p>-->
                    </a>
                </el-carousel-item>
              </el-carousel>
            </div>
            <!--<div class="zrcp_detail menu_detail" v-if="gameTypeItem.name == '真人彩票'">
              <el-carousel :autoplay="false" arrow="always" height="219px" indicator-position="none">
                <el-carousel-item v-for="(item, indexx) in x" :key="indexx">
                  <a class="zrcp_detail_item" href="javascript:;"
                     v-for="(listItem, index) in ThirGameList"
                     :key="index" v-if="4*item>index&&index>=4*(item-1)">
                    <img class="person" :src="listItem.logo" alt="person">
                    &lt;!&ndash;<img class="ball" :src="ballImg1" alt="ball">&ndash;&gt;
                    <h4 :style="{'background-color':menColor[index%menColor.length]}">
                      <img :src="zrcpItemIcon" alt="zrcpItemIcon">
                      {{listItem.name}}
                    </h4>
                  </a>
                </el-carousel-item>
              </el-carousel>
            </div>-->
            <div class="dzyy_detail menu_detail" :class="gameTypeItem.identify" v-if="gameTypeItem.name=='电子游戏'">
              <div class="list-page">
                <div class="dzyy_detail_item clear-fix">
                  <div class="dzyy_detail_item_inner clear-fix" v-for="(Item, indexs) in ThirGameList" :key="indexs" v-if="3*page>indexs && indexs>=(page-1)*3">
                    <div class="mock-img" :style="{'background-color':menColor[indexs%menColor.length]}"><span>{{Item.tags}}</span></div>
                    <a href="javascript:;" target="_blank" v-for="(inner, index) in ThirGameList[indexs].data"
                       :key="index" v-if="inner.name!==''"
                       @click="GetThirdGameUrlFn(inner.id)"
                       :title="inner.name" :class="{'red':inner.is_hot === 1}">{{inner.name}}</a>
                  </div>
                </div>
                <!--<div class="dzyy_detail_item clear-fix" v-for="(item, indexx) in x" :key="indexx" v-if="3*page>indexx && indexx>=(page-1)*3">
                 &lt;!&ndash;<img :src="dzyyMenuItemLhj1" alt="dzyyMenuItemLhj1">&ndash;&gt;
                 <a href="javascript:;" v-for="(innerItem, index) in ThirGameList" :key="index" v-if="45*indexx<=index&&index<45*(indexx+1)&&innerItem.name!==''">{{innerItem.name}}</a>
               </div>-->
              </div>
              <div class="page-count">
                <a href="javascript:;" v-for="(pages, index) in pageTotal" :key="index" @click="pageFn(pages)" :class="[pages==page ? 'font-red' : '']">[第{{pages}}页]</a>
              </div>
              <div class="other-links clear-fix">
                <a href="javascript:;" v-for="(platFormItem, index) in ThirPlatformList" :key="index">
                  <img :src="platFormItem.logo" alt="dzyyMenuOtherLinkIcon1" width="70px" height="17px">
                  <p>{{platFormItem.name}}</p>
                </a>
              </div>
            </div>
            <div class="qpyl_detail menu_detail" :class="gameTypeItem.identify" v-if="gameTypeItem.name=='棋牌娱乐'">
              <div class="qpyl_detail_item clear-fix">
                <div class="mock-img" :style="{'background-color':'#9f9ebe'}"><span>房卡场</span></div>
                <a href="javascript:;" v-for="(itemInner, index) in cardMockData" :key="index"
                   :title="itemInner.name">{{itemInner.name}}</a>
              </div>
              <div class="qpyl_detail_item clear-fix" v-for="(listItem, indexs) in ThirGameList" :key="indexs">
                <div class="mock-img" :style="{'background-color':menColor[indexs%menColor.length]}"><span>{{listItem.tags}}</span></div>
                <a href="javascript:;" v-for="(itemInner, index) in ThirGameList[indexs].data" :key="index"
                   @click="GetThirdGameUrlFn(itemInner.id)"
                   :title="itemInner.name" :class="{'red':itemInner.is_hot === 1}">{{itemInner.name}}</a>
              </div>
              <div class="qpyl_detail_item clear-fix">
                <div class="mock-img" :style="{'background-color':'#e7aec1'}"><span>美女主播</span></div>
                <a href="javascript:;" v-for="(itemInner, index) in cardMockData2" :key="index"
                   :title="itemInner.name">{{itemInner.name}}</a>
              </div>
              <div class="other-links clear-fix">
                <a href="javascript:;" v-for="(platFormItem, index) in ThirPlatformList" :key="index">
                  <img :src="platFormItem.logo" alt="qpylOtherLinkIcon1" width="70px" height="17px">
                  <p>{{platFormItem.name}}</p>
                </a>
              </div>
            </div>
            <div class="tyss_detail menu_detail" :class="gameTypeItem.identify" v-if="gameTypeItem.name=='体育赛事'">
              <el-carousel :autoplay="false" arrow="always" height="219px" indicator-position="none">
                <el-carousel-item v-for="(item, indexx) in x" :key="indexx">
                  <div class="tyss_detail_items clear-fix">
                    <a class="clear-fix" href="javascript:;"
                       v-for="(listItem, index) in ThirGameList"
                       :key="index" v-if="3*item>index&&index>=3*(item-1)"
                       @click="GetThirdGameUrlFn(listItem.id)" :title="listItem.name">
                      <!--<img :src="tyssImg1" alt="tyssImg1">-->
                      <img :src="listItem.logo" alt="tyssIcon1">
                      <!--<div>
                        <div>
                          <img :src="tyssIcon1" alt="tyssIcon1">
                        </div>
                        <h4>{{listItem.name}}</h4>
                        <p>多元化滚球，最受欢迎的线上体育</p>
                      </div>-->
                    </a>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="dzjj_detail menu_detail" :class="gameTypeItem.identify" v-if="gameTypeItem.name=='电子竞技'">
              <el-carousel :autoplay="false" arrow="always" height="219px" indicator-position="none">
                <el-carousel-item v-for="(item, indexx) in x" :key="indexx">
                  <div class="dzjj_detail_items clear-fix">
                    <a href="javascript:;" v-for="(listItem, index) in ThirGameList"
                    :key="index"  v-if="3*item>index&&index>=3*(item-1)" @click="GetThirdGameUrlFn(listItem.id)" :title="listItem.name">
                      <!--<img :src="dzjjPersonImg1" alt="dzjjPersonImg1">-->
                      <img :src="listItem.logo" alt="dzjjPersonImg1">
                      <!--<div>
                        <div><img :src="dzjjIcon1" alt="dzjjIcon1"></div>
                        <h4>{{listItem.name}}</h4>
                      </div>-->
                    </a>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </li>
        </ul>
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
  </div>
</template>

<script>
import { GetGameMenu, GetThirdGamePlatformList, GetThirdGameList,
  GetThirdGameTypeList, GetThirdGameUrl, ThirdGameUserInit } from '@/api/game/game'
import { getCurrentUserInfo } from '@/api/userCenter/personalCenter/personal-center'
import { setTird, getTird, setPlatFormLen, getPlatFormLen, setHeaderNavList, getHeaderNavList } from '../../../util/third'
import { mapGetters } from 'vuex'
import { SET_SZCP_MENU_LIST } from '../../../store/nameSpace'
import { topMenulistColor, loaddingOptions } from '../../../config/game-default-config'
import { Message } from 'element-ui'
import Dialog from '../../../components/dialog/src/component'
import logo from '../../../statics/img/header_logo_18_8_29.png'
import arrow from '../../../statics/img/ic_nav_arrow_down.png'
import navigationImg from '../../../statics/img/navigation_img.png'
import menuDetailPreIcon from '../../../statics/img/mneu_detail_pre_icon.png'
import menuDetailNextIcon from '../../../statics/img/mneu_detail_next_icon.png'
import zrcpPerson1 from '../../../statics/img/zrcp_item_person_1.png'
import zrcpPerson2 from '../../../statics/img/zrcp_item_person_2.png'
import zrcpPerson3 from '../../../statics/img/zrcp_item_person_3.png'
import zrcpPerson4 from '../../../statics/img/zrcp_item_person_4.png'
import ballImg1 from '../../../statics/img/zrcp_item_ball_1.png'
import ballImg2 from '../../../statics/img/zrcp_item_ball_2.png'
import ballImg3 from '../../../statics/img/zrcp_item_ball_3.png'
import ballImg4 from '../../../statics/img/zrcp_item_ball_4.png'
import zrcpItemIcon from '../../../statics/img/zrcp_item_title_icon.png'
import qpylItemImg1 from '../../../statics/img/qpyl_menu_fkc_img.png'
import qpylItemImg2 from '../../../statics/img/qpyl_menu_qpjjc_img.png'
import qpylItemImg3 from '../../../statics/img/qpyl_menu_qpbrc_img.png'
import qpylItemImg4 from '../../../statics/img/qpyl_menu_mnzbqp_img.png'
import qpylOtherLinkIcon1 from '../../../statics/img/qpyl_otehn_link_1.png'
import qpylOtherLinkIcon2 from '../../../statics/img/qpyl_otehn_link_2.png'
import qpylOtherLinkIcon3 from '../../../statics/img/qpyl_otehn_link_3.png'
import qpylOtherLinkIcon4 from '../../../statics/img/qpyl_otehn_link_4.png'
import dzyyMenuItemLhj1 from '../../../statics/img/dzyy_menu_lhj_img.png'
import dzyyMenuItemLhj2 from '../../../statics/img/dzyy_menu_lhj2_img.png'
import dzyyMenuItemLhj3 from '../../../statics/img/dzyy_menu_lhj3_img.png'
import dzyyMenuOtherLinkIcon1 from '../../../statics/img/dzyy_other_link_icon_1.png'
import dzyyMenuOtherLinkIcon2 from '../../../statics/img/dzyy_other_link_icon_2.png'
import dzyyMenuOtherLinkIcon3 from '../../../statics/img/dzyy_other_link_icon_3.png'
import dzyyMenuOtherLinkIcon4 from '../../../statics/img/dzyy_other_link_icon_4.png'
import zrsxPersonImg1 from '../../../statics/img/zrsx_person_1.png'
import zrsxPersonImg2 from '../../../statics/img/zrsx_person_2.png'
import zrsxPersonImg3 from '../../../statics/img/zrsx_person_3.png'
import iconCommonZrsx from '../../../statics/img/zrsx_icon_img_2.png'
import zrsxAgIconImg from '../../../statics/img/zrsx_menu_detail_ag_icon.png'
import zrsxEbatIconImg from '../../../statics/img/zrsx_menu_detail_ebet_icon.png'
import zrsxSunIconImg from '../../../statics/img/zrsx_menu_detail_sun_icon.png'
import tyssImg1 from '../../../statics/img/tyss_person_img_1.png'
import tyssImg2 from '../../../statics/img/tyss_person_img_2.png'
import tyssImg3 from '../../../statics/img/tyss_person_img_3.png'
import tyssIcon1 from '../../../statics/img/tyss_icon_1.png'
import tyssIcon2 from '../../../statics/img/tyss_icon_2.png'
import tyssIcon3 from '../../../statics/img/tyss_icon_3.png'
import dzjjPersonImg1 from '../../../statics/img/dzjj_person_1.png'
import dzjjPersonImg2 from '../../../statics/img/dzjj_person_2.png'
import dzjjPersonImg3 from '../../../statics/img/dzjj_person_3.png'
import dzjjIcon1 from '../../../statics/img/dzjj_icon_1.png'
import dzjjIcon2 from '../../../statics/img/dzjj_icon_2.png'
import dzjjIcon3 from '../../../statics/img/dzjj_icon_3.png'
export default {
  data () {
    return {
      dzjjPersonImg1,
      dzjjPersonImg2,
      dzjjPersonImg3,
      dzjjIcon1,
      dzjjIcon2,
      dzjjIcon3,
      zrcpPerson1,
      zrsxPersonImg1,
      tyssImg1,
      tyssImg2,
      tyssImg3,
      tyssIcon1,
      tyssIcon2,
      tyssIcon3,
      zrsxPersonImg2,
      iconCommonZrsx,
      zrsxPersonImg3,
      zrsxAgIconImg,
      zrsxEbatIconImg,
      zrsxSunIconImg,
      zrcpPerson2,
      dzyyMenuOtherLinkIcon1,
      dzyyMenuOtherLinkIcon2,
      dzyyMenuOtherLinkIcon3,
      dzyyMenuOtherLinkIcon4,
      dzyyMenuItemLhj1,
      dzyyMenuItemLhj2,
      dzyyMenuItemLhj3,
      qpylOtherLinkIcon1,
      qpylOtherLinkIcon2,
      qpylOtherLinkIcon3,
      qpylOtherLinkIcon4,
      qpylItemImg1,
      qpylItemImg2,
      qpylItemImg3,
      qpylItemImg4,
      zrcpItemIcon,
      zrcpPerson3,
      zrcpPerson4,
      ballImg1,
      ballImg2,
      ballImg3,
      ballImg4,
      logo,
      menuDetailPreIcon,
      menuDetailNextIcon,
      arrow,
      navigationImg,
      szcpMenuItemList: [],
      ThirgameType: [],
      ThirGameList: [],
      ThirPlatformList: [],
      platFormData: [],
      pageTotal: 0,
      page: 1,
      x: 1,
      thirdType: '',
      broadCastLeft: 0,
      menColor: topMenulistColor,
      destmoc: [],
      activeThirdGame: '',
      nowHow: '',
      cardMockData: [
        {name: 'GG大话骰', id: ''},
        {name: 'GG德州扑克', id: ''},
        {name: '德州扑克', id: ''},
        {name: '吹牛', id: ''},
        {name: '斗地主', id: ''},
        {name: '扎金花', id: ''}
      ],
      cardMockData2: [
        {name: '主播斗地主', id: ''},
        {name: '主播牛牛', id: ''},
        {name: '主播跑得快', id: ''},
        {name: '主播炸金花', id: ''},
        {name: '主播推筒子', id: ''}

      ],
      always: 'never',
      liveInteractionId: '',
      loadingInstance: '',
      dialogVisible: false
    }
  },
  components: {
    Dialog
  },
  methods: {
    setNowColor () {
      this.nowHow = ''
      if (this.loadingInstance !== '') this.loadingInstance.close()
    },
    pageFn (page) {
      this.page = page
    },
    zhiboFn (gameType) {
      if (gameType === 'live-interaction') {
        this.$message_box('直播暂未开放', '提示').catch(() => {})
        setTimeout(() => {
          this.$message_box.close()
        }, 3000)
      }
    },
    GetGameMenuList () {
      GetGameMenu().then(res => {
        const { data, errno } = res
        if (errno === 0) {
          for (let key in data) {
            for (let keyInner in data[key]['lotteries']) {
              data[key]['lotteries'][keyInner].isLike = false
            }
          }
          this.szcpMenuItemList = data
        }
        this.$store.commit(SET_SZCP_MENU_LIST, res.data)
      })
    },
    setNewDataInterface () {
      var map = {}
      var dest = []
      for (var i = 0; i < this.ThirGameList.length; i++) {
        var ai = this.ThirGameList[i]
        if (!map[ai.tags]) {
          dest.push({
            tags: ai.tags,
            data: [ai],
            platform: ai.platform
          })
          map[ai.tags] = ai
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if (dj.tags === ai.tags) {
              dj.data.push(ai)
              break
            }
          }
        }
      }
      this.ThirGameList = dest
      // console.log(this.ThirGameList)
    },
    GetThirdGameTypeListFn () {
      if (!getHeaderNavList()) {
        GetThirdGameTypeList()
          .then((res) => {
            this.ThirgameType = res.data
            setHeaderNavList(res.data)
          })
      } else {
        this.ThirgameType = getHeaderNavList()
        return false
      }
    },
    GetThirdGameListFn (gameType) {
      this.nowHow = gameType
      this.thirdType = gameType
      if (getTird(gameType) == null) {
        if (gameType !== 'szcp' && gameType !== 'zrcp' && gameType !== 'live-interaction') {
          loaddingOptions.target = document.querySelector('.' + gameType)
          this.loadingInstance = this.$loadingTip.service(loaddingOptions)
        }
        if (gameType === 'zrcp' || gameType === 'szcp') return false // 数字彩票跟真人彩票不走此接口
        GetThirdGameList(gameType)
          .then((res) => {
            this.ThirGameList = res.data
            this.liveInteractionId = res.data.id
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              if (gameType !== 'szcp' && gameType !== 'zrcp' && gameType !== 'live-interaction') {
                this.loadingInstance.close()
              }
            })
            if (gameType === 'e-game' || gameType === 'card') {
              this.setNewDataInterface()
              var dest2 = []
              for (var i = 0; i < this.ThirGameList.length; i++) {
                dest2.push(this.ThirGameList[i].platform)
              }
              this.destmoc = dest2
              // console.log(this.destmoc)
              if (gameType === 'e-game') {
                this.pageTotal = Math.ceil(this.ThirGameList.length / 3)
              }
            } else if (gameType === 'live-lottery') {
              this.x = Math.ceil(res.data.length / 4)
            } else if (gameType === 'sport' || gameType === 'e-sport' || gameType === 'live-video') {
              this.x = Math.ceil(res.data.length / 3)
            }
            setPlatFormLen(gameType + 'form', this.destmoc)
            setTird(gameType, this.ThirGameList)
            this.setPlatformList(this.platFormData)
          })
      } else {
        this.ThirGameList = getTird(gameType)
        this.destmoc = getPlatFormLen(gameType + 'form')
        this.setPlatformList(this.platFormData)
        if (gameType === 'live-interaction') this.liveInteractionId = this.ThirGameList[0].id // 目前暂时视频只有一条数据
        if (gameType === 'e-game') {
          this.pageTotal = Math.ceil(this.ThirGameList.length / 3)
        } else if (gameType === 'live-lottery') {
          this.x = Math.ceil(this.ThirGameList.length / 4)
        } else if (gameType === 'sport' || gameType === 'e-sport' || gameType === 'live-video') {
          this.x = Math.ceil(this.ThirGameList.length / 3)
        }
      }
    },
    GetThirdGamePlatformListFn () {
      GetThirdGamePlatformList()
        .then((res) => {
          this.platFormData = res.data
        })
    },
    setPlatformList (platFormData) {
      var moc = []
      if (platFormData === '' || platFormData === null || platFormData === undefined) return
      for (var x = 0; x < platFormData.length; x++) {
        if (this.destmoc.indexOf(platFormData[x].identify) > -1) {
          moc.push(platFormData[x])
        }
      }
      this.ThirPlatformList = moc
    },
    GetThirdGameUrlFn (gameId, type) {
      this.$loadingShow()
      if (!this.isLogin) {
        this.$loadingHide()
        this.$router.push('/index')
        return Message({ message: '请先登录!', type: 'error' })
      }
      if (this.activeThirdGame === 1) {
        var newWindow = window.open('about:_blank')
        GetThirdGameUrl(gameId, type)
          .then((res) => {
            var gameUrl = res.data.game_url
            this.$loadingHide()
            if (type === 'live-interaction') {
              if (gameUrl.indexOf('https:') !== -1) {
                newWindow.location = gameUrl
              } else {
                newWindow.close()
                this.$router.push({ name: 'OTHER', query: {url: gameUrl} })
              }
            } else {
              if (res.data === null) {
                return false
              } else {
                newWindow.location = gameUrl
              }
            }
          })
          .catch(() => {
            this.$loadingHide()
            newWindow.close()
          })
      } else {
        this.$loadingHide()
        this.dialogVisible = !this.dialogVisible
        // return this.$message_box.confirm('是否激活游戏账户', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   ThirdGameUserInit()
        //     .then((res) => {
        //       this.$loadingHide()
        //       if (res.errno === 0) {
        //         getCurrentUserInfo()
        //           .then((res) => {
        //             this.activeThirdGame = res.data.active_third_game
        //           })
        //         this.$message({
        //           type: 'success',
        //           message: '激活成功'
        //         })
        //       }
        //     })
        // })
      }
    },
    dialgConfirm () {
      ThirdGameUserInit()
        .then((res) => {
          this.$loadingHide()
          if (res.errno === 0) {
            getCurrentUserInfo()
              .then((res) => {
                this.activeThirdGame = res.data.active_third_game
              })
            this.$message({
              type: 'success',
              message: '激活成功'
            })
          }
        })
      this.dialogVisible = false
    },
    goToLiveBroadcast (gameId, gameType) {
      if (gameType === 'live-interaction') {
        this.GetThirdGameUrlFn(gameId, gameType)
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'gameDetail',
      'userInfo'
    ])
  },
  watch: {
    'userInfo': function (newInfo, oldInfo) {
      this.activeThirdGame = newInfo.active_third_game
    }
  },
  created () {
    this.GetGameMenuList()
    this.GetThirdGamePlatformListFn()
    // this.GetThirdGameListFn(this.thirdType)
    this.GetThirdGameTypeListFn()
    this.$nextTick(() => {
      this.activeThirdGame = this.userInfo.active_third_game
    })
  },
  mounted () {
  }
}
</script>
<style scoped>
  /*响应式处理*/
@media screen and (max-width: 1242px){
  .header-wrapper .header .header-right>ul>li{
    width: 95px;
  }
}
@media screen and (max-width: 991px){
  .header-wrapper .header .header-right>ul>li{
    width: 90px;
  }
  .header-wrapper .header .header-left{
    display: none;
  }
}

  /*list加载公共loading样式*/
  .szcp_links_item > a:hover,.dzyy_detail_item_inner > a:hover,.qpyl_detail_item > a:hover{
    color:#f63e3e !important;
    border-color:#f63e3e !important;
  }
  .szcp_links_item > a,.dzyy_detail_item_inner > a,.qpyl_detail_item > a {
    position: relative;
  }
  /* .szcp_links_item .hot-icon,.dzyy_detail_item_inner .hot-icon,.qpyl_detail_item .hot-icon {
     display: block;
     width: 10px;
     height: 14px;
     position: absolute;
     right: 5px;
     transform: translate3d(50%, -50%, 0);
     top: 5px;
   }*/
  /*dzjj_detail begin*/
  .dzjj_detail {
    position: absolute;
    /* width: 1171px; */
    width: 80vw;
    height: 173px;
    background-color: #f3f3f3;
    z-index: 5;
    left: 50%;
    transform: translateX(-50%);
    /*display: block !important;*/
    /* top: 100%; */
    /* left: -995px; */
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
  }
  .dzjj_detail .pre,
  .dzjj_detail .next {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    line-height: 28px;
    text-align: center;
    background-color: #d7d7d7;
    border-radius: 50%;
  }
  .dzjj_detail .pre img,
  .dzjj_detail .next img {
    vertical-align: text-bottom;
  }
  .dzjj_detail .next {
    right: 19px;
  }
  .dzjj_detail .pre {
    left: 19px;
  }
  /* .dzjj_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 79%;
  } */
  .dzjj_detail .dzjj_detail_items {
    padding: 0 47px;
    height: 100%;
    position: relative;
    white-space: nowrap;
  }
  .dzjj_detail .dzjj_detail_items > a {
    /*float: left;*/
    display: inline-block;
    width: 320px;
    position: relative;
    height: 100%;
    line-height: 1;
  }
  .dzjj_detail .dzjj_detail_items > a > img {
    position: absolute;
    top: 21px;
    z-index: 4;
    left: 108px;
  }
  .dzjj_detail .dzjj_detail_items > a:nth-of-type(3) > img {
    left: 78px;
  }
  .dzjj_detail .dzjj_detail_items > a > div {
    width: 131px;
    height: 131px;
    background-color: #dcdcdc;
    padding-top: 15px;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    top: 24px;
    right: 13px;
    z-index: 2;
  }
  .dzjj_detail .dzjj_detail_items > a:nth-of-type(2) > div {
    right: 3px;
  }
  .dzjj_detail .dzjj_detail_items > a:nth-of-type(3) > div {
    right: 0;
  }
  .dzjj_detail .dzjj_detail_items > a > div > div {
    height: 65px;
    line-height: 65px;
  }
  .dzjj_detail .dzjj_detail_items > a > div > div > img {
    vertical-align: middle;
  }
  .dzjj_detail .dzjj_detail_items > a > div > h4 {
    font-size: 16px;
    color: #000;
    font-weight: normal;
  }
  /*.dzyy_detail .list-page {*/
    /*min-height: 140px;*/
  /*}*/
  /*dzjj_detail end*/
  /*tyss_detail begin*/
  .tyss_detail {
    position: absolute;
    /* width: 1171px; */
    width: 80vw;
    height: 173px;
    background-color: #f3f3f3;
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    z-index: 4;
    /* top: 100%; */
    left: 50%;
    top: 117px;
    transform: translateX(-50%);
    /*display: block !important;*/
  }
  /* .tyss_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 80%;
  } */
  .tyss_detail .pre {
    left: 19px;
  }
  .tyss_detail .next {
    right: 19px;
  }
  .tyss_detail .pre,
  .tyss_detail .next {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: #d7d7d7;
    position: absolute;
  }
  .tyss_detail .pre img,
  .tyss_detail .next img {
    vertical-align: text-bottom;
  }
  .tyss_detail .tyss_detail_items {
    height: 100%;
    padding-left: 93px;
    line-height: 1;
    width: auto;
    white-space: nowrap;
    /*display: flex;*/
  }
  .tyss_detail .tyss_detail_items a {
    /*float: left;*/
    display: inline-block;
    height: 100%;
    padding-top: 36px;
    width:360px;
  }
  .tyss_detail .tyss_detail_items a > img {
    float: left;
    margin-right: 22px;
  }
  .tyss_detail .tyss_detail_items a > div {
    text-align: left;
    padding-top: 20px;
    float: left;
  }
  .tyss_detail .tyss_detail_items a > div > div {
    height: 35px;
    margin-bottom: 8px;
  }
  .tyss_detail .tyss_detail_items a > div > h4 {
    font-size: 20px;
    font-weight: normal;
    color: #000;
    margin-bottom: 10px;
  }
  .tyss_detail .tyss_detail_items a > div > p {
    font-size: 12px;
    color: #757575;
  }
  /*tyss_detail end*/
  /*zrsx_detail begin*/
  .zrsx_detail {
    position: absolute;
    width: 80vw;
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    height: 220px;
    background-color: #f3f3f3;
    z-index: 3;
    /*padding: 0 90px;*/
    padding:0 10px;
    /* top: 100%; */
    left: 50%;
    transform: translateX(-50%);
  }
  /* .zrsx_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 70%;
  } */
  .zrsx_detail > .pre,
  .zrsx_detail > .next {
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: #d7d7d7;
    line-height: 28px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
  .zrsx_detail .zrsx_detail_item {
    float: left;
    height: 100%;
    position: relative;
    /*width: 330px;*/
    width: 33.33%;
  }
  .zrsx_detail .zrsx_detail_item:hover {
    background-color: #fff;
  }
  .zrsx_detail .zrsx_detail_item img:nth-of-type(1) {
    position: absolute;
    left: 42px;
    z-index: 3;
    top: 20px;
  }
  .zrsx_detail .zrsx_detail_item img:nth-of-type(2) {
    position: absolute;
    left: 30px;
    z-index: 2;
    top: 120px;
  }
  .zrsx_detail .zrsx_detail_item img:nth-of-type(3) {
    position: absolute;
    top: 64px;
    right: 70px;
  }
  .zrsx_detail .zrsx_detail_item p {
    font-size: 18px;
    color: #000000;
    position: absolute;
    right: 81px;
    bottom: 76px;
    line-height: 21px;
    z-index: 5;
  }
  .zrsx_detail .zrsx_detail_item:nth-of-type(3) p {
    bottom: 65px;
    right: 85px;
  }
  .zrsx_detail .zrsx_detail_item:nth-of-type(4) p {
    /*bottom: 65px;*/
    right: 60px;
  }
  .zrsx_detail .zrsx_detail_item:nth-of-type(4) img:nth-of-type(3) {
    bottom: 106px;
    top: auto;
  }
  .zrsx_detail > .pre {
    left: 18px;
  }
  .zrsx_detail > .next {
    right: 18px;
  }
  .zrsx_detail > .pre img,
  .zrsx_detail > .next img {
    vertical-align: text-bottom;
  }
  /*zrsx_detail end*/
  /*dzyy brgin*/
  .dzyy_detail {
    position: absolute;
    width: 80vw;
    box-shadow: 0 3px 11px 2px rgba(0, 0, 0, .4);
    background-color: #f3f3f3;
    padding: 16px 11px 101px 15px;
    z-index: 3;
    border: 1px solid #dcdcdc;
    /* top: 100%; */
    left: 50%;
    transform: translateX(-50%);
    /*display: block !important;*/
  }
  /* .dzyy_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 61%;
  } */
  .dzyy_detail .dzyy_detail_item {
    padding-left: 66px;
    margin-bottom: 14px;
    line-height: 1;
    position: relative;
    min-height: 560px;
  }
  .dzyy_detail_item_inner {
    position: relative;
    margin-bottom: 10px;
  }
  .dzyy_detail .dzyy_detail_item .dzyy_detail_item_inner >.mock-img,.qpyl_detail_item>.mock-img {
    position: absolute;
    /*width:54px;*/
    width: 90px;
    background:red;
    left:-65px;
    top:0;
    bottom:1px;
    color:#fff;
    font-size:18px;
  }
  .dzyy_detail .dzyy_detail_item_inner >.mock-img {
    width: 54px !important;
  }
  .dzyy_detail .dzyy_detail_item .dzyy_detail_item_inner >.mock-img span,.qpyl_detail_item>.mock-img span {
    position: absolute;
    top: 50%;
    left: 50%;
    letter-spacing: 2px;
    transform: translate3d(-50%, -50%, 0);
    line-height: 20px;
    font-weight: 300;
  }
  .qpyl_detail_item>.mock-img {
    font-size: 16px;
    left: 0px;
  }
  .dzyy_detail .dzyy_detail_item .dzyy_detail_item_inner > a {
    float: left;
    width: 112px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    font-size: 12px;
    color: #545454;
    border: 1px solid #dcdcdc;
    background-color: #fff;
    margin-right: 3px;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .dzyy_detail .page-count {
    line-height: 1;
    margin-top: 11px;
    margin-bottom: 27px;
  }
  .dzyy_detail .page-count a {
    font-size: 12px;
    color: #545454;
    margin-right: 5px;
  }
  .dzyy_detail .page-count a.font-red {
    color:red;
  }
  .dzyy_detail .page-count a.now-hov {
    color: #f63e3e;
  }
  .dzyy_detail .other-links  {
    background-color: #e3e3e3;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 101px;
  }
  .dzyy_detail .other-links a  {
    float: left;
    height: 100%;
    padding: 0 41px;
    position: relative;
    line-height: 101px;
  }
  .dzyy_detail .other-links a p  {
    position: absolute;
    text-align: center;
    font-size: 14px;
    color: #000;
    left: 50%;
    transform: translateX(-50%);
    bottom: 22px;
    line-height: 1;
  }
  /*dzyy end*/
  /*qpyl_detail begin*/
  .qpyl_detail {
    position: absolute;
    /*top: 100%;*/
    /*left: -200px;*/
    box-shadow: 0 3px 11px 2px rgba(0, 0, 0, .4);
    z-index: 3;
    line-height: 1;
    left: 50vw;
    transform: translateX(-30%);
    padding: 17px 17px 20px 17px;
    width: 485px;
    background-color: #f3f3f3;
  }
  /* .qpyl_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 55%;
  } */
  .qpyl_detail .qpyl_detail_item {
    position: relative;
    padding-left: 105px;
    margin-bottom: 11px;
  }
  .qpyl_detail .qpyl_detail_item img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .qpyl_detail .qpyl_detail_item a {
    float: left;
    width: 112px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    border: 1px solid #dcdcdc;
    background-color: #fff;
    margin-right: 3px;
    margin-bottom: 2px;
  }
  .qpyl_detail .other-links {
    margin-top: 12px;
  }
  .qpyl_detail .other-links a {
    float: left;
    text-align: center;
    width: 90px;
    height: 60px;
    position: relative;
    margin-right: 12px;
  }
  .qpyl_detail .other-links a img {}
  .qpyl_detail .other-links a p {
    width: 100%;
    text-align: center;
    position: absolute;
    font-size: 14px;
    color: #000000;
    bottom: 0;
  }
  /*qpyl_detail end*/
  .header-wrapper {
    height: 80px;
    background-color: #262732;
  }
  .header {
    height: 100%;
  }
  .header-left {
    float: left;
    height: 100%;
    left: -12px;
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
    line-height: 80px;
    /*position: relative;*/
    width: 105px;
    text-align: center;
  }
  /*szcp 详情菜单下拉 begin*/
  .header-right > ul > li:nth-of-type(1) .szcp_detail {
    width: 674px;
    line-height: 1;
    padding: 16px 14px 0 17px;
    border: 1px solid #dcdcdc;
    z-index: 99;
    position: absolute;
    /*top: 100%;*/
    left: 25vw;
    transform: translateX(-20%);
    background-color: #f3f3f3;
    box-shadow: 0 3px 11px 2px rgba(0, 0, 0, .4);
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item {
    position: relative;
    margin-bottom: 12px;
    padding-left: 66px;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item > div {
    position: absolute;
    top: 0;
    bottom: 2px;
    font-family: "黑体";
    left: 0;
    width: 58px;
    font-size: 18px;
    color: #ffffff;
    background-color: #9e9ebd;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-7) > div {
    background-color: #ccbf9a;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-6) > div {
    background-color: #9e9ebd;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-5) > div {
    background-color: #9cb574;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-4) > div {
    background-color: #74b1b5;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-3) > div {
    background-color: #99b8db;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-2) > div {
    background-color: #ce99db;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n-1) > div {
    background-color: #e7aec1;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item:nth-of-type(8n) > div {
    background-color: #e7ce89;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item > div span {
    position: absolute;
    top: 50%;
    left: 50%;
    letter-spacing: 2px;
    transform: translate3d(-50%, -50%, 0);
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item > a {
    float: left;
    width: 112px;
    height: 38px;
    position: relative;
    line-height: 38px;
    font-size: 12px;
    text-align: center;
    margin-bottom: 2px;
    margin-right: 3px;
    color: #545454;
    border: 1px solid #dcdcdc;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item > a.red::after,
  .szcp_links_item > a.red::after,.dzyy_detail_item_inner > a.red::after,.qpyl_detail_item > a.red::after {
    content: '';
    display: block;
    position: absolute;
    right: -2px;
    top: -3px;
    width: 8px;
    height: 8px;
    background-color: #f63e3e;
    border-radius: 50%;
  }
  .szcp_links_item > a.red::after,.dzyy_detail_item_inner > a.red::after,.qpyl_detail_item > a.red::after{
    right:0;
    top:0;
  }
  .header-right > ul > li:nth-of-type(1) .szcp_detail > .szcp_links_item > a.blue::after {
    content: '';
    display: block;
    position: absolute;
    right: -2px;
    top: -3px;
    width: 8px;
    height: 8px;
    background-color: #2ec1e0;
    border-radius: 50%;
  }
  /* .header-right > ul > li:nth-of-type(1) .szcp_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
  } */
  /*szcp 详情菜单下拉 end*/
  /*zrcp_detail详情菜单下拉 begin*/
  .broad-cast {
    width: 100%;
    height:100%;
    position: absolute;
    transition: all 1s;
  }
  .header-right > ul > li .zrcp_detail {
    position: absolute;
    /* top: 100%; */
    width: 80vw;
    left: 50%;
    transform: translateX(-50%);
    height: 220px;
    background-color: #f3f3f3;
    border-top: 1px solid #e4e4e4;
    border-right: 1px solid #cacacd;
    padding: 0 54px 0 47px;
    z-index: 99;
    overflow: scroll hidden;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item {
    width: 264px;
    height: 100%;
    float:left;
    position: relative;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item::after {
    content: '';
    display: block;
    position: absolute;
    width: 189px;
    height: 151px;
    background: url("../../../statics/img/zrcp_item_half_circle.png") no-repeat 0 0;
    top: 40px;
    left: 40px;
    z-index: 2;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item > img:nth-of-type(1) {
    position: absolute;
    bottom: 29px;
    z-index: 4;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item:hover {
    background: #FFFFFF;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item:nth-of-type(5) > img:nth-of-type(1) {
    left: 60%;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item:nth-of-type(4) > img:nth-of-type(1) {
    /*left: 43%;*/
    left:50%;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item > img:nth-of-type(2) {
    position: absolute;
    bottom: 46px;
    z-index: 3;
    left: 49px;
  }
  .header-right > ul > li .zrcp_detail > .zrcp_detail_item:nth-of-type(2) > h4 {
    background: url("../../../statics/img/zrcp_item_title_bg_1.png");
  }
  .header-right > ul > li .zrcp_detail > .zrcp_detail_item:nth-of-type(3) > h4 {
    background: url("../../../statics/img/zrcp_item_title_bg_2.png");
  }
  .header-right > ul > li .zrcp_detail > .zrcp_detail_item:nth-of-type(4) > h4 {
    background: url("../../../statics/img/zrcp_item_title_bg_3.png");
  }
  .header-right > ul > li .zrcp_detail > .zrcp_detail_item:nth-of-type(5) > h4 {
    background: url("../../../statics/img/zrcp_item_title_bg_4.png");
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item > h4 {
    position: absolute;
    bottom: 20px;
    z-index: 5;
    left: 15px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #fff;
    letter-spacing: 2px;
    font-weight: normal;
    width: 232px;
    transform: skewX(-10deg);
    padding: 0 10px;
  }
  .header-right > ul > li .zrcp_detail .zrcp_detail_item > h4 > img {
    vertical-align: middle;
  }
  .header-right > ul > li .zrcp_detail .pre,
  .header-right > ul > li .zrcp_detail .next {
    position: absolute;
    width: 28px;
    height: 28px;
    background-color: #d7d7d7;
    border-radius: 50%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    line-height: 28px;
    z-index: 10;
  }
  .header-right > ul > li .zrcp_detail .pre img,
  .header-right > ul > li .zrcp_detail .next img {
    vertical-align: text-bottom;
  }
  .header-right > ul > li .zrcp_detail .next {
    right: 9px;
  }
  .header-right > ul > li .zrcp_detail .pre {
    left: 9px;
  }
  .header-right > ul > li .zrcp_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 44%;
  }
  /*zrcp_detail详情菜单下拉 end*/
  .header-right > ul > li {
    float: left;
    height: 100%;
    line-height: 80px;
    /*position: relative;*/
    width: 105px;
    text-align: center;
  }
    .header-right > ul > li:hover::after {
    content: '';
    display: block;
    position: relative;
    z-index: 5;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    bottom: -1px;
    left: 79%;
      top: -9px;
  }
  .header-right>ul>li:last-child:hover::after{
    content: none;
  }
  .header-right > ul > li.now-hov {
    background-color: #13141b;
    margin-top: -2px;
  }
  .header-right > ul > li.now-hov::before {
    content: '';
    position: relative;
    display: block;
    background-color: #f17e2e;
    width: 100%;
    height: 2px;
    top: 0;
    left: 0;
  }
  .header-right > ul > li > a {
    display: inline-block;
    width: 100%;
    font-size: 16px;
    letter-spacing: .5px;
    color: #eaeaeb;
    position: relative;
  }
  .header-right>ul>li>a img{
    position: absolute;
  }
  .header-right > ul > li > a:hover img {
    transform: rotate(180deg);
  }
  .menu_detail {
    display: none;
  }
  .header-right > ul > li:hover .menu_detail {
    display: block;
    top: 117px;
  }
  .header-right > ul > li > a > span {
    margin-right: 5px;
  }
  .header-right > ul > li > a > img {
    vertical-align: middle;
    transform-origin: 50% 25%;
    position: absolute;
    transition: transform .2s linear;
    right: 5px;
    top: 54%;
    transform: translateY(-50%);
  }
</style>
<style>
  .zrsx_detail .el-carousel__item{}
  .tyss_detail .el-carousel__item{
    overflow: scroll hidden;
  }
  .tyss_detail .el-carousel__container{
    height: 190px !important;
  }
</style>
