<template>
  <div class="jsmap">
    <div
      :style="`height: ${height ? height : '720px'};`"
      class="mapDemo"
      style="position: relative;"
    >
      <el-radio-group v-model="mapType" size="small" class="map-type" @change="changeMapType">
        <el-radio-button label="3D"></el-radio-button>
        <el-radio-button label="2D"></el-radio-button>
      </el-radio-group>
      <!-- 非批量画 -->
      <div v-if="!disabled && !batchTool" class="mapBtn" v-loading="btnLoading">
        <el-button
          size="small"
          :disabled="isDraw || isStartDraw"
          type="primary"
          @click="drawerModule"
        >开始画</el-button>
        <el-button
          v-loading="btnLoading"
          :disabled="isDraw"
          v-if="currentDrawMode === 'polygon' && !disabled && mapType !== '3D'"
          size="small"
          type="primary"
          @click="drawEndPolygon"
        >结束画面</el-button>
        <el-button
          size="small"
          v-if="currentDrawMode === 'polygon'"
          :disabled="!isDraw"
          type="primary"
          @click="resetDraw"
        >重置</el-button>
      </div>
      <div
        v-if="currentDrawMode === 'polygon' && data.floorId"
        style="position: absolute;bottom: 20px;right: 0;z-index: 500;"
      >
        <el-slider
          v-model="stretchHeight"
          vertical
          :disabled="disabled"
          :min="1"
          :max="200"
          height="200px"
        ></el-slider>
      </div>
      <div id="joysuch" style="width: 100%; height:100%;"></div>
    </div>
  </div>
</template>
<script>
import {
  doubleArrToArr,
  getUuid,
  setAbbFloorNo,
  getFloorInOrOut,
  getFloorInOrOutById,
  getPolygonCenter
} from './util'
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
export default {
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
            'data:image/png;base64,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',
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
}
</script>