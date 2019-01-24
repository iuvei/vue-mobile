import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'clearFlag'
    ])
  },
  watch: {
    clearFlag () {
      this.resetNumberList()
    }
  }
}
