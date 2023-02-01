<template>
<div>
  <el-input v-model="data" size="small" clearable :placeholder="placeholder || ('请输入' + label)" ></el-input>
</div>
</template>
<script>
export default {
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
};
</script>