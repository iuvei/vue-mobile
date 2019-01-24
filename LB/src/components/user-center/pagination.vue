<template>
  <div class="pagination">
    <ul>
      <li class="btn home-page" @click="jump(-2)">
        <span></span>
        <i class="el-icon-caret-left"></i>
      </li>
      <li class="btn" @click="jump(-1)">
        <i class="el-icon-caret-left"></i>
      </li>
      <li class="jump">
        <span>第</span>
        <el-input-number
          size="mini"
          v-model="pageDate.page"
          :controls="false"
          :min="1"
          :max="pageDate.pageCount"
          @keyup.enter="handleChange"
          @change="handleChange">
        </el-input-number>
        <span>/{{pageDate.pageCount}}页</span>
      </li>
      <li class="btn" @click="jump(1)">
        <i class="el-icon-caret-right"></i>
      </li>
      <li class="btn tail-page" @click="jump(2)">
        <span></span>
        <i class="el-icon-caret-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['pageDate'],
  updated () {
  },
  methods: {
    jump (e) {
      let pageNum = 1
      if (e === -1 && this.pageDate.page > 1) {
        pageNum = this.pageDate.page - 1
        this.$emit('jump', pageNum)
      }
      if (e === 1 && this.pageDate.page < this.pageDate.pageCount) {
        pageNum = this.pageDate.page + 1
        this.$emit('jump', pageNum)
      }
      if (e === -2 && this.pageDate.pageCount > 1 && this.pageDate.page > 1) {
        pageNum = 1
        this.$emit('jump', pageNum)
      }
      if (e === 2 && this.pageDate.pageCount > 1 && this.pageDate.page < this.pageDate.pageCount) {
        pageNum = this.pageDate.pageCount
        this.$emit('jump', pageNum)
      }
    },
    handleChange (val) {
      this.$emit('jump', val)
    }
  }
}
</script>

<style scoped>
  .pagination{
    width: 100%;
    height: 100px;
  }
  .pagination ul{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination ul .btn{
    width: 40px;
    height: 30px;
    margin: 0 3px;
    border-radius: 5px;
    background: #eb7e00;
    text-align: center;
    line-height: 30px;
    font-size: 25px;
    color: #fff;
    position: relative;
    cursor: pointer;
  }
  .pagination ul .jump{
    color: #777;
    letter-spacing: 3px;
  }
  .pagination ul .btn:hover{
    background: #EC6300;
  }
  .home-page span{
    display: inline-block;
    width: 2px;
    height: 16px;
    position: absolute;
    top: 7px;
    left: 12px;
    background: #fff;
  }
  .tail-page span{
    display: inline-block;
    width: 2px;
    height: 16px;
    position: absolute;
    top: 7px;
    right: 12px;
    background: #fff;
  }
  .el-input-number{
    width: 50px;
    height: 28px;
  }
</style>
