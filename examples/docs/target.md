## Target 基础数据

### 基础单选

提供部门、岗位、角色、人员、风险分区、重大危险源、设备、NFC、分析对象、分析单元、所属重大危险源、物资分类、承包商工种等基础数据单选弹窗

只需要传入对应数据类型即可自动获取数据
::: demo

```html
<template>
    <tiji-target :visible="flag" :options="options" :dialogWidth="900" @confirm="chooseCallback" @close="flag=false;"></tiji-target>
    <el-button type="primary" @click="flag=true;">打开部门单选弹窗</el-button>
</template>
<script>
  export default {
    data(){
      return {
        flag: false,
        options: {
          type: 'dept'
        }
      }
    },
    methods: {
      chooseCallback(value){
        console.log('选择回调', value);
        this.flag = false;
      }
    }
  }
</script>
```
:::


### 多选及回显

通过 `selection` 配置多选

::: demo

```html
<template>
    <tiji-target :visible="flag" :options="options" :initialData="selectData" :dialogWidth="900" @confirm="chooseCallback" @close="flag=false;"></tiji-target>
    <el-button type="primary" @click="flag=true;">打开部门多选弹窗</el-button>
</template>
<script>
  export default {
    data(){
      return {
        flag: false,
        options: {
          type: 'dept',
          selection: true
        },
        selectData: [
          { id: 1 },
          { id: 2 }
        ]
      }
    },
    methods: {
      chooseCallback(value){
        console.log('选择回调', value);
        this.flag = false;
      }
    }
  }
</script>
```
:::


### 自定义数据源

通过传递 `tableData` 使用已有数据进行展示

::: demo

```html
<template>
    <tiji-target :visible="flag" :options="options" :tableData="tableData" @confirm="chooseCallback" @close="flag=false;"></tiji-target>
    <el-button type="primary" @click="flag=true;">打开弹窗</el-button>
</template>
<script>
  export default {
    data(){
      return {
        flag: false,
        options: {
          column: [
            {  prop: 'deptid', label: '编号' },
            {  prop: 'name', label: '名称' },
            {  prop: 'owner', label: '负责人' },
          ],
          conf: {
            id: 'deptid',
            name: 'owner'
          }
        },
        tableData: [
          { deptid: 1, name: '测试1', owner: '张三1' },
          { deptid: 2, name: '测试2', owner: '张三2' },
          { deptid: 3, name: '测试3', owner: '张三3' },
          { deptid: 4, name: '测试4', owner: '张三4' },
          { deptid: 5, name: '测试5', owner: '张三5' },
          { deptid: 6, name: '测试6', owner: '张三6' },
          { deptid: 7, name: '测试7', owner: '张三7' },
        ],
      }
    },
    methods: {
      chooseCallback(value){
        console.log('选择回调', value);
        this.flag = false;
      }
    }
  }
</script>
```
:::


### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible     | 弹窗显示隐藏   | Boolean  |    -       |    false   |
| dialogWidth     | 弹窗宽度   | Number  |    -       |    920   |
| title     | 弹窗标题   | String  |    -       |    选择数据   |
| showPage     | 是否显示分页   | Boolean  |    -       |    true   |
| confirmClose     | 选中后是否关闭弹窗   | Boolean  |    -       |    true   |
| options     | 数据源配置(见下方)   | Object  |    -       |   见下方   |
| search     | 检索数据   | Object  |    -       |    -  |
| tableData     | 列表数据   | Array  |    -       |    []  |
| initialData     | 回显数据   | Array  |    -       |    []  |


### options

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型  | String  |   见下方    |    -    |
| conf     | 返回数据键值   | Object  |    -       |    -   |
| httpUrl     | 请求地址  | String  |    -       |    -    |
| httpType     | 请求类型   | String  | get/post/delete/put   |   -    |
| selection     | 是否多选   | Boolean  |  -      |    false     |
| limit     | 多选限制   | Number  |   -  |    -    |
| column     | 列表列配置   | Array  |   -    |    []    |


### column

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| prop     | value   | String  |    -       |    -   |
| label     | label  | String  |    -       |    -    |
| align     | 对齐方式   | String  | left,right,center   |    -   |
| width     | 列宽   | Number  |   -    |    -    |


### type

| 字典值      | 说明    |
|---------- |-------- |
| dept     | 部门   | 
| post     | 岗位   | 
| role     | 角色   | 
| user     | 员工1   | 
| personnel     | 员工2   | 
| area     | 风险区域   |
| mh     | 重大危险源   |
| device     | 设备   | 
| nfc     | NFC   |
| analysisObject     | 分析对象   | 
| analysisUnit     | 分析单元   | 
| mhUnit     | 所属重大危险源单元   | 
| material     | 物资品类   |
| contractorWorkType   | 承包商工种   |