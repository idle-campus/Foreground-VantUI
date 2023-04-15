<template>
  <div>
    <van-nav-bar
      :title="this.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form @submit="onSubmit">
      <!-- 上传闲置物品图片 -->
      <van-field required label="上传图片" center>
        <template #input>
          <van-uploader :max-count="1" :after-read="afterRead">
            <van-image
              fit="cover"
              height="6rem"
              :src="img_url + form.photo"
              width="6rem"
            />
          </van-uploader>
        </template>
      </van-field>
      <!-- 上传闲置物品图片end -->

      <van-cell-group>
        <van-field
          v-model="form.name"
          required
          label="名称"
          :rules="[{ required: true }]"
          placeholder="请输入名称"
        />
        <van-field
          v-model="form.buyPrice"
          required
          label="原价"
          placeholder="请输入原价"
          :rules="[
            { required: true },
            { validator: priceValidator, message: '价格格式错误！最多两位小数' }
          ]"
        />
        <van-field
          v-model="form.sellPrice"
          required
          label="售价"
          placeholder="请输入售价"
          :rules="[
            { required: true },
            { validator: priceValidator, message: '价格格式错误！最多两位小数' }
          ]"
        />
        <van-field
          v-model="form.content"
          required
          label="描述"
          placeholder="请输入描述"
          rows="5"
          autosize
          type="textarea"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="form.address"
          required
          label="交易地点"
          placeholder="请输入交易地点"
          :rules="[{ required: true }]"
        />
        <van-field
          required
          readonly
          clickable
          label="闲置分类"
          :value="categoryName"
          placeholder="选择闲置分类"
          @click="showPicker = true"
        />
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" class="btn">
          更新发布
        </van-button>
      </div>
    </van-form>

    <van-popup
      v-model="showPicker"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div id="goBack_title">
        <van-button
          icon="arrow-left"
          type="primary"
          round
          size="small"
          color="#b4b4b4"
          @click="goBacks()"
        />
      </div>
      <van-row>
        <!--      侧边导航条-->
        <van-col span="6">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              v-for="category in goodsCategory"
              :key="category.id"
              :title="category.name"
              @click="tab_item(category.id)"
            />
          </van-sidebar>
        </van-col>
        <!--      侧边导航条end-->
        <!--      商品分类详情-->
        <van-col span="18">
          <van-grid square :column-num="3" clickable id="grid">
            <van-grid-item
              v-for="children in category_children"
              :key="children.id"
            >
              <van-image
                width="4rem"
                height="4rem"
                fit="cover"
                :src="img_url + children.icon"
                @click="goConfirm(children.id, children.name)"
              />
              <span>{{ children.name }}</span>
            </van-grid-item>
          </van-grid>
        </van-col>
        <!--      商品分类详情end-->
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import {
  findCategoryName,
  getCategory,
  upGoodsPhoto,
  IMG_URL,
  myGoodsEdit,
  myGoodsEditByIsViolation
} from '../../api/api'

export default {
  name: 'editGoods',
  data() {
    return {
      title: '',
      img_url: IMG_URL, //图片主机地址
      showPicker: false,
      goodsCategory: [], //分类数据
      category_children: [], //二级分类数据
      activeKey: 0,
      categoryName: '',
      form: {},
      type: ''
    }
  },

  methods: {
    //切换二级分类
    tab_item(id) {
      let newCategory = this.goodsCategory.filter((item) => item.id === id)
      // console.log(newCategory)
      this.category_children = newCategory[0].children
    },
    goConfirm(id, name) {
      this.categoryName = name
      this.form.goodsCategoryId = id
      this.showPicker = false
    },
    goBacks() {
      this.showPicker = false
    },

    priceValidator(val) {
      return new Promise((resolve) => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          let isemail = /(^[0-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(val)
          if (isemail) {
            this.isBut = false
            resolve(true)
          } else {
            this.isBut = true
            resolve(false)
          }
        }, 1000)
      })
    },

    onClickLeft() {
      this.$router.go(-1)
    },

    //发布
    onSubmit() {
      if (this.type === '1') {
        myGoodsEdit(this.form).then((res) => {
          if (res.code === '200') {
            this.$toast.success(res.msg)
            this.$router.replace('/myGoods?type=1')
          } else {
            this.$toast.fail(res.msg)
          }
        })
      }
      if (this.type === '3') {
        myGoodsEditByIsViolation(this.form).then((res) => {
          if (res.code === '200') {
            this.$toast.success(res.msg)
            this.$router.replace('/myGoods?type=3')
          } else {
            this.$toast.fail(res.msg)
          }
        })
      }
    },
    //上传闲置图片
    afterRead(file) {
      const forms = new FormData()
      forms.append('file', file.file)
      upGoodsPhoto(forms).then((res) => {
        if (res.code !== '200') {
          this.$toast.fail(res.msg)
        }
        this.form.photo = res.data
      })
    }
  },

  mounted() {
    getCategory().then((res) => {
      this.goodsCategory = res.data //初始化分类数据
      this.tab_item(res.data[0].id) //初始化二级分类数据
    })
    this.form = this.$route.query.val
    this.title = this.$route.query.title
    this.type = this.$route.query.type

    findCategoryName(this.form.goodsCategoryId).then((res) => {
      this.categoryName = res.data //获取闲置名称
    })
  }
}
</script>

<style lang="less" scoped>
#releaseGoods_title {
  text-align: center;
}
.van-sidebar-item--select::before {
  background-color: #409eff;
}
#goBack_title {
  margin-top: 8px;
  margin-left: 8px;
  z-index: 10;
}
.btn {
  width: calc(100% - 100px);
  margin: 20px auto;
  border-radius: 12px;
}
</style>
