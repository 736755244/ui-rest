module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 282);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/jsmap/index.vue?vue&type=template&id=c41a7cb6&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("div", { staticClass: "jsmap" }, [
    _c(
      "div",
      {
        staticClass: "mapDemo",
        staticStyle: { position: "relative" },
        style: `height: ${_vm.height ? _vm.height : "720px"};`,
      },
      [
        _c(
          "el-radio-group",
          {
            staticClass: "map-type",
            attrs: { size: "small" },
            on: { change: _vm.changeMapType },
            model: {
              value: _vm.mapType,
              callback: function ($$v) {
                _vm.mapType = $$v
              },
              expression: "mapType",
            },
          },
          [
            _c("el-radio-button", { attrs: { label: "3D" } }),
            _vm._v(" "),
            _c("el-radio-button", { attrs: { label: "2D" } }),
          ],
          1
        ),
        _vm._v(" "),
        !_vm.disabled && !_vm.batchTool
          ? _c(
              "div",
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.btnLoading,
                    expression: "btnLoading",
                  },
                ],
                staticClass: "mapBtn",
              },
              [
                _c(
                  "el-button",
                  {
                    attrs: {
                      size: "small",
                      disabled: _vm.isDraw || _vm.isStartDraw,
                      type: "primary",
                    },
                    on: { click: _vm.drawerModule },
                  },
                  [_vm._v("开始画")]
                ),
                _vm._v(" "),
                _vm.currentDrawMode === "polygon" &&
                !_vm.disabled &&
                _vm.mapType !== "3D"
                  ? _c(
                      "el-button",
                      {
                        directives: [
                          {
                            name: "loading",
                            rawName: "v-loading",
                            value: _vm.btnLoading,
                            expression: "btnLoading",
                          },
                        ],
                        attrs: {
                          disabled: _vm.isDraw,
                          size: "small",
                          type: "primary",
                        },
                        on: { click: _vm.drawEndPolygon },
                      },
                      [_vm._v("结束画面")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.currentDrawMode === "polygon"
                  ? _c(
                      "el-button",
                      {
                        attrs: {
                          size: "small",
                          disabled: !_vm.isDraw,
                          type: "primary",
                        },
                        on: { click: _vm.resetDraw },
                      },
                      [_vm._v("重置")]
                    )
                  : _vm._e(),
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.currentDrawMode === "polygon" && _vm.data.floorId
          ? _c(
              "div",
              {
                staticStyle: {
                  position: "absolute",
                  bottom: "20px",
                  right: "0",
                  "z-index": "500",
                },
              },
              [
                _c("el-slider", {
                  attrs: {
                    vertical: "",
                    disabled: _vm.disabled,
                    min: 1,
                    max: 200,
                    height: "200px",
                  },
                  model: {
                    value: _vm.stretchHeight,
                    callback: function ($$v) {
                      _vm.stretchHeight = $$v
                    },
                    expression: "stretchHeight",
                  },
                }),
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _c("div", {
          staticStyle: { width: "100%", height: "100%" },
          attrs: { id: "joysuch" },
        }),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/jsmap/index.vue?vue&type=template&id=c41a7cb6&

// CONCATENATED MODULE: ./packages/jsmap/util.js
// 随机UUID
function getUuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// 二维数组转一维数组
function doubleArrToArr(list=[]){
  return list.map((v) => {
    return {
        x: v[0],
        y: v[1],
        z: v[2]||0,
    };
  });
}

// 一维数组转二维数组
function arrToDoubleArr(list=[]){
  let points = list.map((v) => {
    return [v.x,v.y,v.z||0];
  });
  return [points];
}

// 模拟resize事件（2.5地图无法自适应屏幕宽度问题处理）
function doResize(){
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
function throttle(fn, interval = 500) {
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
function debounce(fn,delay = 500){
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
function getFloorInOrOut(floorNo) {
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
function getFloorInOrOutById(floorId) {
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
function getFloorNoByType(inout,fNo) {
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
function getFloorId(floorNo) {
  return floorNo.replace('Floor','').replace('B','-')*1;
}

/**
 * 根据floorNo和室内外获取楼层ID
 * @param {String} floorNo 楼层
 * @param {Number} inout 室内外
 */
function getFloorIdByInout(floorNo,inout) {
  if(inout == 2){
    return 0;
  }
  return floorNo.replace('Floor','').replace('B','-')*1;
}

/**
 * 根据floorId获取floorNo
 * @param {Number} floorId 楼层ID
 */
function setFloorNo(floorId) {
  return ("Floor"+floorId).replace('-','B');
}

/**
 * 根据floorId获取floorNo（简写）
 * @param {Number} floorId 楼层ID
 */
function setAbbFloorNo(floorId) {
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
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 根据类型ID获取地图类型
 * @param {Number} type 类型
 */
function getImageryType(type){
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
function getMass(type){
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
function getGcZ(z){
  return z || 0;
}

// 地图默认参数
var mapDefaultParams = {
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
function judgeMapParams(data){
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
function getPolygonCenter(points) {
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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/jsmap/index.vue?vue&type=script&lang=js&


let mapSdk = {}
let map = {}
// 3d画图
var customDrawTool = null //自定义绘图控件
var batchGraphicData = [] //批量组件数据
var sdkDrawTool = null //批量画图工具
// 2.5画图
var d2DrawTool = null //绘图工具
var currentDrawMode = null //绘图模式
var batchGraphicMap = {} //批量组件数据
let boxMarker = () => {}
/* harmony default export */ var jsmapvue_type_script_lang_js_ = ({
  name: 'TijiJsmap',
  props: {
    height: {
      type: String,
      default: ''
    },
    currentDrawMode: {
      type: String, // polygon point
      default: 'polygon'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    point: {
      default: ''
    },
    // 地图类型，如果有值显示此参数的值，否则是默认参数配置里的值
    mtype: {
      type: String,
      default: ''
    },
    // 显示楼层 2D
    floor: {
      type: Object,
      default() {
        return {
          show: false, // 是否显示楼层
          floorId: 1 // 楼层
        }
      }
    },
    // 开发传的地图路径,方便调试,本地开发用不能提交
    devUrl: {
      type: String,
      default: ''
    },
    // 批量画楼层控件位置X
    toolOffsetX: {
      type: Number,
      default: 20
    },
    // 批量画楼层控件位置Y
    toolOffsetY: {
      type: Number,
      default: 20
    },
    // 是否批量画
    batchTool: {
      type: Boolean,
      default: false
    },
    // 是否SDK批量画工具
    sdkBatchDrawTool: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buildingId: '',
      mapType: '',
      drawTool: {},
      data: {},
      isDraw: false,
      marker: {},
      currentBuildingId: '',
      distance: 15,
      stretchHeight: 20,
      isChangeFlag: false,
      btnLoading: false,
      markerList: [],
      isStartDraw: false,
      isDrawMarker: false,
      mapObj: {},
      mapSdkObj: {}
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    stretchHeight: {
      deep: true,
      immediate: true,
      handler() {
        if (this.marker && this.marker.stretchHeight) {
          this.$set(this.marker, 'stretchHeight', this.stretchHeight)
          this.setData()
        }
      }
    }
  },
  methods: {
    async init() {
      await this.getBuildingIdAndMapType()
      this.mapType = this.mtype || this.mapType
      this.initialization()
    },
    handlerMapDestroyed() {
      this.setDrawFlag(false)
      if(map) {
      try {
          map.destroy();
        } catch (error) {
          console.log(error)
        }
      }
    },
    setDrawFlag(flag) {
      this.isStartDraw = flag
      this.isDraw = flag
    },
    // 处理器
    async initialization() {
      this.btnLoading = true
      mapSdk =
        this.mapType === '3D'
          ? window.jsmap
          : this.mapType === '2.5D'
          ? window.jsmapbase
          : window.jsmaplight
      this.mapSdkObj = mapSdk
      const option = {
        container: 'joysuch',
        mapServerURL:
          (this.devUrl ? this.devUrl : window.location.origin) + `/map-data`, // 'http://172.16.5.175/3dmap',
        mapScaleLevelRange: [15, 24],
        viewOptions: {
          distance: this.distance * 1,
          rotate: 0,
          tilt: 60
        },
        defaultTiltAngle: 60,
        showLoading: false,
        defaultRotateAngle: 0,
        showBuildingMarker: true,
        floorControlOptions: {
          floorHeight: 20, //楼层间距
          position: mapSdk.JSControlPosition.RIGHT_TOP, //控件位置
          allLayers: true,
          offset: {
            x: 10,
            y: 10
          } //控件偏移位置
        }
      }
      boxMarker =
        this.mapType === '2D' ? mapSdk.JSPolygonMarker : mapSdk.JSBoxMarker
      map = new mapSdk.JSMap(option)
      this.mapObj = map
      setTimeout(() => {
        // http://192.168.0.211:20000/map-data//202272/3d/mapConfig.conf
        map.openMapById(
          `${this.buildingId}/${(this.mtype
            ? this.mtype
            : this.mapType
          ).toLowerCase()}`
        )
      }, 500)
      map.on('loadComplete', this.loadComplete)
      map.on('mapClickNode', this.handlerMapClick)
      map.on('mapScaleLevelChanged', (last, current) => {
        console.log(last + ',' + current)
      })
    },
    // 获取buiildId和地图类型
    async getBuildingIdAndMapType() {
      const buildRes = await this.$axios({
        url: '/api/tiji-system/param/get-by-key',
        method: 'get',
        params: {
          paramKey: 'websocketBuildId'
        }
      })
      const typeeRes = await this.$axios({
        url: '/api/tiji-system/param/get-by-key',
        method: 'get',
        params: {
          paramKey: 'wwyt.server.maptype'
        }
      })
      const distanceRes = await this.$axios({
        url: '/api/tiji-system/param/get-by-key',
        method: 'get',
        params: {
          paramKey: 'wwyt.server.distance'
        }
      })
      this.distance = distanceRes.data.data.paramValue
      this.buildingId = buildRes.data.data.paramValue
      this.mapType = typeeRes.data.data.paramValue
    },
    // 地图点击
    handlerMapClick(event) {
      if (this.mapType === '2.5D') {
        if (this.isDraw) return
        if (this.currentDrawMode === 'point') {
          this.isDrawMarker = true
          this.showMarker(event, {
            floorId: event.floorId
          })
          this.isDraw = true
          this.data = {
            x: event.x,
            y: event.y,
            z: event.z,
            radius: this.radius,
            floorId: event.floorId,
            buildingId: map.focusBuildingId
            // type: this.currentDrawMode
          }
          this.setData()
        } else if (this.currentDrawMode === 'polygon') {
          this.points.push({
            x: event.x,
            y: event.y,
            z: event.z
          })
          if (this.marker.width) {
            map.removeMarker(this.marker)
          }
          this.floorId = event.floorId
          this.marker = new mapSdk.JSLineMarker({
            id: 'line',
            position: this.points,
            width: 5,
            floorId: event.floorId,
            color: '#3cff2e',
            strokeColor: '#f2ff50',
            strokeWidth: 1,
            lineType: window.jsmapbase.JSLineType.FILL,
            smooth: true,
            show: true
          })
          map.addMarker(this.marker)
        }
      }
    },
    // 地图加载前
    loadComplete() {
      if (this.batchTool) {
        this.batchDrawTool()
      } else {
        this.setDrawTool()
      }
      if (this.mapType !== '3D') {
        var ctlOpt = new mapSdk.JSFloorControl({
          position: mapSdk.JSControlPosition.LEFT_TOP,
          //默认显示楼层的个数 TODO
          showBtnCount: 3,
          //初始是否是多层显示，默认单层显示
          allLayers: false,
          // // 是否显示多层/单层切换按钮
          needAllLayerBtn: true,
          //位置x,y的偏移量 TODO
          offset: {
            x: 20,
            y: 62
          }
        })
        map.addControl(ctlOpt)
      }
      if (!this.isChangeFlag) this.$emit('loadComplete', this.mapType)
      else {
        if (this.data.floorId) {
          this.showMarker(this.data, {
            floorId: this.data.floorId,
            buildingId: this.data.buildingId,
            type: this.currentDrawMode
          })
        }
        this.$emit(
          'changeMapType',
          {
            data: this.data,
            mapType: this.mapType
          },
          this.mapType
        )
      }
      this.btnLoading = false
    },
    // 画地图
    drawerModule() {
      this.isStartDraw = true
      this.currentBuildingId = map._map._currentBuildingId
      if (this.currentDrawMode === 'polygon') {
        if (this.mapType === '3D' || this.mapType === '2D') {
          this.drawTool.activate(mapSdk.JSDrawMode.POLYGON)
        } else if (this.mapType === '2.5D') {
          this.points = []
        }
      } else if (this.currentDrawMode === 'point') {
        if (this.mapType === '3D' || this.mapType === '2D') {
          this.drawTool.activate(mapSdk.JSDrawMode.POINT)
        }
      }
    },

    // 设置画的控件
    setDrawTool() {
      this.drawTool = new mapSdk.JSDrawTool(map, {
        clampToGround: true, //是否贴地
        callback: geometry => {
          this.isStartDraw = false
          if (this.currentDrawMode === 'point') {
            if (this.marker.floorId !== undefined) map.removeMarker(this.marker)
            this.data = {
              x: geometry.x,
              y: geometry.y,
              z: map.focusFloorId == 1 ? geometry.z : 6,
              radius: this.radius,
              floorId: map.focusFloorId,
              buildingId: map.focusBuildingId,
              outSide:
                map.focusFloorId == -1
                  ? 1
                  : map.focusBuildingId === '000000'
                  ? 2
                  : 0
              // type: this.currentDrawModev
            }
            this.$nextTick(() => {
              this.drawTool.clear()
              this.drawerModule()
            })
          } else if (this.currentDrawMode === 'polygon') {
            const obj = {}
            const points = geometry.points.map(item => {
              return {
                x: item.x,
                y: item.y,
                z: item.z
              }
            })
            obj.points = points
            this.data = {
              points,
              floorId: map.focusFloorId,
              buildingId: map.focusBuildingId,
              outSide:
                map.focusFloorId == -1
                  ? 1
                  : map.focusBuildingId === '000000'
                  ? 2
                  : 0
              // type: this.currentDrawMode
            }
            this.drawTool.clear()
          }
          this.isDrawMarker = true
          this.showMarker(this.data, {
            floorId: map.focusFloorId,
            buildingId: map.focusBuildingId,
            type: this.currentDrawMode
          })
          this.isDraw = true
          this.setData()
        }
      })
    },
    // 2.5D 画面结束
    drawEndPolygon() {
      if (this.marker) {
        map.removeMarker(this.marker)
      }
      this.isDraw = true
      this.isDrawMarker = true
      this.showMarker({ points: this.points }, { floorId: this.floorId })
      this.data = {
        points: this.points,
        floorId: this.floorId,
        buildingId: map.focusBuildingId,
        type: this.currentDrawMode
      }
      this.setData()
    },
    // 展示marker
    showMarker(geometry, conf, drawType) {
      if (!this.data.floorId) {
        this.data = geometry
      }
      let marker = {}
      if (this.currentDrawMode === 'point' || drawType === 'point') {
        console.log(conf.floorId)
        marker = new mapSdk.JSImageMarker({
          id: 'demoMap',
          floorId: conf.floorId,
          position: {
            x: geometry.x,
            y: geometry.y,
            z: geometry.z || 0
          },
          width: 30,
          height: 30,
          nearFarScale: new jsmap.JSNearFarScale(0.1, 1, 500, 0.5),
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABWCAYAAACO7cvVAAAG4klEQVR4nO2cbYxcVRnHf8/MbGuctFtMt3eWt5ZCKSIqKSirsNbYEIkYbM22xtC0M1srKlHhgwQ/GBtNtBJDKiStEtw7lgSUxbhtNQhJSYqVBARqqYZSxQLtrjPbtw10S6U78/hhqNLu7HbPy713Ptxfsl9mz/M/z/nPOXfuOfecCykpKSkpKSkpKSkpKSkpKSkpKbEiSSfQEeoCgS6Ba4ACcCHKBxDagTwwCrwJHAUOABWFF+oZnj28WvYll3lC5gUP6lWSpUdhKfBRB6ndomzROv3Vr8jffOU3VWI1rxDqcoXbgCURyD8l8PNKSfoj0G5KLOYV+rRHhbtpDM2oeUGU9ZVeeSzqiiI1L9isl1DjXhrDM262kOXO6irZH1UFkZn3bm8r07joJ8WoKMWoemEmCtEg1B+r0E+yxgHkVegPQl0fhbj3nheUtQ+l5FvXFYVfDZek6FPTq3lBqL8GvuRT0zP91ZKs8CXmbdgWQt1EaxsHsDwI9QFfYl7MK5T1LoWv+dCKgbVBn37Xh5DzsO0s6zV15XkfycSJZLiuslqec9Fw63nrNFdXtjppJITWGfjQozrNRcPJvGAuG4HzXTQSpPPwKJtcBKyHbRDqh4GXXCpvBbTO1cNrZLdNrH3PE/qsY1uJjH07rMybU9brUa61rbSVEFjU8Uu9wSbWyjyp80ObuFYlk7Frj/E1r+NBvSyT5R82lZ2LfBss7oRFHTC/HWa2wYkxqJyA5w/B9oNw5GQUNUO2zhVDa+QVk5iccSVZVqpp0DmYOQ3u+AisuAxmv695mVULYfQU9L8K9+2BoVG/OdSyrAS+ZxJjM2y/bBEzIZ+9CHYshW9cNbFxp8m3QfEKeHopfH6ezywANZ9aGg3bjlAXZMDbQ5fVC+Enn7CPX/8ibPB4s2Q6dI16Xlax+lVqxrL5bsYB3L0IVl7uJx+AmtBtUt7IPBWuN0unOZ152PQpH0rw00/CvBl+tEzbZ3rN+6Bh+abc0+VD5f9s8DQexLB9pubNNSw/jnkz4MaLXFXOpCuAK8/zInWxSWFT8wqG5cdxyyWuCs3pudSLTGBS2NS8rGH5cXR3uio059o5XmSM/Ijk6dlkzPV0cT+b+TOhLebWxFrd+3ONKVcUTM82bqLjJFbzTtWh5ntu9x5q9ei0mxG7ecNvR6N99CS8dSoa7YkwNe8d1wr3HHVVaM7eES8yRvabmjdkWH4c2w+6KjTn8Te8yPzbpLDZ9AycU/zD63Dc8/A6VYdtr7nriJi1z7Tn7TEsP46xOvzoRVeVM7lnV2OtzxnFaHepkXkCO82yaU7fy7DniA8l2DcC9zt/pQ1UedqkvJF5uTE/5gGseBKqjr+8R05CzxN+8gHI1fiTSXkj8wbXykEFL4Pu2H/gc7+HVyx/JV99E27c5u/WR5Rdg2vF6OfM/D5PeNg4ZgIGR2HJVijvNYsL98KSLZ6fYwiPmIcYMvsh7cyOud+ynM3CWY2VkSUXwuXtkHvP1/pODV4+Bk8NwsB++946GbU6FxxeI0btstpuMaes/aL02MROhQvycGk75HNw6G04cNz9+jgpyu+qvfJF0zDjR48AGVinRGfe4GjjLzaE79uEWc1tK0X5u8AfbWJbkCerJbG62bFeGMgoX7WNbSWyWdbaxlqbN9QrB9Syu7cKovxgaJVYTzmdt9UGoe4CrnbVSYCXqiVxOTTovp5Xq3MzEPMypDu5MW521XA27/AaGUJY5qoTJwrLTGcTzfCyklwtylZVvuNDK2oE7houyYAnLX8EZb0X5U6fmp75WbUkd/gS83/2LNQNwLd963rg/mpJvuVTMJIjo0Go9wHfjELbBoWNwyW53bdudOdty7pRla9HpT9llAeqvXJbFNLRnvRO+PiowEOVkqyKUD9agrI+jPrdijsllEervRLpKcxYXtAQ9OlvELydcz0XKjw2XJTlUdcT26tBCqH+VsF4zcwYy7U5G2J9r0oQ6gDwhQir2FYtyS0R6p9B7G/0KYT6uMJNvnUFnqiUxLvuOeqMnyDU7cBnPEruqJbk0x71pkRiL+KaE+oOAec98SLsrBTF6AiAL2LfGXqa4ZIsFnF+iP7nymss9pKQBYm/Ai4IdSdYne94plrkBkQi3C45OYn1vNNUi3QDpi9K+Ev1dbqTNA5awDxEdHaebuCvU4zYPeMtulknia9eJz5sTxNs1jw1ngOunKTY3voJPnbodjkeV16T0TLmAZz3C21vm8azAgvP/p/AvpNw3UhJIthsYUdLmQcwK9RZ0xvXwAX/+1D45/Q2Pv7GrXIsuczGk/w17yxGSjLSVqML+Ne7H+3PCV2tZlxLc/5mvTgIdaAQ6rykc5mI/wI6ktrDOXXgUwAAAABJRU5ErkJggg==',
          depthTest: this.depthTest, //是否开启深度检测
          judgeInOrOutDoor: !this.buldingLock
        })
      } else if (this.currentDrawMode === 'polygon' || drawType === 'polygon') {
        let color = 'rgba(0,100,255,0.7)'
        let strokeColor = 'rgba(14, 114, 255)'
        marker = new boxMarker({
          id: 'demoMap',
          position: geometry.points,
          floorId: conf.floorId,
          nearFarScale: new jsmap.JSNearFarScale(0.1, 1, 500, 0.5),
          stretchHeight: geometry.stretchHeight || this.stretchHeight || 20,
          strokeColor: strokeColor,
          color: color
        })
        if (geometry.stretchHeight)
          this.stretchHeight = geometry.stretchHeight || 20
        this.isDraw = true
      }
      this.marker = marker
      map.addMarker(marker)
      if (!this.isDrawMarker) {
        this.$nextTick(() => {
          map.flyToMarker(marker)
        })
      } else {
        this.isDrawMarker = false
      }
    },
    // markerList
    // 不保存
    showMarkerNoSave(geometry, conf, drawType) {
      let marker = {}
      if (drawType === 'point') {
        marker = new mapSdk.JSImageMarker({
          id: 'demoMap',
          floorId: conf.floorId,
          position: {
            x: geometry.x,
            y: geometry.y,
            z: geometry.z || 0
          },
          width: 30,
          height: 30,
          image:
            'data:image/png;base64,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',
          depthTest: this.depthTest, //是否开启深度检测
          judgeInOrOutDoor: !this.buldingLock
        })
      } else if (drawType === 'polygon') {
        let color = 'rgba(0,100,255,0.7)'
        let strokeColor = 'rgba(14, 114, 255)'
        marker = new boxMarker({
          id: 'demoMap',
          position: geometry.points,
          floorId: conf.floorId,
          stretchHeight: geometry.stretchHeight || this.stretchHeight || 20,
          strokeColor: strokeColor,
          color: color
        })
        console.log(
          '%c [ marker ]-448',
          'font-size:13px; background:pink; color:#bf2c9f;',
          marker
        )
      }
      this.markerList.push(marker)
      map.addMarker(marker)
    },
    // 清楚markerList
    clearMarkerList() {
      console.log(this.markerList, '===============DDDDDDDDDDDD===========')
      this.markerList.forEach(marker => {
        map.removeMarker(marker)
      })
      this.markerList.length = 0
    },
    setData() {
      if (this.data.floorId !== undefined) {
        if (this.stretchHeight) {
          this.$set(this.data, 'stretchHeight', this.stretchHeight)
        }
        // locationArea
        this.$emit('getlocation', this.data)
      } else {
        this.$emit('getlocation', '')
      }
      this.show = false
    },
    // 重置画图
    resetDraw() {
      this.isDraw = false
      if (this.data.floorId) map.removeMarker(this.marker)
      this.data = {}
      this.setData()
    },
    // 面标注
    addPolyMarker(params) {
      let that = this
      var marker = new mapSdk.JSPolygonMarker({
        id: params.id,
        position: params.position,
        floorId: params.floorId,
        color: params.color || 'rgba(255, 0, 0,0.52)',
        strokeColor: params.strokeColor || '#ff0000',
        strokeWidth: params.strokeWidth || 4,
        depthTest: false,
        properties: params.properties,
        callback: () => {
          if (params.label) {
            let center = getPolygonCenter(params.position)
            that.addDomMarker({
              content: `<span style="color:#EAFF00;font-size:14px;display:inline-block;width:max-content;">${params.name}</span>`,
              floorId: params.floorId,
              position: {
                x: center.x,
                y: center.y,
                z: center.z
              }
            })
          }
        }
      })
      map.addMarker(marker)
      if (params.fly) {
        setTimeout(() => {
          map.flyToMarker(marker)
        })
      }
      return marker
    },
    // 画区域
    setMapPolygonMarker(data, prop) {
      if (!(data && data.points)) return
      var polygonMarker = new mapSdk.JSPolygonMarker({
        id: 'polygon' + data.id,
        position: data.points,
        floorId: this.floor.show ? data.floorId : 1, // 如果显示楼层用传入区域的楼层，如果不用楼层默认1
        color: prop.color || 'rgba(255, 0, 0,0.52)', // 填充颜色
        strokeColor: prop.strokeColor || '#FF0000', // 边线颜色
        properties: {
          test: 'polygonTest'
        },
        callback: marker => {
          console.log(marker)
        }
      })
      map.addMarker(polygonMarker)
    },
    setDomMarker(data) {
      const domMarker = new mapSdk.JSDomMarker({
        id: 'domMarker' + data.id,
        position: new mapSdk.JSPoint(data.location.x, data.location.y, 0),
        floorId: this.floor.show ? data.floorId : 1,
        depthTest: true,
        content: data.content,
        offset: mapSdk.JSControlPosition.CENTER,
        marginOffset: {
          x: 0,
          y: 0
        },
        properties: {
          id: data.id
        },
        callback: node => {
          console.log(node)
        }
      })
      map.addMarker(domMarker)
    },
    // DOM标注
    addDomMarker(params) {
      let marker = new mapSdk.JSDomMarker({
        id: params.id,
        position: params.position,
        floorId: params.floorId,
        content: params.content || '',
        marginOffset: { x: 0, y: 0 },
        alwaysShow: true,
        properties: params.properties
      })
      map.addMarker(marker)
      return marker
    },
    // 显示路线
    setLineMarker(data) {
      const lineMarker = new mapSdk.JSLineMarker({
        id: 'line',
        position: data,
        width: 5,
        floorId: 1,
        color: '#FFFF00',
        show: true,
        properties: {
          test: 0
        },
        callback: marker => {
          console.log(marker)
        }
      })
      map.addMarker(lineMarker)
    },
    // 添加元素
    addMarker(item, index) {
      const imagerMarker = new mapSdk.JSImageMarker({
        image: item.image,
        position: new mapSdk.JSPoint(item.location.x, item.location.y, 0), // longitude
        width: 25,
        height: 42,
        floorId: 1,
        show: true,
        properties: {
          index: index
        }
      })
      map.addMarker(imagerMarker)
      const domMarker = new mapSdk.JSDomMarker({
        position: new mapSdk.JSPoint(item.location.x, item.location.y, 0),
        floorId: 1,
        depthTest: true,
        content: item.content,
        offset: mapSdk.JSControlPosition.CENTER_BOTTOM,
        marginOffset: {
          x: 0,
          y: -34,
          z: 0
        },
        properties: {
          index: index
        }
      })
      this.map.addMarker(domMarker)
      return {
        imagerMarker,
        domMarker
      }
    },
    removeAllMarker() {
      map.removeAllMarker()
    },
    // 类型改变
    changeMapType() {
      this.isChangeFlag = true
      this.handlerMapDestroyed()
      this.initialization()
    },
    // 清楚画图操作
    deactivate() {
      this.drawTool.deactivate();
    },
    // 开始画 (2D)
    drawStart2D() {
      d2DrawTool.activate(mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()])
    },
    // 开始编辑 (2D)
    drawEdit2D() {
      d2DrawTool.edit()
    },
    // 停止编辑 (2D)
    drawEnd2D() {
      d2DrawTool.stop()
    },
    // 清空 (2D)
    drawReset2D() {
      d2DrawTool.clear()
    },
    // SDK里的批量画图工具(3D)
    batchDrawToolSdk() {
      //初始化实例
      map.buildingSelected = false
      map.selectedEffect = false
      sdkDrawTool = new mapSdk.JSDrawToolControl({
        position: mapSdk.JSControlPosition.RIGHT_TOP,
        offset: {
          x: 20,
          y: 10
        },
        drawMode: mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()],
        callback: feature => {
          this.$emit('batchAdd', feature)
        },
        removeCallback: feature => {
          this.$emit('batchRemove', feature)
        },
        editCallback: feature => {
          this.$emit('batchEdit', feature)
        },
        locateCallback: feature => {
          this.$emit('batchLocate', feature)
        },
      })
      map.addControl(sdkDrawTool)
    },
    // SDK里的编辑工具(2D)
    /* batchDrawEditTool() {
      d2DrawTool = new mapSdk.JSEditTool(map, {
        callback: markerData => {
          d2DrawTool.stop()
          d2DrawTool.activate(
            mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()]
          )
        },
        editCallback: markerData => {
          d2DrawTool.stop()
          d2DrawTool.activate(
            mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()]
          )
        }
      })
    }, */
    // 自定义批量画组件(3D)
    addCustomTool() {
      batchGraphicData = []
      map.buildingSelected = false
      customDrawTool = new mapSdk.JSCustomDrawToolControl({
        perPositionHeight: true, //true为返回实际z 默认false,z值为0
        position: mapSdk.JSControlPosition.RIGHT_TOP,
        offset: {
          x: this.toolOffsetX,
          y: this.toolOffsetY
        },
        showBtnCount: 7,
        drawMode: mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()],
        callback: feature => {
          // console.log('add', feature);
          // 默认给一个uuid用于查找
          let uuid = feature.properties.id
          // 设置室内外数据
          let inout = getFloorInOrOut(feature.properties.floorNo)
          // 格式化点位
          let points = doubleArrToArr(
            this.currentDrawMode === 'polygon'
              ? feature.geometry.coordinates[0]
              : feature.geometry.coordinates
          )
          // 拼接返回数据
          let data = Object.assign(
            {
              points: points,
              uuid: uuid,
              inout: inout
            },
            feature.properties
          )
          batchGraphicData.push(data)
          this.$emit('batchAdd', data)
        },
        removeCallback: feature => {
          // console.log('remove', feature);
          // 删除本地数据，与外层列表保持一致
          let idx = batchGraphicData.findIndex(
            v => v.id === feature.properties.id
          )
          if (idx > -1) {
            batchGraphicData.splice(idx, 1)
          }
          this.$emit('batchRemove', feature)
        },
        editCallback: feature => {
          // console.log('edit',feature);
          // 设置室内外数据
          let inout = getFloorInOrOut(feature.properties.floorNo)
          // 格式化点位
          let points = doubleArrToArr(
            this.currentDrawMode === 'polygon'
              ? feature.geometry.coordinates[0]
              : feature.geometry.coordinates
          )
          // 从本地数据中取出uuid，
          let row = batchGraphicData.find(v => v.id === feature.properties.id)
          let uuid = row ? row.uuid : null
          let data = Object.assign(
            {
              points: points,
              uuid: uuid,
              inout: inout,
              name: ''
            },
            feature.properties
          )
          this.$emit('batchEdit', data)
        },
        locateCallback: () => {
          // console.log('locate',feature);
        }
      })
      map.addControl(customDrawTool)
    },
    // 自定义绘图工具(2D)
    addDrawTool() {
      batchGraphicMap = {}
      d2DrawTool = new mapSdk.JSDrawTool(map, {
        callback: geometry => {
          d2DrawTool.clear()
          d2DrawTool.activate(
            mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()]
          )
          if (!geometry) {
            return
          }
          // 默认给一个uuid用于查找
          let uuid = getUuid()
          // 格式化点位
          let points = geometry.points
          // 楼层
          var floorId = map.focusFloorId
          // 设置室内外数据
          let inout = getFloorInOrOutById(floorId)
          // marker
          var marker = this.addPolyMarker({
            id: uuid,
            position: points,
            floorId: floorId
          })
          batchGraphicMap[uuid] = marker
          // 拼接返回数据
          let data = {
            id: uuid,
            uuid: uuid,
            points: points,
            floorId: floorId || 1,
            floorNo: setAbbFloorNo(floorId),
            inout: inout,
            openRailId: '',
            name: ''
          }
          this.$emit('batchAdd', data)
        }
      })
    },
    // 批量画
    batchDrawTool() {
      if (this.mapType == '3D') {
        if (this.sdkBatchDrawTool) {
          this.batchDrawToolSdk()
        } else {
          // this.addCustomTool()
        }
      } else if (this.mapType == '2D') {
        this.addDrawTool()
        // this.batchDrawEditTool()
      }
    },
    // 批量-（根据uuid）获取属性id
    getIdByUuid(uid) {
      let item = batchGraphicData.find(v => v.uuid === uid)
      return item ? item.id : null
    },
    // 批量-（根据uuid）获取marker
    getMarkerByUuid(uid) {
      return batchGraphicMap[uid] || null
    },
    // 批量画-开始
    btachStartDraw() {
      if (this.mapType == '3D') {
        customDrawTool.startDraw()
      } else {
        currentDrawMode = mapSdk.JSDrawMode[this.currentDrawMode.toUpperCase()]
        d2DrawTool.activate(currentDrawMode)
      }
    },
    // 批量画-停止
    batchStopDraw() {
      if (this.mapType == '3D') {
        customDrawTool.stopDraw()
      } else {
        d2DrawTool.activate(null)
        // d2DrawTool.stop();
        currentDrawMode = null
      }
    },
    //删除绘图工具(3D)
    batchDelTool() {
      try {
        if (this.mapType == '3D') {
          if (!customDrawTool) {
            return
          }
          map.buildingSelected = true
          map.removeControl(customDrawTool)
          customDrawTool = null
        } else {
          if (!d2DrawTool) {
            return
          }
          d2DrawTool.destroy()
          d2DrawTool = null
        }
      } catch (error) {
        console.log(error)
      }
      console.log('删除绘图控件')
    },
    // 批量画-编辑
    batchEdit(uid) {
      if (this.mapType == '3D') {
        let id = this.getIdByUuid(uid)
        if (!id) {
          return
        }
        customDrawTool.deactivate()
        customDrawTool.locateGraphicById(id)
        customDrawTool.editGraphicById(id)
        // 编辑editGraphicById(id,fire)  id: ID, fire:是否调用editCallback,默认true
      }
    },
    // 批量画-更新属性
    batchUpdateProperty(uid, key, value) {
      if (this.mapType == '3D') {
        if (this.mapType == '3D') {
          let id = this.getIdByUuid(uid)
          if (!id || !key || !value) {
            return
          }
          customDrawTool.updateGraphicProperty(id, key, value)
          // 属性更改： updateGraphicProperty(id,key,value,fire) fire: 是否调用editCallback,默认true
        }
      } else {
        var labelmarker = this.getMarkerByUuid(uid + 'label')
        if (labelmarker) {
          labelmarker.content = `<span style="color:#EAFF00;font-size:14px;display:inline-block;width:max-content;">${value}</span>`
        } else {
          var marker = this.getMarkerByUuid(uid)
          let center = getPolygonCenter(marker.position.points)
          batchGraphicMap[uid + 'label'] = this.addDomMarker({
            content: `<span style="color:#EAFF00;font-size:14px;display:inline-block;width:max-content;">${value}</span>`,
            floorId: marker.floorId,
            position: {
              x: center.x,
              y: center.y,
              z: center.z
            }
          })
        }
      }
    },
    // 批量画-定位
    batchLocate(uid) {
      if (this.mapType == '3D') {
        let id = this.getIdByUuid(uid)
        if (!id) {
          return
        }
        customDrawTool.locateGraphicById(id)
        // 定位 locateGraphicById(id,fire) fire: 是否调用locateCallback,默认true
      } else {
        var marker = this.getMarkerByUuid(uid)
        if (marker) {
          this.flyToMarker(marker)
        }
      }
    },
    // 聚焦点位
    flyToMarker(marker) {
      if (marker) {
        map.flyToMarker(marker)
      }
    },
    // 删除标记(通用)
    removeMarker(marker) {
      if (marker) {
        map.removeMarker(marker)
      }
    },
    // 批量画-单个删除
    batchDeleteSingle(uid) {
      if (this.mapType == '3D') {
        let id = this.getIdByUuid(uid)
        if (!id) {
          return
        }
        customDrawTool.deleteGraphicById(id)
        // deleteGraphicById(id,fire) fire: 是否调用removeCallback,默认true
      } else {
        var marker = this.getMarkerByUuid(uid)
        if (marker) {
          this.removeMarker(marker)
        }
        var label = this.getMarkerByUuid(uid + 'label')
        if (label) {
          this.removeMarker(label)
        }
      }
    },
    // 批量画-全部清除
    batchDeleteAll() {
      if (this.mapType == '3D') {
        batchGraphicData = []
        if (!this.sdkBatchDrawTool) {
          customDrawTool.clear()
        }
      } else {
        batchGraphicMap = {}
        d2DrawTool && d2DrawTool.clear()
      }
    },
    // 批量画-导入
    batchImportPoints(data) {
      if (this.mapType == '3D') {
        if (!this.sdkBatchDrawTool) {
          customDrawTool.addGraphic(data)
        } else {
          sdkDrawTool.addGraphic(data)
        }
      } else {
        data.map(v => {
          batchGraphicMap[v.openRailId] = this.addPolyMarker({
            id: v.openRailId,
            position: v.points,
            floorId: v.floorId,
            properties: v.properties
          })
          let center = getPolygonCenter(v.points)
          batchGraphicMap[v.openRailId + 'label'] = this.addDomMarker({
            content: `<span style="color:#EAFF00;font-size:14px;display:inline-block;width:max-content;">${v.name}</span>`,
            floorId: v.floorId,
            position: {
              x: center.x,
              y: center.y,
              z: center.z
            }
          })
        })
      }
    },
    // SDK批量导入数据
    importBatchData(data) {
      if (this.sdkBatchDrawTool) {
        sdkDrawTool.addGraphic(data)
      }
    }
  },
  destroyed() {
    map.destroy()
    map = null
  }
});

// CONCATENATED MODULE: ./packages/jsmap/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_jsmapvue_type_script_lang_js_ = (jsmapvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/jsmap/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  packages_jsmapvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var packages_jsmap = (component.exports);
// CONCATENATED MODULE: ./packages/jsmap/index.js


/* istanbul ignore next */
packages_jsmap.install = function (Vue) {
  Vue.component(packages_jsmap.name, packages_jsmap)
}

/* harmony default export */ var packages_jsmap_0 = __webpack_exports__["default"] = (packages_jsmap);


/***/ })

/******/ });