import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: 'keno_handicap_zh-bs' },
          key: 0,
          label: '总和-比数'
        },
        {
          to: { name: 'keno_handicap_zm' },
          key: 1,
          label: '正码'
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
