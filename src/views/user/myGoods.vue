<!-- 我的闲置页面 -->
<template>
  <div id="orderType">
    <!-- 顶部标题 -->
    <van-sticky>
      <van-nav-bar
        :title="this.title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="wap-home" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 顶部标题 end -->
    <!-- 顶部标题 end -->
    <van-tabs v-model="activeTab">
      <van-tab title="我发布的" name="1">
        <div v-if="activeTab === '1'"></div>
      </van-tab>
      <van-tab title="我卖出的" name="2">
        <div v-if="activeTab === '2'"></div>
      </van-tab>
      <van-tab title="审核不通过" name="3">
        <div v-if="activeTab === '3'"></div>
      </van-tab>
      <van-tab title="已下架" name="0">
        <div v-if="activeTab === '0'"></div>
      </van-tab>
    </van-tabs>

    <van-cell-group v-for="val in goodsList" :key="val.id" id="listbox">
      <van-cell size="large">
        <template #default>
          <!-- 商品卡片 -->
          <van-card
            id="shopCard"
            :price="val.sellPrice"
            :origin-price="val.buyPrice"
            :desc="val.content"
            :title="val.name"
            :thumb="img_url + val.photo"
            class="goods-card"
          >
            <template #tags>
              <van-tag
                plain
                type="success"
                v-if="val.status === 1 && val.isVerify === 0"
              >
                待审核
              </van-tag>
              <van-tag
                plain
                type="danger"
                v-if="val.isViolation === 1 && val.isVerify === 1"
              >
                审核不通过
              </van-tag>
              <van-tag
                plain
                type="warning"
                v-if="val.isViolation === 1 && val.isVerify === 0"
              >
                再次审核中
              </van-tag>
              <van-tag plain type="primary" v-if="val.status === 2"
                >卖出啦</van-tag
              >
              <van-tag plain color="#909399" v-if="val.status === 0"
                >已下架</van-tag
              >
              <van-tag
                mark
                type="danger"
                size="medium"
                v-if="val.isViolation === 1"
              >
                原因：
              </van-tag>
              <van-tag
                round
                color="#fff"
                size="medium"
                text-color="#000"
                v-if="val.isViolation === 1"
              >
                {{ val.verifyContent }}
              </van-tag>
            </template>
            <template #footer>
              <van-button size="mini" @click="Edit(val)" v-if="val.status === 1"
                >编辑</van-button
              >
              <van-button
                size="mini"
                @click="EditIsViolation(val)"
                v-if="val.isViolation === 1 && val.isVerify == 1"
              >
                修改
              </van-button>
              <van-button
                size="mini"
                @click="Sold(val.id)"
                v-if="val.status === 1 && val.isVerify === 1"
              >
                确认售出
              </van-button>
              <van-button
                size="mini"
                @click="Down(val.id)"
                v-if="val.status === 1"
              >
                下架
              </van-button>
              <van-button
                size="mini"
                @click="AgainUp(val.id)"
                v-if="val.status === 0 && val.isViolation === 0"
              >
                重新上架
              </van-button>
              <van-button size="mini" @click="Del(val.id)"> 删除 </van-button>
            </template>
            <!--            自定义右下角内容end-->
          </van-card>
          <!--            商品卡片end-->
        </template>
      </van-cell>
    </van-cell-group>

    <div></div>
    <van-divider
      v-if="this.goodsList.length > 9 && this.goodsList.length < this.listTotal"
      @click="goodsMore()"
    >
      点击加载更多
    </van-divider>
    <van-divider
      v-if="this.goodsList.length === this.listTotal && goodsList.length > 0"
      @click="noMore()"
    >
      我的闲置见底啦！！！
    </van-divider>
    <!-- <van-divider
        v-if="listProds.length > 9 && this.limit < this.listTotal"
        @click="move(name, val)"
        >点击加载更多
      </van-divider>
      <van-divider
        v-if="this.limit > this.listTotal && listProds.length > 1"
        @click="noMove()"
        >闲置见底啦！！！
      </van-divider> -->
  </div>
</template>

<script>
import TopTitle from '../../components/topTitle'
import {
  getMyGoodsList,
  IMG_URL,
  myGoodsDel,
  myGoodsSold,
  myGoodsDown,
  myGoodsAgainUp
} from '../../api/api'

export default {
  name: 'myGoods',
  components: { TopTitle },
  data() {
    return {
      img_url: IMG_URL,
      title: '我的闲置',
      ificon: false,
      activeTab: '-1', // 被选中的标签
      queryParam: {},
      goodsList: [], // 闲置数据
      listTotal: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  filters: {
    //过滤器
    capittalizze(val) {
      let newVal = parseFloat(val).toFixed(2)
      return newVal
    }
  },
  watch: {
    activeTab(newVal, oldCal) {
      // console.log('activeTab(newVal)===' + newVal)
      // console.log('activeTab(oldCal)===' + oldCal)
      if (newVal === oldCal) {
        console.log('activeTab(newVal)===' + newVal)
        this.move(this.activeTab)
      }
      this.activeTab = newVal
      this.move(this.activeTab)
    }
  },

  created() {
    // this.getList()
    // this.getList(this.activeTab)
  },

  methods: {
    noMore() {
      this.$toast({
        message: '我的闲置见底啦！！\n不要再点击了哦~',
        position: 'bottom'
      })
    },

    move(type) {
      //初始化
      this.goodsList = []
      this.listTotal = 0
      this.pageNum = 1
      let map = {}
      Object.assign(map, this.queryParam) //复制查询参数
      map['type'] = type
      map['pageNum'] = this.pageNum //页大小
      map['pageSize'] = this.pageSize //每页数量
      this.getList(map)
    },

    goodsMore() {
      this.pageNum += 1
      let map = {}
      Object.assign(map, this.queryParam) //复制查询参数
      map['type'] = this.activeTab
      map['pageNum'] = this.pageNum //页大小
      map['pageSize'] = this.pageSize //每页数量
      this.getList(map)
    },

    getList(queryParam) {
      getMyGoodsList(queryParam).then((res) => {
        this.goodsList = this.goodsList.concat(res.data.records)
        this.listTotal = res.data.total
      })
    },

    // getList(id) {
    //   getMyGoodsList({
    //     type: id,
    //     pageNum: this.pageNum,
    //     // pageSize: this.pageSize
    //     pageSize: 2
    //   }).then((res) => {
    //     this.goodsList = this.goodsList.concat(res.data.records)
    //     this.listTotal = res.data.total
    //   })
    // },

    Sold(id) {
      myGoodsSold(id).then((res) => {
        if (res.code !== '200') {
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        // this.getList(this.activeTab)
        this.move(this.activeTab)
      })
    },

    Down(id) {
      myGoodsDown(id).then((res) => {
        if (res.code !== '200') {
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        this.move(this.activeTab)
      })
    },

    AgainUp(id) {
      myGoodsAgainUp(id).then((res) => {
        if (res.code !== '200') {
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        this.move(this.activeTab)
      })
    },

    Del(id) {
      myGoodsDel(id).then((res) => {
        if (res.code !== '200') {
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        // this.getList(this.activeTab)
        this.move(this.activeTab)
      })
    },

    Edit(val) {
      this.$router.replace({
        path: '/editGoods',
        query: { val: val, title: '编辑我的闲置', type: 1 }
      })
    },
    EditIsViolation(val) {
      this.$router.push({
        path: '/editGoods',
        query: { val: val, title: '修改我的不通过闲置', type: 3 }
      })
    },

    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push('/mine')
    }
  },

  mounted() {
    this.activeTab = this.$route.query.type
    this.type = this.activeTab
  }
}
</script>

<style lang="less" scoped>
#orderType {
  // .van-cell-group {
  //   margin-top: 8px;
  // }

  .van-cell--large {
    padding-top: 4px;
    padding-bottom: 4px;
  }
}

#shopCard {
  background-color: white;
  padding: 4px 0;

  .van-card__thumb {
    margin-right: 20px;
  }

  .btn {
    height: 30px;
    border-radius: 7px;
  }
}

/deep/ .van-tabs__line {
  background-color: #409eff;
}
</style>
