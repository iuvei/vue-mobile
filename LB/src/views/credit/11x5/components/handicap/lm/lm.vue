<template>
    <div class="bet-plate">
      <ul>
        <li v-for="(list, index) in numberList"
            :class="{ 'clear-fix': list.inline }"
            :key="index">
          <template v-if="!list.inline">
            <h4>{{list.type}}</h4>
            <ul class="block-list clear-fix">
              <li class="clear-fix"
                  @click="clickChoiceItem($event, item)"
                  v-for="(item, indexInner) in list.numberList"
                  :class="{ 'selected': item.betCount !== '' }"
                  :style="{ 'width': 100 / list.lineShowCount + '%' }"
                  :key="indexInner">
                <div class="bet-label">
                  <span :class="{ 'ball': list.isBall }">{{item.label}}</span>
                </div>
                <span class="odd">{{item.odd | getRound4}}</span>
                <el-dropdown class="bet-count"
                             @command="clickQuickSelect.apply(this, Array.prototype.concat.call(arguments, item))"
                             trigger="click">
                  <input type="text"
                         @input="checkInputCount(item)"
                         @blur="checkIsMoreThanMaxCount(item)"
                         v-model="item.betCount">
                  <el-dropdown-menu v-if="dropDownShow"
                                    slot="dropdown">
                    <el-dropdown-item v-for="(itemInner, index) in quickSelectAmountData"
                                      :command="itemInner"
                                      :key="index">{{itemInner}}元</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </template>
          <template v-else>
            <ul class="inline-list clear-fix">
              <li v-for="(item, indexInner) in list.numberList"
                  :style="{ 'width': 100 / list.lineShowCount + '%' }"
                  :key="indexInner">
                <h4>{{item.type}}</h4>
                <ul class="clear-fix">
                  <li class="clear-fix"
                      @click="clickChoiceItem($event, itemInner)"
                      v-for="(itemInner, indexInnerTwo) in item.numberList"
                      :class="{ 'selected': itemInner.betCount !== '' }"
                      :style="{ 'width': 100 / item.lineShowCount + '%' }"
                      :key="indexInnerTwo">
                    <div class="bet-label">
                      <span :class="{ 'ball': item.isBall }">{{itemInner.label}}</span>
                    </div>
                    <span class="odd">{{itemInner.odd | getRound4}}</span>
                    <el-dropdown class="bet-count"
                                 @command="clickQuickSelect.apply(this, Array.prototype.concat.call(arguments, itemInner))"
                                 trigger="click">
                      <input type="text"
                             @input="checkInputCount(itemInner)"
                             @blur="checkIsMoreThanMaxCount(itemInner)"
                             v-model="itemInner.betCount">
                      <el-dropdown-menu v-if="dropDownShow"
                                        slot="dropdown">
                        <el-dropdown-item v-for="(itemInnerTwo, indexInnerThree) in quickSelectAmountData"
                                          :command="itemInnerTwo"
                                          :key="indexInnerThree">{{itemInnerTwo}}元</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </li>
                </ul>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
</template>

<script>
import handicapIntegrateMixins from '../../../../ssc/components/handicap/common/handicap-integrate-mixins'
import { handicapAjaxValueConfig } from '../../../../../../config/game-default-config'
export default {
  mixins: [ handicapIntegrateMixins ],
  data () {
    return {
      numberList: [
        {
          type: '总和',
          isBall: false,
          isOneBall: false,
          labelMap: 'zonghe-longhu',
          lineShowCount: 4,
          numberList: [
            { label: '总和大', value: 1, upperLabel: 'zonghe-longhu', labelMap: 'zhonghedaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和小', value: 0, upperLabel: 'zonghe-longhu', labelMap: 'zhonghedaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和单', value: 1, upperLabel: 'zonghe-longhu', labelMap: 'zhonghedanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和双', value: 0, upperLabel: 'zonghe-longhu', labelMap: 'zhonghedanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和尾大', value: 1, upperLabel: 'zonghe-longhu', labelMap: 'heweidaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和尾小', value: 0, upperLabel: 'zonghe-longhu', labelMap: 'heweidaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '龙', value: 1, upperLabel: 'zonghe-longhu', labelMap: 'longhu', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '虎', value: 0, upperLabel: 'zonghe-longhu', labelMap: 'longhu', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        },
        {
          type: 'ball',
          isBall: true,
          isOneBall: true,
          inline: true,
          labelMap: 'first',
          lineShowCount: 5,
          numberList: [
            {
              type: '第一球',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'first',
              lineShowCount: 1,
              numberList: [
                { label: '大', value: 1, upperLabel: 'first', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '小', value: 0, upperLabel: 'first', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '单', value: 1, upperLabel: 'first', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '双', value: 0, upperLabel: 'first', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            },
            {
              type: '第二球',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'second',
              lineShowCount: 1,
              numberList: [
                { label: '大', value: 1, upperLabel: 'second', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '小', value: 0, upperLabel: 'second', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '单', value: 1, upperLabel: 'second', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '双', value: 0, upperLabel: 'second', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            },
            {
              type: '第三球',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'third',
              lineShowCount: 1,
              numberList: [
                { label: '大', value: 1, upperLabel: 'third', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '小', value: 0, upperLabel: 'third', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '单', value: 1, upperLabel: 'third', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '双', value: 0, upperLabel: 'third', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            },
            {
              type: '第四球',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'fourth',
              lineShowCount: 1,
              numberList: [
                { label: '大', value: 1, upperLabel: 'fourth', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '小', value: 0, upperLabel: 'fourth', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '单', value: 1, upperLabel: 'fourth', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '双', value: 0, upperLabel: 'fourth', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            },
            {
              type: '第五球',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'fifth',
              lineShowCount: 1,
              numberList: [
                { label: '大', value: 1, upperLabel: 'fifth', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '小', value: 0, upperLabel: 'fifth', labelMap: 'daxiaozuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '单', value: 1, upperLabel: 'fifth', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '双', value: 0, upperLabel: 'fifth', labelMap: 'danshuangzuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
 @import "../../../../statics/css/integrate.css";
  .inline-list {}
  .inline-list > li {
    float: left;
    padding: 0!important;
  }
  .inline-list > li > h4 {
    width: 100%;
    height: 23px;
    line-height: 23px;
    background-color: #ff9100;
    font-weight: normal;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
    font-size: 16px;
  }
</style>
