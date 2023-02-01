<template>
  <div class="upload-inline-block">
    <el-button
      size="small"
      class="btn-mr"
      icon="el-icon-upload"
      @click="showImportDialog"
      v-if="permissionImport"
    >{{importBtnName}}</el-button>
    <el-button
      v-if="(templateList.length===0 || singleExportBtn) && permissionExport"
      size="small"
      class="btn-mr"
      style="margin-left: 0"
      icon="el-icon-download"
      @click="exportExcelData(exportUrl)"
    >{{exportBtnName}}</el-button>
    <div v-for="(item, index) in templateList" :key="index" class="upload-inline-block">
      <el-button
        v-if="item.permissionExport"
        size="small"
        style="margin-left: 0"
        class="btn-mr"
        icon="el-icon-download"
        @click="exportExcelData(item.exportUrl)"
      >{{item.exportBtnName}}</el-button>
    </div>
    <el-dialog
      :title="dialogTitle"
      v-dialogDrag
      @close="closeImportDialog"
      :visible.sync="dialogShow"
      class="avue-dialog avue-dialog--top avue-loading"
      width="40%"
    >
      <div
        v-loading="loading"
        element-loading-background="#FFFFFF"
        element-loading-spinner="el-icon-loading"
        element-loading-text="正在导入，请不要关闭页面，预计需要一段时间，还请耐心等待…"
      >
        <ExportTipsModel
          :showFlag="showFlag"
          :recordContent="recordContent"
          :fileList="fileList"
          :templateList="templateList"
          :templateName="templateName"
          :isRickControl="isRickControl"
          :msg="msg"
          @downloadTemplate="download"
          @transmitList="transmitList"
          @setFileList="setFileList"
          @downLoadEorreResult="downLoadEorre"
          @getTemplateValue="getTemplateValue"
          ref="exportModelRef"
        ></ExportTipsModel>
      </div>
      <div class="avue-dialog__footer">
        <el-button
          size="small"
          v-show="showFlag===1"
          :disabled="loading?true:false"
          @click="closeImportDialog"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="loading?true:false"
          v-show="showFlag==1"
          @click="submitUpload"
        >{{submitTitle}}</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="loading?true:false"
          v-show="showFlag==2||showFlag==3"
          @click="closeImportDialog"
        >{{submitTitle}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { downloadFileBlob } from './util'
import ExportTipsModel from './export-tips-model.vue'
export default {
  name: 'TijiImportExport',
  components: {
    ExportTipsModel
  },
  props: {
    token: {
        type: String,
        default: ''
    },
    // 导入数据权限
    permissionImport: {
      type: Boolean,
      default: false
    },
    // 导出数据权限
    permissionExport: {
      type: Boolean,
      default: false
    },
    // 导入数据按钮名称
    importBtnName: {
      type: String,
      default: '导入数据'
    },
    // 导出数据按钮名称
    exportBtnName: {
      type: String,
      default: '导出数据'
    },
    // 下载接口url
    downloadUrl: {
      type: String,
      default: ''
    },
    // 数据导入接口
    importUrl: {
      type: String,
      default: ''
    },
    // 数据导出接口
    exportUrl: {
        type: String,
        default: ''
    },
    // 多个模板集合
    templateList: {
      type: Array,
      default() {
          return []
      }
    },
    // 下载模板名称
    templateName: {
      type: String,
      default: ''
    },
    // 导出数据查询条件
    searchObj: {
        type: Object,
        default() {
            return {}
        }
    },
    // 是否是风险管控导入导出
    isRickControl: {
      type: Boolean,
      default: false
    },
    // 只有一个导出按钮
    singleExportBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      dialogTitle: '导入数据',
      dialogShow: false,
      fileList: [], //上传的文件列表
      formdata: null,
      recordContent: {},
      showFlag: 1,
      submitTitle: '开始导入',
      msg: '',
      templateValue: 1
    }
  },
  computed: {
    template() {
      if(this.transmitList.length===0) return {}
      return this.templateList.find(v=>v.value === this.templateValue)
    }
  },
  methods: {
    // 展示导入的弹窗
    showImportDialog() {
      this.dialogShow = true
      this.$nextTick(() => {
        this.showFlag = 1
        ;(this.formdata = null), (this.submitTitle = '开始导入')
        this.dialogTitle = '导入数据'
      })
    },
    // 关闭导入的弹窗
    closeImportDialog() {
      this.dialogShow = false
      this.fileList = []
    },
    //获取上传的文件数据
    transmitList(val) {
      this.formdata = val
    },
    //设置文件长度
    setFileList(list) {
      this.fileList = list
    },
    // 获取选中的模板值
    getTemplateValue(val) {
      this.templateValue = val
    },
    //下载错误结果
    downLoadEorre() {
      this.$downloadFile(this.recordContent.errorList[0])
        .then(data => {
          let fileName = data.fileName
          downloadFileBlob(data.url, fileName)
        })
        .catch(() => {
          this.$message.error('获取下载链接失败!')
        })
    },
    // 模板下载
    async download() {
      const res = await this.$axios({
        url: this.templateList.length>0 ? this.template.downloadUrl : this.downloadUrl,
        method: 'get',
        responseType: 'blob'
      })
      this.fileChange(res).catch(err => {
        this.$message.error('下载失败')
      })
    },
    submitUpload() {
      if (!this.formdata || !this.formdata.has('file')) {
        this.$message.warning('请上传文件')
        return
      }
      this.importFile()
    },

    importFile() {
      this.loading = true
      this.submitTitle = '导入中'
      this.$axios({
        url: this.templateList.length>0 ? this.template.importUrl : this.importUrl,
        method: 'post',
        timeout: 60000,
        data: this.formdata
      }).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.recordContent = res.data.data
            this.$emit('refresh')
            this.showFlag = 2
          } else {
            this.showFlag = 3
            this.msg = res.msg
          }
          this.submitTitle = '完成'
          this.dialogTitle = '导入结果'
        })
        .catch(Error => {
          if (Error.message.includes('timeout')) {
            // 判断请求异常信息中是否含有超时timeout字符串
            this.dialogShow = false
            this.$message.warning('网络请求超时请稍后重试!')
          } else {
            this.submitTitle = '完成'
            this.showFlag = 3
            this.msg = '请确保导入模板正确，请重新导入'
          }
          this.loading = false
        })
    },
    //数据导出
    exportExcelData(exportUrl) {
      this.$axios({
        url: exportUrl,
        method: 'get',
        timeout: 60000,
        responseType: 'blob',
        params: this.searchObj
      }).then(res => {
          this.fileChange(res)
        })
        .catch(err => {
          this.$message.error('下载失败')
        })
    },
    //文件流转换成表格
    fileChange(res) {
      const link = document.createElement('a')
      let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      // 省略代码
      let fileNameEncode = res.headers['content-disposition'].split(
        'filename='
      )[1]
        ? res.headers['content-disposition'].split('filename=')[1]
        : res.headers['content-disposition'].split('fileName=')[1]
      // 解码
      let fileName = decodeURIComponent(fileNameEncode)
      link.download = `${fileName}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      this.$message.success('下载成功')
    }
  }
}
</script>