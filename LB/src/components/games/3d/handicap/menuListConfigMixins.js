import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menuList: [
        {
          to: { name: '3d_handicap_integrate' },
          key: 0,
          label: '整合'
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
