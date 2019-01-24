import { mapGetters } from 'vuex'
import { SET_SSC_SELECTED_COUNTS } from '../../../store/nameSpace'

export default {
  computed: {
    ...mapGetters([
      'clearFlag'
    ])
  },
  watch: {
    clearFlag () {
      this.userInputBet = ''
      this.selectedCounts = 0
      this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
    }
  },
  methods: {
    clearUserInputBet () {
      this.userInputBet = ''
      this.selectedCounts = 0
      this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
    }
  }
}
