<template>
  <div>
    <div class="uploadContainer" v-show="showFlag === 1">
      <div :style="`display: ${templateList.length>0 ? 'flex' : 'block'};`">
        <div v-if="templateList.length>0" style="min-width: 200px; max-width: 400px;text-align: left;margin-right: 10px;">
          <div>
            <span style="color: #E27471;margin-right: 4px;">*</span>选择导入模板
          </div>
          <el-radio-group v-model="templateValue" @change="templateChange">
            <el-radio
              v-for="item in templateListPermission"
              :key="item.value"
              :label="item.value"
              :title="item.label"
              style="display: flex; margin-top: 10px;"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="api/tiji-system/post/import"
          :headers="headers"
          drag
          :on-change="uploadByJsqd"
          :on-remove="handleRemove"
          accept=".xlsx"
          :file-list="fileList"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击或者拖动文件到虚线内上传</div>
        </el-upload>
      </div>
      <div class="uplloadTips">
        <div class="uploadTipsTitle">下载模板并按要求填写</div>
        <p class="uploadTipsContent">
          <el-button
            type="text"
            @click="download"
          >{{templateList.length>0 ? (templateList.find(v=>v.value===templateValue)||{}).templateName :templateName}}</el-button>
        </p>
        <div class="uploadTipsDetail">
          <p class="uploadTipsDetailTitle">注意事项：</p>
          <p>1、请不要改动导入模板</p>
          <p>2、请按照模板的字段要求进行填写</p>
          <p>3、文件大小不要超过10M</p>
          <p v-if="isRickControl">4、下载模板前请先配置评估方法</p>
        </div>
      </div>
    </div>
    <div class="uploadEreor" v-show="showFlag === 2">
      <div>
        <div class="uploadEreorImg">
          <img v-if="recordContent.successNum > 0" :src="successImg" />
          <img v-if="recordContent.successNum <= 0" :src="errorImg" />
        </div>
        <div class="uploadEreorTips" v-show="recordContent.total>0">
          总计{{ recordContent.total }}条数据，成功导入
          <span style="color: #5072FF">{{recordContent.successNum }}</span>条，失败
          <span style="color: red">{{ recordContent.errorNum }}</span>条
        </div>
        <div class="uploadEreorTips" v-show="recordContent.total==0">当前模板数据为空，无法导入，请确认模板</div>
        <div
          v-show="recordContent.errorNum && recordContent.errorNum > 0"
          @click="downLoadEorre"
          class="uploadEreorBtn"
        >下载导入失败数据</div>
      </div>
    </div>
    <div class="uploadEreor" v-show="showFlag === 3">
      <div>
        <div class="uploadEreorImg">
          <img :src="errorImg" />
        </div>
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { errorImg, successImg } from './util'
export default {
  props: {
    token: {
      type: String,
      default: ''
    },
    showFlag: {
      type: Number,
      default: 1
    },
    recordContent: {
      type: Object,
      default() {
        return {}
      }
    },
    templateList: {
      type: Array,
      default() {
        return []
      }
    },
    templateName: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: []
    },
    msg: {
      type: String,
      default: ''
    },
    // 是否是风险管控导入导出
    isRickControl: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      headers: {
        'Blade-Auth': 'bearer ' + this.token
      },
      formdata: null,
      successImg: successImg,
      errorImg: errorImg,
      templateValue: 1
    }
  },
  computed: {
      templateListPermission() {
          if(this.templateList.length===0) return []
          return this.templateList.filter(v=> v.permissionImport)
      }
  },
  methods: {
    templateChange(val) {
      this.$emit('getTemplateValue', val)
    },
    //下载模板
    download() {
      this.$emit('downloadTemplate')
    },
    //错误结果文件下载
    downLoadEorre() {
      this.$emit('downLoadEorreResult')
    },
    //上传之前校验大小
    beforeAvatarUpload(file) {
      let acceptType = ['xlsx']
      let type = file.name
        .split('.')
        .slice(-1)[0]
        .toLowerCase()
      if (!acceptType.includes(type)) {
        this.$emit('setFileList', [])
        this.$message.warning('目前只支持xlsx格式，暂不支持其他格式！')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        this.$emit('setFileList', [])
        this.$message.warning('文件过大，请上传小于10MB的文件!')
        return false
      }
      return true
    },
    //文件发生改变就会触发的事件
    uploadByJsqd(file, fileList) {
      //判断是否符合beforeAvatarUpload方法中的条件
      if (this.beforeAvatarUpload(file)) {
        if (fileList.length > 0) {
          // this.fileList = [fileList[fileList.length - 1]]//这一步，是 展示最后一次选择文件
          this.$emit('setFileList', [fileList[fileList.length - 1]])
        }
        this.formdata = new FormData()
        this.formdata.append('file', file.raw)
        this.$emit('transmitList', this.formdata)
      }
    },
    //文件对象移除
    handleRemove(file, fileList) {
      this.formdata = new FormData()
      this.$emit('transmitList', this.formdata)
    }
  }
}
</script>
