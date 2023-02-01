<template>
  <div class="icon_library">
    <el-popover
      v-model="show"
      placement="right"
      popper-class="icon_library_list"
      width="420"
      :trigger="disabled ? 'manual' : 'click'">
      <div class="iconBox">
        <div 
          v-if="imageList.length > 0" 
          class="iconList"
          :style="`width: ${imageList.length > 7 ? 388 : (56 * imageList.length) }px`" >
          <div
            v-for="(item, index) in imageList"
            :key="index"
            @click="chooseImageData(item)"
            class="icon">
            <el-image
              class="image"
              :src="item.url">
              <div slot="placeholder" style="text-align: center;line-height: 56px;">
                <i class="el-icon-loading" style="font-size:30px"></i>
              </div>
              <!-- 当页面初始化的时候没数据 -->
              <div slot="error"  style="text-align:center;line-height: 56px;" >
                <i class="el-icon-loading" style="font-size:30px"></i>
              </div>
            </el-image>
              <el-button v-if="setShowButton(item)" class="chooseImage" type="success" icon="el-icon-check" circle size="mini" ></el-button>
          </div>
        </div>
      </div>
      <div style="padding-top: 8px">
        <el-button v-if="multiple" size="small" type="primary" @click="closeChooseImage">确定</el-button>
        <el-button size="small" @click="show = false" >关闭</el-button>
      </div>
      <div v-if="multiple" class="buttonList" slot="reference" @click="showChooseImage" style="display: inline-block;" >
        <div class="buttonBox">
          <div v-show="!disabled" class="buttonImage" >
            <el-image :src="url" style="width: 60px; height: 60px; vertical-align: middle;" ></el-image>
          </div>
        </div>
        <div class="buttonBox">
          <div
            v-for="(item, index) in showImageList"
            :key="index"
            class="buttonImage">
            <div v-if="!item.loading" style="display: inline-block;width: 60px; height: 60px; line-height: 60px; vertical-align: middle;text-align: center;">
              <i class="el-icon-loading" style="font-size:50px; line-height: 60px;"></i>
            </div>
            <div v-show="item.loading" class="el-image" style="width: 60px; height: 60px; line-height: 60px; vertical-align: middle;">
              <img :src="item.url" class="el-image__inner" style="width: 100%; height: 100%;" @load="handlerLoad(item)" >
            </div>
            <el-button 
              v-if="!disabled" 
              circle 
              type="danger" 
              icon="el-icon-delete" 
              size="mini"
              @click.stop="deleteImageList(index, showImageList)" ></el-button>
          </div>
        </div>
      </div>
      <el-image v-else  slot="reference" :src="!disabled || url !== defaultUrl ? url : ''" @click="showChooseImage" style="width: 30px; height: 30px; vertical-align: middle; cursor: pointer;" >
        <span slot="error"></span>
      </el-image>
    </el-popover>
  </div>
  </template>
  <script>
  
  export default {
    name: 'TijiIconLibrary',
    props: {
      // 图片库类型
      imageType: {
        type: String,
        default: ''
      },
      value: {
        type: [Number,String],
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJDSURBVEhLrVU9iBpBFN4dV9lCxcLSwsIihY2o6BWBCIG7K4Oku8ClTJ10V9xdf3aBXHdCqnQpIkm3zTX+wKU4SCBCLCwsUiy4RYpV8327z2U9Vk+JH7yd997MfPtm3swbXduAbrd7pJRq6rqeXywWebQG3CPoQ+id6XT6pdFouP7oVUQS93q9E0w8gzwR1zrwJ61qtfpe7AArxJZlmel0+gMGn4prW3yDvKpUKn98M0RM0mQyaSHKurh2xXg2m1VrtdqEhvJcACPdQDpBX5vC/RXfQ+RisdhHBMg8+MTc00eW/6ZcLr+mzOfzl+KLwvNUKvWOikeMSM7YrgN+aouqJRKJQI8Cxr7ltioeKRA/lv2tAa4scnWCY6qa4tsbQN5U+OTFXoJZfYElNZZiGMZ3v0vTbNuehPtwEo7R/pRuD7ALer/f/wXygvj4tzaTJOZWAMcF5p2LSbiM2BRjnzD0wWBgQXnm294yhjxS4exz+agJf6nznGYymZzXAWArTMy5QYDhOzBixCMxPMAu4KDfYcLvpSDLwSSShvvg+vGAlBgqRNcRY28gp3Ic5zP0se/6f2BbnHg83lasp/hDS/yRQH+QYCx/Y7JxL65LpZIdVDck8SuaI99ahZzTT76lHUbs6RL3pmkeFItFJ0ycRXMHCTK+C7gFWNlTlE3vMgVlk0Xadd0DDLgV1y64D5MSATFRr9fHSCav6iVkYxUjGCW25YrLD5MSkW8eIS/KKSY2QcCHlDXFe0whvEQdZp+J4vhVaNo/JdEZBHbXrnkAAAAASUVORK5CYII=',
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJDSURBVEhLrVU9iBpBFN4dV9lCxcLSwsIihY2o6BWBCIG7K4Oku8ClTJ10V9xdf3aBXHdCqnQpIkm3zTX+wKU4SCBCLCwsUiy4RYpV8327z2U9Vk+JH7yd997MfPtm3swbXduAbrd7pJRq6rqeXywWebQG3CPoQ+id6XT6pdFouP7oVUQS93q9E0w8gzwR1zrwJ61qtfpe7AArxJZlmel0+gMGn4prW3yDvKpUKn98M0RM0mQyaSHKurh2xXg2m1VrtdqEhvJcACPdQDpBX5vC/RXfQ+RisdhHBMg8+MTc00eW/6ZcLr+mzOfzl+KLwvNUKvWOikeMSM7YrgN+aouqJRKJQI8Cxr7ltioeKRA/lv2tAa4scnWCY6qa4tsbQN5U+OTFXoJZfYElNZZiGMZ3v0vTbNuehPtwEo7R/pRuD7ALer/f/wXygvj4tzaTJOZWAMcF5p2LSbiM2BRjnzD0wWBgQXnm294yhjxS4exz+agJf6nznGYymZzXAWArTMy5QYDhOzBixCMxPMAu4KDfYcLvpSDLwSSShvvg+vGAlBgqRNcRY28gp3Ic5zP0se/6f2BbnHg83lasp/hDS/yRQH+QYCx/Y7JxL65LpZIdVDck8SuaI99ahZzTT76lHUbs6RL3pmkeFItFJ0ycRXMHCTK+C7gFWNlTlE3vMgVlk0Xadd0DDLgV1y64D5MSATFRr9fHSCav6iVkYxUjGCW25YrLD5MSkW8eIS/KKSY2QcCHlDXFe0whvEQdZp+J4vhVaNo/JdEZBHbXrnkAAAAASUVORK5CYII=',
        imageList: [],
        downLoadFlag: false,
        chooseImageList: [],
        showImageList: [],
        show: false
      }
    },
    watch: {
      value: {
        deep: true,
        handler() {
          if (!this.value) {
            return
          }
          if (this.multiple) {
            const imgList = JSON.parse(JSON.stringify(this.value))
            if (Array.isArray(imgList) && imgList.length > 0) {
              this.showImageList = []
              imgList.forEach(async (id, index) => {
                try {
                  const imgRes = await this.$downloadFile(id)
                  this.$nextTick(() => {
                    this.showImageList.push({
                      id,
                      url: imgRes.base64,
                      loading: false
                    })
                    setTimeout(() => {
                      this.$forceUpdate()
                    }, 500)
                  })
                } catch (error) {
                  //  error
                }
              })
            }
            return
          }
          this.$downloadFile(this.value).then(imgRes => {
            this.url = imgRes.url
            if (!this.downLoadFlag) this.getListByType()
          })
   
  
        }
      }
    },
    mounted() {
      this.url = this.defaultUrl
      if (!this.value) {
        this.getListByType()
      } else {
        this.$downloadFile(this.value).then(imgRes => {
          this.url = imgRes.url
          this.getListByType()
        })
      }
    },
    methods: {
      // 获取图标列表
      async getListByType() {
        const res = await this.$axios({
          url: '/api/tiji-resource/image-repo/list-by-type',
          method: 'get',
          params: {
            repoType: this.imageType
          }
        })
        this.imageList = res.data.data
        if (!this.multiple) {
          const index =res.data.data.findIndex(item =>Number(item.attachId) ===Number(this.value) );
          if (index === -1) {
            this.$emit('input','')
          }
        }
      },
      // 获取图标的url
      async getImageUrl(imageList) {
        if (this.downLoadFlag) return
        imageList.forEach(async img => {
          const res = await this.$downloadFile(img.attachId)
          this.$set(img, 'url', res.base64)
          this.$set(img, 'id', img.attachId)
          setTimeout(() => {
            this.$forceUpdate()
          }, 500)
          this.downLoadFlag = true
        })
      },
      // 选择图标组件
      chooseImageData(imgData) {
        if (this.multiple) {
          const index = this.chooseImageList.findIndex(item =>Number( item.id) === Number(imgData.id) );
          if (index === -1) {
            this.chooseImageList.push(imgData);
          } else {
            this.chooseImageList.splice(index, 1);
          }
        } else {
          this.$emit('input', imgData.id)
          this.$emit('change', imgData)
          this.show = false
          this.url = imgData.url
        }
      },
      // 显示图标库
      showChooseImage() {
        if (this.disabled) return
        this.getImageUrl(this.imageList)
        this.chooseImageList = JSON.parse(JSON.stringify(this.showImageList))
        if (this.type === 'monitor_point') {
          this.show = true
        }
      },
      // 关闭弹窗
      closeChooseImage() {
        this.showImageList = JSON.parse(JSON.stringify(this.chooseImageList))
        this.$emit('input', this.showImageList.map(item => item.id))
        this.show = false
      },
      // 设置显示按钮
      setShowButton(item) {
        const index = this.chooseImageList.findIndex(image =>Number(item.id) ===Number(image.id) )
        return index !== -1
      },
      deleteImageList(index, list) {
        list.splice(index, 1);
        this.$emit('input', list.map(item => item.id))
      },
      handlerLoad(data) {
        data.loading = true;
      }
    }
  }
  </script>