## Import-Export 导入导出

### 基础用法

地图组件，提供绘制点、线、面等基础功能

注意：实际项目中，请自行引入真趣地图sdk

::: demo

```html
<template>
    <div style="width:500px;">
      <tiji-import-export 
        :token="token"
        :permission-import="showImportBtn"
        :permission-export="showExportBtn"
        :download-url="downloadUrl"
        :import-url="importUrl"
        :export-url="exportUrl"
        templateName="导入模板.xlsx"
        @refresh="importRefresh"
      />
    </div>
</template>
<script>
  export default {
    data(){
      return {
        token: '上传请求头',
        showImportBtn: true,
        showExportBtn: true,
        downloadUrl: '/api/downloadExcel',
        importUrl: '/api/importExcel',
        exportUrl: '/api/exportExcel'
      }
    },
    methods: {
      importRefresh(){
        console.log('刷新回调');
      }
    }
  }
</script>
```
:::


### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| token     | 导入请求头   | String  |    -       |    -   |
| permissionImport   | 导入数据权限   | Boolean  |  -  |  false |
| permissionExport     | 导出数据权限   | Boolean  |    -       |    false   |
| importBtnName     | 导入数据按钮名称   | String  |    -       |    导入数据   |
| exportBtnName     | 导出数据按钮名称   | String  |       |    导出数据   |
| downloadUrl     | 下载接口url   | String  |    -    |  - |
| devUrl     | 开发环境地图路径   | String  |    -       |    -   |
| importUrl     | 数据导入接口   | String  |    -       |    -   |
| exportUrl     | 数据导出接口   | String  |    -       |    -   |
| templateList     | 多个模板集合   | Array  |    -       |    -   |
| templateName     | 下载模板名称   | String  |    -       |    -   |
| searchObj     | 导出数据查询条件   | Object  |    -       |    -   |
| isRickControl     | 是否是风险管控导入导出   | Boolean  |    -       |    false   |
| singleExportBtn     | 只有一个导出按钮   | Boolean  |    -       |    false   |

