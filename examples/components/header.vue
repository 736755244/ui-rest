<template>
  <header class="page-header">
    <div class="header-container" flex="main:justify">
      <div class="left" style="width: 480px;">
        <div class="logo"></div>
        <el-select style="width: 220px;" placeholder="查询组件" filterable clearable v-model="current"
                  @change="handleComponentChange">
          <el-option v-for="item in components" :value="item.value" :key="item.value">{{ item.label }}</el-option>
        </el-select>
      </div>
      <div class="link">
        <router-link :to="{name: 'guide'}" class="active">指南</router-link>
        <router-link :to="{name: 'icon'}" class="active">组件</router-link>
        <a href="http://172.16.10.209/tiji-front-platform/tiji-front-components/" class="github" target="_blank">GitHub</a>
      </div>
    </div>
  </header>
</template>

<script>
  import navConf from '../nav.config.json'
  import util from '../../src/utils/util'
  export default {
    name: 'MainHeader',
    data() {
      return {
        components: [],
        current: ''
      }
    },
    created() {
      this.getComponentsOptions()
    },
    watch: {
      $route: {
        handler() {
          setTimeout(() => {
            this.current = ''
          }, 300)
        },
        immediate: true
      }
    },
    methods: {
      goTo(url) {
        util.open(url, true)
      },
      getComponentsOptions() {
        let routes = []
        Object.keys(navConf).forEach((header) => {
          routes = routes.concat(navConf[header])
        })

        let addComponent = (router) => {
          router.forEach((route) => {
            if (route.items) {
              addComponent(route.items)
              routes = routes.concat(route.items)
            } else {
              // 如果是组件路由
              if (['guide', 'install', 'start', 'theme', 'logs'].indexOf(route.name) === -1) {
                this.components.push({
                  value: route.path,
                  label: route.desc
                })
              }
            }
          })
        }
        addComponent(routes)
      },
      handleComponentChange(val) {
        if (!val || val.length === 0) {
          return
        }
        if (this.$route.path !== val) {
          this.$router.push(val)
        }
      }
    }
  }
</script>

<style lang="scss">
  .page-header {
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 80px;
    transition: all .3s;
    z-index: 100;
    .header-container {
      width: 100%;
      margin: 0 auto;
      height: 80px;
      display: flex;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo {
        color: #1089ff;
        text-transform: uppercase;
        font-weight: bold;
        font-family: helvetica;
        text-align: center;
        font-size: 40px;
        // margin-left: 30px;
        width: 220px;
        height: 80px;
        background: url("../assets/tiji-ui.png") no-repeat 0 0;
        background-size: 220px 80px;
      }
      .link {
        padding: 0 20px;
        line-height: 80px;
        a {
          text-decoration: none;
          color: #1989fa;
          display: inline-block;
          line-height: 1.5;
          padding: 0 22px;
          font-size: 15px;
          &.github {
            color: #636363;
          }
        }
        .t-dropdown {
          line-height: 1.5;
        }
      }
    }
    .t-select-single .t-select-selection {
      border-color: transparent;
      .t-select-arrow {
        opacity: 0;
      }
    }
  }
</style>
