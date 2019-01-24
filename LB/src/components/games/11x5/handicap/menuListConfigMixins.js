import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: '11x5_handicap_lm' },
          key: 0,
          label: '两面'
        },
        {
          to: { name: '11x5_handicap_dh' },
          key: 1,
          label: '单号'
        }
        // todo : 待后台返回相关玩法的赔率等信息
        /* {
          to: { name: '11x5_handicap_lh' },
          key: 2,
          label: '龙虎'
        } */
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
