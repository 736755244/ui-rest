// 随机UUID
export function getUuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// 二维数组转一维数组
export function doubleArrToArr(list=[]){
  return list.map((v) => {
    return {
        x: v[0],
        y: v[1],
        z: v[2]||0,
    };
  });
}

// 一维数组转二维数组
export function arrToDoubleArr(list=[]){
  let points = list.map((v) => {
    return [v.x,v.y,v.z||0];
  });
  return [points];
}

// 模拟resize事件（2.5地图无法自适应屏幕宽度问题处理）
export function doResize(){
  setTimeout(function(){
      //手动触发窗口resize事件
      if(document.createEvent) {
          var event = document.createEvent("HTMLEvents");
          event.initEvent("resize", true, true);
          window.dispatchEvent(event);
      } else if(document.createEventObject) {
          window.fireEvent("onresize");
      }
  },500);
}

/**
 * 节流
 * @param {Function} fn 函数
 * @param {Number} interval 间隔
 */
export function throttle(fn, interval = 500) {
  var timer = null;
  return function () {
      if (timer) {
          // 定时器正在执行中，跳过
          return;
      }
      timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          fn.apply(this, arguments);
      }, interval);
  };
}

/**
 * 防抖
 * @param {Function} fn 函数
 * @param {Number} interval 间隔
 */
export function debounce(fn,delay = 500){
  let timer = null;
  return function() {
      if(timer){
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          fn.apply(this, arguments)
      }, delay);
  }
}

/**
 * 根据floorNo获取floorType
 * @param {String} floorNo 楼层
 */
export function getFloorInOrOut(floorNo) {
  // 3d
  let firstStr = floorNo[0];
  let inout = '';
  switch(firstStr){
    case 'F':
      inout = 0;//in
      break;
    case 'B':
      inout = 1;//un
      break;
    default:
      inout = 2;//out
      break;
  }
  return inout;
}

/**
 * 根据floorId获取floorType
 * @param {Number} floorId 楼层
 */
export function getFloorInOrOutById(floorId) {
  // 2d
  if(floorId>0){
    return 0;//in
  }else if(floorId<0){
    return 1;//un
  }else{
    return 2;//out
  }
}

/**
 * 根据floorType获取floorNo
 * @param {String} floorType 楼层类型
 * @param {String} floorNo 楼层
 */
export function getFloorNoByType(inout,fNo) {
  let floorNo = '';
  let fId = fNo.replace('Floor','').replace('B','')*1;
  switch(inout){
    case 0:
      floorNo = 'F' + fId;
      break;
    case 1:
      floorNo = 'B' + fId;
      break;
    default:
      floorNo = '室外';
      break;
  }
  return floorNo;
}

/**
 * 根据floorNo获取楼层ID
 * @param {String} floorNo 楼层
 */
export function getFloorId(floorNo) {
  return floorNo.replace('Floor','').replace('B','-')*1;
}

/**
 * 根据floorNo和室内外获取楼层ID
 * @param {String} floorNo 楼层
 * @param {Number} inout 室内外
 */
export function getFloorIdByInout(floorNo,inout) {
  if(inout == 2){
    return 0;
  }
  return floorNo.replace('Floor','').replace('B','-')*1;
}

/**
 * 根据floorId获取floorNo
 * @param {Number} floorId 楼层ID
 */
export function setFloorNo(floorId) {
  return ("Floor"+floorId).replace('-','B');
}

/**
 * 根据floorId获取floorNo（简写）
 * @param {Number} floorId 楼层ID
 */
export function setAbbFloorNo(floorId) {
  if(floorId>0){
    return 'F'+floorId;
  }else if(floorId<0){
    return 'B'+floorId;
  }else{
    return '室外';
  }
}

/**
 * 模拟sleep函数
 * @param {Number} ms 延迟时间
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 根据类型ID获取地图类型
 * @param {Number} type 类型
 */
export function getImageryType(type){
  var tp = jsmap.JSImageryProviderType.IMAGE_TDT;
  switch(type){
    case 1:
      tp = jsmap.JSImageryProviderType.VECTOR_BD;
      break;
    case 2:
      tp = jsmap.JSImageryProviderType.VECTOR_GD;
      break;
    case 0:
    default:
      break;
  }
  return tp;
}

/**
 * 根据id获取地图抗锯齿
 * @param {Number} type 类型
 */
export function getMass(type){
  var ms = jsmap.JSMsaaSamplesType.MSAAOFF;
  switch(type){
    case 1:
      ms = jsmap.JSMsaaSamplesType.MSAALOW;
      break;
    case 2:
      ms = jsmap.JSMsaaSamplesType.MSAAMIDDLE;
      break;
    case 3:
      ms = jsmap.JSMsaaSamplesType.MSAAHIGH;
      break;
    case 0:
    default:
      break;
  }
  return ms;
}

/**
 * 匹配高程
 * @param {Number} z 高度
 */
export function getGcZ(z){
  return z || 0;
}

// 地图默认参数
export var mapDefaultParams = {
  rotateAngle: 0,
  defaultTiltAngle: 45,
  defaultFloorHeight: 20,
  enableLighting: false,
  enableShadows: false,
  showGlobe: true,
  luminanceAtZenith: 0.26,
  specularIntensity: 1.0,
  scatteringIntensity: 1.0,
  openingAnimation: true,
  defaultMapView:null,
  msaaSamples: 0,
  imageryType: 0,
  backgroudType: 0,
  imagePath: null
}

/**
 * 解析地图参数
 * @param {Object} data 参数对象
 */
export function judgeMapParams(data){
  return {
    mapType: data.mapType||'3D',
    pointOneToTheLeft: data.pointOneToTheLeft,
    pointOneToTheTop: data.pointOneToTheTop,
    pointOneLng: data.pointOneLng,
    pointOneLat: data.pointOneLat,
    pointTowToTheLeft: data.pointTowToTheLeft,
    pointTowToTheTop: data.pointTowToTheTop,
    pointTowLng: data.pointTowLng,
    pointTowLat: data.pointTowLat,
    minX: data.minX,
    maxY: data.maxY,
    rotateAngle: data.rotateAngle*1,
    defaultTiltAngle: data.defaultTiltAngle*1,
    defaultFloorHeight: data.defaultFloorHeight*1,
    defaultHistoryLineHeight: data.defaultHistoryLineHeight*1,
    defaultHistoryLineWidth: data.defaultHistoryLineWidth*1,
    defaultPolygonMarkerHeight: data.defaultPolygonMarkerHeight*1,
    enableLighting: JSON.parse(data.enableLighting),
    enableShadows: JSON.parse(data.enableShadows),
    showGlobe: JSON.parse(data.showGlobe),
    openingAnimation: JSON.parse(data.openingAnimation),
    luminanceAtZenith: data.luminanceAtZenith*1,
    scatteringIntensity: data.scatteringIntensity*1,
    markerDepth: JSON.parse(data.markerDepth),
    lineDepth: JSON.parse(data.lineDepth),
    defaultMapView: data.defaultMapView?JSON.parse(data.defaultMapView):'',
    msaaSamples: data.msaaSamples*1,
    imageryType: data.imageryType*1,
    backgroudType: data.backgroudType*1,
    imagePath: data.imagePath,
    mapFly: JSON.parse(data.mapFly),
    mapFlyType: data.mapFlyType*1,
    mapFlyPoint: data.mapFlyPoint?JSON.parse(data.mapFlyPoint):''
  }
}

//计算区域质心坐标
function Area(p0,p1,p2){
  var area = 0.0 ;
  area = p0.x * p1.y + p1.x * p2.y + p2.x * p0.y - p1.x * p0.y - p2.x * p1.y - p0.x * p2.y;
  return area / 2 ;
}
// 计算重心
export function getPolygonCenter(points) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_area = 0;
  var p1 = points[1];
  var p2 = null;
  var area = null;
  for (var i = 2; i < points.length; i++) {
    p2=points[i];
    area = Area(points[0],p1,p2) ;
    sum_area += area ;
    sum_x += (points[0].x + p1.x + p2.x) * area;
    sum_y += (points[0].y + p1.y + p2.y) * area;
    p1 = p2 ;
  }
  var xx = sum_x / sum_area / 3;
  var yy = sum_y / sum_area / 3;
  return {x:xx, y:yy, z:0};
}
