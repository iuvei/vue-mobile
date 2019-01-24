<template>
    <div class="activity-center">
      <div class="banner"></div>
      <div class="width">
        <router-link :to="{name: 'activity-center'}" class="title">活动中心</router-link>
        <activity-list-item v-for="(item, index) in list" :key="index"
                            :startDate="item.startDate"
                            :endDate="item.endDate"
                            :btn-url="item.url"
                            :title="item.title"
                            :BGIMG="item.imgUrl"></activity-list-item>
      <div class="page">
        <pagination :pageDate="pageDate" @jump="pageChenge"></pagination>
      </div>
      </div>
    </div>
</template>

<script>
import {getValidEvents} from '../../api/userCenter/systemCenter/activity-center'
import activityListItem from './components/activity-list-item'
import Pagination from '../../components/user-center/pagination'
export default {
  name: 'activity-center',
  components: {Pagination, activityListItem},
  data () {
    return {
      list: [
        {
          title: '菲达国际公测庆典 挑战赌神',
          startDate: '2018-09-27 04:00:00',
          endDate: '2018-09-27 04:00:00',
          url: '',
          imgUrl: require('../../statics/img/event_head.png')
        },
        {title: '123123'}
      ],
      page: 1,
      pageSize: 5,
      pageDate: {
        page: '1',
        pageCount: 1,
        pagesize: '1',
        totalCount: 1
      }
    }
  },
  methods: {
    getList: function () {
      let arr = []
      getValidEvents(this.page, this.pageSize)
        .then(data => {
          this.$loadingHide()
          data.data.data.forEach((item, index) => {
            arr.push({
              title: item.title,
              startDate: item.start_time,
              endDate: item.end_time,
              imgUrl: item.android_pic,
              url: item.pc_des
            })
          })
          if (data.data.data.length === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = data.data.page_count
          }
          this.pageDate.page = data.data.page
          this.pageDate.pagesize = data.data.pagesize
          this.pageDate.totalCount = data.data.total_count
          this.list = arr
        })
        .catch(err => console.error(err))
    },
    pageChenge (e) {
      this.page = e
      this.$loadingShow()
      this.getList()
    }
  },
  mounted () {
    this.$loadingShow()
    this.getList()
  }
}
</script>

<style scoped>
  @import "../../statics/css/common.js.css";
  .title{
    position: relative;
    top: -205px;
    left: 60px;
    /*margin-top: -24px;*/
    /*margin-left: 60px;*/
    color: #777;
  }
.activity-center{
width: 100%;
  background: #777777;
}
  .activity-center .banner{
    width: 100%;
    height: 180px;
    background: url("../../statics/img/event_head.png") no-repeat;
    background-size: 100% 100%;
  }
  .activity-center .width .page{
    background-color: white;
  }
</style>
