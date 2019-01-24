<template>
    <div class="help-center">
      <div class="width">
        <router-link :to="{name: 'help-center'}" style="position: relative;top: -24px;left: 60px;">帮助中心</router-link>
        <div class="title">{{title}}</div>
        <div class="content">
          <div v-for="(item, index) in list" :key="index">
            <div>
              <div class="left">
              <div class="logo">
                <i class="iconfont" :class="item.icon"></i>
              </div>
            </div>
            <div class="right">
              <dl>
                <dt>{{item.title}}</dt>
                <dd>
                <router-link
                  tag="p"
                  :to="{name: 'help-center-details', query:{title: item.title, id: items.id, icon: item.icon}}"
                  v-for="(items, index_s) in item.list"
                  :key="index_s">{{items.title}}</router-link>
                </dd>

              </dl>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {GetCmsCategories, GetCmsArticles} from '../../api/userCenter/systemCenter/help-center.js'
export default {
  name: 'help-center',
  data () {
    return {
      list: [],
      title: ''
    }
  },
  methods: {
    GetCmsCategories () {
      this.$loadingShow()
      GetCmsCategories('help')
        .then(res => {
          let helpCenterList = res.data[0].list
          let arr = []
          if (res.errno === 0) {
            this.title = res.data[0].name
            helpCenterList.forEach((element, index) => {
              switch (element.name) {
                case '充值问题':
                  helpCenterList[index].icon = 'icon-card'
                  break
                case '提现问题':
                  res.data[0].list[index].icon = 'icon-card'
                  break
                case '彩票问题':
                  res.data[0].list[index].icon = 'icon-jiugongge'
                  break
                case '彩票以外产品':
                  res.data[0].list[index].icon = 'icon-iconfontyouxihudong'
                  break
                case '新手专区':
                  res.data[0].list[index].icon = 'icon-user'
                  break
                case '代理专区':
                  res.data[0].list[index].icon = 'icon-tuandui2'
                  break
              }
              // console.log('文字标题', helpCenterList)
              GetCmsArticles(element.id, 5)
                .then(data => {
                  // console.log(`${element.name}:`, data.data.data)
                  arr.push({
                    title: element.name,
                    id: element.id,
                    list: data.data.data,
                    index: index,
                    icon: element.icon
                  })
                  Promise.all(arr)
                    .then(arrs => {
                      this.$loadingHide()
                      // console.log('1', arrs)
                      arrs.sort((a, b) => a.index - b.index)
                      this.list = arrs
                    })
                })
                .catch(err => {
                  console.error(err)
                })
            })
            // console.log(this.list.sort((a, b) => +a.index - +b.index))
            // console.log(arr.sort((a, b) => a.index - b.index))
            // this.list = this.list.sort((a, b) => +a.index - +b.index)
          }
          // console.log('文章列表:', res)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.GetCmsCategories()
  }
}
</script>

<style>
  @import "../../statics/css/common.js.css";
  @media screen and (max-width: 981px){
    .help-center .width .content>div{
      width:50% !important;
    }
  }
  @media screen and (max-width: 767px){
    .help-center .width .content>div{
      width:100% !important;
    }
  }
.help-center{
  background: #39384a;
  width: 100%;
  min-height: calc(100vh - 294px);
}
.help-center .width>.title{
  padding: 0 33px;
  height: 68px;
  background: url('../../statics/img/help_center_title_bg.jpg');
  background-size: 100% 100%;
  font-size: 33px;
  font-weight: 600;
  line-height: 68px;
  color: black;
}
.help-center .width .content{
  width: 100%;
  min-height: calc(100vh - 362px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background: #ffffff;
  padding-bottom: 50px;
}
.help-center .width .content>div{
  width: 33.3%;
}
.help-center .width .content>div>div{
  padding:25px;
  width: 311px;
  height: 218px;
  display: flex;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
  /* margin-top: 50px; */
  margin: 50px auto 0;
}
.help-center .width .content .left{
  width: 25%;
}
.help-center .width .content .left .logo{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #4babbf;
  border-color: #4babbf;
  text-align: center;
  line-height: 50px
}
  .help-center .width .content .left .logo i{
    color: white;
    font-size: 28px;
  }
.help-center .width .content .right{
  width: 75%;
}
.help-center .width .content .right dl{
  width: 100%;
  overflow: hidden;
}
.help-center .width .content .right dl dt{
  font-size: 24px;
  line-height: 40px;
  border-bottom: 1px solid #f1f1f1;
  color: #333333;
}
.help-center .width .content .right dl p{
  border-bottom: 1px solid #f1f1f1;
  color: #4babbf;
  line-height: 30px;
  cursor: pointer;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
