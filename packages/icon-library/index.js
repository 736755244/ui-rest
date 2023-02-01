import IconLibrary from './index.vue'

/* istanbul ignore next */
IconLibrary.install = function (Vue) {
  Vue.component(IconLibrary.name, IconLibrary)
}

export default IconLibrary
