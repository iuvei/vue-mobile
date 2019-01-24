<template>
  <div class="date-time-picker">
    <div class="block">
      <div class="demonstration">日期</div>
      <el-date-picker
        v-model="beginDate"
        type="datetime"
        prefix-icon="el-icon-date"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="block">
      <div class="demonstration">至</div>
      <el-date-picker
        v-model="endDate"
        type="datetime"
        prefix-icon="el-icon-date"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'date-time-picker',
  data () {
    return {
      beginDate: this.begin_date, // 开始日期
      endDate: this.end_date, // 结束日期
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7 + 3600 * 1000 * 24
        }
      }
    }
  },
  props: ['begin_date', 'end_date'],
  created () {
    this.beginDate = this.getTime(0) + ' 00:00:00'
    this.endDate = this.getTime(0) + ' 23:59:59'
  },
  methods: {
    getTime (e) {
      return (function (e) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * e)
        return date.Format('yyyy-MM-dd')
      })(e)
    }
  },
  watch: {
    begin_date (value) {
      this.beginDate = value
    },
    beginDate (value) {
      this.$emit('update:begin_date', value)
    },
    end_date (value) {
      this.endDate = value
    },
    endDate (value) {
      this.$emit('update:end_date', value)
    }
  }
}
</script>

<style scoped>
  .date-time-picker{
    display: flex;
  }
  .block{
    float: left;
    color: #777;
    margin-right: 10px;
  }
  .demonstration{
    height: 25px;
    line-height: 25px;
    font-weight: 300;
  }
  .el-input{
    height: 40px;
    width: 200px;
  }
  .block .el-date-editor .el-input__prefix .el-icon-date:before {
    font-size: 26px;
  }
</style>
