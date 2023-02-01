## 定制主题

tiji-ui(T系列组件)默认是使用scss进行开发的，默认前缀为 .t- / .tiji- 为命名空间，并且大多数都是基于变量进行开发的，定义主题其实就是改变变量列表

#### 我们只推荐进行变量覆盖的方式定制

在webpack工程化，我们只推荐通过变量覆盖来进行主题定制，因为其他方式如安装工具自行编译等等过于复杂，对于及其特殊的组件，也推荐二次封装和精确的样式覆盖
所以只提供一种方式来实现定制

在项目中新建一个 theme.scss 样式文件，并把原有 main.js 引入样式的地方改为引入此自定义样式

```javascript
import Vue from 'vue'
import App from './App.vue'
import TijiUI from 'tiji-ui'
// - import 'tiji-ui/lib/styles/index.css'
import './theme.scss'

Vue.use(TijiUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

```scss
/* 改变 icon 字体路径变量，必需 */
$font-path = '~tiji-ui/src/styles/fonts';
/* 改变主题色变量 */
$color-primary = #722ed1;
$color-success = #7cb305;
$color-warning = #faad14;
$color-danger = #eb2f96;

$border-base-radius = 5px;

@import '~tiji-ui/src/styles/index.scss'
```

完整的变量列表，可直接参考 tiji-ui/src/styles/common/variables.scss 进行具体配置
