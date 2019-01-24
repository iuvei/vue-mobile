<template>
  <div id="app">
    <div class="one">
      <p>
        <router-link to="/Two">下一层</router-link>
      </p>
      <h1>第一层</h1>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* { padding: 0; margin: 0; box-sizing: border-box;}
    html, body, #app { width: 100%; height: 100%; }
    .wrap{position: fixed; top: 0; bottom: 0; left: 0; right: 0;overflow-y:auto }
    .one {  height: 100%;background-color: yellow; }
    .two { background-color: tomato;  }
    .three { background-color: #ffe69f;  }
    .v-enter-active, .v-leave-active { transition: all 0.3s; }
    .v-enter, .v-leave-to { transform: translateX(100%);}

    /*loading start*/
    .loading {
      z-index: 999999;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    .loading .loadbg {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #000;
      opacity: 0.3;
    }

    .loading .loading-container {
      width: 220px;
      height: 220px;
      opacity: 0.8;
      margin-top: -110px;
      margin-left: -110px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: rgba(0,0,0,.5);
      border-radius: 5px;
      padding-top: 60px;
      color: #fff;
      text-align: center;
    }
    .sk-cube-grid {
      width: 60px;
      height: 60px;
      display: inline-block;
    }

    .sk-cube-grid .sk-cube {
      width: 33%;
      height: 33%;
      background-color: #fff;

      float: left;
      -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
      animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    }
    .sk-cube-grid .sk-cube1 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s; }
    .sk-cube-grid .sk-cube2 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s; }
    .sk-cube-grid .sk-cube3 {
      -webkit-animation-delay: 0.4s;
      animation-delay: 0.4s; }
    .sk-cube-grid .sk-cube4 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s; }
    .sk-cube-grid .sk-cube5 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s; }
    .sk-cube-grid .sk-cube6 {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s; }
    .sk-cube-grid .sk-cube7 {
      -webkit-animation-delay: 0s;
      animation-delay: 0s; }
    .sk-cube-grid .sk-cube8 {
      -webkit-animation-delay: 0.1s;
      animation-delay: 0.1s; }
    .sk-cube-grid .sk-cube9 {
      -webkit-animation-delay: 0.2s;
      animation-delay: 0.2s; }

    @-webkit-keyframes sk-cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      } 35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
    }

    @keyframes sk-cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
      } 35% {
          -webkit-transform: scale3D(0, 0, 1);
          transform: scale3D(0, 0, 1);
        }
    }
</style>
