<template>
  <transition name="fade-in-linear">
    <div v-if="show" class="wrapper">
      <div class="container">
        <a href="javascript:;" @click="show = false">
          <img :src="closeIcon" alt="closeIcon">
        </a>
        <div class="title">快选金额</div>
        <div class="content">
          <p class="tips">
            注意：设置只保存在您的电脑，清空浏览器缓存或 更换电脑会显示默认值。
          </p>
          <div class="default-amount-list">
            <div class="default-amount-item"
                 :key="item.key"
                 v-for="item in amountArr">
              <input type="text"
                     @input="checkInputSelectAmount(item)"
                     v-model="item.value">
              <a @click="clearAmount(item)" href="javascript:;">清空</a>
            </div>
          </div>
          <div class="btns">
            <a @click="saveDefaultAmountArr" href="javascript:;">提交</a>
            <a href="javascript:;" @click="show = false">取消</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'
import { alertMixin } from '../mixin'
import { mapGetters } from 'vuex'
import { SET_SELECT_DEFAULT_DATA, SET_HANDICAP_CHOICE_WAY } from '../../../store/nameSpace'

export default {
  name: 'kxje-alert',
  mixins: [ alertMixin ],
  data () {
    return {
      closeIcon,
      name: 'kxje-alert',
      bonusGroup: '',
      multiple: 0,
      defaultAmount01: 5,
      amountArr: []
    }
  },
  computed: {
    ...mapGetters([
      'quickSelectAmountData'
    ])
  },
  methods: {
    clearAmount (item) {
      item.value = ''
    },
    checkInputSelectAmount (item) {
      item.value = item.value.replace(/[^(\d)]/g, '')
    },
    saveDefaultAmountArr () {
      if (
        this.amountArr.find(item => {
          return !Number.isInteger(+item.value)
        })
      ) {
        return this.$message({
          message: '您输入的号码有误, 请重新输入!',
          type: 'error'
        })
      }
      this.$store.commit(
        SET_SELECT_DEFAULT_DATA,
        this.amountArr.map(item => {
          return item.value
        })
      )
      this.show = false
      this.$message({
        message: '保存成功!',
        type: 'success'
      })
    }
  },
  watch: {
    show (val) {
      if (!val) this.$store.commit(SET_HANDICAP_CHOICE_WAY, 0)
    }
  },
  created () {
    this.$set(this, 'amountArr', [])
    this.quickSelectAmountData.map((item, index) => {
      this.amountArr.push({
        key: index,
        value: item
      })
    })
  },
  mounted () {
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 99;
    left: 0;
    right: 0;
    background: url("../../../statics/img/game_alert_wrapper_bg.png");
    background-size: 100% 100%;
    /*filter: blur(10px)*/
  }
  .container {
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    position: absolute;
    left: 50%;
    top: 150px;
    transform: translateX(-50%);
    width: 299px;
    background-color: #ffffff;
  }
  .container > a:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 22px;
  }
  .container .title {
    height: 56px;
    line-height: 56px;
    padding-left: 27px;
    font-size: 18px;
    color: #fff;
    background-color: #616078;
  }
  .container .content {
    padding: 15px 19px 19px 17px;
  }
  .container .content p.tips {
    color: #f17e2e;
    line-height: 20px;
    font-size: 12px;
    margin-bottom: 24px;
  }
  .default-amount-list .default-amount-item {
    width: 205px;
    margin: 0 auto 10px auto;
  }
  .default-amount-list .default-amount-item > input {
    width: 150px;
    border: 1px solid #a9a9a9;
    text-align: center;
    height: 28px;
    color: #ff0000;
  }
  .default-amount-list .default-amount-item > a {
    display: inline-block;
    width: 50px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background-color: #f17e2e;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
  }
  .content .btns {
    width: 124px;
    height: 31px;
    margin: 28px auto 0 auto;
  }
  .content .btns > a {
    float: left;
    height: 100%;
    width: 60px;
    line-height: 31px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
  .content .btns > a:nth-of-type(1) {
    background-color: #4babbf;
  }
  .content .btns > a:nth-of-type(2) {
    background-color: #959595;
    margin-left: 4px;
  }
</style>

<style>
</style>
