<template>
  <transition name="fade-in-linear">
    <div class="wrapper" v-if="show">
      <div class="container">
        <a @click="show = false" href="javascript:;">
          <img :src="closeIcon" alt="closeIcon">
        </a>
        <div class="title">做号投注</div>
        <div class="content">
          <div class="top clear-fix">
            <div class="left">
              <img :src="gameDetail.logo" alt="logo">
            </div>
            <div class="center">
              <p>第 <i>{{sscLastWnNumber['issue']}}</i> 期 开奖号码</p>
              <div class="balls clear-fix">
                <span v-for="(item, index) in wnNumberList"
                      :key="index">{{item}}</span>
              </div>
            </div>
            <div class="right">
              <p>第 <i>{{sscAwardInfo['issue']}}</i> 期 开奖时间</p>
              <div>
                <span class="hour">{{endTimeInfo.hour}}</span>
                :
                <span class="hour">{{endTimeInfo.min}}</span>
                :
                <span class="hour">{{endTimeInfo.sec}}</span>
              </div>
            </div>
          </div>
          <div class="tabs clear-fix">
            <a :class="{ 'now-hov': nowShowTab === index }"
               @click="nowShowTab = index"
               v-for="(item, index) in tabsList"
               :key="index"
               href="javascript:;">{{item}}</a>
          </div>
          <div v-if="nowShowTab === 0"
               class="erxing">
            <div class="choice-list-alert clear-fix">
              <div class="checkbox-list">
                <input type="checkbox"
                       v-model="erxingCheckBox.wan"
                       id="erxing_wan">
                <label for="erxing_wan">万位</label>
                <input type="checkbox"
                       v-model="erxingCheckBox.qian"
                       id="erxing_qian">
                <label for="erxing_qian">千位</label>
                <input type="checkbox"
                       v-model="erxingCheckBox.bai"
                       id="erxing_bai">
                <label for="erxing_bai">百位</label>
                <input type="checkbox"
                       v-model="erxingCheckBox.shi"
                       id="erxing_shi">
                <label for="erxing_shi">十位</label>
                <input type="checkbox"
                       v-model="erxingCheckBox.ge"
                       id="erxing_ge">
                <label for="erxing_ge">个位</label>
              </div>
              <p>贴心提示:你选择了{{selectCheckBoxCounts}}个位置,系统自动根据位置组合成{{selectCheckBoxTypes}}个方案</p>
            </div>
            <div class="choice-number">
              <div v-for="(item, index) in numberListErxing"
                   :key="index"
                   class="choice-number-item clear-fix">
                <div class="label">{{item.type}}</div>
                <div v-for="(itemInner, indexInner) in item.list"
                     class="clear-fix"
                     :key="indexInner">
                  <div class="value-choice clear-fix">
                    <span>{{itemInner.type}}</span>
                    <div class="value-list clear-fix">
                    <span v-for="(itemBall, indexThree) in itemInner.numberList"
                          @click="clickItemBall(itemBall)"
                          :class="{ 'selected': itemBall.isSelected }"
                          :key="indexThree">{{itemBall.label}}</span>
                    </div>
                  </div>
                  <div v-if="itemInner.showMenu" class="type-choice clear-fix">
                  <span :class="{ 'selected': itemInner.isSelectAll }"
                        @click="selectAllBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectAll', numberAttrNameList)">全</span>
                    <span :class="{ 'selected': itemInner.isSelectBig }"
                          @click="selectBigBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectBig', numberAttrNameList)">大</span>
                    <span :class="{ 'selected': itemInner.isSelectSmall }"
                          @click="selectSmallBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectSmall', numberAttrNameList)">小</span>
                    <span :class="{ 'selected': itemInner.isSelectOdd }"
                          @click="selectOddBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectOdd', numberAttrNameList)">奇</span>
                    <span :class="{ 'selected': itemInner.isSelectEven }"
                          @click="selectEvenBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectEven', numberAttrNameList)">偶</span>
                    <span @click="clearAllBallsSelect(itemInner.numberList, 'isSelected', itemInner,  numberAttrNameList)">清</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="nowShowTab === 1"
               class="sanxing">
            <div class="choice-list-alert clear-fix">
              <div class="checkbox-list">
                <input type="checkbox"
                       v-model="sanxingCheckBox.wan"
                       id="sanxing_wan">
                <label for="sanxing_wan">万位</label>
                <input type="checkbox"
                       v-model="sanxingCheckBox.qian"
                       id="sanxing_qian">
                <label for="sanxing_qian">千位</label>
                <input type="checkbox"
                       v-model="sanxingCheckBox.bai"
                       id="sanxing_bai">
                <label for="sanxing_bai">百位</label>
                <input type="checkbox"
                       v-model="sanxingCheckBox.shi"
                       id="sanxing_shi">
                <label for="sanxing_shi">十位</label>
                <input type="checkbox"
                       v-model="sanxingCheckBox.ge"
                       id="sanxing_ge">
                <label for="sanxing_ge">个位</label>
              </div>
              <p>贴心提示:你选择了{{selectCheckBoxCounts}}个位置,系统自动根据位置组合成{{selectCheckBoxTypes}}个方案</p>
            </div>
            <div class="choice-number">
              <div v-for="(item, index) in numberListSanxing"
                   :key="index"
                   class="choice-number-item clear-fix">
                <div class="label">{{item.type}}</div>
                <div v-for="(itemInner, indexInner) in item.list"
                     class="clear-fix"
                     :key="indexInner">
                  <div class="value-choice clear-fix">
                    <span>{{itemInner.type}}</span>
                    <div class="value-list clear-fix">
                    <span v-for="(itemBall, indexThree) in itemInner.numberList"
                          @click="clickItemBall(itemBall)"
                          :class="{ 'selected': itemBall.isSelected }"
                          :key="indexThree">{{itemBall.label}}</span>
                    </div>
                  </div>
                  <div v-if="itemInner.showMenu" class="type-choice clear-fix">
                  <span :class="{ 'selected': itemInner.isSelectAll }"
                        @click="selectAllBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectAll', numberAttrNameList)">全</span>
                    <span :class="{ 'selected': itemInner.isSelectBig }"
                          @click="selectBigBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectBig', numberAttrNameList)">大</span>
                    <span :class="{ 'selected': itemInner.isSelectSmall }"
                          @click="selectSmallBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectSmall', numberAttrNameList)">小</span>
                    <span :class="{ 'selected': itemInner.isSelectOdd }"
                          @click="selectOddBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectOdd', numberAttrNameList)">奇</span>
                    <span :class="{ 'selected': itemInner.isSelectEven }"
                          @click="selectEvenBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectEven', numberAttrNameList)">偶</span>
                    <span @click="clearAllBallsSelect(itemInner.numberList, 'isSelected', itemInner,  numberAttrNameList)">清</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="nowShowTab === 2"
               class="sixing">
            <div class="choice-list-alert clear-fix">
              <div class="checkbox-list">
                <input type="checkbox"
                       v-model="sixingCheckBox.wan"
                       id="sixing_wan">
                <label for="sixing_wan">万位</label>
                <input type="checkbox"
                       v-model="sixingCheckBox.qian"
                       id="sixing_qian">
                <label for="sixing_qian">千位</label>
                <input type="checkbox"
                       v-model="sixingCheckBox.bai"
                       id="sixing_bai">
                <label for="sixing_bai">百位</label>
                <input type="checkbox"
                       v-model="sixingCheckBox.shi"
                       id="sixing_shi">
                <label for="sixing_shi">十位</label>
                <input type="checkbox"
                       v-model="sixingCheckBox.ge"
                       id="sixing_ge">
                <label for="sixing_ge">个位</label>
              </div>
              <p>贴心提示:你选择了{{selectCheckBoxCounts}}个位置,系统自动根据位置组合成{{selectCheckBoxTypes}}个方案</p>
            </div>
            <div class="choice-number">
              <div v-for="(item, index) in numberListSixing"
                   :key="index"
                   class="choice-number-item clear-fix">
                <div class="label">{{item.type}}</div>
                <div v-for="(itemInner, indexInner) in item.list"
                     class="clear-fix"
                     :key="indexInner">
                  <div class="value-choice clear-fix">
                    <span>{{itemInner.type}}</span>
                    <div class="value-list clear-fix">
                    <span v-for="(itemBall, indexThree) in itemInner.numberList"
                          @click="clickItemBall(itemBall)"
                          :class="{ 'selected': itemBall.isSelected }"
                          :key="indexThree">{{itemBall.label}}</span>
                    </div>
                  </div>
                  <div v-if="itemInner.showMenu" class="type-choice clear-fix">
                  <span :class="{ 'selected': itemInner.isSelectAll }"
                        @click="selectAllBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectAll', numberAttrNameList)">全</span>
                    <span :class="{ 'selected': itemInner.isSelectBig }"
                          @click="selectBigBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectBig', numberAttrNameList)">大</span>
                    <span :class="{ 'selected': itemInner.isSelectSmall }"
                          @click="selectSmallBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectSmall', numberAttrNameList)">小</span>
                    <span :class="{ 'selected': itemInner.isSelectOdd }"
                          @click="selectOddBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectOdd', numberAttrNameList)">奇</span>
                    <span :class="{ 'selected': itemInner.isSelectEven }"
                          @click="selectEvenBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectEven', numberAttrNameList)">偶</span>
                    <span @click="clearAllBallsSelect(itemInner.numberList, 'isSelected', itemInner,  numberAttrNameList)">清</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="nowShowTab === 3"
               class="wuxing">
            <div class="choice-list-alert clear-fix">
              <div class="checkbox-list">
                <input type="checkbox"
                       v-model="wuxingCheckBox.wan"
                       id="wuxing_wan">
                <label for="wuxing_wan">万位</label>
                <input type="checkbox"
                       v-model="wuxingCheckBox.qian"
                       id="wuxing_qian">
                <label for="wuxing_qian">千位</label>
                <input type="checkbox"
                       v-model="wuxingCheckBox.bai"
                       id="wuxing_bai">
                <label for="wuxing_bai">百位</label>
                <input type="checkbox"
                       v-model="wuxingCheckBox.shi"
                       id="wuxing_shi">
                <label for="wuxing_shi">十位</label>
                <input type="checkbox"
                       v-model="wuxingCheckBox.ge"
                       id="wuxing_ge">
                <label for="wuxing_ge">个位</label>
              </div>
              <p>贴心提示:你选择了{{selectCheckBoxCounts}}个位置,系统自动根据位置组合成{{selectCheckBoxTypes}}个方案</p>
            </div>
            <div class="choice-number">
              <div v-for="(item, index) in numberListWuxing"
                   :key="index"
                   class="choice-number-item clear-fix">
                <div class="label">{{item.type}}</div>
                <div v-for="(itemInner, indexInner) in item.list"
                     class="clear-fix"
                     :key="indexInner">
                  <div class="value-choice clear-fix">
                    <span>{{itemInner.type}}</span>
                    <div class="value-list clear-fix">
                    <span v-for="(itemBall, indexThree) in itemInner.numberList"
                          @click="clickItemBall(itemBall)"
                          :class="{ 'selected': itemBall.isSelected }"
                          :key="indexThree">{{itemBall.label}}</span>
                    </div>
                  </div>
                  <div v-if="itemInner.showMenu" class="type-choice clear-fix">
                  <span :class="{ 'selected': itemInner.isSelectAll }"
                        @click="selectAllBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectAll', numberAttrNameList)">全</span>
                    <span :class="{ 'selected': itemInner.isSelectBig }"
                          @click="selectBigBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectBig', numberAttrNameList)">大</span>
                    <span :class="{ 'selected': itemInner.isSelectSmall }"
                          @click="selectSmallBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectSmall', numberAttrNameList)">小</span>
                    <span :class="{ 'selected': itemInner.isSelectOdd }"
                          @click="selectOddBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectOdd', numberAttrNameList)">奇</span>
                    <span :class="{ 'selected': itemInner.isSelectEven }"
                          @click="selectEvenBalls(itemInner.numberList, 'isSelected', itemInner, 'isSelectEven', numberAttrNameList)">偶</span>
                    <span @click="clearAllBallsSelect(itemInner.numberList, 'isSelected', itemInner,  numberAttrNameList)">清</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="confirmation-amount clear-fix">
            <div class="bonus-group clear-fix">
              <p>奖金组</p>
              <div>
                <el-select size="mini" v-model="bonusGroup" placeholder="">
                  <el-option v-for="(item, index) in availablePrizeGroups.groups"
                             :key="index"
                             :value="item">
                    <span>{{item}}-{{(userInfo['prize_group'] - item) * 100 / maxPrizeGroupOddCount}}%</span>
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="multiple clear-fix">
              <p>倍数</p>
              <div>
                <el-input-number v-model="multiple"
                                 size="mini"
                                 :min="1"
                                 label=""></el-input-number>
              </div>
            </div>
            <div class="mode clear-fix">
              <p>模式</p>
              <div>
                <el-select size="mini" v-model="coefficient" placeholder="">
                  <el-option v-for="(value, key) in coefficientList"
                             :key="value"
                             :label="value"
                             :value="key"></el-option>
                </el-select>
              </div>
            </div>
            <div class="amount-show">
              <div class="selected clear-fix">
                已选 <span>{{createCounts}}</span> 注
              </div>
              <div class="total clear-fix">
                共 <span>{{createNumberMoney | toThousandslsFilter}}</span> 元
              </div>
            </div>
          </div>
          <div class="input">
            <p>共{{createCounts}}注</p>
            <textarea name="order-note"
                      v-model="createNumberText"
                      id="order-note"
                      cols="30"
                      rows="10"></textarea>
          </div>
          <div class="btns clear-fix">
            <el-button @click="createNumberList">产生单号</el-button>
            <el-button @click="betByCreateNumber">立即投注</el-button>
            <el-button @click="handleCopy(createNumberText, $event)">复制</el-button>
            <el-button @click="restSelect">清除</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'

import { mapGetters } from 'vuex'
import { alertMixin } from '../mixin'
import selectMethods from '@/views/credit/mixins/ssc_mixin'
import { maxPrizeGroupOddCount, createNumberMap, checkboxTypeLabelValue } from '../../../config/game-default-config'
import clip from '../../../util/clipboard'
import { getRound, shallowCopy } from '../../../util'
import { CLOSE_CREATE_NUMBER_BOX } from '../../../store/nameSpace'

export default {
  name: 'zhtz-alert',
  mixins: [ alertMixin, selectMethods ],
  data () {
    return {
      closeIcon,
      maxPrizeGroupOddCount,
      name: 'zhtz-alert',
      tabsList: [
        '二星',
        '三星',
        '四星',
        '五星'
      ],
      bonusGroup: '',
      createNumberText: '',
      multiple: 1,
      coefficient: '',
      coefficientList: [],
      createNumberArr: [],
      calculateDataMap: {
        '0': {
          checkboxType: 'erxingCheckBox',
          numberList: 'numberListErxing'
        },
        '1': {
          checkboxType: 'sanxingCheckBox',
          numberList: 'numberListSanxing'
        },
        '2': {
          checkboxType: 'sixingCheckBox',
          numberList: 'numberListSixing'
        },
        '3': {
          checkboxType: 'wuxingCheckBox',
          numberList: 'numberListWuxing'
        }
      },
      nowShowTab: 0,
      numberAttrNameList: [ 'isSelectAll', 'isSelectBig', 'isSelectSmall', 'isSelectOdd', 'isSelectEven' ],
      numberListErxing: [
        {
          type: '定位杀',
          computedValue: 'dingweisha',
          list: [
            {
              type: '第1位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第2位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和跨胆',
          computedValue: 'hekuadan',
          list: [
            {
              type: '胆码选',
              showMenu: false,
              computedValue: 'danmaxuan',
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '和尾杀',
              showMenu: false,
              isSelectAll: false,
              computedValue: 'heweisha',
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和值杀',
          computedValue: 'hezhisha',
          list: [
            {
              type: '和值',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 },
                { isSelected: false, value: 10, label: 10 },
                { isSelected: false, value: 11, label: 11 },
                { isSelected: false, value: 12, label: 12 },
                { isSelected: false, value: 13, label: 13 },
                { isSelected: false, value: 14, label: 14 },
                { isSelected: false, value: 15, label: 15 },
                { isSelected: false, value: 16, label: 16 },
                { isSelected: false, value: 17, label: 17 },
                { isSelected: false, value: 18, label: 18 }
              ]
            }
          ]
        },
        {
          type: '杀排列',
          computedValue: 'shapailie',
          list: [
            {
              type: '大小',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: '11', label: '大大' },
                { isSelected: false, value: '10', label: '大小' },
                { isSelected: false, value: '01', label: '小大' },
                { isSelected: false, value: '00', label: '小小' }
              ]
            }
          ]
        }
      ],
      numberListSanxing: [
        {
          type: '定位杀',
          computedValue: 'dingweisha',
          list: [
            {
              type: '第1位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第2位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第3位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和跨胆',
          computedValue: 'hekuadan',
          list: [
            {
              type: '胆码选',
              showMenu: false,
              computedValue: 'danmaxuan',
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '和尾杀',
              showMenu: false,
              isSelectAll: false,
              computedValue: 'heweisha',
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和值杀',
          computedValue: 'hezhisha',
          list: [
            {
              type: '和值',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 },
                { isSelected: false, value: 10, label: 10 },
                { isSelected: false, value: 11, label: 11 },
                { isSelected: false, value: 12, label: 12 },
                { isSelected: false, value: 13, label: 13 },
                { isSelected: false, value: 14, label: 14 },
                { isSelected: false, value: 15, label: 15 },
                { isSelected: false, value: 16, label: 16 },
                { isSelected: false, value: 17, label: 17 },
                { isSelected: false, value: 18, label: 18 },
                { isSelected: false, value: 19, label: 19 },
                { isSelected: false, value: 20, label: 20 },
                { isSelected: false, value: 21, label: 21 },
                { isSelected: false, value: 22, label: 22 },
                { isSelected: false, value: 23, label: 23 },
                { isSelected: false, value: 24, label: 24 },
                { isSelected: false, value: 25, label: 25 },
                { isSelected: false, value: 26, label: 26 },
                { isSelected: false, value: 27, label: 27 }
              ]
            }
          ]
        },
        {
          type: '杀排列',
          computedValue: 'shapailie',
          list: [
            {
              type: '大小',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: '111', label: '大大大' },
                { isSelected: false, value: '110', label: '大大小' },
                { isSelected: false, value: '101', label: '大小大' },
                { isSelected: false, value: '100', label: '大小小' },
                { isSelected: false, value: '011', label: '小大大' },
                { isSelected: false, value: '010', label: '小大小' },
                { isSelected: false, value: '001', label: '小小大' },
                { isSelected: false, value: '000', label: '小小小' }
              ]
            }
          ]
        }
      ],
      numberListSixing: [
        {
          type: '定位杀',
          computedValue: 'dingweisha',
          list: [
            {
              type: '第1位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第2位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第3位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第4位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和跨胆',
          computedValue: 'hekuadan',
          list: [
            {
              type: '胆码选',
              showMenu: false,
              computedValue: 'danmaxuan',
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '和尾杀',
              showMenu: false,
              isSelectAll: false,
              computedValue: 'heweisha',
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和值杀',
          computedValue: 'hezhisha',
          list: [
            {
              type: '和值',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 },
                { isSelected: false, value: 10, label: 10 },
                { isSelected: false, value: 11, label: 11 },
                { isSelected: false, value: 12, label: 12 },
                { isSelected: false, value: 13, label: 13 },
                { isSelected: false, value: 14, label: 14 },
                { isSelected: false, value: 15, label: 15 },
                { isSelected: false, value: 16, label: 16 },
                { isSelected: false, value: 17, label: 17 },
                { isSelected: false, value: 18, label: 18 },
                { isSelected: false, value: 19, label: 19 },
                { isSelected: false, value: 20, label: 20 },
                { isSelected: false, value: 21, label: 21 },
                { isSelected: false, value: 22, label: 22 },
                { isSelected: false, value: 23, label: 23 },
                { isSelected: false, value: 24, label: 24 },
                { isSelected: false, value: 25, label: 25 },
                { isSelected: false, value: 26, label: 26 },
                { isSelected: false, value: 27, label: 27 },
                { isSelected: false, value: 28, label: 28 },
                { isSelected: false, value: 29, label: 29 },
                { isSelected: false, value: 30, label: 30 },
                { isSelected: false, value: 31, label: 31 },
                { isSelected: false, value: 32, label: 32 },
                { isSelected: false, value: 33, label: 33 },
                { isSelected: false, value: 34, label: 34 },
                { isSelected: false, value: 35, label: 35 },
                { isSelected: false, value: 36, label: 36 }
              ]
            }
          ]
        },
        {
          type: '杀排列',
          computedValue: 'shapailie',
          list: [
            {
              type: '大小',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: '1111', label: '大大大大' },
                { isSelected: false, value: '1110', label: '大大大小' },
                { isSelected: false, value: '1101', label: '大大小大' },
                { isSelected: false, value: '1100', label: '大大小小' },
                { isSelected: false, value: '1011', label: '大小大大' },
                { isSelected: false, value: '1010', label: '大小大小' },
                { isSelected: false, value: '1001', label: '大小小大' },
                { isSelected: false, value: '1000', label: '大小小小' },
                { isSelected: false, value: '0111', label: '小大大大' },
                { isSelected: false, value: '0110', label: '小大大小' },
                { isSelected: false, value: '0101', label: '小大小大' },
                { isSelected: false, value: '0100', label: '小大小小' },
                { isSelected: false, value: '0011', label: '小小大大' },
                { isSelected: false, value: '0010', label: '小小大小' },
                { isSelected: false, value: '0001', label: '小小小大' },
                { isSelected: false, value: '0000', label: '小小小小' }
              ]
            }
          ]
        }
      ],
      numberListWuxing: [
        {
          type: '定位杀',
          computedValue: 'dingweisha',
          list: [
            {
              type: '第1位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第2位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第3位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第4位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '第5位',
              showMenu: true,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和跨胆',
          computedValue: 'hekuadan',
          list: [
            {
              type: '胆码选',
              showMenu: false,
              computedValue: 'danmaxuan',
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            },
            {
              type: '和尾杀',
              showMenu: false,
              isSelectAll: false,
              computedValue: 'heweisha',
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 0, label: 0 },
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 }
              ]
            }
          ]
        },
        {
          type: '和值杀',
          computedValue: 'hezhisha',
          list: [
            {
              type: '和值',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: 1, label: 1 },
                { isSelected: false, value: 2, label: 2 },
                { isSelected: false, value: 3, label: 3 },
                { isSelected: false, value: 4, label: 4 },
                { isSelected: false, value: 5, label: 5 },
                { isSelected: false, value: 6, label: 6 },
                { isSelected: false, value: 7, label: 7 },
                { isSelected: false, value: 8, label: 8 },
                { isSelected: false, value: 9, label: 9 },
                { isSelected: false, value: 10, label: 10 },
                { isSelected: false, value: 11, label: 11 },
                { isSelected: false, value: 12, label: 12 },
                { isSelected: false, value: 13, label: 13 },
                { isSelected: false, value: 14, label: 14 },
                { isSelected: false, value: 15, label: 15 },
                { isSelected: false, value: 16, label: 16 },
                { isSelected: false, value: 17, label: 17 },
                { isSelected: false, value: 18, label: 18 },
                { isSelected: false, value: 19, label: 19 },
                { isSelected: false, value: 20, label: 20 },
                { isSelected: false, value: 21, label: 21 },
                { isSelected: false, value: 22, label: 22 },
                { isSelected: false, value: 23, label: 23 },
                { isSelected: false, value: 24, label: 24 },
                { isSelected: false, value: 25, label: 25 },
                { isSelected: false, value: 26, label: 26 },
                { isSelected: false, value: 27, label: 27 },
                { isSelected: false, value: 28, label: 28 },
                { isSelected: false, value: 29, label: 29 },
                { isSelected: false, value: 30, label: 30 },
                { isSelected: false, value: 31, label: 31 },
                { isSelected: false, value: 32, label: 32 },
                { isSelected: false, value: 33, label: 33 },
                { isSelected: false, value: 34, label: 34 },
                { isSelected: false, value: 35, label: 35 },
                { isSelected: false, value: 36, label: 36 },
                { isSelected: false, value: 37, label: 37 },
                { isSelected: false, value: 38, label: 38 },
                { isSelected: false, value: 39, label: 39 },
                { isSelected: false, value: 40, label: 40 },
                { isSelected: false, value: 41, label: 41 },
                { isSelected: false, value: 42, label: 42 },
                { isSelected: false, value: 43, label: 43 },
                { isSelected: false, value: 44, label: 44 },
                { isSelected: false, value: 45, label: 45 }
              ]
            }
          ]
        },
        {
          type: '杀排列',
          computedValue: 'shapailie',
          list: [
            {
              type: '大小',
              showMenu: false,
              isSelectAll: false,
              isSelectBig: false,
              isSelectSmall: false,
              isSelectOdd: false,
              isSelectEven: false,
              numberList: [
                { isSelected: false, value: '11111', label: '大大大大大' },
                { isSelected: false, value: '11110', label: '大大大大小' },
                { isSelected: false, value: '11101', label: '大大大小大' },
                { isSelected: false, value: '11100', label: '大大大小小' },
                { isSelected: false, value: '11011', label: '大大小大大' },
                { isSelected: false, value: '11010', label: '大大小大小' },
                { isSelected: false, value: '11001', label: '大大小小大' },
                { isSelected: false, value: '11000', label: '大大小小小' },
                { isSelected: false, value: '10111', label: '大小大大大' },
                { isSelected: false, value: '10110', label: '大小大大小' },
                { isSelected: false, value: '10101', label: '大小大小大' },
                { isSelected: false, value: '10100', label: '大小大小小' },
                { isSelected: false, value: '10011', label: '大小小大大' },
                { isSelected: false, value: '10010', label: '大小小大小' },
                { isSelected: false, value: '10001', label: '大小小小大' },
                { isSelected: false, value: '10000', label: '大小小小小' },
                { isSelected: false, value: '01111', label: '小大大大大' },
                { isSelected: false, value: '01110', label: '小大大大小' },
                { isSelected: false, value: '01101', label: '小大大小大' },
                { isSelected: false, value: '01100', label: '小大大小小' },
                { isSelected: false, value: '01011', label: '小大小大大' },
                { isSelected: false, value: '01010', label: '小大小大小' },
                { isSelected: false, value: '01001', label: '小大小小大' },
                { isSelected: false, value: '01000', label: '小大小小小' },
                { isSelected: false, value: '00111', label: '小小大大大' },
                { isSelected: false, value: '00110', label: '小小大大小' },
                { isSelected: false, value: '00101', label: '小小大小大' },
                { isSelected: false, value: '00100', label: '小小大小小' },
                { isSelected: false, value: '00011', label: '小小小大大' },
                { isSelected: false, value: '00010', label: '小小小大小' },
                { isSelected: false, value: '00001', label: '小小小小大' },
                { isSelected: false, value: '00000', label: '小小小小小' }
              ]
            }
          ]
        }
      ],
      erxingCheckBox: {
        wan: false,
        qian: false,
        bai: false,
        shi: true,
        ge: true
      },
      sanxingCheckBox: {
        wan: false,
        qian: false,
        bai: true,
        shi: true,
        ge: true
      },
      sixingCheckBox: {
        wan: false,
        qian: true,
        bai: true,
        shi: true,
        ge: true
      },
      wuxingCheckBox: {
        wan: true,
        qian: true,
        bai: true,
        shi: true,
        ge: true
      }
    }
  },
  watch: {
    createNumberArr (val) {
      if (!val || !val.length) {
        this.createNumberText = ''
        return
      }
      this.createNumberText = this.createNumberArr.join(' ')
    },
    isCreateNumber (val) {
      this.show = val
    },
    show (val) {
      this.$store.commit(CLOSE_CREATE_NUMBER_BOX, val)
    }
  },
  computed: {
    ...mapGetters([
      'sscLastWnNumber',
      'isCreateNumber',
      'szcpMenuList',
      'userInfo',
      'menu',
      'menu',
      'availablePrizeGroups',
      'lotteryId',
      'sscAwardInfo',
      'defaultSetting',
      'gameDetail'
    ]),
    wnNumberList () {
      const wnNumber = this.sscLastWnNumber['wn_number']
      return wnNumber ? wnNumber.split('') : [ '?', '?', '?', '?', '?' ]
    },
    endTimeInfo () {
      if (!this.sscAwardInfo['server_time']) {
        return {
          hour: `00`,
          min: `00`,
          sec: `00`
        }
      }
      const NOW_TIME = this.sscAwardInfo['server_time']
      const END_TIME = this.sscAwardInfo['end_time']
      let interval = END_TIME - NOW_TIME
      let hour = parseInt(interval / 1000 / 60 / 60 % 24)
      let min = parseInt(interval / 1000 / 60 % 60)
      let sec = parseInt(interval / 1000 % 60)
      if (sec < 0) sec = 0
      return {
        hour: hour < 10 ? `0${hour}` : hour,
        min: min < 10 ? `0${min}` : min,
        sec: sec < 10 ? `0${sec}` : sec
      }
    },
    createCounts () {
      if (!this.createNumberArr.length) return 0
      const checkBoxes = this[this.calculateDataMap[this.nowShowTab].checkboxType]
      let checkBoxCounts = 0
      let checkBoxMultiply = 0
      for (let key in checkBoxes) {
        if (checkBoxes[key]) checkBoxCounts++
      }
      if (this.nowShowTab === 0) {
        for (let i = 0; i < checkBoxCounts; i++) {
          checkBoxMultiply += i
        }
      } else if (this.nowShowTab === 1) {
        for (let i = 0; i < checkBoxCounts; i++) {
          for (let j = 0; j < i; j++) {
            checkBoxMultiply += j
          }
        }
      } else if (this.nowShowTab === 2) {
        for (let i = 0; i < checkBoxCounts; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              checkBoxMultiply += a
            }
          }
        }
      } else if (this.nowShowTab === 3) {
        for (let i = 0; i < checkBoxCounts; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              for (let b = 0; b < a; b++) {
                checkBoxMultiply += b
              }
            }
          }
        }
      }
      return this.createNumberArr.length * checkBoxMultiply
    },
    createNumberMoney () {
      // return getRound(this.selectedCounts * this.coefficient * 2 * this.multiple, 5)
      return getRound(this.createCounts * this.coefficient * 2 * this.multiple, 5)
    },
    selectCheckBoxCounts () {
      const checkBoxes = this[this.calculateDataMap[this.nowShowTab].checkboxType]
      let checkBoxCounts = 0
      for (let key in checkBoxes) {
        if (checkBoxes[key]) checkBoxCounts++
      }
      return checkBoxCounts
    },
    selectCheckBoxTypes () {
      const checkBoxes = this[this.calculateDataMap[this.nowShowTab].checkboxType]
      let checkBoxCounts = 0
      let checkBoxMultiply = 0
      for (let key in checkBoxes) {
        if (checkBoxes[key]) checkBoxCounts++
      }
      if (this.nowShowTab === 0) {
        for (let i = 0; i < checkBoxCounts; i++) {
          checkBoxMultiply += i
        }
      } else if (this.nowShowTab === 1) {
        for (let i = 0; i < checkBoxCounts; i++) {
          for (let j = 0; j < i; j++) {
            checkBoxMultiply += j
          }
        }
      } else if (this.nowShowTab === 2) {
        for (let i = 0; i < checkBoxCounts; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              checkBoxMultiply += a
            }
          }
        }
      } else if (this.nowShowTab === 3) {
        for (let i = 0; i < checkBoxCounts; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              for (let b = 0; b < a; b++) {
                checkBoxMultiply += b
              }
            }
          }
        }
      }
      return checkBoxMultiply
    }
  },
  methods: {
    betByCreateNumber () {
      if (!this.createNumberArr.length) return this.$message({ message: '未检测到可投注的号码', type: 'error' })
      const szcpMenuList = this.szcpMenuList
      const menuList = this.menu
      let lotteryName
      let tabName
      let typeName
      let playTypeItemId
      let price
      let prize
      let maxMultiple
      let flag = false
      for (let key in szcpMenuList) {
        if (flag) break
        for (let innerKey in szcpMenuList[key]['lotteries']) {
          if (innerKey === this.lotteryId) {
            lotteryName = szcpMenuList[key]['lotteries'][innerKey]['name']
            flag = true
            break
          }
        }
      }
      menuList.find(item => {
        if (item['name_en'] === createNumberMap[this.nowShowTab].split(' ')[0]) {
          tabName = item['name_cn']
          item.children.find(itemInner => {
            if (itemInner['name_en'] === createNumberMap[this.nowShowTab].split(' ')[1]) {
              itemInner.children.find(itemThree => {
                if (itemThree['name_en'] === createNumberMap[this.nowShowTab].split(' ')[2]) {
                  typeName = itemThree['name_cn']
                  playTypeItemId = itemThree.id
                  price = itemThree['price']
                  prize = itemThree['prize']
                  maxMultiple = itemThree['max_multiple']
                  return true
                }
              })
              return true
            }
          })
          return true
        }
      })
      this.$gameAlertQrzdxx({
        shoppingCarList: [ {
          lotteryName,
          lotteryId: this.lotteryId,
          tabName,
          typeName,
          price,
          prize,
          playTypeItemId,
          maxMultiple,
          sortType: 'F',
          extra: this.getExtraStr(),
          maxPrizeGroupKey: Math.max.apply(this, this.availablePrizeGroups.groups),
          awardInfo: shallowCopy(this.sscAwardInfo),
          numberList: this.createNumberArr.slice(),
          betNoteCounts: this.createCounts,
          bonusGroup: this.bonusGroup,
          selectedCounts: this.createCounts,
          multiple: this.multiple,
          coefficient: this.coefficient,
          coefficientLabel: this.coefficientList[this.coefficient],
          selectedMoney: this.createNumberMoney
        } ],
        lotteryId: this.lotteryId,
        isClearShoppingCar: false,
        isSecondAlert: true,
        isCreateNumber: true
      })
    },
    getExtraStr () {
      const checkBoxes = this[this.calculateDataMap[this.nowShowTab].checkboxType]
      let extraStr = ''
      for (let key in checkBoxes) {
        if (checkBoxes[key]) {
          extraStr += checkboxTypeLabelValue[key]
        }
      }
      return extraStr.split('').map(item => +item).sort((a, b) => a - b).join('')
    },
    handleCopy (text, event) {
      clip(text, event)
    },
    restSelect () {
      this.createNumberArr = []
      this[this.calculateDataMap[this.nowShowTab].numberList].map(item => {
        item.list.map(itemInner => {
          itemInner.isSelectAll = false
          itemInner.isSelectBig = false
          itemInner.isSelectSmall = false
          itemInner.isSelectOdd = false
          itemInner.isSelectEven = false
          itemInner.numberList.map(itemThree => {
            itemThree.isSelected = false
          })
        })
      })
      this[this.calculateDataMap[this.nowShowTab].checkboxType] = Object.assign(
        this[this.calculateDataMap[this.nowShowTab].checkboxType],
        {
          wan: this.nowShowTab > 2,
          qian: this.nowShowTab > 1,
          bai: this.nowShowTab > 0,
          shi: true,
          ge: true
        }
      )
    },
    clickItemBall (item) {
      item.isSelected = !item.isSelected
    },
    createNumberList () {
      const nowNumberList = this[this.calculateDataMap[this.nowShowTab].numberList]
      let createNumberArr = []
      nowNumberList.map(item => {
        if (item.computedValue === 'dingweisha') {
          if (item.list.length === 2) {
            for (let i = 0; i < item.list[0].numberList.length; i++) {
              if (item.list[0].numberList[i].isSelected) continue
              for (let j = 0; j < item.list[1].numberList.length; j++) {
                if (item.list[1].numberList[j].isSelected) continue
                createNumberArr.push(`${item.list[0].numberList[i].value}${item.list[1].numberList[j].value}`)
              }
            }
          }
          if (item.list.length === 3) {
            for (let i = 0; i < item.list[0].numberList.length; i++) {
              if (item.list[0].numberList[i].isSelected) continue
              for (let j = 0; j < item.list[1].numberList.length; j++) {
                if (item.list[1].numberList[j].isSelected) continue
                for (let a = 0; a < item.list[2].numberList.length; a++) {
                  if (item.list[2].numberList[a].isSelected) continue
                  createNumberArr.push(`${item.list[0].numberList[i].value}${item.list[1].numberList[j].value}${item.list[2].numberList[a].value}`)
                }
              }
            }
          }
          if (item.list.length === 4) {
            for (let i = 0; i < item.list[0].numberList.length; i++) {
              if (item.list[0].numberList[i].isSelected) continue
              for (let j = 0; j < item.list[1].numberList.length; j++) {
                if (item.list[1].numberList[j].isSelected) continue
                for (let a = 0; a < item.list[2].numberList.length; a++) {
                  if (item.list[2].numberList[a].isSelected) continue
                  for (let b = 0; b < item.list[3].numberList.length; b++) {
                    if (item.list[3].numberList[b].isSelected) continue
                    createNumberArr.push(`${item.list[0].numberList[i].value}${item.list[1].numberList[j].value}${item.list[2].numberList[a].value}${item.list[3].numberList[b].value}`)
                  }
                }
              }
            }
          }
          if (item.list.length === 5) {
            for (let i = 0; i < item.list[0].numberList.length; i++) {
              if (item.list[0].numberList[i].isSelected) continue
              for (let j = 0; j < item.list[1].numberList.length; j++) {
                if (item.list[1].numberList[j].isSelected) continue
                for (let a = 0; a < item.list[2].numberList.length; a++) {
                  if (item.list[2].numberList[a].isSelected) continue
                  for (let b = 0; b < item.list[3].numberList.length; b++) {
                    if (item.list[3].numberList[b].isSelected) continue
                    for (let c = 0; c < item.list[4].numberList.length; c++) {
                      if (item.list[4].numberList[c].isSelected) continue
                      createNumberArr.push(`${item.list[0].numberList[i].value}${item.list[1].numberList[j].value}${item.list[2].numberList[a].value}${item.list[3].numberList[b].value}${item.list[4].numberList[c].value}`)
                    }
                  }
                }
              }
            }
          }
        }
        if (item.computedValue === 'hekuadan') {
          item.list.map(itemInner => {
            if (itemInner.computedValue === 'danmaxuan') {
              if (
                itemInner.numberList.find(item => item.isSelected)
              ) {
                let danFilterArr = []
                itemInner.numberList.map(itemThree => {
                  if (itemThree.isSelected) {
                    danFilterArr = danFilterArr.concat(createNumberArr.filter(item => item.indexOf(itemThree.value) !== -1))
                  }
                })
                createNumberArr = danFilterArr
              }
            }
            if (itemInner.computedValue === 'heweisha') {
              if (
                itemInner.numberList.find(item => item.isSelected)
              ) {
                let heweiFilterArr = []
                itemInner.numberList.map(itemThree => {
                  if (itemThree.isSelected) {
                    heweiFilterArr = heweiFilterArr.concat(createNumberArr.filter(item => {
                      return `${item.split('').reduce((a, b) => +a + +b)}`.indexOf(itemThree.value) !== -1
                    }))
                  }
                })
                createNumberArr = createNumberArr.filter(item => {
                  return !heweiFilterArr.find(itemInner => item === itemInner)
                })
              }
            }
          })
        }
        if (item.computedValue === 'hezhisha') {
          item.list.map(itemInner => {
            if (
              itemInner.numberList.find(item => item.isSelected)
            ) {
              let hezhiArr = []
              itemInner.numberList.map(itemThree => {
                if (itemThree.isSelected) {
                  hezhiArr = hezhiArr.concat(createNumberArr.filter(item => {
                    return item.split('').reduce((a, b) => +a + +b) === itemThree.value
                  }))
                }
              })
              createNumberArr = createNumberArr.filter(item => {
                return !hezhiArr.find(itemInner => itemInner === item)
              })
            }
          })
        }
        if (item.computedValue === 'shapailie') {
          item.list.map(itemInner => {
            if (
              itemInner.numberList.find(item => item.isSelected)
            ) {
              itemInner.numberList.map(itemThree => {
                if (itemThree.isSelected) {
                  let incompatibleArr = Array.from(new Set(createNumberArr))
                  itemThree.value.split('').map((bigOrSmall, numberIndex) => {
                    if (bigOrSmall === '1') {
                      incompatibleArr = incompatibleArr.filter(item => Number(item[numberIndex]) > 4)
                    }
                    if (bigOrSmall === '0') {
                      incompatibleArr = incompatibleArr.filter(item => Number(item[numberIndex]) <= 4)
                    }
                  })
                  createNumberArr = createNumberArr.filter(item => !incompatibleArr.find(itemInner => itemInner === item))
                }
              })
            }
          })
        }
      })
      this.createNumberArr = Array.from(new Set(createNumberArr))
    }
  },
  mounted () {
    this.coefficient = this.defaultSetting['default_coefficient']
    this.coefficientList = this.defaultSetting['coefficients']
    this.bonusGroup = +this.userInfo['prize_group']
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  /*btns begin*/
  .btns {
    margin-top: 16px;
  }
  .btns button {
    /*float: left;*/
    /*height: 36px;*/
    /*text-align: center;*/
    background-color: #ccba8f;
    /*margin-right: 4px;*/
    /*border-radius: 3px;*/
    color: #fff;
    /*border-top: 1px solid #d0ae87;*/
    /*border-bottom: 1px solid #ccbd91;*/
  }
  .btns button:nth-of-type(1) {
    /*width: 98px;*/
  }
  .btns button:nth-of-type(2) {
    background-color: #72c7b8;
    border-top: 1px solid #6eb8da;
    border-bottom: 1px solid #72cab2;
  }
  .btns button:nth-of-type(3),
  .btns button:nth-of-type(4) {
  }
  /*btns end*/
  /*input begin*/
  .input {
    margin-top: 36px;
  }
  .input p {
    font-size: 14px;
    color: #777777;
  }
  .input textarea {
    width: 100%;
    color: #777;
    line-height: 20px;
    font-size: 15px;
    margin-top: 4px;
    resize: vertical;
    min-height: 100px;
    height: 114px;
    padding: 5px 10px 5px 10px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
  }
  .input textarea:focus {
    border: 1px solid rgb(153, 153, 153);
  }
  /*input end*/
  /*confirmation-amount begin*/
  .confirmation-amount .amount-show {
    float: left;
    font-size: 12px;
    color: #545454;
    padding-top: 20px;
    margin-left: 120px;
  }
  .confirmation-amount .amount-show > div:nth-of-type(1) {
    margin-bottom: 9px;
  }
  .confirmation-amount .amount-show span {
    font-weight: bold;
    color: #a68f4c;
  }
  .confirmation-amount p {
    font-size: 14px;
    color: #545454;
  }
  .confirmation-amount .mode {
    float: left;
    margin-left: 72px;
    width: 116px;
  }
  .confirmation-amount .mode p {
    margin-bottom: 9px;
  }
  .confirmation-amount {
    margin-top: 22px;
  }
  .confirmation-amount .bonus-group {
    float: left;
    width: 186px;
    margin-right: 90px;
    text-align: center;
  }
  .confirmation-amount .bonus-group p {
    margin-bottom: 9px;
  }
  .confirmation-amount .multiple {
    text-align: center;
    float: left;
    width: 156px;
  }
  .confirmation-amount .multiple p {
    margin-bottom: 9px;
  }
  /*confirmation-amount end*/
  /*choice-number begin*/
  .choice-number {
  }
  .choice-number .choice-number-item {
    padding-left: 105px;
    position: relative;
  }
  .choice-number .choice-number-item .label {
    position: absolute;
    left: 10px;
    top: 0;
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    background-color: #4babbf;
    border-radius: 15px;
  }
  .choice-number .choice-number-item .value-choice {
    float: left;
    margin-bottom: 10px;
    line-height: 31px;
  }
  .choice-number .choice-number-item:nth-of-type(2) .value-choice {
    margin-right: 200px;
  }
  .choice-number .choice-number-item .value-choice > span {
    float: left;
    font-size: 15px;
    width: 50px;
    margin-right: 15px;
    color: #888;
  }
  .choice-number .choice-number-item .value-choice .value-list {
    float: left;
    max-width: 920px;
    border-radius: 3px;
    height: 100%;
    /*border: 1px solid #f38f4a;*/
  }
  .choice-number .choice-number-item .value-choice .value-list > span:hover {
    background-color: #f17e2e;
    color: #ffffff;
  }
  .choice-number .choice-number-item .value-choice .value-list > span:nth-last-of-type(1),
  .sanxing .choice-number .choice-number-item .value-choice .value-list > span:nth-of-type(20),
  .wuxing .choice-number .choice-number-item .value-choice .value-list > span:nth-of-type(20),
  .wuxing .choice-number .choice-number-item .value-choice .value-list > span:nth-of-type(39),
  .sixing .choice-number .choice-number-item:nth-of-type(4) .value-choice .value-list > span:nth-of-type(11),
  .wuxing .choice-number .choice-number-item:nth-of-type(4) .value-choice .value-list > span:nth-of-type(9n),
  .sixing .choice-number .choice-number-item .value-choice .value-list > span:nth-of-type(20) {
    border-right: 1px solid #f17e2e;
  }
  .choice-number .choice-number-item .value-choice .value-list > span:nth-of-type(1) {
    border-radius: 4px 0 0 4px;
  }
  .choice-number .choice-number-item .value-choice .value-list > span:nth-last-of-type(1) {
    border-radius: 0 4px 4px 0;
  }
  .choice-number .choice-number-item .value-choice .value-list > span {
    float: left;
    padding: 0 15px 0 17px;
    margin-bottom: 9px;
    min-width: 40px;
    text-align: center;
    transition: all .2s linear;
    height: 29px;
    border-top: 1px solid #f17e2e;
    border-left: 1px solid #f17e2e;
    border-bottom: 1px solid #f17e2e;
    font-size: 12px;
    color: #545454;
    font-weight: bold;
    cursor: pointer;
  }
  .choice-number .choice-number-item .value-choice .value-list > span.selected {
    background-color: #f17e2e;
    color: #ffffff;
  }
  .choice-number .choice-number-item .value-choice .value-list > span:nth-last-of-type(1) {
    /*border-right: none;*/
  }
  .choice-number .choice-number-item .type-choice {
    height: 31px;
    float: left;
    margin-bottom: 19px;
    line-height: 31px;
    margin-left: 138px;
  }
  .choice-number .choice-number-item .type-choice span:hover {
    background-color: #9796b6;
    color: #fff;
  }
  .choice-number .choice-number-item .type-choice span {
    transition: all .2s linear;
    float: left;
    width: 45px;
    height: 100%;
    border-radius: 3px;
    border: 1px solid #c3c3c3;
    text-align: center;
    color: #545454;
    margin-right: 9px;
    cursor: pointer;
  }
  .choice-number .choice-number-item .type-choice span.selected {
    background-color: #9796b6;
    color: #fff;
  }
  .choice-number .choice-number-item .value-choice,
  .choice-number .choice-number-item .type-choice {}
  /*choice-number end*/
  /*choice-list-alert begin*/
  .choice-list-alert {
    line-height: 71px;
    height: 71px;
  }
  .choice-list-alert .checkbox-list {
    float: left;
    margin-right: 4px;
    height: 100%;
  }
  .choice-list-alert .checkbox-list label {
    color: #777777;
    vertical-align: baseline;
    font-size: 14px;
  }
  .choice-list-alert .checkbox-list input {
    width: 13px;
    vertical-align: middle;
    height: 13px;
    background-color: #e4e4e4;
    border: 1px solid #b2b2b2;
    border-radius: 2px;
  }
  .choice-list-alert p {
    color: #777777;
    font-size: 14px;
  }
  /*choice-list-alert end*/
  .wrapper {
    position: fixed;
    overflow: auto;
    top: 0;
    bottom: 0;
    z-index: 99;
    left: 0;
    right: 0;
    background: url("../../../statics/img/game_alert_wrapper_bg.png");
    background-size: 100% 100%;
    /*filter: blur(10px)*/
  }
  .container {
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    position: absolute;
    left: 50%;
    top: 60px;
    transform: translateX(-50%);
    width: 1139px;
    background-color: #ffffff;
    margin-bottom: 60px;
  }
  .container > a:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 22px;
  }
  .container .title {
    height: 56px;
    line-height: 56px;
    padding-left: 27px;
    font-size: 18px;
    color: #fff;
    background-color: #616078;
  }
  .container .content {
    padding: 17px 14px 17px 16px;
  }
  .container .content .top {
    margin-bottom: 17px;
  }
  .container .content .top .left {
    float: left;
    width: 266px;
    height: 135px;
    border: 1px solid #d4d3d1;
    line-height: 135px;
    text-align: center;
    border-radius: 4px;
    margin-right: 14px;
  }
  .container .content .top .left > img {
    vertical-align: middle;
  }
  .container .content .top .center {
    float: left;
    width: 476px;
    height: 135px;
    border: 1px solid #d4d3d1;
    border-radius: 4px;
    padding-top: 24px;
    margin-right: 12px;
  }
  .container .content .top .center > p {
    text-align: center;
    font-size: 14px;
    color: #555555;
  }
  .container .content .top .center > p i {
    font-style: normal;
    color: #f17e2e;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .container .content .top .center > .balls {
    margin-top: 8px;
    text-align: center;
  }
  .container .content .top .center > .balls > span {
    display: inline-block;
    width: 64px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    color: #463b19;
    background: url("../../../statics/img/game_alert_ball_bg.png") no-repeat 0 0;
  }
  .container .content .top .right {
    float: left;
    border: 1px solid #d4d3d1;
    border-radius: 4px;
    width: 341px;
    height: 135px;
    padding-top: 24px;
  }
  .container .content .top .right p {
    text-align: center;
    font-size: 14px;
    color: #555555;
    margin-bottom: 13px;
  }
  .container .content .top .right p i {
    font-style: normal;
    color: #f17e2e;
    font-weight: bold;
  }
  .container .content .top .right div {
    text-align: center;
    font-size: 30px;
  }
  .container .content .top .right span {
    display: inline-block;
    border: 3px solid #d9d9d9;
    border-radius: 4px;
    background-color: #3e4051;
    width: 66px;
    height: 52px;
    line-height: 52px;
    text-align: center;
  }
  .container .content .top .right span.hour {
    color: #fff;
  }
  .container .content .top .right span.min {
    color: #fff;
  }
  .container .content .top .right span.seconds {
    color: #fff;
  }
  /*tabs begin*/
  .container .content .tabs  {
    border-bottom: 1px solid #dddddd;
  }
  .container .content .tabs > a  {
    float: left;
    width: 62px;
    height: 43px;
    font-size: 14px;
    position: relative;
    text-align: center;
    color: #555555;
    font-weight: normal;
    border-radius: 4px;
    line-height: 43px;
    background-color: #fff;
  }
  .container .content .tabs > a.now-hov  {
    border: 1px solid #dddddd;
    color: #f17e2e;
    border-bottom: 1px solid #fff;
  }
  .container .content .tabs > a.now-hov::after  {
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: -2px;
    left: 0;
    background-color: #ffffff;
  }
  /*tabs end*/
</style>

<style>
</style>
