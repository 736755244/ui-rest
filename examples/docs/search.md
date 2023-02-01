## Search 搜索

### 基础用法

`v-model`传入默认检索值，`column`传入检索项配置

::: demo

```html
<template>
    <tiji-search v-model="searchForm" :column="columns" @search="setSearchValue"></tiji-search>
    <div>当前筛选值为：{{searchForm}}</div>
</template>
<script>
  export default {
    data(){
      return {
        searchForm: {
          name: '默认值'
        },
        columns:[
          {
            prop: 'name',
            label: '姓名',
            placeholder: '请输入姓名',
            span: 4
          },
          {
            prop: 'year',
            label: '年份',
            placeholder: '请选择年份',
            type: 'date',
            span: 8
          },
          {
            prop: 'sex',
            label: '性别',
            placeholder: '请选择性别',
            type: 'select',
            dicData: [
              { label:'男', value: '男' },
              { label:'女', value: '女' },
              { label:'不公开', value: '不公开' },
            ],
            span: 4
          },
        ]
      }
    },
    methods: {
      setSearchValue(value){
        this.searchForm = value;
      }
    }
  }
</script>
```
:::


### 自定义插槽

可通过 `slot: true` 开启自定义内容

::: demo

```html
<template>
    <tiji-search v-model="searchForm" :column="columns">
      <template slot="year">
        <el-select v-model="searchForm.year">
          <el-option value="2021" label="2021年"></el-option>
          <el-option value="2022" label="2022年"></el-option>
        </el-select>
      </template>
    </tiji-search>
</template>
<script>
  export default {
    data(){
      return {
        searchForm: {
          name: '默认值'
        },
        columns:[
          {
            prop: 'name',
            label: '姓名',
            placeholder: '请输入姓名'
          },
          {
            prop: 'year',
            label: '自定义',
            slot: true
          },
        ]
      }
    },
  }
</script>
```
:::


### 远程搜索

针对 `select` 类型查询条件，可通过传 `dicUrl` 、 `formatter` 和 `propsConf`  从接口获取对应下拉项

::: demo

```html
<template>
    <tiji-search v-model="searchForm" :column="columns"></tiji-search>
</template>
<script>
  export default {
    data(){
      return {
        searchForm: {},
        columns:[
          {
            prop: 'year',
            label: '年份',
            placeholder: '请选择年份',
            type: 'select',
            dicData: [],
            dicUrl: '/api/tiji-system/year',
            httpType: 'get',
            formatter: (res)=>{
              return res.data.map(v=>{
                return {
                  label: v.name,
                  value: v.id
                }
              })
            }
          },
        ]
      }
    },
  }
</script>
```
:::


### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 搜索项默认值   | Object  |    -       |    -   |
| column     | 搜索项配置   | Array  |    -       |    -   |


### column

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| prop     | value   | String  |    -       |    -   |
| label     | label  | String  |    -       |    -    |
| type     | 组件类型   | String  | input,select,date   |    input   |
| placeholder     | -   | String  |   -    |    -    |
| dicData     | 下拉项数据源   | String  |  -      |    -     |
| dicUrl     | 下拉项接口地址   | String  |   -  |    -    |
| propsConf     | 下拉项配置(见下方)   | Object  |   -    |    -    |
| httpType     | 下拉项接口类型   | String  |   -    |    -    |
| query     | 未实现   | String  |   -    |    -    |
| formatter     | 未实现   | Function  |   -    |    -    |


### propsConf

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 下拉项-value   | String  |    -       |    label   |
| id     | 下拉项-key   | String  |    -       |    value    |