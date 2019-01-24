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
          type: '特码大小单双',
          isBall: false,
          isOneBall: true,
          labelMap: 'temadxds',
          lineShowCount: 4,
          numberList: [
            { label: '特大', value: 0, upperLabel: 'temadxds', labelMap: 'temadaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特小', value: 1, upperLabel: 'temadxds', labelMap: 'temadaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特单', value: 1, upperLabel: 'temadxds', labelMap: 'temadanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特双', value: 0, upperLabel: 'temadxds', labelMap: 'temadanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特尾大', value: 0, upperLabel: 'temadxds', labelMap: 'teweidaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特尾小', value: 1, upperLabel: 'temadxds', labelMap: 'teweidaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        },
        {
          type: '特码和值',
          isBall: false,
          isOneBall: false,
          labelMap: 'temadxds',
          lineShowCount: 4,
          numberList: [
            // todo : 特码和值大小单双玩法待后台补全后释放该注释
            // { label: '特大双', value: 1, upperLabel: 'temadxds', labelMap: 'zhdxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            // { label: '特大单', value: 0, upperLabel: 'temadxds', labelMap: 'zhdxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特合大', value: 0, upperLabel: 'temadxds', labelMap: 'tehedaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特合小', value: 1, upperLabel: 'temadxds', labelMap: 'tehedaxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特合单', value: 1, upperLabel: 'temadxds', labelMap: 'tehedanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '特合双', value: 0, upperLabel: 'temadxds', labelMap: 'tehedanshuang', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        },
        {
          type: '生肖',
          isBall: false,
          isOneBall: false,
          labelMap: 'temashengxiao',
          lineShowCount: 4,
          numberList: [
            { label: '鼠', value: 0, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '牛', value: 1, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '虎', value: 2, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '兔', value: 3, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '龙', value: 3, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '蛇', value: 4, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '马', value: 0, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '羊', value: 1, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '猴', value: 2, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '鸡', value: 3, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '狗:本命', value: 3, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '猪', value: 4, upperLabel: 'temashengxiao', labelMap: 'temashengxiao', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
