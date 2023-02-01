## 快速上手

本节将介绍如何在项目中使用 tiji-ui。

### 引入 tiji-ui

你可以引入整个 tiji-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 tiji-ui。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import App from './App.vue'
// 引入tiji-ui
import TijiUI from 'tiji-ui'
import 'tiji-ui/lib/theme-chalk/index.css'
Vue.use(TijiUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

以上代码便完成了 tiji-ui 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助插件 <a href="https://github.com/QingWei-Li/babel-plugin-component" target="_blank">babel-plugin-component</a> 我们可以只引入需要的组件，以达到减小项目体积的目的

```shell script
npm install babel-plugin-component -D
```

然后，将 .babelrc 或 babel.config.js修改为：

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "tiji-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

如果你只希望引入部分组件，比如 Affix，那么需要在 main.js 中写入以下内容

```javascript
import Vue from 'vue';
import { Title } from 'tiji-ui'
import waves from 'tiji-ui/src/directive/waves' // 引入指令

Vue.component(Title.name,Title)
Vue.directive('waves', waves)  // 注册全局指令
/* 或写为
 * Vue.use(Title)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

**特别提醒:按需引用仍然需要导入样式，即在 main.js 或根组件 import 'tiji-ui/lib/theme-chalk/index.css';**

完整组件列表

```javascript
import {
  Title,
  Search,
  Target,
  Jsmap,
  IconLibrary,
  ImportExport
} from 'tiji-ui';
```

### 开始使用

至此，一个基于 Vue 和 tiji-ui 的开发环境已经搭建完毕。各个组件的使用方法请参阅它们各自的文档。

