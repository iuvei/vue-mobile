import { mapActions, mapMutations, mapGetters } from 'vuex'
import { checkboxTypeLabelValue } from '../../../../../../config/game-default-config'

export default {
  data () {
    return {
      checkboxType: {
        wan: true,
        qian: true,
        bai: true,
        shi: true,
        ge: true
      }
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    getExtraStr () {
      let extraStr = ''
      for (let key in this.checkboxType) {
        if (this.checkboxType[key]) {
          extraStr += checkboxTypeLabelValue[key]
        }
      }
      return extraStr.split('').map(item => +item).sort((a, b) => a - b).join('')
    }
  },
  created () {
  }
}
