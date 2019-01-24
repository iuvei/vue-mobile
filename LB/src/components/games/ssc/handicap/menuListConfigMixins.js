import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: 'ssc_handicap_integrate' },
          key: 0,
          label: '整合'
        },
        {
          to: { name: 'ssc_handicap_first' },
          key: 1,
          label: '第一球'
        },
        {
          to: { name: 'ssc_handicap_second' },
          key: 2,
          label: '第二球'
        },
        {
          to: { name: 'ssc_handicap_third' },
          key: 3,
          label: '第三球'
        },
        {
          to: { name: 'ssc_handicap_fourth' },
          key: 4,
          label: '第四球'
        },
        {
          to: { name: 'ssc_handicap_fifth' },
          key: 5,
          label: '第五球'
        },
        {
          to: { name: 'ssc_handicap_longhu' },
          key: 6,
          label: '龙虎'
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
