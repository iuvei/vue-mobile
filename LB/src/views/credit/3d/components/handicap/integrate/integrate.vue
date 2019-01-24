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
          labelMap: 'zonghe-longh',
          lineShowCount: 4,
          numberList: [
            { label: '总和大', value: 1, upperLabel: 'zonghe-longh', labelMap: 'zonghe-daxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和小', value: 0, upperLabel: 'zonghe-longh', labelMap: 'zonghe-daxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和单', value: 1, upperLabel: 'zonghe-longh', labelMap: 'zonghe-danshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和双', value: 0, upperLabel: 'zonghe-longh', labelMap: 'zonghe-danshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
            // todo : 预留位 后台未返回相关数据 按照菲达数据格式 后期后台补上数据展示在页面
            /* { label: '总大单', upperLabel: 'zonghe-longh', labelMap: 'longhu', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总大双', upperLabel: 'zonghe-longh', labelMap: 'longhu', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总小单', upperLabel: 'zonghe-longh', labelMap: 'longhu', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总小双', upperLabel: 'zonghe-longh', labelMap: 'he', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 } */
          ]
        },
        {
          type: '不定位',
          isBall: false,
          isOneBall: false,
          labelMap: 'budingwei',
          lineShowCount: 4,
          numberList: [
            { label: '0', value: 0, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '1', value: 1, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '2', value: 2, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '3', value: 3, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '4', value: 4, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '5', value: 5, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '6', value: 6, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '7', value: 7, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '8', value: 8, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '9', value: 9, upperLabel: 'budingwei', labelMap: 'budingwei', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        },
        {
          type: 'ball',
          isBall: true,
          isOneBall: true,
          inline: true,
          labelMap: 'baiwei',
          lineShowCount: 3,
          numberList: [
            {
              type: '百位',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'baiwei',
              lineShowCount: 1,
              numberList: [
                { label: '0', value: 0, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '1', value: 1, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'baiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            },
            {
              type: '十位',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'shiwei',
              lineShowCount: 1,
              numberList: [
                { label: '0', value: 0, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '1', value: 1, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'shiwei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
              ]
            },
            {
              type: '个位',
              isBall: true,
              isOneBall: true,
              inline: true,
              labelMap: 'gewei',
              lineShowCount: 1,
              numberList: [
                { label: '0', value: 0, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '1', value: 1, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '2', value: 2, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '3', value: 3, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '4', value: 4, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '5', value: 5, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '6', value: 6, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '7', value: 7, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '8', value: 8, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
                { label: '9', value: 9, upperLabel: 'gewei', labelMap: 'dingweidan', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
