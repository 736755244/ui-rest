<template>
  <div>
    <el-date-picker
      v-model="data"
      type="daterange"
      align="right"
      size="small"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :placeholder="placeholder || ('请选择' + label)"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>
<script>
export default {
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
};
</script>