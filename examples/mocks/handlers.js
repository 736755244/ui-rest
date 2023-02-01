import { rest } from 'msw'
import { iconList, dataURLtoBlob, exportExcelStream, genTableData } from './fn'
// 接口模拟
export const handlers = [
  // 模拟弹窗部门接口
  rest.get(`/api/tiji-system/dept/dialog/page`,(req, res, ctx) => {
    let current = req.url.searchParams.get('current');
    let size = req.url.searchParams.get('size');
    let columns = [{
      prop: 'id',
      type: 'number'
    },{
      prop: 'deptName',
      type: 'string'
    }];
    let data = {
      code: 200,
      data:{
        current: current,
        size: size,
        total: 100,
        records: genTableData(columns,{
          page: current,
          size: size,
        },100)
      }
    };
    return res(ctx.status(200), ctx.json(data));
  }),
  // 模拟年份下拉
  rest.get(`/api/tiji-system/year`,(req, res, ctx) => {
    let data = {
      code: 200,
      data: [
        { id: 1, name: "2018年" },
        { id: 2, name: "2019年" },
        { id: 3, name: "2020年" },
        { id: 4, name: "2021年" },
        { id: 5, name: "2022年" },
        { id: 6, name: "2023年" },
      ]
    };
    return res(ctx.status(200), ctx.json(data));
  }),
  // 模拟配置项
  rest.get(`/api/tiji-system/param/get-by-key`,(req, res, ctx) => {
    let paramKey = req.url.searchParams.get('paramKey');
    let data = {};
    switch(paramKey){
      case'websocketBuildId':
        data = {
          code: 200,
          data:{
            paramValue: '202272'
          }
        };
        break;
      case'wwyt.server.maptype':
        data = {
          code: 200,
          data:{
            paramValue: '3D'
          }
        };
        break;
      case'wwyt.server.distance':
        data = {
          code: 200,
          data:{
            paramValue: '100'
          }
        };
        break;
      default:
        break;
    }
    return res(ctx.status(200), ctx.json(data));
  }),
  // 模拟图标库
  rest.get(`/api/tiji-resource/image-repo/list-by-type`,(req, res, ctx) => {
    let list = [];
    for(let i=0;i<50;i++){
      list.push({
        id: i+1,
        attachId: i+1
      });
    }
    let data = {
      code: 200,
      data: list
    };
    return res(ctx.status(200), ctx.json(data));
  }),
  // 模拟下载图片
  rest.get(`/api/tiji-resource/common/download`,async (req, res, ctx) => {
    // 模拟固定图片
    let fid = req.url.searchParams.get('id');
    let file = iconList[fid-1];
    let data = dataURLtoBlob(file);
    // 需要指定响应头
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/octet-stream; charset=utf-8'),
      ctx.set('content-disposition', `attachment;fileName=${fid}.png`),
      ctx.text(data)
    )
  }),
  // 模拟下载excel模板
  rest.get(`/api/downloadExcel`,async (req, res, ctx) => {
    let columns = [
      { prop: 'id', label: '编号' },
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' },
      { prop: 'sex', label: '性别' },
    ];
    let list = [];
    let file = exportExcelStream(columns, list);
    // 需要指定响应头
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/vnd.ms-excel;charset=UTF-8'),
      ctx.set('content-disposition', `attachment;filename=%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx`),
      ctx.text(file)
    )
  }),
  // 模拟导出excel
  rest.get(`/api/exportExcel`,async (req, res, ctx) => {
    let columns = [
      { prop: 'id', label: '编号' },
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' },
      { prop: 'sex', label: '性别' },
    ];
    let list = [
      { id: 1, name: '张三', age: 18, sex: '男' },
      { id: 2, name: '汪艳', age: 20, sex: '女' },
      { id: 3, name: '李四', age: 18, sex: '男' },
      { id: 4, name: '张婷', age: 32, sex: '女' },
      { id: 5, name: '王五', age: 16, sex: '男' },
    ];
    let file = exportExcelStream(columns, list);
    // 需要指定响应头
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/vnd.ms-excel;charset=UTF-8'),
      ctx.set('content-disposition', `attachment;filename=%E5%AF%BC%E5%87%BA%E6%95%B0%E6%8D%AE.xlsx`),
      ctx.text(file)
    )
  }),
  // 模拟上传excel
  rest.post(`/api/importExcel`,(req, res, ctx) => {
    let data = {
      code: 200,
      data: {
        total: 20,
        successNum: 20,
        errorNum: 0,
        ignoreNum: null,
        errorList: []
      }
    }
    return res(ctx.status(200),ctx.json(data))
  }),
]