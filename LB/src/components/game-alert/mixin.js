import getScrollBarWidth from 'element-ui/src/utils/scrollbar-width'

export const alertMixin = {
  data () {
    return {
      show: false,
      rootEl: null
    }
  },
  methods: {
    closeAlertBox () {
      this.show = false
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.rootEl = this.rootEl || document.querySelector('body > div:nth-of-type(1)') || document.getElementsByTagName('div')[0]
        this.rootEl.className += ' blur'
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${getScrollBarWidth()}px`
      } else {
        setTimeout(() => {
          this.rootEl.className = this.rootEl.className.replace('blur', '')
          if (this.isSecondAlert) return
          document.body.style.paddingRight = `0px`
          document.body.style.overflow = 'auto'
          this.$el.parentNode.removeChild(this.$el)
        }, 300)
      }
    }
  },
  computed: {
  }
}
