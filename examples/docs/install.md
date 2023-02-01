## 安装

### CDN 安装

在页面上引入 js 和 css 文件即可开始使用：

```
<!-- import Vue.js -->
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="http://172.16.10.209/tiji-front-platform/tiji-front-components/develop/lib/styles/index.css">
<!-- import tiji-ui -->
<script src="http://172.16.10.209/tiji-front-platform/tiji-front-components/develop/lib/index.min.js"></script>
```
    
暂时我们不考虑保留历史版本号。

### npm 安装

推荐使用npm安装，它能更好地和<a href="https://webpack.js.org/" target="_blank">webpack</a>打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
主线：
npm i git+http://172.16.10.209/tiji-front-platform/tiji-front-components.git -S
指定开发版：
npm i git+http://172.16.10.209/tiji-front-platform/tiji-front-components.git#develop -S
```

如果您了解node.js、npm安装，并希望配合webpack使用，请阅读下一节：[快速上手](/#/start)。

