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
/******/ 	return __webpack_require__(__webpack_require__.s = 279);
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

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/import-export/index.vue?vue&type=template&id=853d12f6&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { staticClass: "upload-inline-block" },
    [
      _vm.permissionImport
        ? _c(
            "el-button",
            {
              staticClass: "btn-mr",
              attrs: { size: "small", icon: "el-icon-upload" },
              on: { click: _vm.showImportDialog },
            },
            [_vm._v(_vm._s(_vm.importBtnName))]
          )
        : _vm._e(),
      _vm._v(" "),
      (_vm.templateList.length === 0 || _vm.singleExportBtn) &&
      _vm.permissionExport
        ? _c(
            "el-button",
            {
              staticClass: "btn-mr",
              staticStyle: { "margin-left": "0" },
              attrs: { size: "small", icon: "el-icon-download" },
              on: {
                click: function ($event) {
                  return _vm.exportExcelData(_vm.exportUrl)
                },
              },
            },
            [_vm._v(_vm._s(_vm.exportBtnName))]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.templateList, function (item, index) {
        return _c(
          "div",
          { key: index, staticClass: "upload-inline-block" },
          [
            item.permissionExport
              ? _c(
                  "el-button",
                  {
                    staticClass: "btn-mr",
                    staticStyle: { "margin-left": "0" },
                    attrs: { size: "small", icon: "el-icon-download" },
                    on: {
                      click: function ($event) {
                        return _vm.exportExcelData(item.exportUrl)
                      },
                    },
                  },
                  [_vm._v(_vm._s(item.exportBtnName))]
                )
              : _vm._e(),
          ],
          1
        )
      }),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          directives: [{ name: "dialogDrag", rawName: "v-dialogDrag" }],
          staticClass: "avue-dialog avue-dialog--top avue-loading",
          attrs: {
            title: _vm.dialogTitle,
            visible: _vm.dialogShow,
            width: "40%",
          },
          on: {
            close: _vm.closeImportDialog,
            "update:visible": function ($event) {
              _vm.dialogShow = $event
            },
          },
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.loading,
                  expression: "loading",
                },
              ],
              attrs: {
                "element-loading-background": "#FFFFFF",
                "element-loading-spinner": "el-icon-loading",
                "element-loading-text":
                  "正在导入，请不要关闭页面，预计需要一段时间，还请耐心等待…",
              },
            },
            [
              _c("ExportTipsModel", {
                ref: "exportModelRef",
                attrs: {
                  showFlag: _vm.showFlag,
                  recordContent: _vm.recordContent,
                  fileList: _vm.fileList,
                  templateList: _vm.templateList,
                  templateName: _vm.templateName,
                  isRickControl: _vm.isRickControl,
                  msg: _vm.msg,
                },
                on: {
                  downloadTemplate: _vm.download,
                  transmitList: _vm.transmitList,
                  setFileList: _vm.setFileList,
                  downLoadEorreResult: _vm.downLoadEorre,
                  getTemplateValue: _vm.getTemplateValue,
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "avue-dialog__footer" },
            [
              _c(
                "el-button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.showFlag === 1,
                      expression: "showFlag===1",
                    },
                  ],
                  attrs: {
                    size: "small",
                    disabled: _vm.loading ? true : false,
                  },
                  on: { click: _vm.closeImportDialog },
                },
                [_vm._v("取消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.showFlag == 1,
                      expression: "showFlag==1",
                    },
                  ],
                  attrs: {
                    type: "primary",
                    size: "small",
                    disabled: _vm.loading ? true : false,
                  },
                  on: { click: _vm.submitUpload },
                },
                [_vm._v(_vm._s(_vm.submitTitle))]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.showFlag == 2 || _vm.showFlag == 3,
                      expression: "showFlag==2||showFlag==3",
                    },
                  ],
                  attrs: {
                    type: "primary",
                    size: "small",
                    disabled: _vm.loading ? true : false,
                  },
                  on: { click: _vm.closeImportDialog },
                },
                [_vm._v(_vm._s(_vm.submitTitle))]
              ),
            ],
            1
          ),
        ]
      ),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/import-export/index.vue?vue&type=template&id=853d12f6&

// CONCATENATED MODULE: ./packages/import-export/util.js
/**
 * 下载文件
 * @param {String} path - 文件地址
 * @param {String} name - 文件名,eg: test.png
 */
const downloadFileBlob = (path, name) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', path);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
            // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
            if ('msSaveOrOpenBlob' in navigator) {
                navigator.msSaveOrOpenBlob(this.response, name);
                return;
            }
            const url = URL.createObjectURL(this.response);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
}

const errorImg = 'data:image/png;base64,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'

const successImg = 'data:image/png;base64,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'
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/import-export/export-tips-model.vue?vue&type=template&id=2c68d766&
var export_tips_modelvue_type_template_id_2c68d766_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("div", [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showFlag === 1,
            expression: "showFlag === 1",
          },
        ],
        staticClass: "uploadContainer",
      },
      [
        _c(
          "div",
          {
            style: `display: ${
              _vm.templateList.length > 0 ? "flex" : "block"
            };`,
          },
          [
            _vm.templateList.length > 0
              ? _c(
                  "div",
                  {
                    staticStyle: {
                      "min-width": "200px",
                      "max-width": "400px",
                      "text-align": "left",
                      "margin-right": "10px",
                    },
                  },
                  [
                    _vm._m(0),
                    _vm._v(" "),
                    _c(
                      "el-radio-group",
                      {
                        on: { change: _vm.templateChange },
                        model: {
                          value: _vm.templateValue,
                          callback: function ($$v) {
                            _vm.templateValue = $$v
                          },
                          expression: "templateValue",
                        },
                      },
                      _vm._l(_vm.templateListPermission, function (item) {
                        return _c(
                          "el-radio",
                          {
                            key: item.value,
                            staticStyle: {
                              display: "flex",
                              "margin-top": "10px",
                            },
                            attrs: { label: item.value, title: item.label },
                          },
                          [_vm._v(_vm._s(item.label))]
                        )
                      }),
                      1
                    ),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "el-upload",
              {
                ref: "upload",
                staticClass: "upload-demo",
                attrs: {
                  action: "api/tiji-system/post/import",
                  headers: _vm.headers,
                  drag: "",
                  "on-change": _vm.uploadByJsqd,
                  "on-remove": _vm.handleRemove,
                  accept: ".xlsx",
                  "file-list": _vm.fileList,
                  "auto-upload": false,
                },
              },
              [
                _c("i", { staticClass: "el-icon-upload" }),
                _vm._v(" "),
                _c("div", { staticClass: "el-upload__text" }, [
                  _vm._v("点击或者拖动文件到虚线内上传"),
                ]),
              ]
            ),
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "uplloadTips" }, [
          _c("div", { staticClass: "uploadTipsTitle" }, [
            _vm._v("下载模板并按要求填写"),
          ]),
          _vm._v(" "),
          _c(
            "p",
            { staticClass: "uploadTipsContent" },
            [
              _c(
                "el-button",
                { attrs: { type: "text" }, on: { click: _vm.download } },
                [
                  _vm._v(
                    _vm._s(
                      _vm.templateList.length > 0
                        ? (
                            _vm.templateList.find(
                              (v) => v.value === _vm.templateValue
                            ) || {}
                          ).templateName
                        : _vm.templateName
                    )
                  ),
                ]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "uploadTipsDetail" }, [
            _c("p", { staticClass: "uploadTipsDetailTitle" }, [
              _vm._v("注意事项："),
            ]),
            _vm._v(" "),
            _c("p", [_vm._v("1、请不要改动导入模板")]),
            _vm._v(" "),
            _c("p", [_vm._v("2、请按照模板的字段要求进行填写")]),
            _vm._v(" "),
            _c("p", [_vm._v("3、文件大小不要超过10M")]),
            _vm._v(" "),
            _vm.isRickControl
              ? _c("p", [_vm._v("4、下载模板前请先配置评估方法")])
              : _vm._e(),
          ]),
        ]),
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showFlag === 2,
            expression: "showFlag === 2",
          },
        ],
        staticClass: "uploadEreor",
      },
      [
        _c("div", [
          _c("div", { staticClass: "uploadEreorImg" }, [
            _vm.recordContent.successNum > 0
              ? _c("img", { attrs: { src: _vm.successImg } })
              : _vm._e(),
            _vm._v(" "),
            _vm.recordContent.successNum <= 0
              ? _c("img", { attrs: { src: _vm.errorImg } })
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.recordContent.total > 0,
                  expression: "recordContent.total>0",
                },
              ],
              staticClass: "uploadEreorTips",
            },
            [
              _vm._v(
                "\n        总计" +
                  _vm._s(_vm.recordContent.total) +
                  "条数据，成功导入\n        "
              ),
              _c("span", { staticStyle: { color: "#5072FF" } }, [
                _vm._v(_vm._s(_vm.recordContent.successNum)),
              ]),
              _vm._v("条，失败\n        "),
              _c("span", { staticStyle: { color: "red" } }, [
                _vm._v(_vm._s(_vm.recordContent.errorNum)),
              ]),
              _vm._v("条\n      "),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.recordContent.total == 0,
                  expression: "recordContent.total==0",
                },
              ],
              staticClass: "uploadEreorTips",
            },
            [_vm._v("当前模板数据为空，无法导入，请确认模板")]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value:
                    _vm.recordContent.errorNum &&
                    _vm.recordContent.errorNum > 0,
                  expression:
                    "recordContent.errorNum && recordContent.errorNum > 0",
                },
              ],
              staticClass: "uploadEreorBtn",
              on: { click: _vm.downLoadEorre },
            },
            [_vm._v("下载导入失败数据")]
          ),
        ]),
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showFlag === 3,
            expression: "showFlag === 3",
          },
        ],
        staticClass: "uploadEreor",
      },
      [
        _c("div", [
          _c("div", { staticClass: "uploadEreorImg" }, [
            _c("img", { attrs: { src: _vm.errorImg } }),
          ]),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.msg))]),
        ]),
      ]
    ),
  ])
}
var export_tips_modelvue_type_template_id_2c68d766_staticRenderFns = [
  function () {
    var _vm = this,
      _c = _vm._self._c
    return _c("div", [
      _c("span", { staticStyle: { color: "#E27471", "margin-right": "4px" } }, [
        _vm._v("*"),
      ]),
      _vm._v("选择导入模板\n        "),
    ])
  },
]
export_tips_modelvue_type_template_id_2c68d766_render._withStripped = true


// CONCATENATED MODULE: ./packages/import-export/export-tips-model.vue?vue&type=template&id=2c68d766&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/import-export/export-tips-model.vue?vue&type=script&lang=js&


/* harmony default export */ var export_tips_modelvue_type_script_lang_js_ = ({
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
});

// CONCATENATED MODULE: ./packages/import-export/export-tips-model.vue?vue&type=script&lang=js&
 /* harmony default export */ var import_export_export_tips_modelvue_type_script_lang_js_ = (export_tips_modelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/import-export/export-tips-model.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  import_export_export_tips_modelvue_type_script_lang_js_,
  export_tips_modelvue_type_template_id_2c68d766_render,
  export_tips_modelvue_type_template_id_2c68d766_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var export_tips_model = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/import-export/index.vue?vue&type=script&lang=js&



/* harmony default export */ var import_exportvue_type_script_lang_js_ = ({
  name: 'TijiImportExport',
  components: {
    ExportTipsModel: export_tips_model
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
});

// CONCATENATED MODULE: ./packages/import-export/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_import_exportvue_type_script_lang_js_ = (import_exportvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/import-export/index.vue





/* normalize component */

var import_export_component = Object(componentNormalizer["a" /* default */])(
  packages_import_exportvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var import_export = (import_export_component.exports);
// CONCATENATED MODULE: ./packages/import-export/index.js


/* istanbul ignore next */
import_export.install = function (Vue) {
  Vue.component(import_export.name, import_export)
}

/* harmony default export */ var packages_import_export = __webpack_exports__["default"] = (import_export);


/***/ })

/******/ });