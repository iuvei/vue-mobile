import { mapActions, mapMutations, mapGetters } from 'vuex'

export const lotteryMixin = {
  data () {
    return {
      linkList_smp_tzjh: [
        { label: '标准', value: 'bz' },
        { label: '官方', value: 'gf' },
        { label: '跟单', value: 'gd' },
        { label: '挂机', value: 'gj' },
        { label: '微投', value: 'wt' }
      ],
      linkList_SSC: [
        { label: '标准', value: 'normal', toName: 'SSCNormal' },
        { label: '盘口', value: 'handicap', toName: 'SSCHandicap' }
      ],
      linkList_K3: [
        { label: '标准', value: 'normal', toName: 'K3Normal' }
        // { label: '盘口', value: 'handicap', toName: 'SSCHandicap' }
      ],
      linkList_3D: [
        { label: '标准', value: 'normal', toName: '3DNormal' }
        // { label: '盘口', value: 'handicap', toName: 'SSCHandicap' }
      ],
      linkList_11X5: [
        { label: '标准', value: 'normal', toName: 'L115Normal' }
        // { label: '盘口', value: 'handicap', toName: 'L115Handicap' }
      ],
      linkList_PK10: [
        { label: '标准', value: 'normal', toName: 'PK10Normal' }
        // { label: '盘口', value: 'handicap', toName: 'PK10Handicap' }
      ],
      linkList_KENO: [
        { label: '标准', value: 'normal', toName: 'KENONormal' }
        // { label: '盘口', value: 'handicap', toName: 'KENOHandicap' }
      ],
      linkList_KLSF: [
        { label: '标准', value: 'normal', toName: 'KLSFNormal' }
        // { label: '盘口', value: 'handicap', toName: 'KLSFHandicap' }
      ],
      linkList_KL12: [
        { label: '标准', value: 'normal', toName: 'KL12Normal' }
        // { label: '盘口', value: 'handicap', toName: 'KL12Handicap' }
      ]
    }
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    getGameInfoById (szcpList, id) {
      console.log(szcpList)
      console.log(id)
      const returnObject = {}
      let flag = false
      if (!szcpList || !id) return null
      for (let key in szcpList) {
        if (flag) break
        for (let keyInner in szcpList[key]['lotteries']) {
          if (+keyInner === +id) {
            returnObject.menuLink = szcpList[key]['lotteries'][keyInner]
            returnObject.lotteryId = +id
            returnObject.upperName = key
            flag = true
            break
          }
        }
      }
      if (!flag) return null
      return returnObject
    }
  }
}
