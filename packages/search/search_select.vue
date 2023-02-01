<template>
<div style="width: 100%;">
  <el-select v-model="data" size="small" clearable filterable :placeholder="placeholder || ('请选择' + label)" style="width: 100%;" >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
  </el-select>
</div>
</template>
<script>
export default {
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
    // 设置下拉选择的选项
    getOptionList() {
      if (this.dicUrl) {
        this.getDicUrl();
      } else {
        this.options = this.dicData.map(item => ({label: item[this.propsConf.name], value: item[this.propsConf.id]}));
      }
    },
    // 调取接口
    getDicUrl() {
      window.axios({
        url: this.dicUrl,
        method: this.httpType
      }).then(res => {
        // 未想好
        if (typeof this.formatter === 'function') {
          this.options = this.formatter(res.data);
        } else {
          this.options = res.data.data.map(item => ({label: item[this.propsConf.name], value: item[this.propsConf.id]}));
        }
      });
    }
  }
};
</script>