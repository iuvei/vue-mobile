<template>
  <div class="qs clear-fix">
    <div class="qs-left">
      <div class="choice-number-box-tabs clear-fix">
        <router-link v-for="link in showMenuList"
                     :key="link.id"
                     :to="{ name: `3d_${link['name_en']}` }"
                     href="javascript:;">{{link['name_cn']}}</router-link>
      </div>
      <router-view></router-view>
      <shopping-cart></shopping-cart>
      <betting-record-table></betting-record-table>
    </div>
    <div class="qs-right" >
      <often-play-type></often-play-type>
      <ranking-data></ranking-data>
      <ranking-documentary></ranking-documentary>
    </div>
  </div>
</template>

<script>
import shoppingCart from '../../../shopping-cart/shopping-cart'
import rankingDocumentary from '../../../ranking-documentary/ranking-documentary'
import oftenPlayType from '../../../often-play-type/often-play-types'
import bettingRecordTable from '../../../betting-record-table/betting-record-table'
import rankingData from '../../../ranking-data/ranking-data'
import { mapGetters } from 'vuex'
import { showMenuListMixins } from '../../../../common/js/menu-show-list-mixins'

export default {
  components: { shoppingCart, rankingDocumentary, oftenPlayType, bettingRecordTable, rankingData },
  mixins: [ showMenuListMixins ],
  computed: {
    ...mapGetters({
      menuList: 'menu'
    })
  },
  created () {
    this.showMenuList = this.menuList
  }
}
</script>

<style scoped>
  @import "../../../../statics/css/media/width-767/game-layout.css";
  @import "../../../../statics/css/media/width-992/game-layout.css";
  @import "../../../../statics/css/media/width-1200/game-layout.css";
  @import "../../statics/css/layout.css";
</style>
