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
/******/ 	return __webpack_require__(__webpack_require__.s = 286);
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

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/icon-library/index.vue?vue&type=template&id=2bd48c39&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { staticClass: "icon_library" },
    [
      _c(
        "el-popover",
        {
          attrs: {
            placement: "right",
            "popper-class": "icon_library_list",
            width: "420",
            trigger: _vm.disabled ? "manual" : "click",
          },
          model: {
            value: _vm.show,
            callback: function ($$v) {
              _vm.show = $$v
            },
            expression: "show",
          },
        },
        [
          _c("div", { staticClass: "iconBox" }, [
            _vm.imageList.length > 0
              ? _c(
                  "div",
                  {
                    staticClass: "iconList",
                    style: `width: ${
                      _vm.imageList.length > 7 ? 388 : 56 * _vm.imageList.length
                    }px`,
                  },
                  _vm._l(_vm.imageList, function (item, index) {
                    return _c(
                      "div",
                      {
                        key: index,
                        staticClass: "icon",
                        on: {
                          click: function ($event) {
                            return _vm.chooseImageData(item)
                          },
                        },
                      },
                      [
                        _c(
                          "el-image",
                          { staticClass: "image", attrs: { src: item.url } },
                          [
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  "text-align": "center",
                                  "line-height": "56px",
                                },
                                attrs: { slot: "placeholder" },
                                slot: "placeholder",
                              },
                              [
                                _c("i", {
                                  staticClass: "el-icon-loading",
                                  staticStyle: { "font-size": "30px" },
                                }),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  "text-align": "center",
                                  "line-height": "56px",
                                },
                                attrs: { slot: "error" },
                                slot: "error",
                              },
                              [
                                _c("i", {
                                  staticClass: "el-icon-loading",
                                  staticStyle: { "font-size": "30px" },
                                }),
                              ]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _vm.setShowButton(item)
                          ? _c("el-button", {
                              staticClass: "chooseImage",
                              attrs: {
                                type: "success",
                                icon: "el-icon-check",
                                circle: "",
                                size: "mini",
                              },
                            })
                          : _vm._e(),
                      ],
                      1
                    )
                  }),
                  0
                )
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticStyle: { "padding-top": "8px" } },
            [
              _vm.multiple
                ? _c(
                    "el-button",
                    {
                      attrs: { size: "small", type: "primary" },
                      on: { click: _vm.closeChooseImage },
                    },
                    [_vm._v("确定")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { size: "small" },
                  on: {
                    click: function ($event) {
                      _vm.show = false
                    },
                  },
                },
                [_vm._v("关闭")]
              ),
            ],
            1
          ),
          _vm._v(" "),
          _vm.multiple
            ? _c(
                "div",
                {
                  staticClass: "buttonList",
                  staticStyle: { display: "inline-block" },
                  attrs: { slot: "reference" },
                  on: { click: _vm.showChooseImage },
                  slot: "reference",
                },
                [
                  _c("div", { staticClass: "buttonBox" }, [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.disabled,
                            expression: "!disabled",
                          },
                        ],
                        staticClass: "buttonImage",
                      },
                      [
                        _c("el-image", {
                          staticStyle: {
                            width: "60px",
                            height: "60px",
                            "vertical-align": "middle",
                          },
                          attrs: { src: _vm.url },
                        }),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "buttonBox" },
                    _vm._l(_vm.showImageList, function (item, index) {
                      return _c(
                        "div",
                        { key: index, staticClass: "buttonImage" },
                        [
                          !item.loading
                            ? _c(
                                "div",
                                {
                                  staticStyle: {
                                    display: "inline-block",
                                    width: "60px",
                                    height: "60px",
                                    "line-height": "60px",
                                    "vertical-align": "middle",
                                    "text-align": "center",
                                  },
                                },
                                [
                                  _c("i", {
                                    staticClass: "el-icon-loading",
                                    staticStyle: {
                                      "font-size": "50px",
                                      "line-height": "60px",
                                    },
                                  }),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: item.loading,
                                  expression: "item.loading",
                                },
                              ],
                              staticClass: "el-image",
                              staticStyle: {
                                width: "60px",
                                height: "60px",
                                "line-height": "60px",
                                "vertical-align": "middle",
                              },
                            },
                            [
                              _c("img", {
                                staticClass: "el-image__inner",
                                staticStyle: { width: "100%", height: "100%" },
                                attrs: { src: item.url },
                                on: {
                                  load: function ($event) {
                                    return _vm.handlerLoad(item)
                                  },
                                },
                              }),
                            ]
                          ),
                          _vm._v(" "),
                          !_vm.disabled
                            ? _c("el-button", {
                                attrs: {
                                  circle: "",
                                  type: "danger",
                                  icon: "el-icon-delete",
                                  size: "mini",
                                },
                                on: {
                                  click: function ($event) {
                                    $event.stopPropagation()
                                    return _vm.deleteImageList(
                                      index,
                                      _vm.showImageList
                                    )
                                  },
                                },
                              })
                            : _vm._e(),
                        ],
                        1
                      )
                    }),
                    0
                  ),
                ]
              )
            : _c(
                "el-image",
                {
                  staticStyle: {
                    width: "30px",
                    height: "30px",
                    "vertical-align": "middle",
                    cursor: "pointer",
                  },
                  attrs: {
                    slot: "reference",
                    src:
                      !_vm.disabled || _vm.url !== _vm.defaultUrl
                        ? _vm.url
                        : "",
                  },
                  on: { click: _vm.showChooseImage },
                  slot: "reference",
                },
                [_c("span", { attrs: { slot: "error" }, slot: "error" })]
              ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/icon-library/index.vue?vue&type=template&id=2bd48c39&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/icon-library/index.vue?vue&type=script&lang=js&

  
  /* harmony default export */ var icon_libraryvue_type_script_lang_js_ = ({
    name: 'TijiIconLibrary',
    props: {
      // 图片库类型
      imageType: {
        type: String,
        default: ''
      },
      value: {
        type: [Number,String],
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJDSURBVEhLrVU9iBpBFN4dV9lCxcLSwsIihY2o6BWBCIG7K4Oku8ClTJ10V9xdf3aBXHdCqnQpIkm3zTX+wKU4SCBCLCwsUiy4RYpV8327z2U9Vk+JH7yd997MfPtm3swbXduAbrd7pJRq6rqeXywWebQG3CPoQ+id6XT6pdFouP7oVUQS93q9E0w8gzwR1zrwJ61qtfpe7AArxJZlmel0+gMGn4prW3yDvKpUKn98M0RM0mQyaSHKurh2xXg2m1VrtdqEhvJcACPdQDpBX5vC/RXfQ+RisdhHBMg8+MTc00eW/6ZcLr+mzOfzl+KLwvNUKvWOikeMSM7YrgN+aouqJRKJQI8Cxr7ltioeKRA/lv2tAa4scnWCY6qa4tsbQN5U+OTFXoJZfYElNZZiGMZ3v0vTbNuehPtwEo7R/pRuD7ALer/f/wXygvj4tzaTJOZWAMcF5p2LSbiM2BRjnzD0wWBgQXnm294yhjxS4exz+agJf6nznGYymZzXAWArTMy5QYDhOzBixCMxPMAu4KDfYcLvpSDLwSSShvvg+vGAlBgqRNcRY28gp3Ic5zP0se/6f2BbnHg83lasp/hDS/yRQH+QYCx/Y7JxL65LpZIdVDck8SuaI99ahZzTT76lHUbs6RL3pmkeFItFJ0ycRXMHCTK+C7gFWNlTlE3vMgVlk0Xadd0DDLgV1y64D5MSATFRr9fHSCav6iVkYxUjGCW25YrLD5MSkW8eIS/KKSY2QcCHlDXFe0whvEQdZp+J4vhVaNo/JdEZBHbXrnkAAAAASUVORK5CYII=',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJDSURBVEhLrVU9iBpBFN4dV9lCxcLSwsIihY2o6BWBCIG7K4Oku8ClTJ10V9xdf3aBXHdCqnQpIkm3zTX+wKU4SCBCLCwsUiy4RYpV8327z2U9Vk+JH7yd997MfPtm3swbXduAbrd7pJRq6rqeXywWebQG3CPoQ+id6XT6pdFouP7oVUQS93q9E0w8gzwR1zrwJ61qtfpe7AArxJZlmel0+gMGn4prW3yDvKpUKn98M0RM0mQyaSHKurh2xXg2m1VrtdqEhvJcACPdQDpBX5vC/RXfQ+RisdhHBMg8+MTc00eW/6ZcLr+mzOfzl+KLwvNUKvWOikeMSM7YrgN+aouqJRKJQI8Cxr7ltioeKRA/lv2tAa4scnWCY6qa4tsbQN5U+OTFXoJZfYElNZZiGMZ3v0vTbNuehPtwEo7R/pRuD7ALer/f/wXygvj4tzaTJOZWAMcF5p2LSbiM2BRjnzD0wWBgQXnm294yhjxS4exz+agJf6nznGYymZzXAWArTMy5QYDhOzBixCMxPMAu4KDfYcLvpSDLwSSShvvg+vGAlBgqRNcRY28gp3Ic5zP0se/6f2BbnHg83lasp/hDS/yRQH+QYCx/Y7JxL65LpZIdVDck8SuaI99ahZzTT76lHUbs6RL3pmkeFItFJ0ycRXMHCTK+C7gFWNlTlE3vMgVlk0Xadd0DDLgV1y64D5MSATFRr9fHSCav6iVkYxUjGCW25YrLD5MSkW8eIS/KKSY2QcCHlDXFe0whvEQdZp+J4vhVaNo/JdEZBHbXrnkAAAAASUVORK5CYII=',
        imageList: [],
        downLoadFlag: false,
        chooseImageList: [],
        showImageList: [],
        show: false
      }
    },
    watch: {
      value: {
        deep: true,
        handler() {
          if (!this.value) {
            return
          }
          if (this.multiple) {
            const imgList = JSON.parse(JSON.stringify(this.value))
            if (Array.isArray(imgList) && imgList.length > 0) {
              this.showImageList = []
              imgList.forEach(async (id, index) => {
                try {
                  const imgRes = await this.$downloadFile(id)
                  this.$nextTick(() => {
                    this.showImageList.push({
                      id,
                      url: imgRes.base64,
                      loading: false
                    })
                    setTimeout(() => {
                      this.$forceUpdate()
                    }, 500)
                  })
                } catch (error) {
                  //  error
                }
              })
            }
            return
          }
          this.$downloadFile(this.value).then(imgRes => {
            this.url = imgRes.url
            if (!this.downLoadFlag) this.getListByType()
          })
   
  
        }
      }
    },
    mounted() {
      this.url = this.defaultUrl
      if (!this.value) {
        this.getListByType()
      } else {
        this.$downloadFile(this.value).then(imgRes => {
          this.url = imgRes.url
          this.getListByType()
        })
      }
    },
    methods: {
      // 获取图标列表
      async getListByType() {
        const res = await this.$axios({
          url: '/api/tiji-resource/image-repo/list-by-type',
          method: 'get',
          params: {
            repoType: this.imageType
          }
        })
        this.imageList = res.data.data
        if (!this.multiple) {
          const index =res.data.data.findIndex(item =>Number(item.attachId) ===Number(this.value) );
          if (index === -1) {
            this.$emit('input','')
          }
        }
      },
      // 获取图标的url
      async getImageUrl(imageList) {
        if (this.downLoadFlag) return
        imageList.forEach(async img => {
          const res = await this.$downloadFile(img.attachId)
          this.$set(img, 'url', res.base64)
          this.$set(img, 'id', img.attachId)
          setTimeout(() => {
            this.$forceUpdate()
          }, 500)
          this.downLoadFlag = true
        })
      },
      // 选择图标组件
      chooseImageData(imgData) {
        if (this.multiple) {
          const index = this.chooseImageList.findIndex(item =>Number( item.id) === Number(imgData.id) );
          if (index === -1) {
            this.chooseImageList.push(imgData);
          } else {
            this.chooseImageList.splice(index, 1);
          }
        } else {
          this.$emit('input', imgData.id)
          this.$emit('change', imgData)
          this.show = false
          this.url = imgData.url
        }
      },
      // 显示图标库
      showChooseImage() {
        if (this.disabled) return
        this.getImageUrl(this.imageList)
        this.chooseImageList = JSON.parse(JSON.stringify(this.showImageList))
        if (this.type === 'monitor_point') {
          this.show = true
        }
      },
      // 关闭弹窗
      closeChooseImage() {
        this.showImageList = JSON.parse(JSON.stringify(this.chooseImageList))
        this.$emit('input', this.showImageList.map(item => item.id))
        this.show = false
      },
      // 设置显示按钮
      setShowButton(item) {
        const index = this.chooseImageList.findIndex(image =>Number(item.id) ===Number(image.id) )
        return index !== -1
      },
      deleteImageList(index, list) {
        list.splice(index, 1);
        this.$emit('input', list.map(item => item.id))
      },
      handlerLoad(data) {
        data.loading = true;
      }
    }
  });
  
// CONCATENATED MODULE: ./packages/icon-library/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_icon_libraryvue_type_script_lang_js_ = (icon_libraryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/icon-library/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  packages_icon_libraryvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var icon_library = (component.exports);
// CONCATENATED MODULE: ./packages/icon-library/index.js


/* istanbul ignore next */
icon_library.install = function (Vue) {
  Vue.component(icon_library.name, icon_library)
}

/* harmony default export */ var packages_icon_library = __webpack_exports__["default"] = (icon_library);


/***/ })

/******/ });