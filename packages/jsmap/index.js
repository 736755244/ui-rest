import Jsmap from './index.vue'

/* istanbul ignore next */
Jsmap.install = function (Vue) {
  Vue.component(Jsmap.name, Jsmap)
}

export default Jsmap
