import { exportJsonToExcelStream } from '../core/vendor/Export2Excel'

// 随机图片
let imgs = [];
for( let i=0;i<50;i++){
  imgs.push(require(`./img/icon/${i+1}.png`));
}
export const iconList = imgs;

// 随机excel
function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
export function exportExcelStream(columns,list){
  let heads = [];
  let props = [];
  columns.map(v=>{
    heads.push(v.label);
    props.push(v.prop);
  });
  let data = formatJson(props, list);
  return exportJsonToExcelStream(heads, data);
}

// 生成随机对象
export const randomSt = {
  'string': function(e=6){
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
  },
  'number':function(max=1000,min=1){
    var range = max - min;
    var rand = Math.random();
    return(min + Math.round(rand * range));
  },
  'boolean':function(){
    return parseInt(Math.random()*10)%2 == 0;
  }
}

// blob to base64
export function blobToBase64(blob){
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', ()=> {
      resolve(reader.result);
    });
    reader.readAsDataURL(blob);
  });
};

// 模拟文件流
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: 'application/octet-stream' });
}

// 模拟图片文件流
export function requestImage(url) {
  return new Promise((resolve)=>{
    let request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', url, true);
    request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
          blobToBase64(request.response).then(bs64=>{
            resolve(bs64);
          })
        }
    };
    request.send(null);
  })
}

// 模拟excel文件流
export function requestExcel(url) {
  return new Promise((resolve)=>{
    let request = new XMLHttpRequest();
      request.responseType = 'blob';
      request.open('get', url, true);
      request.onreadystatechange = () => {
          if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            resolve(request.response);
          }
      };
      request.send(null);
  })
}

// 处理get拼接的参数
export function genParams(search){
  let list = search.replace('?','').split('&')
  let sMap = {};
  list.map(v=>{
    let s = v.split('=');
    sMap[s[0]] = s[1]
  });
  return sMap;
}

// 生成随机列表
export function genTableData(columns=[],params,total=100){
  // 生成原始数据
  let oriData = [];
  for(var i=0;i<total;i++){
    let temp = {
      id: i+1
    }
    columns.map(v=>{
      // 排除id字段
      if(v.prop != 'id'){
        temp[v.prop] = randomSt[v.type]()
      }
    })
    oriData.push(temp)
  }
  // 取数据
  return oriData.slice((params.page-1)*params.size,params.page*params.size);
}