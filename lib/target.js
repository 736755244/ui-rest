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
/******/ 	return __webpack_require__(__webpack_require__.s = 280);
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/search/index.vue?vue&type=template&id=6a3c06e9&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "el-form",
    {
      staticClass: "searchForm",
      attrs: { model: _vm.searchData, "label-width": "80px" },
    },
    [
      _c(
        "el-row",
        [
          _vm._l(_vm.column, function (item) {
            return _c(
              "el-col",
              { key: item.prop, attrs: { span: item.span || 6 } },
              [
                _c(
                  "el-form-item",
                  {
                    attrs: {
                      label: item.label,
                      "label-width": !isNaN(item.labelWidth)
                        ? item.labelWidth + "px"
                        : "80px",
                    },
                  },
                  [
                    !item.slot
                      ? _c(_vm.setCompoentType(item), {
                          tag: "component",
                          attrs: {
                            label: item.label,
                            dicData: item.dicData,
                            dicUrl: item.dicUrl,
                            propsConf: item.propsConf,
                            httpType: item.httpType,
                            placeholder: item.placeholder,
                            query: item.query,
                            formatter: item.formatter,
                          },
                          model: {
                            value: _vm.searchData[item.prop],
                            callback: function ($$v) {
                              _vm.$set(_vm.searchData, item.prop, $$v)
                            },
                            expression: "searchData[item.prop]",
                          },
                        })
                      : _vm._t(item.prop, null, {
                          value: _vm.searchData[item.props],
                          conf: item,
                          searchData: _vm.searchData,
                        }),
                  ],
                  2
                ),
              ],
              1
            )
          }),
          _vm._v(" "),
          _vm.column.length > 0
            ? _c(
                "el-col",
                {
                  staticStyle: {
                    "line-height": "41px",
                    "text-align": "left",
                    "padding-left": "8px",
                  },
                  attrs: { span: 6 },
                },
                [
                  _c(
                    "el-button",
                    {
                      attrs: {
                        size: "small",
                        icon: "el-icon-search",
                        type: "primary",
                      },
                      on: { click: _vm.searchChange },
                    },
                    [_vm._v("??????")]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { size: "small", icon: "el-icon-delete" },
                      on: { click: _vm.searchReset },
                    },
                    [_vm._v("??????")]
                  ),
                ],
                1
              )
            : _vm._e(),
        ],
        2
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/search/index.vue?vue&type=template&id=6a3c06e9&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/search/search_input.vue?vue&type=template&id=c8c34f34&
var search_inputvue_type_template_id_c8c34f34_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    [
      _c("el-input", {
        attrs: {
          size: "small",
          clearable: "",
          placeholder: _vm.placeholder || "?????????" + _vm.label,
        },
        model: {
          value: _vm.data,
          callback: function ($$v) {
            _vm.data = $$v
          },
          expression: "data",
        },
      }),
    ],
    1
  )
}
var search_inputvue_type_template_id_c8c34f34_staticRenderFns = []
search_inputvue_type_template_id_c8c34f34_render._withStripped = true


// CONCATENATED MODULE: ./packages/search/search_input.vue?vue&type=template&id=c8c34f34&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/search/search_input.vue?vue&type=script&lang=js&

/* harmony default export */ var search_inputvue_type_script_lang_js_ = ({
  name: 'search_input',
  props: {
    value: String,
    placeholder: String,
    label: String
  },
  data() {
    return {
      data: ''
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.data = this.value;
      }
    },
    data: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', this.data);
      }
    }
  }
});

// CONCATENATED MODULE: ./packages/search/search_input.vue?vue&type=script&lang=js&
 /* harmony default export */ var search_search_inputvue_type_script_lang_js_ = (search_inputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/search/search_input.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  search_search_inputvue_type_script_lang_js_,
  search_inputvue_type_template_id_c8c34f34_render,
  search_inputvue_type_template_id_c8c34f34_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var search_input = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/search/search_select.vue?vue&type=template&id=33f6dc99&
var search_selectvue_type_template_id_33f6dc99_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { staticStyle: { width: "100%" } },
    [
      _c(
        "el-select",
        {
          staticStyle: { width: "100%" },
          attrs: {
            size: "small",
            clearable: "",
            filterable: "",
            placeholder: _vm.placeholder || "?????????" + _vm.label,
          },
          model: {
            value: _vm.data,
            callback: function ($$v) {
              _vm.data = $$v
            },
            expression: "data",
          },
        },
        _vm._l(_vm.options, function (item) {
          return _c("el-option", {
            key: item.value,
            attrs: { label: item.label, value: item.value },
          })
        }),
        1
      ),
    ],
    1
  )
}
var search_selectvue_type_template_id_33f6dc99_staticRenderFns = []
search_selectvue_type_template_id_33f6dc99_render._withStripped = true


// CONCATENATED MODULE: ./packages/search/search_select.vue?vue&type=template&id=33f6dc99&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/search/search_select.vue?vue&type=script&lang=js&

/* harmony default export */ var search_selectvue_type_script_lang_js_ = ({
  name: 'search_select',
  props: {
    dicData: Array,
    value: [String, Number],
    dicUrl: String,
    httpType: {
      type: String,
      default: 'GET'
    },
    label: String,
    propsConf: {
      type: Object,
      default() {
        return {
          id: 'value',
          name: 'label'
        };
      }
    },
    placeholder:String,
    formatter: Function
  },
  data() {
    return {
      data: '',
      options: []
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.data = this.value;
      }
    },
    data: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', this.data);
      }
    }
  },
  mounted() {
    this.getOptionList();
  },
  methods: {
    // ???????????????????????????
    getOptionList() {
      if (this.dicUrl) {
        this.getDicUrl();
      } else {
        this.options = this.dicData.map(item => ({label: item[this.propsConf.name], value: item[this.propsConf.id]}));
      }
    },
    // ????????????
    getDicUrl() {
      window.axios({
        url: this.dicUrl,
        method: this.httpType
      }).then(res => {
        // ?????????
        if (typeof this.formatter === 'function') {
          this.options = this.formatter(res.data);
        } else {
          this.options = res.data.data.map(item => ({label: item[this.propsConf.name], value: item[this.propsConf.id]}));
        }
      });
    }
  }
});

// CONCATENATED MODULE: ./packages/search/search_select.vue?vue&type=script&lang=js&
 /* harmony default export */ var search_search_selectvue_type_script_lang_js_ = (search_selectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/search/search_select.vue





/* normalize component */

var search_select_component = Object(componentNormalizer["a" /* default */])(
  search_search_selectvue_type_script_lang_js_,
  search_selectvue_type_template_id_33f6dc99_render,
  search_selectvue_type_template_id_33f6dc99_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var search_select = (search_select_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/search/search_date.vue?vue&type=template&id=53a53b4e&
var search_datevue_type_template_id_53a53b4e_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    [
      _c("el-date-picker", {
        attrs: {
          type: "daterange",
          align: "right",
          size: "small",
          format: "yyyy-MM-dd",
          "value-format": "yyyy-MM-dd",
          placeholder: _vm.placeholder || "?????????" + _vm.label,
          "unlink-panels": "",
          "range-separator": "???",
          "start-placeholder": "????????????",
          "end-placeholder": "????????????",
        },
        model: {
          value: _vm.data,
          callback: function ($$v) {
            _vm.data = $$v
          },
          expression: "data",
        },
      }),
    ],
    1
  )
}
var search_datevue_type_template_id_53a53b4e_staticRenderFns = []
search_datevue_type_template_id_53a53b4e_render._withStripped = true


// CONCATENATED MODULE: ./packages/search/search_date.vue?vue&type=template&id=53a53b4e&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/search/search_date.vue?vue&type=script&lang=js&

/* harmony default export */ var search_datevue_type_script_lang_js_ = ({
  name: 'search_date',
  props: {
    value: Array,
    label: String,
    placeholder: String
  },
  data() {
    return {
      data: ''
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.data = this.value;
      }
    },
    data: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', this.data);
      }
    }
  }
});

// CONCATENATED MODULE: ./packages/search/search_date.vue?vue&type=script&lang=js&
 /* harmony default export */ var search_search_datevue_type_script_lang_js_ = (search_datevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/search/search_date.vue





/* normalize component */

var search_date_component = Object(componentNormalizer["a" /* default */])(
  search_search_datevue_type_script_lang_js_,
  search_datevue_type_template_id_53a53b4e_render,
  search_datevue_type_template_id_53a53b4e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var search_date = (search_date_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/search/index.vue?vue&type=script&lang=js&




/* harmony default export */ var searchvue_type_script_lang_js_ = ({
  name: 'TijiSearch',
  components: {
    search_input: search_input,
    search_select: search_select,
    search_date: search_date
  },
  props: {
    value: Object,
    column: Array
  },
  data() {
    return {
      searchData: {}
    };
  },
  methods: {
    setCompoentType(item) {
      return 'search_' + (item.type || 'input');
    },
    searchChange() {
      this.$emit('search', this.searchData);
    },
    searchReset() {
      Object.keys(this.searchData).forEach(key => {
        this.$set(this.searchData, key, '');
      });
      this.$emit('search', this.searchData);
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        if (this.value) this.searchData = JSON.parse(JSON.stringify(this.value));
      }
    }
  }
});

// CONCATENATED MODULE: ./packages/search/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_searchvue_type_script_lang_js_ = (searchvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/search/index.vue





/* normalize component */

var search_component = Object(componentNormalizer["a" /* default */])(
  packages_searchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var search = __webpack_exports__["a"] = (search_component.exports);

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./packages/target/index.vue?vue&type=template&id=4d36fd5e&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "el-dialog",
    {
      attrs: {
        title: _vm.title,
        visible: _vm.show,
        width: _vm.dialogWidth + "px",
        "before-close": _vm.handleClose,
        "modal-append-to-body": "",
        "append-to-body": "",
      },
      on: {
        "update:visible": function ($event) {
          _vm.show = $event
        },
      },
    },
    [
      _c(
        "div",
        { staticStyle: { "padding-bottom": "10px" } },
        [
          _c("search", {
            attrs: { column: _vm.searhColumn },
            on: { search: _vm.getSeachData },
            model: {
              value: _vm.seachData,
              callback: function ($$v) {
                _vm.seachData = $$v
              },
              expression: "seachData",
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "avue-crud" },
        [
          _c(
            "el-table",
            {
              ref: "table",
              staticStyle: { width: "100%" },
              attrs: {
                data: _vm.data,
                border: "",
                size: "small",
                "max-height": "500px",
                "row-key": _vm.setRowKey,
              },
              on: {
                "selection-change": _vm.handleSelectionChange,
                "select-all": _vm.handleSelectAll,
                "row-click": _vm.handleRowClick,
              },
            },
            [
              _vm.selection
                ? _c("el-table-column", {
                    attrs: {
                      type: "selection",
                      width: "55",
                      "reserve-selection": "",
                      selectable: _vm.selectable,
                    },
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.tableColumn, function (column, index) {
                return _c("el-table-column", {
                  key: column.prop,
                  attrs: {
                    "show-overflow-tooltip": "",
                    prop: column.prop,
                    label: column.label,
                    align:
                      column.align ||
                      (_vm.tableColumn.length - 1 === index && _vm.selection
                        ? "right"
                        : "left"),
                    width: column.width,
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function (scope) {
                          return [
                            column.slot
                              ? _vm._t(column.prop, null, { scope: scope })
                              : _c("span", [
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(scope.row[column.prop]) +
                                      "\n          "
                                  ),
                                ]),
                          ]
                        },
                      },
                    ],
                    null,
                    true
                  ),
                })
              }),
              _vm._v(" "),
              !_vm.selection
                ? _c("el-table-column", {
                    attrs: { label: "??????", width: "100", align: "right" },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function (scope) {
                            return [
                              _c(
                                "div",
                                { staticStyle: { "text-align": "right" } },
                                [
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "text", size: "small" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.handleClickData(scope.row)
                                        },
                                      },
                                    },
                                    [_vm._v("??????")]
                                  ),
                                ],
                                1
                              ),
                            ]
                          },
                        },
                      ],
                      null,
                      false,
                      3505968070
                    ),
                  })
                : _vm._e(),
            ],
            2
          ),
          _vm._v(" "),
          _vm.showPage
            ? _c(
                "div",
                {
                  staticStyle: { "padding-top": "10px", "text-align": "right" },
                },
                [
                  _c("el-pagination", {
                    attrs: {
                      background: "",
                      "current-page": _vm.page.currentPage,
                      "page-sizes": _vm.page.sizeList,
                      "page-size": _vm.page.size,
                      "pager-count": 5,
                      layout: "total, sizes, prev, pager, next, jumper",
                      total: _vm.page.total,
                    },
                    on: {
                      "size-change": _vm.handleSizeChange,
                      "current-change": _vm.handleCurrentChange,
                    },
                  }),
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { staticStyle: { "padding-top": "10px" } },
            _vm._l(_vm.selectionData, function (tag) {
              return _c(
                "el-tag",
                {
                  key: tag[_vm.propsConf.id],
                  staticStyle: { "margin-left": "8px" },
                  attrs: { closable: "", "disable-transitions": false },
                  on: {
                    close: function ($event) {
                      return _vm.handleDeleteSelectionData(tag)
                    },
                  },
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(tag[_vm.propsConf.name] || tag.name) +
                      "\n      "
                  ),
                ]
              )
            }),
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _vm.selection
        ? _c(
            "span",
            { attrs: { slot: "footer" }, slot: "footer" },
            [
              _c(
                "el-button",
                {
                  attrs: { size: "small", type: "primary" },
                  on: { click: _vm.handlerConfirm },
                },
                [_vm._v("??????")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { attrs: { size: "small" }, on: { click: _vm.closePop } },
                [_vm._v("??????")]
              ),
            ],
            1
          )
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/target/index.vue?vue&type=template&id=4d36fd5e&

// CONCATENATED MODULE: ./packages/target/conf.js
// dept post user role point area
/* harmony default export */ var conf = ({
  dept: {
    conf: {
      name: 'deptName',
      id: 'id'
    },
    httpUrl: '/api/tiji-system/dept/dialog/page',
    httpType: 'get',
    column: [
      {
        label: '????????????',
        prop: 'id'
      },
      {
        label: '????????????',
        prop: 'deptName',
        search: true
      }
    ]
  },
  post: {
    conf: {
      name: 'postName',
      id: 'id'
    },
    httpUrl: '/api/tiji-system/post/dialog/page',
    httpType: 'get',
    column: [
      {
        label: '????????????',
        prop: 'searchName',
        search: true,
        hide: true
      },
      {
        label: '????????????',
        prop: 'id'
      },
      {
        label: '????????????',
        prop: 'postName'
      }
    ]
  },
  role: {
    conf: {
      name: 'roleName',
      id: 'id'
    },
    httpUrl: '/api/tiji-system/role/page',
    httpType: 'get',
    column: [
      {
        label: '????????????',
        prop: 'id'
      },
      {
        label: '????????????',
        prop: 'roleName'
      }
    ]
  },
  user: {
    conf: {
      name: 'nickname',
      id: 'id'
    },
    httpUrl: '/api/tiji-system/user/dialog/page',
    httpType: 'get',
    column: [
      {
        label: '????????????',
        prop: 'jobNo'
      },
      {
        label: '????????????',
        prop: 'nickname'
      },
      {
        label: '????????????',
        prop: 'searchName',
        placeholder: '?????????????????????/????????????',
        labelWidth: 80,
        span: 8,
        search: true,
        hide: true
      },
      {
        label: '??????',
        prop: 'deptId',
        type: 'select',
        labelWidth: 60,
        search: true,
        hide: true,
        span: 5,
        dicUrl: '/api/tiji-system/dept/list',
        propsConf: {
          name: 'deptName',
          id: 'id'
        }
      },
      {
        label: '??????',
        prop: 'deptName'
      },
      {
        label: '??????',
        prop: 'postId',
        labelWidth: 60,
        search: true,
        hide: true,
        span: 5,
        type: 'select',
        dicUrl: '/api/tiji-system/post/list',
        propsConf: {
          name: 'postName',
          id: 'id'
        }
      },
      {
        label: '??????',
        prop: 'postName'
      }
    ]
  },
  personnel: {
    conf: {
      name: 'nickname',
      id: 'id'
    },
    httpUrl: '/api/tiji-system/user/dialog/page',
    httpType: 'get',
    column: [{
      label: '??????',
      prop: 'nickname'
    }, {
      label: '????????????',
      prop: 'searchName',
      labelWidth: 80,
      span: 6,
      search: true,
      hide: true
    }, {
      label: '??????',
      prop: 'jobNo',
      labelWidth: 120,
      span: 10
      // search: true,
      // hide: true
    },
    {
      label: '??????',
      prop: 'identity',
      type: 'select',
      labelWidth: 70,
      search: true,
      propsConf: {
        name: 'dictLabel',
        id: 'dictValue'
      },
      span: 6,
      dicUrl: '/api/tiji-system/dict/list?dictGroupCode=identity'

    }, {
      label: '??????',
      prop: 'deptId',
      type: 'select',
      labelWidth: 70,
      search: true,
      hide: true,
      span: 6,
      dicUrl: '/api/tiji-system/dept/list',
      propsConf: {
        name: 'deptName',
        id: 'id'
      }
    }, {
      label: '??????',
      prop: 'deptName'
    }, {
      label: '??????',
      prop: 'postId',
      labelWidth: 70,
      search: true,
      hide: true,
      span: 6,
      type: 'select',
      dicUrl: '/api/tiji-system/post/list',
      propsConf: {
        name: 'postName',
        id: 'id'
      }
    }, {
      label: '??????',
      prop: 'postName'
    }]
  },
  area: {
    conf: {
      name: 'distName'
    },
    httpUrl: '/api/tiji-system/risk-district/page',
    httpType: 'get',
    search: {
      needScopeDataSql: 0
    },
    column: [
      {
        label: '??????',
        prop: 'distCode'
      },
      {
        label: '??????????????????',
        prop: 'distName',
        search: true,
        placeholder: '?????????????????????/??????',
        labelWidth: 100
      },
      {
        label: '????????????',
        prop: 'distType',
        type: 'select',
        dicData: [
          { label: '????????????', value: 0 },
          { label: '????????????', value: 1 }
        ]
      }
    ]
  },
  mh: {
    conf: {
      name: 'mhName'
    },
    search: {
      needScopeSql: 0
    },
    httpUrl: '/api/tiji-major-hazard/major-hazard/page',
    httpType: 'get',
    column: [
      {
        label: '??????',
        prop: 'nameOrCode',
        placeholder: '??????????????????????????????/????????????',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '?????????????????????',
        prop: 'mhCode'
      },
      {
        label: '?????????????????????',
        prop: 'mhName'
      },
      {
        label: '??????',
        prop: 'level',
        type: 'select',
        dicData: [
          {
            label: '??????',
            value: 1
          },
          {
            label: '??????',
            value: 2
          },
          {
            label: '??????',
            value: 3
          },
          {
            label: '??????',
            value: 4
          }
        ]
      }
    ]
  },
  device: {
    conf: {
      name: 'deviceName'
    },
    httpUrl: '/api/tiji-master-data/device/page',
    httpType: 'get',
    column: [
      {
        label: '??????',
        prop: 'nameOrCode',
        placeholder: '??????????????????????????????',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '??????',
        prop: 'deviceCode'
      },
      {
        label: '????????????',
        prop: 'deviceName'
      },
      {
        label: '????????????',
        prop: 'deptName'
      }
    ]
  },
  nfc: {
    conf: {
      name: 'cardName'
    },
    httpUrl: '/api/tiji-master-data/nfc-card/page',
    httpType: 'get',
    column: [
      {
        label: 'NFC????????????',
        prop: 'keywords',
        placeholder: '???????????????/????????????',
        labelWidth: 120,
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '?????????',
        prop: 'cardCode'
      },
      {
        label: '????????????',
        prop: 'cardName'
      }
    ]
  },
  // ????????????
  analysisObject: {
    conf: {
      name: 'distName'
    },
    httpUrl: '/api/tiji-system/risk-district/page',
    httpType: 'get',
    search: {
      needScopeDataSql: 0
    },
    column: [
      {
        label: '??????????????????',
        prop: 'nameOrCode',
        search: true,
        placeholder: '?????????????????????/??????',
        labelWidth: 100,
        hide: true
      },
      {
        label: '??????',
        prop: 'distCode'
      },
      {
        label: '??????????????????',
        prop: 'distName'
      }
    ]
  },
  // ????????????
  analysisUnit: {
    conf: {
      name: 'pointName'
    },
    httpUrl: '/api/tiji-risk-prevention/point/page',
    httpType: 'get',
    column: [
      {
        label: '??????????????????',
        prop: 'nameOrCode',
        placeholder: '????????????/????????????',
        search: true,
        labelWidth: 100,
        hide: true
      },
      {
        label: '??????',
        prop: 'pointCode'
      },
      {
        label: '??????????????????',
        prop: 'pointName'
      }
    ]
  },
  // ???????????????????????????
  mhUnit: {
    conf: {
      name: 'mhName'
    },
    search: {
      needScopeSql: 0
    },
    httpUrl: '/api/tiji-major-hazard/major-hazard/page',
    httpType: 'get',
    column: [
      {
        label: '??????',
        prop: 'nameOrCode',
        placeholder: '??????????????????????????????/????????????',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '?????????????????????',
        prop: 'mhCode'
      },
      {
        label: '?????????????????????',
        prop: 'mhName'
      },
      {
        label: '??????',
        prop: 'level',
        type: 'select',
        dicData: [
          {
            label: '??????',
            value: 1
          },
          {
            label: '??????',
            value: 2
          },
          {
            label: '??????',
            value: 3
          },
          {
            label: '??????',
            value: 4
          }
        ]
      },
      {
        label: 'R???',
        prop: 'valueR'
      },
      {
        label: '????????????',
        prop: 'distName'
      }
    ]
  },
  // ????????????
  material: {
    conf: {
      name: 'materialName'
    },
    httpUrl: '/api/tiji-master-data/material-category/list',
    httpType: 'get',
    column: [
      {
        label: '????????????',
        prop: 'material',
        placeholder: '????????????????????????',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '????????????',
        prop: 'type',
        type: 'select',
        labelWidth: 70,
        search: true,
        hide: true,
        span: 6,
        dicUrl: '/api/tiji-system/dict/list?dictGroupCode=md_storage_material_type',
        propsConf: {
          name: 'dictLabel',
          id: 'dictValue'
        }
      },
      {
        label: '????????????',
        prop: 'materialNo'
      },
      {
        label: '????????????',
        prop: 'materialName'
      },
      {
        label: '????????????',
        prop: 'typeName'
      }
    ]
  },
  // ???????????????
  contractorWorkType: {
    conf: {
      name: 'workTypeName'
    },
    httpUrl: '/api/tiji-master-data/contractor/work-type/page',
    httpType: 'get',
    column: [
      {
        label: '????????????',
        prop: 'workTypeName',
        placeholder: '?????????????????????',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '????????????',
        prop: 'workTypeName'
      }
    ]
  }
});

// CONCATENATED MODULE: ./packages/target/target.js

/* harmony default export */ var target = ({
  props: {
    /* ?????? start */
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    initialData: {
      type: Array,
      default() {
        return [];
      }
    }
    /* ?????? end */
  },
  data() {
    return {
      propsConf: {
        name: '',
        id: ''
      },
      tableColumn: [],
      searhColumn: [],
      searchData: {},
      seachData: {},
      typeConf: {},
      conf: conf,
      page: {
        currentPage: 1,
        size: 10,
        sizeList: [10, 20, 30, 50],
        total: 0
      },
      data: [

      ]
    };
  },
  watch: {
    /* seachData: {
      deep: true,
      immediate: true,
      handler() {
        this.getTableData();
      }
    }, */
    initialData: {
      deep: true,
      immediate: true,
      handler() {
        this.selectionData = JSON.parse(JSON.stringify(this.initialData || []));
        if (this.selection && this.$refs.table) {
          this.setSelectionTableData();
        }
      }
    },
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.init();
        this.selectionData = JSON.parse(JSON.stringify(this.initialData || []));
        // this.getTableData();
      }
    }
  },
  methods: {
    // ????????????
    init() {
      const typeConf = this.conf[this.options.type];
      this.typeConf = typeConf || {};
      const conf = this.options.conf || this.typeConf.conf;
      if (conf) {
        this.propsConf = conf;
        this.$set(this.propsConf, 'name', conf.name || 'name');
        this.$set(this.propsConf, 'id', conf.id || 'id');
      } else {
        this.$set(this.propsConf, 'name', 'name');
        this.$set(this.propsConf, 'id', 'id');
      }
      this.selection = this.options.selection;
      if (this.options.limit) {
        this.limit = this.options.limit;
      }
      this.searchData = JSON.parse(JSON.stringify(typeConf ? typeConf.search || this.options.search || {} : this.options.search || {}));
      this.initColumn();
    },
    // ??????????????????
    initColumn() {
      if (Array.isArray(this.options.column) || Array.isArray(this.typeConf.column)) {
        const column = JSON.parse(JSON.stringify(this.options.column || this.typeConf.column || []));
        const searhColumn = column.filter(item => item.search);
        this.tableColumn = column.filter(item => !item.hide);
        searhColumn.forEach(item => {
          item.span = item.span || 8;
          delete item.slot;
        });
        this.searhColumn = searhColumn;
      }
    },
    // ??????????????????
    dealData(data, type) {
      if (type === 'multiple') {
        const arr = data.map(item => {
          return {
            name: item[this.propsConf.name],
            id: item[this.propsConf.id],
            otherData: item
          };
        });
        return arr;
      } else if (type === 'radio') {
        return {
          name: data[this.propsConf.name],
          id: data[this.propsConf.id],
          otherData: data
        };
      }
    },
    // ??????row???key
    setRowKey(row) {
      return row[this.propsConf.id] || row.id;
    },
    /* ?????? start */
    // ??????
    handleSizeChange(size) {
      this.$set(this.page, 'size', size);
      this.getTableData();
    },
    handleCurrentChange(page) {
      this.$set(this.page, 'currentPage', page);
      this.getTableData();
    },
    // ??????????????????
    getSeachData(search) {
      this.$set(this.page, 'currentPage', 1);
      this.seachData = JSON.parse(JSON.stringify(search));
      this.getTableData();
    },
    // ????????????
    getTableData() {
      if (this.options.httpUrl || this.options.type) {
        this.getRequestTableData();
      } else
      if (this.tableData) {
        this.getLocalTableData();
      }
    },
    // ??????????????????
    getRequestTableData() {
      const method = this.options.httpType || this.typeConf.httpType || 'get';
      const isData = this.options.isData || this.typeConf.isData || false;
      let obj = {};
      if (isData) {
        obj = {
          data: Object.assign({
            current: this.page.currentPage,
            size: this.page.size
          }, this.seachData, this.search, this.searchData || {})
        };
      } else {
        obj = {
          params: Object.assign({
            current: this.page.currentPage,
            size: this.page.size
          }, this.seachData, this.search, this.searchData || {})
        };
      }
      window.axios(Object.assign({
        url: this.options.httpUrl || this.typeConf.httpUrl,
        method: method
      }, obj)).then(res => {
        this.data = this.setShowData(res.data.data.records);
        this.$set(this.page, 'total', res.data.data.total * 1);
        if (this.selection) {
          if (this.$refs.table) {
            this.setSelectionTableData();
          } else {
            this.setSelectionTableData();
          }
        }
      });
    },
    // ??????????????????
    setShowData(data) {
      data.forEach(data => {
        this.tableColumn.forEach(item => {
          if (item.type === 'select' && Array.isArray(item.dicData)) {
            const option = item.dicData.find(dicItem => dicItem.value == data[item.prop]);
            if (option) {
              data[item.prop] = option.label;
            }
          }
        });
      });
      return data;
    },
    // ??????????????????
    getLocalTableData() {
      const perPageNum = this.page.size; // ????????????20?????????
      // const len = this.tableData.length; // ?????????????????????????????????????????????data?????????data?????????
      // const minPage = 1; // ???????????????1
      // const maxPage = Math.ceil(len / perPageNum); // ?????????????????????
      let currentPage = this.page.currentPage; // ????????????
      const data = JSON.parse(JSON.stringify(this.tableData));
      const curPageData = data.slice((currentPage - 1) * perPageNum, currentPage * perPageNum); // ??????????????????
      this.data = curPageData;
      if (this.selection) {
        if (this.$refs.table) {
          this.setSelectionTableData();
        } else {
          this.$nextTick(() => {
            this.setSelectionTableData();
          });
        }
      }
    },
    // ??????????????????
    setSelectionTableData() {
      const selectionData = JSON.parse(JSON.stringify(this.selectionData));
      this.$refs.table.clearSelection();
      selectionData.forEach(selectItem => {
        // eslint-disable-next-line eqeqeq
        const data = this.data.find(item => item[this.propsConf.id || 'id'] == selectItem[this.propsConf.id || 'id']);
        if (data) {
          this.$refs.table.toggleRowSelection(data);
        } else {
          this.$refs.table.toggleRowSelection(selectItem);
        }
      });
    }
    /* ?????? end */
  }
});

// EXTERNAL MODULE: ./packages/search/index.vue + 19 modules
var search = __webpack_require__(24);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib??vue-loader-options!./packages/target/index.vue?vue&type=script&lang=js&



/* harmony default export */ var targetvue_type_script_lang_js_ = ({
  mixins: [target],
  components: { search: search["a" /* default */] },
  name: 'TijiTarget',
  props: {
    /* ?????? start */
    visible: {
      type: Boolean,
      default: false
    },
    dialogWidth: {
      type: Number,
      default: 920
    },
    options: {
      type: Object,
      default() {
        return {
          conf: {},
          httpUrl: '',
          httpType: '',
          type: '',
          selection: false,
          limit: 0,
          column: []
        };
      }
    },
    title: {
      type: String,
      default: '????????????'
    },
    search: {
      type: Object,
      default() {
        return {};
      }
    },
    showPage: {
      type: Boolean,
      default: true
    },
    // ??????????????????,??????????????????
    confirmClose: {
      type: Boolean,
      default: true
    }
    /* ?????? end */
  },
  data() {
    return {
      show: false,
      limit: 0,
      selection: false,
      selectionData: [],
      selectAllFlag: 0 // ????????????
    };
  },
  watch: {
    visible: {
      deep: true,
      immediate: true,
      handler() {
        this.show = this.visible;
        if (this.show) {
          this.seachData = {};
          this.$set(this.page, 'currentPage', 1);
          this.getTableData();
        }
      }
    },
    show() {
      this.$emit('update:visible', this.show);
    }
  },
  methods: {
    /* ?????? start */
    // ????????????
    handleClose() {
      this.closePop();
      this.$emit('close');
    },
    // ????????????????????????
    handlerConfirm() {
      if(this.confirmClose) {
        this.closePop();
      }
      this.$emit('confirm', this.dealData(this.selectionData, 'multiple'));
    },
    // ????????????????????????
    handleClickData(row) {
      if(this.confirmClose) {
        this.closePop();
      }
      this.$emit('confirm', this.dealData(row, 'radio'));
    },
    // ????????????
    closePop() {
      this.show = false;
    },
    /* ?????? end */
    /* ?????? start */
    // ????????????
    handleSelectionChange(data) {
      if (this.limit && data.length > this.limit) {
        if (this.selectAllFlag) {
          this.$message({
            type: 'warning',
            message: `?????????????????????${this.limit}???`
          });
          this.selectAllFlag = 0;
        }
        return;
      }
      this.selectionData = data.map(item => item);
    },
    // ??????????????????
    handleDeleteSelectionData(tag) {
      // eslint-disable-next-line eqeqeq
      const index = this.selectionData.findIndex(selectItem => selectItem[this.propsConf.id || 'id'] == tag[this.propsConf.id || 'id']);
      this.selectionData.splice(index, 1);
      this.setSelectionTableData();
    },
    // ??????????????????
    handleRowClick(row) {
      if (this.selection) {
        if (!(this.limit && this.selectionData.length >= this.limit)) this.$refs.table.toggleRowSelection(row);
        else this.$refs.table.toggleRowSelection(row, false);
      }
    },
    // ?????? ??? ???????????????
    handleSelectAll(data) {
      if (this.limit && data.length > this.limit) {
        const arr = [];
        data.forEach(item => {
          // eslint-disable-next-line eqeqeq
          const index = this.selectionData.findIndex(selectionItem => selectionItem[this.propsConf.id || 'id'] == item[this.propsConf.id || 'id']);
          if (index === -1) {
            arr.push(item);
          }
        });
        this.selectAllFlag = 1;
        arr.forEach(item => {
          this.$refs.table.toggleRowSelection(item, false);
        });
      }
    },
    // ??????????????? ??????
    selectable(row) {
      if (this.limit) {
        if (this.selectionData.length >= this.limit) {
          // eslint-disable-next-line eqeqeq
          const index = this.selectionData.findIndex(selectItem => selectItem[this.propsConf.id || 'id'] == row[this.propsConf.id || 'id']);
          return index !== -1;
        }
      }
      return true;
    }
    /* ?????? end */
  }
});

// CONCATENATED MODULE: ./packages/target/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var packages_targetvue_type_script_lang_js_ = (targetvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/target/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  packages_targetvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var packages_target = (component.exports);
// CONCATENATED MODULE: ./packages/target/index.js


/* istanbul ignore next */
packages_target.install = function (Vue) {
  Vue.component(packages_target.name, packages_target)
}

/* harmony default export */ var packages_target_0 = __webpack_exports__["default"] = (packages_target);


/***/ })

/******/ });