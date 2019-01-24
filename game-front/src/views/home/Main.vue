<template>
  <section>
    <!--查询条件-->
    <el-row :gutter="20" class="state-overview">
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques1">
            <i class="fa iconfont icon-money"></i>
          </div>
          <div class="value value-sum">
            <h1 class="count">912,876,852.00</h1>
            <div class="sub">游戏：<span>876,852.00</span></div>
            <div class="sub">抽水：<span>912,852.00</span></div>
            <p>今日总收益</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques2">
            <i class="fa iconfont icon-zhuanru"></i>
          </div>
          <div class="value">
            <h1 class="count">777,876,852.00</h1>
            <p>今日总转入</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques8">
            <i class="fa iconfont icon-zhuanchu"></i>
          </div>
          <div class="value">
            <h1 class="count">123,876,852.00</h1>
            <p>今日总转出</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques4">
            <i class="fa iconfont icon-ren"></i>
          </div>
          <div class="value">
            <h1 class="count">12,876,852</h1>
            <p>今日游戏总人数</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques5">
            <i class="fa iconfont icon-peoples"></i>
          </div>
          <div class="value">
            <h1 class="count">12,876,852</h1>
            <p>当月活跃玩家总数</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques6">
            <i class="fa iconfont icon-dashangcishu"></i>
          </div>
          <div class="value">
            <h1 class="count">912,876,852</h1>
            <p>当月总有效投注次数</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques7">
            <i class="fa iconfont icon-tuiguangzhuanqian"></i>
          </div>
          <div class="value">
            <h1 class="count">912,876,852.00</h1>
            <p>当月总有效投注额</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="symbol terques3">
            <i class="fa iconfont icon-zhuanqian"></i>
          </div>
          <div class="value">
            <h1 class="count">912,876,852.00</h1>
            <p>当月总盈利</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-col :span="6" style="font-size: 20px;">
          游戏统计（前十)
        </el-col>
        <el-radio-group v-model="date" style="margin-bottom: 10px;float: right;" @change="dateChange">
          <el-radio-button label="day">今日</el-radio-button>
          <el-radio-button label="week">本周</el-radio-button>
          <el-radio-button label="month">本月</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="24">
        <!--列表-->
        <el-table :data="lists" highlight-current-row v-loading="listLoading" style="width: 100%;" :stripe="true" size="small">
          <el-table-column prop="gameName" label="游戏名称" align="center">
          </el-table-column>
          <el-table-column prop="gamePlayers" label="游戏人数" align="center">
          </el-table-column>
          <el-table-column prop="money1" label="总有效投注额" align="center">
          </el-table-column>
          <el-table-column prop="money2" label="系统抽水总额" align="center">
          </el-table-column>
          <el-table-column prop="money3" label="盈亏额" align="center">
          </el-table-column>
          <el-table-column prop="money4" label="总盈利" align="center">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { getGameStatistics } from '../../api/api';

export default {
  data() {
    return {
      lists: [],
      total: 0,
      page: 1,
      size: 20,
      listLoading: false,
      date: 'day'
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableList();
    },
    getTableList() {
      let para = {
        page: this.page,
        size: this.size
      };
      this.listLoading = true;
      getGameStatistics(para).then((res) => {
        this.total = res.data.total;
        this.lists = res.data.lists;
        this.listLoading = false;
      });
    },
    dateChange() {
      this.getTableList();
    }

  },
  created() {
    this.getTableList();
  },
  mounted() {
    // this.getTableList();
  }
}

</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;

}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.state-overview {
  .el-col {
    margin-bottom: 20px;
  }

  .card {
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;

    background: #fff;
  }

  .terques1 {
    background: #6ccac9;
  }

  .terques2 {
    background: #dc3545;
  }

  .terques3 {
    background: #ffc107;
  }

  .terques4 {
    background: #17a2b8;
  }

  .terques5 {
    background: #6c757d;
  }

  .terques6 {
    background: #6f42c1;
  }

  .terques7 {
    background: #007bff;
  }

  .terques8 {
    background: #a9d96c;
  }

  .symbol {
    width: 30%;
    padding: 25px 15px;
    -webkit-border-radius: 4px 0px 0px 4px;
    border-radius: 4px 0px 0px 4px;

    i {
      color: #fff;
      font-size: 50px;
    }
  }

  .symbol,
  .value {
    text-align: center;
  }

  .value {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6d6d6d;

    h1 {
      font-size: 24px;

      span {
        font-size: 16px;
      }
    }

    p {
      font-size: 18px;
    }

    .sub {
      font-size: 16px;
    }
  }
}

.state-overview.el-row {
  background: #f1f2f7;
  padding: 20px 10px 0 10px;

}

</style>
