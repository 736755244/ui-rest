## IconLibrary 图标库

### 基础用法

地图帽子图标选择

::: demo
```html
<template>
    <tiji-icon-library imageType="hat_icon" v-model="iconId"></tiji-icon-library>
</template>
<script>
  export default {
    data(){
      return {
        iconId: '',
      }
    },
  }
</script>
```
:::



### 禁用选择

通过设置 `disabled` 禁用选择(只作展示)

::: demo
```html
<template>
    <tiji-icon-library imageType="hat_icon" v-model="iconId" :disabled="true"></tiji-icon-library>
</template>
<script>
  export default {
    data(){
      return {
        iconId: '1',
      }
    },
  }
</script>
```
:::


### 多选

通过设置 `multiple` 启用多选

::: demo
```html
<template>
    <tiji-icon-library imageType="hat_icon" :multiple="true"></tiji-icon-library>
</template>
```
:::

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | v-model   | Number  |    -       |    -   |
| disabled     | 禁用选择   | Boolean  |    -       |    false   |
| multiple     | 是否多选   | Boolean  |    -       |    false   |
| imageType     | 图标库类型   | String  |    见下方       |    -   |


### imageType

| 字典值      | 说明    |
|---------- |-------- |
| app_menu_icon  |  app菜单图标    |
| hat_icon       |  地图帽子       |
| monitor_point  |  监测点图标     |
| warning_sign   |  安全警示图标   |
| wf_screen      |  监控大屏标识   |
| em_team        |  应急队伍       |
| em_warehouse   |  仓库图标       |
| device_type    |  设备类型       |