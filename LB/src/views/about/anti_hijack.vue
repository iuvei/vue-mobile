<template>
  <div class="anti_hijack">
    <div class="width">
      <div class="title">【立博网】防劫持网址发布器下载地址</div>
      <div class="content">
        <div class="top">
          <div class="logo">
            <img src="../../statics/img/logo_small.png" alt="">
          </div>
          <div class="download">
            <p>Zip文件：</p>
            <a href="#">立博网网址发布器</a>
          </div>
          <div class="beCareful">
            <div>
              <h3>注意：</h3>
              <p>部分安全程式误将<span>“立博网网址发布器”</span>误认为有害程序。</p>
              <h3>立博网郑重声明：</h3>
              <p><span>“立博网网址发布器”仅用于向用户提供最新游戏网址，绝不会对用户系统造成任何影响！</span></p>
            </div>
            <img src="../../statics/img/anti_hijack_icon01.jpg" alt="">
          </div>
        </div>
        <div class="content_title"><i class="el-icon-edit-outline"></i>使用教程说明</div>
        <div id="content" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCmsArticles, GetCmsArticleDetail } from '../../api/userCenter/systemCenter/help-center'
export default {
  name: 'anti_hijack',
  data () {
    return {
      article_id: '',
      content: ''
    }
  },
  methods: {
    GetCmsArticles () {
      GetCmsArticles(13, 20, 1).then(res => {
        if (res.errno === 0) {
          this.article_id = res.data.data[0].id
          this.GetCmsArticleDetail()
        }
        console.log(res)
      })
    },
    // 获取文章详情
    GetCmsArticleDetail () {
      GetCmsArticleDetail(this.article_id).then(res => {
        if (res.errno === 0) {
          this.content = res.data.content
        }
        console.log(res)
      })
    }
  },
  created () {
    this.GetCmsArticles()
  }
}
</script>

<style>
  .anti_hijack{
    background: #0a080d url('../../statics/img/anti_hijack_bg.png') 0 -100px;
    background-size: cover;
    overflow: hidden;
  }
  .anti_hijack .title{
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    line-height: 44px;
    width: 100%;
    height: 44px;
    margin: 40px 0;
  }
  .anti_hijack .content{
    background: #e4e4e4;
    padding: 30px 15px;
  }
  .anti_hijack .top{
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .anti_hijack .top .logo{
    width: 220px;
    border-radius: 8px;
  }
  .anti_hijack .top .logo img{
    width: 100%;
  }
  .anti_hijack .top .download{
    font-size: 15px;
  }
  .anti_hijack .top .download a{
    display: block;
    line-height: 40px;
    height: 40px;
    padding: 0 40px;
    margin-top: 20px;
    margin-bottom: 30px;
    background: linear-gradient(top, #ff7817 0%, #dc5c00 100%);
    border-radius: 40px;
    color: #fff;
  }
  .anti_hijack .top .download a:hover{
    opacity: 0.9;
  }
  .anti_hijack .top .beCareful{
    width: 500px;
    padding: 15px 20px;
    font-size: 15px;
    line-height: 22px;
    font-weight: 300;
    background: #fff;
    border-radius: 10px;
    display: flex;
  }
  .anti_hijack .top .beCareful h3{
    color: #777;
  }
  .anti_hijack .top .beCareful span{
    color: #ff0707;
  }
  .anti_hijack .content_title{
    text-align: center;
    font-size: 29px;
    color: #f17e2e;
  }
  .anti_hijack #content{
    background: #f1f1f1;
    border-radius: 10px;
    padding: 15px;
    margin-top: 20px;
  }
  .anti_hijack #content>h2{
    text-align: center;
    color: #000000;
    background-color: #d6d6d6;
    font-size: 19px;
    line-height: 28px;
    padding: 10px;
  }
  .anti_hijack #content p{
    color: #777;
    font-size: 16px;
    line-height: 20px;
    padding: 12px;
  }
  @media screen and (max-width: 1000px){
    .anti_hijack #content p img{
      width: 100%;
    }
  }
</style>
