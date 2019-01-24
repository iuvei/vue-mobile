import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: 'lhc_handicap_tm' },
          key: 0,
          label: '特码'
        },
        {
          to: { name: 'lhc_handicap_tmlm' },
          key: 1,
          label: '特码两面'
        },
        {
          to: { name: 'lhc_handicap_tmbs' },
          key: 2,
          label: '特码波色'
        },
        {
          to: { name: 'lhc_handicap_zm' },
          key: 3,
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
