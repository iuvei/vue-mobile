<template>
  <transition
    name="fade-in-linear"
    @after-leave="afterLeave">
    <div class="dialog-wrapper"
         v-show="visible"
         @click.self="handleWrapperClick">
      <div class="dialog"
           :class="[{ 'is-fullscreen': fullscreen }, customClass]"
           :ref="`dialog`"
           :style="style">
        <div class="dialog-header">
          <slot name="title">
            <span class="dialog-title">{{ title }}</span>
          </slot>
          <a v-if="showClose"
             @click="handleClose"
             href="javascript:;">
            <img :src="closeIcon" alt="closeIcon">
          </a>
        </div>
        <div class="dialog-body" v-if="rendered"><slot></slot></div>
        <div class="dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'Dialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      closed: false,
      rootEl: null,
      closeIcon
    }
  },

  watch: {
    visible (val) {
      this.rootEl = this.$root.$el
      if (val) {
        this.rootEl.className += ' blur'
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        document.body.appendChild(this.$el)
        document.body.style.overflow = 'hidden'
      } else {
        if (!this.closed) this.$emit('close')
        setTimeout(() => {
          this.rootEl.className = this.rootEl.className.replace('blur', '')
          this.$el.removeEventListener('scroll', this.updatePopper)
          document.body.style.overflow = 'auto'
        }, 200)
      }
    }
  },

  computed: {
    style () {
      let style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
      }
      return style
    }
  },

  methods: {
    getMigratingConfig () {
      return {
        props: {
          'size': 'size is removed.'
        }
      }
    },
    handleWrapperClick () {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper () {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterLeave () {
      this.$emit('closed')
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
      document.body.appendChild(this.$el)
    }
  },

  created () {
    this.rootEl = this.$root.$el
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    /*  if (this.appendToBody && this.$el && this.$el.parentNode) {
    } */
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>

<style scoped>
  @import "./css/transition.css";
  .dialog-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
  }
  .dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    box-sizing: border-box;
    width: 50%;
  }
  .dialog-header {
    height: 56px;
    line-height: 56px;
    padding-left: 27px;
    font-size: 18px;
    color: #fff;
    background-color: #616078;
  }
  .dialog-header > a {
    position: absolute;
    line-height: 1;
    right: 20px;
    top: 22px;
  }
  .dialog-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    overflow: hidden;
  }
  .dialog-footer {
    padding: 20px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box;
  }
  .dialog-title {
  }
</style>
