<template>
    <div class="bet-plate">
      <ul>
        <li v-for="(list, index) in numberList"
            :style="{ 'paddingLeft': (4 - list.nodeList.length) * 211.75 / 2 + 'px' }"
            class="clear-fix"
            :key="index">
          <div v-for="(itemInner, indexInner) in list.nodeList"
               :key="indexInner"
               class="plate-item">
            <h4>{{itemInner.type}}</h4>
            <ul class="clear-fix">
              <li class="clear-fix"
                  @click="clickChoiceItem($event, item)"
                  v-for="(item, indexInner) in itemInner.numberList"
                  :class="{ 'selected': item.betCount !== '' }"
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
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import handicapLonghuMixins from '../common/handicap-longhu-mixins'
export default {
  mixins: [ handicapLonghuMixins ],
  data () {
    return {
      numberList: [
        {
          type: '第一球',
          isBall: true,
          isOneBall: true,
          lineShowCount: 5,
          nodeList: [
            {
              type: '第一球VS第二球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', ownLabel: '第一球VS第二球', showOwnLabel: true, labelMap: 'wq', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', ownLabel: '第一球VS第二球', showOwnLabel: true, labelMap: 'wq', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', ownLabel: '第一球VS第二球', showOwnLabel: true, labelMap: 'wq', odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            },
            {
              type: '第一球VS第三球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'wb', ownLabel: '第一球VS第三球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'wb', ownLabel: '第一球VS第三球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'wb', ownLabel: '第一球VS第三球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            },
            {
              type: '第一球VS第四球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'ws', ownLabel: '第一球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'ws', ownLabel: '第一球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'ws', ownLabel: '第一球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            },
            {
              type: '第一球VS第五球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'wg', ownLabel: '第一球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'wg', ownLabel: '第一球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'wg', ownLabel: '第一球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            }
          ]
        },
        {
          type: '第二球',
          isBall: true,
          isOneBall: true,
          lineShowCount: 5,
          nodeList: [
            {
              type: '第二球VS第三球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'qb', ownLabel: '第二球VS第三球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'qb', ownLabel: '第二球VS第三球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'qb', ownLabel: '第二球VS第三球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            },
            {
              type: '第二球VS第四球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'qs', ownLabel: '第二球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'qs', ownLabel: '第二球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'qs', ownLabel: '第二球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            },
            {
              type: '第二球VS第五球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'qg', ownLabel: '第二球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'qg', ownLabel: '第二球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'qg', ownLabel: '第二球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            }
          ]
        },
        {
          type: '第三球',
          isBall: true,
          isOneBall: true,
          lineShowCount: 5,
          nodeList: [
            {
              type: '第三球VS第四球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'bs', ownLabel: '第三球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'bs', ownLabel: '第三球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'bs', ownLabel: '第三球VS第四球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            },
            {
              type: '第三球VS第五球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'bg', ownLabel: '第三球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'bg', ownLabel: '第三球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'bg', ownLabel: '第三球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
              ]
            }
          ]
        },
        {
          type: '第四球',
          isBall: true,
          isOneBall: true,
          lineShowCount: 5,
          nodeList: [
            {
              type: '第四球VS第五球',
              isBall: false,
              isOneBall: true,
              lineShowCount: 1,
              numberList: [
                { label: '龙', labelMap: 'sg', ownLabel: '第四球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '虎', labelMap: 'sg', ownLabel: '第四球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' },
                { label: '和', labelMap: 'sg', ownLabel: '第四球VS第五球', showOwnLabel: true, odd: 1.999, betCount: '', maxCount: 0, wayId: '', price: '', prize: '' }
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
  /* .bet-plate begin */
  .bet-plate {
    margin-top: 20px;
  }
  .bet-plate > ul:nth-of-type(1) {}
  .bet-plate > ul:nth-of-type(1) > li .plate-item {
    float: left;
    width: 211.75px;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > h4 {
    width: 100%;
    height: 23px;
    line-height: 23px;
    background-color: #ff9100;
    font-weight: normal;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul {
    padding: 10px 0 3px 0;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li {
    padding: 5px 5px;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li.selected{
    background-color: #eee4b2;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li > .bet-label {
    float: left;
    width: 28%;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li > .bet-label > .ball {
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 14px;
    background: linear-gradient(to right, #d5d5d5, #e7e7e7, #d5d5d5);
    border: 1px solid #ababab;
    line-height: 26px;
    text-align: center;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li > .odd {
    float: left;
    height: 28px;
    line-height: 26px;
    font-size: 16px;
    color: #ee0000;
    text-align: center;
    width: 32%;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li > .bet-count {
    float: right;
    width: 40%;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li > .bet-count input {
    width: 100%;
    height: 26px;
    border-radius: 5px;
    font-size: 16px;
    border: 1px solid #b2b2b2;
    background: #eeeeee;
    text-align: center;
    font-weight: bold;
    color: #ee0000;
  }
  .bet-plate > ul:nth-of-type(1) > li .plate-item > ul > li > .bet-count input:focus {
    border: 1px solid #ee0000;
  }
  /* .bet-plate end */
</style>
