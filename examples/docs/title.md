## TijiTitle 标题

### 基础用法

默认标题

::: demo
```html
<template>
    <!-- 默认插槽 -->
    <tiji-title>slot标题</tiji-title>
    <!-- props传入 -->
    <tiji-title title="props标题"></tiji-title>
</template>
```
:::

### 自定义样式

提供了一些配置，详情查看下方的 `Props-styleConf`

::: demo
```html
<template>
    <tiji-title :styleConf="styleConf">自定义标题</tiji-title>
</template>
<script>
  export default {
    computed: {
      styleConf(){
        return {
          fontSize: 13,
          fontWeight: 800,
          color: 'red',
          padding:{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
          }
        }
      }
    }
  }
</script>
```
:::


### 固定定位

::: demo
```html
<template>
    <tiji-title :fixed="true" :styleConf="{top: 700}">固定定位标题</tiji-title>
</template>
```
:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| styleConf     | 基础配置   | Object  |    -       |    -   |
| fixed     | 是否固定定位   | Boolean  |    -       |    false   |


### styleConf

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| fontSize     | font-size   | Number  |    -       |    24   |
| fontWeight     | font-weight  | Number  |    -       |    500    |
| color     | 颜色   | String  |  -      |    -     |
| padding     | padding(见下方)   | Object  |   -  |    -    |
| top     | 定位top   | Number  |   -    |    -    |


### padding

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| top     | 上边距   | Number  |    -       |    20   |
| bottom     | 下边距   | Number  |    -       |    20    |
| right     | 右边距   | Number  |  -      |    20     |
| left     | 左边距   | Number  |   -  |    30    |