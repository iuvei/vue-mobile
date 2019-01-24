import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      bonusGroup: '',
      maxMultiple: 999,
      multiple: 1,
      minMultiple: 1,
      coefficient: 1,
      coefficientList: [
        {
          label: '2元',
          value: 1
        },
        {
          label: '1元',
          value: 0.5
        },
        {
          label: '2角',
          value: 0.1
        },
        {
          label: '1角',
          value: 0.05
        },
        {
          label: '2分',
          value: 0.01
        },
        {
          label: '2厘',
          value: 0.001
        }
      ]
    }
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    selectAllBalls (data, attrName, item, typeName, numberAttrNameList, callBack) {
      if (!data || !data.length) return false
      if (!attrName) attrName = 'isSelected'
      if (!typeName) typeName = 'isSelectAll'
      const numberItem = item
      if (!numberAttrNameList) return false
      numberAttrNameList.map(nameItem => {
        if (nameItem !== typeName) { numberItem[nameItem] = false }
      })
      data.map(item => {
        item[attrName] = false
      })
      numberItem[typeName] = !numberItem[typeName]
      data.map(item => {
        item[attrName] = numberItem[typeName]
      })
      if (callBack) callBack()
      return data
    },
    selectBigBalls (data, attrName, item, typeName, numberAttrNameList, callBack) {
      if (!data || !data.length) return false
      if (!attrName) attrName = 'isSelected'
      if (!typeName) typeName = 'isSelectBig'
      if (!numberAttrNameList) return false
      const numberItem = item
      numberAttrNameList.map(nameItem => {
        if (nameItem !== typeName) { numberItem[nameItem] = false }
      })
      data.map(item => {
        item[attrName] = false
      })
      numberItem[typeName] = !numberItem[typeName]
      data.map((item, index) => {
        if (index >= (data.length / 2)) item[attrName] = numberItem[typeName]
      })
      if (callBack) callBack()
      return data
    },
    selectSmallBalls (data, attrName, item, typeName, numberAttrNameList, callBack) {
      if (!data || !data.length) return false
      if (!attrName) attrName = 'isSelected'
      if (!typeName) typeName = 'isSelectSmall'
      if (!numberAttrNameList) return false
      const numberItem = item
      numberAttrNameList.map(nameItem => {
        if (nameItem !== typeName) numberItem[nameItem] = false
      })
      data.map(item => {
        item[attrName] = false
      })
      numberItem[typeName] = !numberItem[typeName]
      data.map((item, index) => {
        if (index < data.length / 2) item[attrName] = numberItem[typeName]
      })
      if (callBack) callBack()
      return data
    },
    selectOddBalls (data, attrName, item, typeName, numberAttrNameList, callBack) {
      if (!data || !data.length) return false
      if (!attrName) attrName = 'isSelected'
      if (!typeName) typeName = 'isSelectOdd'
      if (!numberAttrNameList) return false
      const numberItem = item
      numberAttrNameList.map(nameItem => {
        if (nameItem !== typeName) numberItem[nameItem] = false
      })
      data.map(item => {
        item[attrName] = false
      })
      numberItem[typeName] = !numberItem[typeName]
      data.map((item, index) => {
        if (index % 2 !== 0) item[attrName] = numberItem[typeName]
      })
      if (callBack) callBack()
      return data
    },
    selectEvenBalls (data, attrName, item, typeName, numberAttrNameList, callBack) {
      if (!data || !data.length) return false
      if (!attrName) attrName = 'isSelected'
      if (!typeName) typeName = 'isSelectEven'
      if (!numberAttrNameList) return false
      const numberItem = item
      data.map(item => {
        item[attrName] = false
      })
      numberAttrNameList.map(nameItem => {
        if (nameItem !== typeName) numberItem[nameItem] = false
      })
      numberItem[typeName] = !numberItem[typeName]
      data.map((item, index) => {
        if (index % 2 === 0) item[attrName] = numberItem[typeName]
      })
      if (callBack) callBack()
      return data
    },
    clearAllBallsSelect (data, attrName, item, numberAttrNameList, callBack) {
      if (!data || !data.length) return false
      if (!attrName) attrName = 'isSelected'
      if (!numberAttrNameList) return false
      const numberItem = item
      numberAttrNameList.map(item => {
        numberItem[item] = false
      })
      data.map(item => {
        item[attrName] = false
      })
      if (callBack) callBack()
      return data
    }
  }
}
