## Icon 图标

图标这里使用了阿里[iconfont](https://www.iconfont.cn/)图标库生成了图标，图标来源于
开源项目 ionicons，结合整理添加了一些其他的图标。

### 使用方法

i 标签可以直接设置样式类名为 `iconfont icon-xxx` 来使用即可。icon组件可以只设置name来实用。 设置`icon-is-rotating`可以开启旋转

:::demo size和color可以设置字体大小和颜色
```html
  <div class="demo-icon">
    <i class="iconfont icon-caidan"></i>
    <i class="iconfont icon-icon_im_more icon-is-rotating"></i>
    <t-icon-font name="add" size="20" color="#ff53a5"></t-icon-font>
    <t-icon-font name="biaoge" class="icon-is-rotating"></t-icon-font>
  </div>
```
:::

### 图标集合

<template>
    <ul class="icon-list">
      <li v-for="name in $icon" :key="name" class="list-complete-item">
        <span>
          <i :class="['iconfont' , 'icon-'+name]"></i>
          <span class="icon-name">{{ name }}</span>
        </span>
      </li>
    </ul>
</template>
