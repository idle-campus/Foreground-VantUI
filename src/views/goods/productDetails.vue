<!--商品详情页-->
<template>
  <div>
    <!--    回退按钮-->

    <van-nav-bar
      title="闲置详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!--    回退按钮end-->

    <div style="background-color: #fff; width=100%; height=60px; padding-top: 2px; padding-bottom:10px; padding-left:20px;">

      <div style=" width=50px; float:left;">
        <img :src='img_url+storeInfo.avatarUrl' alt="头像"
             style="height:45px; width:45px; border-radius: 50%; position: relative; top: 6px; ">
      </div>

      <div style="margin-top:10px; margin-left:60px; width=50px;">
        <div style="padding-bottom:3px; ">{{storeInfo.nickname}}</div>
        <div style="color: #ccc; ">{{storeInfo.createTime}}</div>
      </div>

    </div>

    <div id="myshop">

      <div>
        <van-image fit="cover" :src='img_url+storeInfo.photo' width="100%" height="100%"/>
      </div>
      <!--    商品信息-->
      <div id="shopinfo">
        <van-cell-group inset>
          <van-cell id="shopprice" :border="false">
            <template #default>
              <van-row>
                <!--            商品名-->
                <van-col span="24" class="shopname">{{ storeInfo.name }}</van-col>
              </van-row>
              <van-row>
                <van-col span="12" class="left_val" style="padding-top: 10px">
                  <span style="">￥</span>
                  {{ storeInfo.sellPrice }}
                  <!--            历史价格-->
            <span class="oldprice">￥{{ storeInfo.buyPrice }}</span>
                </van-col>

                <van-col class="right_val" span="12" style="padding-top: 10px">
                  <div style="padding: 5px">
                    <van-icon name="eye" size="20" />
                    {{ storeInfo.viewNumber }}
                  </div>
                  <div style=" font-size=400px">
                    <van-icon name="chat" size="19" />
                    {{ storeInfo.commentNum }}
                  </div>
                </van-col>
              </van-row>
            </template>
          </van-cell>
          <van-cell>
            <template #default>
              {{ storeInfo.storeInfo }}
            </template>
          </van-cell>
        </van-cell-group>




        <van-cell-group inset>
          <van-cell title="详情"/>
          <van-cell>
            <div><span>{{ storeInfo.content }}</span></div>
          </van-cell>
          <van-cell>
        <van-tabs v-model="active" @click="onClickComment">
          <van-tab>
            <template #title> <van-icon name="exchange" size="19"  /> 交易方式 </template>

            <div>交易地址：{{ storeInfo.address }}</div>
            <div>QQ：{{ storeInfo.qq }}</div>
            <div>WeChat：{{ storeInfo.wechat }}</div>
          </van-tab>




          <van-tab >
            <template #title> <van-icon name="smile-comment-o" size="19"   />
            <!-- <van-button @click="onClickComment(storeInfo.id)" class="add"></van-button> -->
             留言
            </template>



            <div style="margin: 10px 0">
                  <div style="border-bottom: 1px solid #409EFF; padding: 10px 0; font-size: 20px">留言</div>
                  <div style="padding: 10px 0">
<!-- v-model="commentForm.content" -->
                    <van-field
                      v-model="commentForm"
                      rows="3"
                      autosize
                      type="textarea"
                      placeholder="请输入留言"
                    />
                  </div>
                  <div class="pd-10" style="text-align: right">
                    <van-button type="info" size="mini" @click="save">留言</van-button>
                  </div>
             </div>




            <!--      评论列表-->
        <div>
          <div v-for="item in commentInfo" :key="item.id" style="border-bottom: 1px solid #ccc; padding: 10px 0; ">
            <div style="display: flex">
              <div style="width: 60px; text-align: center;">
                <img :src="img_url+item.avatarUrl" style="width: 40px; height: 40px; border-radius: 50%;"/>
              </div> <!--  头像-->
              <div style="flex: 1; font-size: 14px; padding: 5px 0; line-height: 25px">
                <b style="color: #409EFF">{{ item.nickname }}</b>
                <div>{{ item.content }}</div>

                <div style="display: flex; line-height: 20px; margin-top: 5px">
                  <div style="width: 200px;">
                    <i class="el-icon-time"></i><span style="margin-left: 5px; color: #ccc;">{{ item.createTime }}</span>
                  </div>
                  <div style="text-align: right; flex: 1">
                    <van-button type="info" size="mini" style="margin-left: 5px" @click="handleReply(item.id)">回复</van-button>
                    <van-button type="warning" size="mini"  @click="del(item.id)" v-if="user.id === item.userId">删除</van-button>
                  </div>
                </div>
              </div>   <!--  内容-->
            </div>

            <div v-if="item.children.length"  style="padding-left: 30px;">
              <div v-for="subItem in item.children" :key="subItem.id"  style="background-color: #f0f0f0; padding: 5px 20px">
                <!--          回复列表-->
                <div style="font-size: 14px; padding: 5px 0; line-height: 25px">

                  <div style="padding-left: 5px">
                    <b style="color: #409EFF">{{ subItem.nickname }}</b>回复
                    <b style="color: #409EFF" v-if="subItem.pnickname">{{ subItem.replyTo }}</b>
                    <span>：{{ subItem.content }}</span>
                  </div>

                  <div style="display: flex; line-height: 20px; margin-top: 5px; padding-left: 5px">
                    <div style="width: 200px;">
                      <i class="van-icon-time"></i><span style="margin-left: 5px">{{ subItem.time }}</span>
                    </div>
                    <div style="text-align: right; flex: 1">
                      <van-button type="info" size="mini" style="margin-left: 5px"  @click="handleReply(subItem.id)">回复</van-button>
                      <van-button type="warning" size="mini"  @click="del(subItem.id)" v-if="user.id === subItem.userId">删除</van-button>
                    </div>
                  </div>
                </div>   <!--  内容-->
              </div>

            </div>
          </div>
        </div>
          </van-tab>

        </van-tabs>
        </van-cell>
        </van-cell-group>




        <van-dialog title="回复" v-model="dialogFormVisible"  show-cancel-button
        confirm-button-text="确认回复"
        cancel-button-text="取消回复"
        @confirm="save"
        >
      <van-form @submit="onSubmit">

          <!-- <van-input type="textarea" v-model="commentForm.contentReply" autocomplete="off"></van-input> -->
          <van-field
            v-model="com"
            rows="10"
            autosize
            label="留言"
            type="textarea"
            placeholder="请输入留言"
          />

      </van-form>
      <!-- <div slot="footer" class="dialog-footer">
        <van-button @click="dialogFormVisible = false" size="small">取 消</van-button>
        <van-button type="primary" @click="save"  size="small">确 定</van-button>
      </div> -->
      </van-dialog>



      </div>
      <!--    商品信息end-->
    </div>
    <!--    商品导航-->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" @click="$toast.fail('功能未开发')"/>
      <!-- <van-goods-action-icon icon="cart-o" text="购物车" to="/shopCart"/> -->
      <van-goods-action-icon icon="star-o" text="收藏" v-if="!userCollect" color="#ff5000" @click="cutover"/>
      <van-goods-action-icon icon="star" text="已收藏" v-if="userCollect" color="#ff5000" @click="cutover"/>
      <!-- <van-goods-action-button type="warning" text="加入购物车" @click="chooseSku=true"/> -->
      <van-goods-action-button type="danger" text="立即购买" @click="chooseSku=true"/>
    </van-goods-action>
    <!--    商品导航end-->

  </div>

</template>

<script>
import {getGoodsDetail, IMG_URL, getGoodsComment,savaComment} from '../../api/api'


export default {
  name: "goodsDetails",
  data() {
    return {
      img_url: IMG_URL,//图片地址前缀
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      storeInfo: [], //商品信息
      // userCollect: false //收藏状态
      commentInfo:[] ,//留言信息
      id:this.$route.query.id,
      dialogFormVisible: false,
    };
  },

  created() {
    this.loadComment()
  },

  methods: {

     loadComment() {
      getGoodsComment(this.id).then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取留言数据失败')
        return
      }if(res.data == null){
        this.$toast.fail('无留言数据')
        return
      }
      //商品的基本信息
      this.commentInfo = res.data
    })
    },

    save() {
      if (!this.user.id) {
        this.$message.warning("请登录后操作")
        return
      }
      this.commentForm.goodsId = this.id
      if (this.commentForm.contentReply) {
        this.commentForm.content = this.commentForm.contentReply
      }
      savaComment(this.commentForm).then(res => {
        if (res.code === '200') {
          this.$message.success("评论成功")
          this.commentForm = {}  // 初始化评论对象内容
          this.loadComment()
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    onClickLeft() {
      this.$router.go(-1);
    },

    onClickComment(title){

      console.log(title);
      if(title == 1){
        let id = this.storeInfo.id;
        console.log(id);
        getGoodsComment({id}).then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取留言数据失败')
        return
      }if(res.data == null){
        this.$toast.fail('无留言数据')
        return
      }
      //商品的基本信息
      this.commentInfo = res.data
      console.log(this.commentInfo)

    })}
    },


    handleReply(pid) {
      this.commentForm = { pid: pid }

      this.dialogFormVisible = true
    }


    //切换收藏状态
    // cutover() {
    //   if (!this.userCollect) {
    //     postCollectAdd({
    //       id: this.productId,
    //       category: 'collect'
    //     }).then(res => {
    //       // console.log(res)
    //       if (res.status === 200) {
    //         this.$toast.success('收藏成功')
    //         this.userCollect = !this.userCollect
    //       }
    //     })
    //   } else {
    //     postCollectDel({
    //       id: this.productId,
    //       category: 'collect'
    //     }).then(res => {
    //       // console.log(res)
    //       if (res.status === 200) {
    //         this.$toast.success('取消成功')
    //         this.userCollect = !this.userCollect
    //       }
    //     })
    //   }

    // }
  },
  mounted() {
    let id = this.$route.query.productId
    this.productId = id
    if (id == null) {
      this.$toast.fail('参数有误')
      return
    }
    console.log(id)
    getGoodsDetail({id}).then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取商品数据失败')
        return
      }
      console.log(res.data)
      //商品的基本信息
      this.storeInfo = res.data
      console.log(this.storeInfo.avatarUrl)



      //判断是否收藏
      // if (this.storeInfo.userCollect) {
      //   //收藏
      //   this.userCollect = true
      // } else {
      //   //未收藏
      //   this.userCollect = false
      // }


    })
  }
}
</script>

<style lang="less" scoped>
#myshop {
  padding-bottom: 50px;
  background-color: #f0f0ee;

  #shopinfo {
    #shopprice {
      /*      font-weight: bolder;
            font-size: 21px;*/
      padding: 11px 8px 3px;

      .left_val {
        span {
          font-size: 16px;
        }

        color: red;
        font-size: xx-large;
      }

      .right_val {
        text-align: end;

        div {
          display: inline-block;
          font-size: 12px;
          color: #969799;
          line-height: normal;
          text-align: center;
        }
      }
    }

    .van-cell-group {
      margin: 8px 8px 0;
    }
  }
}

#productDetails_title {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10;
}

#my-swipe {

  /deep/ .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

.shopname {
    font-size: 20px;
    height: 20px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

.newprice {
    color: #ff8725;
    font-size: large;
    font-weight: bold;
  }

  .oldprice {
    color: #c4c7d3;
    font-size: 12px;
    text-decoration: line-through;
  }

/deep/ .van-tabs__line {
    background-color: #409EFF;
  }







</style>
