<template>
    <div>
      <!--<H5head v-if="$store.state.common.device === 'H5'"></H5head>-->
      <!--<top v-if="$store.state.common.device === 'PC'"></top>-->
      <!--<side-bar v-if="$store.state.common.device === 'PC'"></side-bar>-->
      <!--<main-header v-if="$store.state.common.device === 'PC'"></main-header>-->
      <div class="game_main">
        <router-view></router-view>
        <audio :src="prizeVoicePath"
               ref="voice"
               id="game-audio">
        </audio>
      </div>
      <!--<main-footer></main-footer>-->
    </div>
</template>

<script>
import top from '../main/components/top_2018_8_29'
import mainHeader from '../main/components/header_18_8_29'
import mainFooter from '../main/components/footer_18_8_29'
import sideBar from '../side-bar/side-bar'
import { openVoice } from '../../config/audio-config'
import { mapGetters } from 'vuex'
import { SET_STOP_VOICE_END, SET_STOP_VOICE_END_TWO } from '../../store/nameSpace'
import H5head from '../main/components/h5Heder'

export default {
  components: { H5head, top, mainHeader, mainFooter, sideBar },
  data () {
    return {
      prizeVoice: '',
      openNumber: [],
      VioceFlag: false,
      openPromptVoice: 2
    }
  },
  methods: {
    toggleSound () {
      var music = this.$refs.voice
      if (music.paused) {
        music.paused = false
        music.play()
      }
    }
  },
  computed: {
    ...mapGetters({}),
    ...mapGetters([
      'szcpMenuList',
      'gameDetail',
      'prizeVoicePath',
      'sscAwardInfo',
      'stopVoiceEnd',
      'stopVoiceEndTwo',
      'sscLastWnNumber',
      'nowScreenStatus',
      'lotteryId',
      'defaultSetting'
    ])
  },
  watch: {
    nowScreenStatus (val) {
      console.log(val)
    },
    '$route.params': {
      deep: true,
      handler (val, oldVal) {
        this.$store.dispatch('clearSelectedBalls')
        const { gameTypeName } = val
        const { gameTypeName: oldGameTypeName } = oldVal
        const { identifier } = this.gameDetail
        if (identifier === gameTypeName) return
        if (gameTypeName === oldGameTypeName) return
        let flag
        let lotteryId
        for (let key in this.szcpMenuList) {
          if (flag) break
          for (let keyInner in this.szcpMenuList[key]['lotteries']) {
            if (flag) break
            if (this.szcpMenuList[key]['lotteries'][keyInner]['identifier'] === gameTypeName) {
              lotteryId = keyInner
              flag = true
            }
          }
        }
        if (!lotteryId) return
        this.$store.dispatch('playTypeGame', { lotteryId, isJump: true })
      }
    },
    sscAwardInfo: {
      handler (val, oldVal) {
        if (this.openPromptVoice === 1) {
          if (val['end_time'] - oldVal['server_time'] <= 1000) {
            // console.log(this.VioceFlag)
            if (this.VioceFlag) return
            let audios = this.$refs.voice
            // 奖期时间结束 开始播报封单语音
            audios.src = this.prizeVoicePath
            audios.play()
            this.$store.commit(SET_STOP_VOICE_END, true)
            var _this = this
            let mylotteryId
            typeof this.lotteryId === 'number' ? mylotteryId = this.lotteryId.toString() : mylotteryId = this.lotteryId
            // console.log(mylotteryId)
            // 封单的时间为5s
            if (mylotteryId === '37' || mylotteryId === '54' || mylotteryId === '51' || mylotteryId === '40' || mylotteryId === '39' ||
              mylotteryId === '42' || mylotteryId === '59' || mylotteryId === '41' || mylotteryId === '50' || mylotteryId === '57') {
              _this.$store.commit(SET_STOP_VOICE_END, true)
              _this.$store.commit(SET_STOP_VOICE_END_TWO, true)
              console.log('不用播放开奖语音')
            } else {
              audios.addEventListener('ended', function () {
                console.log('封单语音播报完毕')
                _this.$store.commit(SET_STOP_VOICE_END, false)
              })
            }
            /* audios.addEventListener('ended', function () {
              console.log('封单语音播报完毕')
              if (mylotteryId === '37' || mylotteryId === '54' || mylotteryId === '51' || mylotteryId === '40' || mylotteryId === '39' ||
                mylotteryId === '42' || mylotteryId === '59' || mylotteryId === '41' || mylotteryId === '50' || mylotteryId === '57') { // 开奖号码有大于11的号码的彩种不播号
                _this.$store.commit(SET_STOP_VOICE_END, true)
                _this.$store.commit(SET_STOP_VOICE_END_TWO, true)
                console.log('不用播放开奖语音')
              } else {
                _this.$store.commit(SET_STOP_VOICE_END, false)
              }
            }) */
            this.VioceFlag = true
          }
        }
      },
      deep: true
    },
    sscLastWnNumber (val, old) {
      // console.log(val)
      this.openNumber = val['wn_number']
      // console.log(this.openNumber)
    },
    stopVoiceEnd (val) {
      if (val || this.openPromptVoice === 0) return
      let mylotteryId
      typeof this.lotteryId === 'number' ? mylotteryId = this.lotteryId.toString() : mylotteryId = this.lotteryId
      if (mylotteryId === '37' || mylotteryId === '54' || mylotteryId === '51' || mylotteryId === '40' || mylotteryId === '39' ||
        mylotteryId === '42' || mylotteryId === '59' || mylotteryId === '41' || mylotteryId === '50' || mylotteryId === '57') {
        this.$store.commit(SET_STOP_VOICE_END_TWO, true)
      }
      // console.log('监听第一个 开关1' + val)
      // console.log('监听第一个 开关2' + this.stopVoiceEndTwo)
      if (!val && !this.stopVoiceEndTwo) {
        console.log('现在是播放开奖语音时间')
        var audio = this.$refs.voice
        setTimeout(() => {
          openVoice(audio, this.openNumber, this.lotteryId)
        }, 1000)
        this.VioceFlag = false
      }
    },
    stopVoiceEndTwo (val) {
      if (val || this.openPromptVoice === 0) return
      let mylotteryId
      typeof this.lotteryId === 'number' ? mylotteryId = this.lotteryId.toString() : mylotteryId = this.lotteryId
      if (mylotteryId === '37' || mylotteryId === '54' || mylotteryId === '51' || mylotteryId === '40' || mylotteryId === '39' ||
        mylotteryId === '42' || mylotteryId === '59' || mylotteryId === '41' || mylotteryId === '50' || mylotteryId === '57') {
        this.$store.commit(SET_STOP_VOICE_END, true)
      }
      // console.log('监听第二个 开关1' + this.stopVoiceEnd)
      // console.log('监听第二个 开关2' + val)
      if (!val && !this.stopVoiceEnd) {
        console.log('现在是播放开奖语音时间')
        var audio = this.$refs.voice
        console.log(this.openNumber)
        setTimeout(() => {
          openVoice(audio, this.openNumber, this.lotteryId)
        }, 1000)
      }
      this.VioceFlag = false
    },
    defaultSetting (val) {
      this.openPromptVoice = val['open_prompt_voice']
    }
  },
  mounted () {
    // this.$gameAlertZhtz()
    // this.$gameAlertQrzdxx()
    // this.$gameAlertKxje()
    // this.$gameAlertKszh()
    // this.$gameAlertSyyx()
    // this.$gameAlertZdxq()
    // this.$gameAlertFqgd()
  },
  created () {
    this.$store.dispatch('getBetSettings')
  }
}
</script>

<style scoped>
  .game_main {
    background-color: #38384a;
    min-height: 722px;
    /*padding-bottom: 30px;*/
  }
</style>
