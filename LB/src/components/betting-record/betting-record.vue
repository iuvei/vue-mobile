<template>
    <div class="wrapper">
      <div class="tabs clear-fix">
        <a class="now-hov" href="javascript:;">我的注单</a>
        <a href="javascript:;">追号方案</a>
      </div>
      <table class="table">
        <tr>
          <th :style="{ 'width': column.width ? column.width + 'px' : ( 1 / columnData.length ) * 100 + '%' }" v-for="(column, index) in columnData" :key="index">{{column.label}}</th>
        </tr>
        <template v-if="dataList.length">
          <tr v-for="(item, index) in dataList" :key="index">
            <td v-for="(itemInner, indexInner) in columnData" :key="indexInner">{{item[itemInner.value]}}</td>
          </tr>
        </template>
      </table>
      <div v-if="!dataList.length" class="no-data">
        <img :src="noDataIcon" alt="noDataIcon">
        <p>您最近7天暂时没有投注记录!</p>
      </div>
    </div>
</template>

<script>
import noDataIcon from '../../statics/img/no_table_data_icon.png'
export default {
  data () {
    return {
      noDataIcon,
      columnData: [
        {
          key: 'cz',
          label: '彩种',
          value: 'cz'
        },
        {
          key: 'wf',
          label: '玩法',
          value: 'wf'
        },
        {
          key: 'qh',
          label: '期号',
          value: 'qh'
        },
        {
          key: 'tznr',
          label: '投注内容',
          value: 'tznr'
        },
        {
          key: 'bs',
          label: '倍数',
          value: 'bs'
        },
        {
          key: 'zs',
          label: '注数',
          value: 'zs'
        },
        {
          key: 'zdje',
          label: '注单金额',
          value: 'zdje'
        },
        {
          key: 'zjje',
          label: '中奖金额',
          value: 'zjje'
        },
        {
          key: 'zdzt',
          label: '注单状态',
          value: 'zdzt'
        },
        {
          key: 'action',
          label: '操作',
          value: 'action'
        }
      ],
      dataList: [/*
        {
          cz: 1,
          wf: 2,
          qh: 3,
          tznr: 4,
          bs: 5,
          zs: 6,
          zdje: 7,
          zjje: 8,
          zdzt: 9
        }
      */]
    }
  }
}
</script>

<style scoped>
  .wrapper {
    padding: 14px 21px 10px 27px;
    margin-top: 18px;
    background-color: #eeeeee;
  }
  .tabs {
    margin-top: 20px;
  }
  .tabs a {
    float: left;
    line-height: 30px;
    text-align: center;
    color: #b8ad8c;
    border: 1px solid #e9e7e4;
    border-bottom: none;
    font-size: 14px;
    background-color: #f6f4f0;
  }
  .tabs a.now-hov {
    background-color: #ffffff;
    position: relative;
  }
  .tabs a.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #38384a;
    top: 1px;
    left: 0;
    border-top: 1px solid #9b9ba4;
  }
  .tabs a:nth-of-type(1) {
    width: 105px;
  }
  .tabs a:nth-of-type(2) {
    width: 108px;
    border-left: none;
  }
  .table tr th,
  .table tr td {
    /*width: 94px;*/
  }
  .table tr td {
    text-align: center;
    line-height: 40px;
  }
  .table {
    width: 100%;
  }
  .table tr th {
    line-height: 42px;
    background-color: #ffffff;
    font-size: 14px;
    color: #8d8d8d;
    font-weight: normal;
    border-top: 1px solid #e8e6e1;
    border-bottom: 1px solid #e8e6e1;
  }
  .table tr th:nth-of-type(1) {
    border-left: 1px solid #e8e6e1;
  }
  .table tr th:nth-last-of-type(1) {
    border-right: 1px solid #e8e6e1;
  }
  .no-data {
    width: 100%;
    padding-top: 18px;
    height: 130px;
    text-align: center;
  }
  .no-data > img {
    margin-bottom: 16px;
  }
  .no-data > p {
    font-size: 10px;
    font-weight: bold;
    color: #999999;
  }
</style>
