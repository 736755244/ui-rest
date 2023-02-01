import ImportExport from './index.vue'

/* istanbul ignore next */
ImportExport.install = function (Vue) {
  Vue.component(ImportExport.name, ImportExport)
}

export default ImportExport
