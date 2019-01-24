<template>
  <div class="iframe-wrapper">
    <iframe :src="otherGameUrl"
            frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'other-game',
  data () {
    return {
      otherGameUrl: ''
    }
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    if (!to.query.url) {
      next('/index')
    } else {
      next(vm => {
        vm.otherGameUrl = to.query.url
      })
    }
  }
}
</script>

<style scoped>
  .iframe-wrapper {
    background-color: #fff;
  }
  .iframe-wrapper iframe {
    width: 100%;
    min-height: 861px;
  }
</style>
