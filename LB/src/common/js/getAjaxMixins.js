import { mapGetters } from 'vuex'
import { SET_IS_FIRST_ENTER } from '../../store/nameSpace'

export const getAjaxMixins = {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isFirstEnter'
    ])
  },
  created () {
    if (this.isFirstEnter) {
      if (!this.menuList) return this.$router.push('/index')
      this.$loadingShow()
      Promise.all([
        this.$store.dispatch('getCurrentIssue'),
        this.$store.dispatch('getBetSettings'),
        this.$store.dispatch('getLastWnNumberList', { firstEnter: true }),
        this.$store.dispatch('getAvailablePrizeGroups'),
        this.$store.dispatch('getNowGameDetail', this.lotteryId)
      ])
        .then(() => {
          this.$store.commit(SET_IS_FIRST_ENTER, false)
          this.$loadingHide()
        })
    }
  },
  beforeDestroy () {
    // this.$store.commit(SET_IS_FIRST_ENTER, true)
  }
}
