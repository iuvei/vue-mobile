<template>
    <div class="bet-plate">
      <ul>
        <li v-for="(list, index) in numberList"
            :key="index">
          <h4>{{list.type}}</h4>
          <ul class="clear-fix">
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
        </li>
      </ul>
    </div>
</template>

<script>
import handicapMixins from '../../../../ssc/components/handicap/common/handicap-mixins'
import { handicapAjaxValueConfig } from '../../../../../../config/game-default-config'
export default {
  mixins: [ handicapMixins ],
  data () {
    return {
      numberList: [
        {
          type: '冠亚和',
          isBall: false,
          isOneBall: true,
          labelMap: 'gygzdxds',
          lineShowCount: 4,
          numberList: [
            { label: '3', value: 3, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '4', value: 4, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '5', value: 5, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '6', value: 6, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '7', value: 7, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '8', value: 8, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '9', value: 9, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '10', value: 10, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '11', value: 11, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '12', value: 12, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '13', value: 13, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '14', value: 14, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '15', value: 15, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '16', value: 16, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '17', value: 17, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '18', value: 18, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '19', value: 19, upperLabel: 'gygzdxds', labelMap: 'guangyahezhi', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '冠亚合大', value: 1, upperLabel: 'gygzdxds', labelMap: 'daxiaodanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '冠亚合小', value: 0, upperLabel: 'gygzdxds', labelMap: 'daxiaodanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '冠亚合单', value: 3, upperLabel: 'gygzdxds', labelMap: 'daxiaodanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '冠亚合双', value: 2, upperLabel: 'gygzdxds', labelMap: 'daxiaodanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
 @import "../../../../statics/css/handicap-common.css";
</style>
