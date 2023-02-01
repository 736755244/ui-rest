import Target from './index.vue'

/* istanbul ignore next */
Target.install = function (Vue) {
  Vue.component(Target.name, Target)
}

export default Target
