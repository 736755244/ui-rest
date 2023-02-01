import conf from './conf';
export default {
  props: {
    /* 配置 start */
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
    /* 配置 end */
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
      conf,
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
    // 初始数据
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
    // 处理初始列表
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
    // 传输处理数据
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
    // 设置row的key
    setRowKey(row) {
      return row[this.propsConf.id] || row.id;
    },
    /* 数据 start */
    // 分页
    handleSizeChange(size) {
      this.$set(this.page, 'size', size);
      this.getTableData();
    },
    handleCurrentChange(page) {
      this.$set(this.page, 'currentPage', page);
      this.getTableData();
    },
    // 获取搜索字段
    getSeachData(search) {
      this.$set(this.page, 'currentPage', 1);
      this.seachData = JSON.parse(JSON.stringify(search));
      this.getTableData();
    },
    // 获取数据
    getTableData() {
      if (this.options.httpUrl || this.options.type) {
        this.getRequestTableData();
      } else
      if (this.tableData) {
        this.getLocalTableData();
      }
    },
    // 获取远程数据
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
    // 设置显示数据
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
    // 获取本地数据
    getLocalTableData() {
      const perPageNum = this.page.size; // 每页展示20条数据
      // const len = this.tableData.length; // 假使已通过接口获取到接口的数据data，计算data的长度
      // const minPage = 1; // 最小页码是1
      // const maxPage = Math.ceil(len / perPageNum); // 计算最大的页码
      let currentPage = this.page.currentPage; // 当前页码
      const data = JSON.parse(JSON.stringify(this.tableData));
      const curPageData = data.slice((currentPage - 1) * perPageNum, currentPage * perPageNum); // 当前页的数据
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
    // 设置选中数据
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
    /* 数据 end */
  }
};
