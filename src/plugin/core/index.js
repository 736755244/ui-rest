// 指令
import clickOutSide from '../../directive/clickoutside'

export default {
  async install(Vue) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示 https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
  
    // 全局指令
    Vue.directive('clickOutSide', clickOutSide)
  }
}
