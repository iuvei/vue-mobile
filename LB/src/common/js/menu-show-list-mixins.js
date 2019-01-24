import { mapActions, mapGetters } from 'vuex'

export const showMenuListMixins = {
  data () {
    return {
      showMenuList: [],
      playTypeListItem: []
    }
  },
  computed: {
    ...mapGetters([
      'isGettingData'
    ])
  },
  methods: {
    ...mapActions([])
  },
  watch: {
    isGettingData (val) {
      if (!val) {
        setTimeout(() => {
          this.showMenuList = this.menuList
        }, 400)
      } else {
        this.showMenuList = []
      }
    }
  },
  mounted () {
    if (!this.isGettingData) this.showMenuList = this.menuList
  }
}
