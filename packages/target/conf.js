// dept post user role point area
export default {
  dept: {
    conf: {
      name: 'deptName',
      id: 'id'
    },
    httpUrl: '/api/tiji-system/dept/dialog/page',
    httpType: 'get',
    column: [
      {
        label: '部门编号',
        prop: 'id'
      },
      {
        label: '部门名称',
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
        label: '岗位名称',
        prop: 'searchName',
        search: true,
        hide: true
      },
      {
        label: '岗位编号',
        prop: 'id'
      },
      {
        label: '岗位名称',
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
        label: '角色编号',
        prop: 'id'
      },
      {
        label: '角色名称',
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
        label: '人员工号',
        prop: 'jobNo'
      },
      {
        label: '人员名称',
        prop: 'nickname'
      },
      {
        label: '查找人员',
        prop: 'searchName',
        placeholder: '请输入人员名称/工号查找',
        labelWidth: 80,
        span: 8,
        search: true,
        hide: true
      },
      {
        label: '部门',
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
        label: '部门',
        prop: 'deptName'
      },
      {
        label: '岗位',
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
        label: '岗位',
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
      label: '姓名',
      prop: 'nickname'
    }, {
      label: '查找人员',
      prop: 'searchName',
      labelWidth: 80,
      span: 6,
      search: true,
      hide: true
    }, {
      label: '工号',
      prop: 'jobNo',
      labelWidth: 120,
      span: 10
      // search: true,
      // hide: true
    },
    {
      label: '身份',
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
      label: '部门',
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
      label: '部门',
      prop: 'deptName'
    }, {
      label: '岗位',
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
      label: '岗位',
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
        label: '编号',
        prop: 'distCode'
      },
      {
        label: '风险区域名称',
        prop: 'distName',
        search: true,
        placeholder: '请输入区域名称/编号',
        labelWidth: 100
      },
      {
        label: '区域类型',
        prop: 'distType',
        type: 'select',
        dicData: [
          { label: '风险区域', value: 0 },
          { label: '普通区域', value: 1 }
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
        label: '名称',
        prop: 'nameOrCode',
        placeholder: '请输入重大危险源名称/编号查找',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '重大危险源编码',
        prop: 'mhCode'
      },
      {
        label: '重大危险源名称',
        prop: 'mhName'
      },
      {
        label: '等级',
        prop: 'level',
        type: 'select',
        dicData: [
          {
            label: '一级',
            value: 1
          },
          {
            label: '二级',
            value: 2
          },
          {
            label: '三级',
            value: 3
          },
          {
            label: '四级',
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
        label: '名称',
        prop: 'nameOrCode',
        placeholder: '请输入名称或编号查询',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '编号',
        prop: 'deviceCode'
      },
      {
        label: '设备名称',
        prop: 'deviceName'
      },
      {
        label: '责任部门',
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
        label: 'NFC标签名称',
        prop: 'keywords',
        placeholder: '请输入名称/编号查找',
        labelWidth: 120,
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '识别码',
        prop: 'cardCode'
      },
      {
        label: '标签名称',
        prop: 'cardName'
      }
    ]
  },
  // 分析对象
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
        label: '查找分析对象',
        prop: 'nameOrCode',
        search: true,
        placeholder: '请输入区域名称/编号',
        labelWidth: 100,
        hide: true
      },
      {
        label: '编号',
        prop: 'distCode'
      },
      {
        label: '分析对象名称',
        prop: 'distName'
      }
    ]
  },
  // 分析单元
  analysisUnit: {
    conf: {
      name: 'pointName'
    },
    httpUrl: '/api/tiji-risk-prevention/point/page',
    httpType: 'get',
    column: [
      {
        label: '查找分析单元',
        prop: 'nameOrCode',
        placeholder: '输入编号/名称查找',
        search: true,
        labelWidth: 100,
        hide: true
      },
      {
        label: '编号',
        prop: 'pointCode'
      },
      {
        label: '分析单元名称',
        prop: 'pointName'
      }
    ]
  },
  // 所属重大危险源单元
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
        label: '名称',
        prop: 'nameOrCode',
        placeholder: '请输入重大危险源名称/编号查找',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '重大危险源编码',
        prop: 'mhCode'
      },
      {
        label: '重大危险源名称',
        prop: 'mhName'
      },
      {
        label: '等级',
        prop: 'level',
        type: 'select',
        dicData: [
          {
            label: '一级',
            value: 1
          },
          {
            label: '二级',
            value: 2
          },
          {
            label: '三级',
            value: 3
          },
          {
            label: '四级',
            value: 4
          }
        ]
      },
      {
        label: 'R值',
        prop: 'valueR'
      },
      {
        label: '所在区域',
        prop: 'distName'
      }
    ]
  },
  // 物资品类
  material: {
    conf: {
      name: 'materialName'
    },
    httpUrl: '/api/tiji-master-data/material-category/list',
    httpType: 'get',
    column: [
      {
        label: '查找物资',
        prop: 'material',
        placeholder: '请输入编号或名称',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '物资类型',
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
        label: '物资编号',
        prop: 'materialNo'
      },
      {
        label: '物资名称',
        prop: 'materialName'
      },
      {
        label: '物资类型',
        prop: 'typeName'
      }
    ]
  },
  // 承包商工种
  contractorWorkType: {
    conf: {
      name: 'workTypeName'
    },
    httpUrl: '/api/tiji-master-data/contractor/work-type/page',
    httpType: 'get',
    column: [
      {
        label: '工种名称',
        prop: 'workTypeName',
        placeholder: '请输入工种名称',
        search: true,
        span: 10,
        hide: true
      },
      {
        label: '工种名称',
        prop: 'workTypeName'
      }
    ]
  }
};
