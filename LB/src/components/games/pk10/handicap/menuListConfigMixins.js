import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: 'pk10_handicap_lm' },
          key: 0,
          label: '两面'
        },
        {
          to: { name: 'pk10_handicap_dh' },
          key: 0,
          label: '单号'
        },
        {
          to: { name: 'pk10_handicap_gyh' },
          key: 0,
          label: '冠亚和'
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
