import Search from './index.vue'

/* istanbul ignore next */
Search.install = function (Vue) {
  Vue.component(Search.name, Search)
}

export default Search
