<template>
  <div class="cropper-component">
        <!-- 工具箱部分 -->
        <div class="btn-box">
            <label class="btn" for="uploads">选择图片</label>
            <input type="file" id="uploads" :value="imgFile"
                style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="uploadImg($event,'blob', 1)">

            <Button type="primary" icon="ios-add" title="放大" @click="changeScale(1)"/>
            <Button type="primary" icon="ios-remove" title="缩小" @click="changeScale(-1)"/>
            <Button type="primary" title="左旋转" @click="rotateLeft"><span style="font-weight: 500;">↺</span></Button>
            <Button type="primary" title="右旋转" @click="rotateRight"><span style="font-weight: 500;">↻</span></Button>
            <!-- <Button type="primary" title="下载" @click="down('blob')"><span style="font-weight: 500;">↓</span></Button> -->
            <!-- <div class="btn" @click="finish('blob')">上传头像</div> -->
        </div>
        <!-- 展示内容部分 -->
        <div class="show_box">
          <!-- 展示选中图片 -->
          <div class="cropper">
              <vueCropper
                  ref="cropper"
                  :img="option.img"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :info="option.info"
                  :full="option.full"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :autoCropWidth="option.autoCropWidth"
                  :autoCropHeight="option.autoCropHeight"
                  :fixedBox="option.fixedBox"
                  @realTime="realTime"
                  @imgLoad="imgLoad"
              ></vueCropper>
          </div>
          <!-- 展示缩略图 -->
          <div class="preview-box" v-if="previews.url">
              <div>预览：</div>
              <div :style="previews.div" class="preview">
                  <img :src="previews.url" :style="previews.img"/>
              </div>
          </div>
        </div>
  </div>
</template>
<script>
export default {
    name: 'cropper',
    data() {
        return {
            //剪切图片上传
            crap: false,
            previews: {},
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 1, // 剪切后的图片质量（0.1-1）
                full: true, // 输出原图比例截图 props名full
                outputType: 'jpg', // 裁剪生成额图片的格式
                canMove: true,  // 能否拖动图片
                original: false,  // 上传图片是否显示原始宽高
                canMoveBox: true,  // 能否拖动截图框
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 150,
                autoCropHeight: 150,
                fixedBox: true // 截图框固定大小
            },
            fileName:'',  // 本机文件地址
            downImg: '#',
            imgFile:'',
            uploadImgRelaPath:'', // 上传后的图片的地址（不带服务器域名）
        }
    },
    methods: {
      // 放大/缩小
      changeScale(num) {
        num = num || 1;
        this.$refs.cropper.changeScale(num);
      },
      // 坐旋转
      rotateLeft() {
        this.$refs.cropper.rotateLeft();
      },
      // 右旋转
      rotateRight() {
        this.$refs.cropper.rotateRight();
      },
      // 上传图片（点击上传按钮）
      finish(type) {
        let formData = new FormData();
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            let img = window.URL.createObjectURL(data);
            formData.append('images', data);
            this.$emit('postFile',formData);
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            formData.append('images', data);
            this.$emit('postFile',formData);
          })
        }
      },
      // 实时预览函数
      realTime(data) {
        this.previews = data;
      },
      // 下载图片
      down(type) {
        var aLink = document.createElement('a');
            aLink.download = 'author-img';//文件名
        if (type === 'blob') {
          // 获取截图的blob数据
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = window.URL.createObjectURL(data);//生成blob格式图片路径
            aLink.href = window.URL.createObjectURL(data);
            aLink.click();
          })
        } else {
          // 获取截图的base64 数据
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data;
            aLink.href = data;
          })
        }
      },
      // 选择本地图片
      uploadImg(e, type, num) {//num代表第几个
        // 上传图片
        var file = e.target.files[0];
        this.fileName = file.name;
        if (!/\.(jpg)$/.test(e.target.value)) {
          this.$Message.info('证件照图片必须是jpg格式');
          return false;
        }
        let reader = new FileReader();
            reader.onload =(e) => {
              let data = '';//生成图片地址
              if (typeof e.target.result === 'object') {
                if(type == 'blob'){
                  // 把Array Buffer转化为blob 如果是base64不需要
                  data = window.URL.createObjectURL(new Blob([e.target.result]));
                }
              }
              else {
                data = e.target.result;
              }
              if (num === 1) {
                this.option.img = data;
              }
            }
            if(type == 'blob'){
              // 转化为blob
              reader.readAsArrayBuffer(file);
            }else{
              // 转化为base64
              reader.readAsDataURL(file);
            }


      },
      //图片加载的回调 imgLoad 返回结果success, error
      imgLoad (msg) {
        console.log('imgLoad')
        console.log(msg)
      },
      //刷新-清除截图-目前尚未用到
      refeshImg(type){
        if(type == 'start'){
          this.$refs.cropper.startCrop() //开始截图
        }else if(type == 'end'){
          this.$refs.cropper.stopCrop() //停止截图
        }else if(type == 'clear'){
           this.$refs.cropper.clearCrop() //清除截图
        }

      }
    }
  }
</script>
<style lang="less">
  .cropper-component {
      width: 100%;
      margin: 0 auto;
      position: relative;
      //工具箱部分
      .btn-box {
          margin: 20px 0;
          .btn {
              padding:0 10px;
              height:32px;
              line-height:32px;
              text-align: center;
              border-radius: 4px;
              background-color: #0d8b8e ;
              color: #fff;
              cursor: pointer;
              display: inline-block;
              vertical-align: bottom;
          }
      }
      //展示内容部分
      .show_box{
        display: flex;
        justify-content: space-between;
        // 展示选中图片
        .cropper {
            width: 260px;
            height: 260px;
        }
        // 展示缩略图
        .preview-box {
            top: 60px;
            right: 10px;
            .preview {
                width: 150px;
                height: 150px;
                // border-radius: 50%;//这里预览是否需要变成圆的
                border: 1px solid #ccc;
                background-color: #ccc;
                margin: 5px;
                overflow: hidden;
            }
        }
      }

  }
</style>

