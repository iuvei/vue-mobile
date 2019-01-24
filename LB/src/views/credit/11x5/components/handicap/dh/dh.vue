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
        // todo : 任一中一待后台补全数据
        /* {
          type: '任一中一',
          isBall: false,
          isOneBall: false,
          labelMap: 'zonghe-longhuhe',
          lineShowCount: 4,
          numberList: [
            { label: '总和大', upperLabel: 'zonghe-longhuhe', labelMap: 'daxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和小', upperLabel: 'zonghe-longhuhe', labelMap: 'daxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和单', upperLabel: 'zonghe-longhuhe', labelMap: 'danshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和双', upperLabel: 'zonghe-longhuhe', labelMap: 'danshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '龙', upperLabel: 'zonghe-longhuhe', labelMap: 'longhuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '虎', upperLabel: 'zonghe-longhuhe', labelMap: 'longhuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '和', upperLabel: 'zonghe-longhuhe', labelMap: 'longhuhe', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        }, */
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
                { label: '1', value: 1, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '10', value: 10, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '11', value: 11, upperLabel: 'first', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
                { label: '1', value: 1, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '10', value: 10, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '11', value: 11, upperLabel: 'second', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
                { label: '1', value: 1, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '10', value: 10, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '11', value: 11, upperLabel: 'third', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
                { label: '1', value: 1, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '10', value: 10, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '11', value: 11, upperLabel: 'fourth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
                { label: '1', value: 1, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '10', value: 10, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '11', value: 11, upperLabel: 'fifth', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
