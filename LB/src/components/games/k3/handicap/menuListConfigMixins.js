import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: 'k3_handicap_dxsb' },
          key: 0,
          label: '大小骰宝'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created () {
  }
}
