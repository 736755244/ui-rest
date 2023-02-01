## Jsmap 地图

### 基础用法

地图组件，提供绘制点、线、面等基础功能

注意：实际项目中，请自行引入真趣地图sdk

::: demo

```html
<template>
    <div style="width:500px;">
      <tiji-jsmap devUrl="http://172.16.4.252:10000" mtype="2D" height="400px"></tiji-jsmap>
    </div>
</template>
```
:::


### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| height     | 地图高度   | String  |    -       |    -   |
| currentDrawMode   | 当前绘制模式   | String  |  polygon point  |  polygon |
| disabled     | 禁用绘图模式   | Boolean  |    -       |    false   |
| point     | 未知   | -  |    -       |    -   |
| mtype     | 默认地图类型   | String  |   2D/3D    |    -   |
| floor     | 2D是否显示楼层控件   | Object  |    -    |  { show:false, floorId:1 } |
| devUrl     | 开发环境地图路径   | String  |    -       |    -   |
| toolOffsetX     | 批量画楼层控件位置X   | Number  |    -       |    20   |
| toolOffsetY     | 批量画楼层控件位置Y   | Number  |    -       |    20   |
| batchTool     | 是否批量画   | Boolean  |    -       |    false   |
| sdkBatchDrawTool     | 是否SDK批量画工具   | Boolean  |    -       |    false   |

