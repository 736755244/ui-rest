<template>
  <el-form :model="searchData" label-width="80px" class="searchForm" >
    <el-row>
      <el-col v-for="item in column" :key="item.prop" :span="item.span || 6" >
        <el-form-item :label="item.label" :label-width="!isNaN(item.labelWidth) ? item.labelWidth + 'px' : '80px'" >
          <component
            v-if="!item.slot"
            :is="setCompoentType(item)"
            v-model="searchData[item.prop]"
            :label="item.label"
            :dicData="item.dicData"
            :dicUrl="item.dicUrl"
            :propsConf="item.propsConf"
            :httpType="item.httpType"
            :placeholder="item.placeholder"
            :query="item.query"
            :formatter="item.formatter"
          ></component>
          <slot
            v-else
            :value="searchData[item.props]"
            :conf="item"
            :name="item.prop"
            :search-data="searchData"
          ></slot>
        </el-form-item>
      </el-col>
      <el-col v-if="column.length > 0" :span="6"  style="line-height: 41px;text-align: left;padding-left: 8px;" >
        <el-button size="small" icon="el-icon-search" type="primary" @click="searchChange" >搜索</el-button>
        <el-button size="small" icon="el-icon-delete" @click="searchReset" >清空</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import search_input from './search_input.vue';
import search_select from './search_select.vue';
import search_date from './search_date.vue';
export default {
  name: 'TijiSearch',
  components: {
    search_input,
    search_select,
    search_date
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
};
</script>