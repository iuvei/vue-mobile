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
              <span class="odd">{{item.odd}}</span>
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
import handicapMixins from '../common/handicap-mixins'
export default {
  mixins: [ handicapMixins ],
  data () {
    return {
      numberList: [
        {
          type: '后三',
          isBall: false,
          isOneBall: false,
          lineShowCount: 5,
          numberList: [
            { label: '豹子', labelMap: 'baozi', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
            { label: '顺子', labelMap: 'shunzi', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
            { label: '对子', labelMap: 'duizi', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
            { label: '半顺', labelMap: 'teshu', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
            { label: '杂六', labelMap: 'teshu', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
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
