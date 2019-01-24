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
          type: '总和',
          isBall: false,
          isOneBall: true,
          labelMap: 'zonghe',
          lineShowCount: 4,
          numberList: [
            { label: '总和大', value: 1, upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和小', value: 0, upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和单', value: 3, upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总和双', value: 2, upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
            // todo: 未获取到正确数据 暂注 待后台补全数据后修改页面展示
            /* { label: '总大单', upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总大双', upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总小单', upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '总小双', upperLabel: 'zonghe', labelMap: 'zonghe-dxds', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 } */
          ]
        },
        {
          type: '上下盘',
          isBall: false,
          isOneBall: true,
          labelMap: 'zonghe',
          lineShowCount: 4,
          numberList: [
            { label: '上', value: 2, upperLabel: 'zonghe', labelMap: 'shangxia', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '中', value: 1, upperLabel: 'zonghe', labelMap: 'shangxia', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '下', value: 0, upperLabel: 'zonghe', labelMap: 'shangxia', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
          ]
        },
        {
          type: '奇偶盘',
          isBall: false,
          isOneBall: true,
          labelMap: 'zonghe',
          lineShowCount: 4,
          numberList: [
            { label: '奇', value: 1, upperLabel: 'zonghe', labelMap: 'jiou', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '和', value: 2, upperLabel: 'zonghe', labelMap: 'jiou', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 },
            { label: '偶', value: 0, upperLabel: 'zonghe', labelMap: 'jiou', odd: 0, betCount: '', maxCount: 0, wayId: '', price: '', prize: '', coefficient: handicapAjaxValueConfig.coefficientEven, maxOdd: 0 }
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
