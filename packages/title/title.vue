<template>
  <div class="tiji-title" :style="titleStyle">
    <h3 class="title" :style="h3Style">
      {{ title }}
      <slot></slot>
    </h3>
    <slot name="button"></slot>
  </div>
</template>
<script>
import conf from './conf.js';
export default {
  name: 'TijiTitle',
  props: {
    title: String,
    styleConf: {
      type: Object,
      default(){
        return {}
      }
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      conf
    };
  },
  computed: {
    titleStyle(){
      return {
        paddingTop: this.setPaddingHeight('top') + 'px',
        paddingBottom: this.setPaddingHeight('bottom') + 'px',
        paddingRight: this.setPaddingHeight('right') + 'px',
        paddingLeft: this.setPaddingHeight('left') + 'px',
        position: (this.fixed ? 'fixed' : 'relative'),
        width: 'inherit',
        top: this.setPositionTop()
      }
    },
    h3Style(){
      return {
        fontSize: this.styleConf.fontSize || this.conf.fontSize + 'px',
        fontWeight: this.styleConf.fontWeight || this.conf.fontWeight,
        color: this.styleConf.color
      }
    }
  },
  methods: {
    setPaddingHeight(type) {
      const paddingConf = this.styleConf.padding || this.conf.padding;
      return paddingConf[type] === 0 ? paddingConf[type] : paddingConf[type] || this.conf.padding[type];
    },
    setPositionTop() {
      const confTop = this.styleConf.top || this.conf.top;
      if (isNaN(confTop)) {
        return confTop;
      } else {
        return confTop + 'px';
      }
    }
  }
};
</script>