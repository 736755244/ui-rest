import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/color-brewer.css'
import './assets/styles/index.scss'
import '../src/styles/index.scss'

import icon from './icon.config'
import generate from './generateTreeData'
Vue.prototype.$icon = icon // Icon 列表页用
Vue.prototype.$generateTree = generate // Icon 列表页用

// 基础组件
import components from './components/'
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})

// tiji-ui
import TijiUI from '../src/index'
Vue.use(TijiUI)

// 第三方
Vue.prototype.$ELEMENT = { size: 'small' };

// 这里引入全局指令
import dialogDrag from './core/dialog-drag'
Vue.directive('dialogDrag',dialogDrag);

// 模拟业务组件中的接口返回
// if (process.env.NODE_ENV === "development") {
  const { mocker } = require("./mocks/browser");
  mocker.start({
      // 对于没有 mock 的接口直接通过，避免异常
      onUnhandledRequest: "bypass",
  });
// }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
