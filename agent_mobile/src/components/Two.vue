<template>
  <div class="wrap two" :class="{overflow:ov}" id="Two">
    <router-link to="/Three">下一层</router-link>
    <router-link to="/">返回</router-link>
    <h1 class="page-title">Popup</h1>
     <div style="height:1000px;background-color: yellow"></div>
    <div class="page-popup-wrapper">
      <mt-button @click.native="changepopup" size="large">右侧弹出 popup</mt-button>
    </div>
   <div style="height:1000px;background-color: yellow"></div>
    <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
      <div style="height:1000px;background-color: red"></div>
      <mt-button @click.native="changepopup" size="large" type="primary">关闭 popup</mt-button>
    </mt-popup>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
    data() {
      return {
        popupVisible3: false,
        ov:false
      };
    },
    methods:{
      changepopup(){
        this.popupVisible3 = !this.popupVisible3;
      }
    }



  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .mint-popup-3 {
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow-y: auto;
      }

.overflow{
  overflow:hidden!important;
}

</style>
