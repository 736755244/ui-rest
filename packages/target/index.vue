<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    :width="dialogWidth + 'px'"
    :before-close="handleClose"
    modal-append-to-body
    append-to-body
  >
    <div style="padding-bottom: 10px;">
      <search v-model="seachData" :column="searhColumn" @search="getSeachData" />
    </div>
    <div class="avue-crud">
      <el-table
        ref="table"
        :data="data"
        border
        size="small"
        max-height="500px"
        :row-key="setRowKey"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select-all="handleSelectAll"
        @row-click="handleRowClick">
        <el-table-column v-if="selection" type="selection" width="55" reserve-selection :selectable="selectable" ></el-table-column>
        <el-table-column 
          v-for="(column, index) in tableColumn"
          show-overflow-tooltip
          :key="column.prop" 
          :prop="column.prop" 
          :label="column.label" 
          :align="column.align || (tableColumn.length - 1 === index && selection ? 'right' : 'left')" 
          :width="column.width" >
          <template slot-scope="scope">
            <slot
              v-if="column.slot"
              :scope="scope"
              :name="column.prop"
            ></slot>
            <span v-else >
              {{ scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-if="!selection" label="操作" width="100" align="right" >
          <template slot-scope="scope">
            <div style="text-align: right;" >
              <el-button @click="handleClickData(scope.row)" type="text" size="small">选择</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="showPage" style="padding-top: 10px;text-align: right;" >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="page.sizeList"
          :page-size="page.size"
          :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
      <div style="padding-top: 10px;">
        <el-tag
          :key="tag[propsConf.id]"
          v-for="tag in selectionData"
          closable
          :disable-transitions="false"
          style="margin-left: 8px"
          @close="handleDeleteSelectionData(tag)">
          {{tag[propsConf.name] || tag.name }}
        </el-tag>
      </div>
    </div>
    <span v-if="selection" slot="footer" >
      <el-button size="small" type="primary" @click="handlerConfirm" >确定</el-button>
      <el-button size="small" @click="closePop" >关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import target from './target';
import search from '../search/index.vue';
export default {
  mixins: [target],
  components: { search },
  name: 'TijiTarget',
  props: {
    /* 弹窗 start */
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
      default: '选择数据'
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
    // 点击确认按钮,自动关闭弹窗
    confirmClose: {
      type: Boolean,
      default: true
    }
    /* 弹窗 end */
  },
  data() {
    return {
      show: false,
      limit: 0,
      selection: false,
      selectionData: [],
      selectAllFlag: 0 // 优化弹窗
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
    /* 弹窗 start */
    // 关闭弹窗
    handleClose() {
      this.closePop();
      this.$emit('close');
    },
    // 多选对外传输数据
    handlerConfirm() {
      if(this.confirmClose) {
        this.closePop();
      }
      this.$emit('confirm', this.dealData(this.selectionData, 'multiple'));
    },
    // 单选对外传输数据
    handleClickData(row) {
      if(this.confirmClose) {
        this.closePop();
      }
      this.$emit('confirm', this.dealData(row, 'radio'));
    },
    // 关闭弹窗
    closePop() {
      this.show = false;
    },
    /* 弹窗 end */
    /* 表格 start */
    // 选中数据
    handleSelectionChange(data) {
      if (this.limit && data.length > this.limit) {
        if (this.selectAllFlag) {
          this.$message({
            type: 'warning',
            message: `选择数据最大为${this.limit}数`
          });
          this.selectAllFlag = 0;
        }
        return;
      }
      this.selectionData = data.map(item => item);
    },
    // 取消选中数据
    handleDeleteSelectionData(tag) {
      // eslint-disable-next-line eqeqeq
      const index = this.selectionData.findIndex(selectItem => selectItem[this.propsConf.id || 'id'] == tag[this.propsConf.id || 'id']);
      this.selectionData.splice(index, 1);
      this.setSelectionTableData();
    },
    // 点击这行选中
    handleRowClick(row) {
      if (this.selection) {
        if (!(this.limit && this.selectionData.length >= this.limit)) this.$refs.table.toggleRowSelection(row);
        else this.$refs.table.toggleRowSelection(row, false);
      }
    },
    // 全选 和 最大上限值
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
    // 最大勾选， 置灰
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
    /* 表格 end */
  }
};
</script>
