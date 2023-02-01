// 
import axios from 'axios'
import { downloadFile } from './utils/file'
// 全局指令
// import corePlugin from './plugin/core'
// t组件
import CollapseTransition from '../packages/base/collapse-transition.js'
import IconFont from '../packages/icon-font/index.js'
import Affix from '../packages/affix/index.js'
import Anchor from '../packages/anchor/index.js'
import AnchorLink from '../packages/anchor-link/index.js'
// tiji组件
import Title from '../packages/title/index.js'
import Search from '../packages/search/index.js'
import Target from '../packages/target/index.js'
import Jsmap from '../packages/jsmap/index.js'
import IconLibrary from '../packages/icon-library/index.js'
import ImportExport from '../packages/import-export/index.js'

const components = [
  // t
  CollapseTransition,
  IconFont,
  Affix,
  Anchor,
  AnchorLink,
  // tiji
  Title,
  Search,
  Target,
  Jsmap,
  IconLibrary,
  ImportExport
]

const install = function (Vue, options = {}) {
  // 全局组件注册
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // Vue.use(corePlugin, options)
  // 挂载业务逻辑
  Vue.prototype.$axios = options.axios || window.axios || axios
  window.axios = Vue.prototype.$axios
  Vue.prototype.$downloadFile = downloadFile
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  // t
  CollapseTransition,
  IconFont,
  Affix,
  Anchor,
  AnchorLink,
  // tiji
  Title,
  Search,
  Target,
  Jsmap,
  IconLibrary,
  ImportExport
}
