<!--商品详情页-->
<template>
  <div>
    <!--    回退按钮-->

    <van-nav-bar
      title="闲置详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="wap-home" size="18" />
      </template>
    </van-nav-bar>

    <!--    回退按钮end-->

    <div style="background-color: #fff; width=100%; height=60px; padding-top: 2px; padding-bottom:10px; padding-left:20px;">

      <div style=" width=50px; float:left;">
        <img :src='img_url+goodsInfo.avatarUrl' alt="头像"
             style="height:45px; width:45px; border-radius: 50%; position: relative; top: 6px; ">
      </div>

      <div style="margin-top:10px; margin-left:60px; width=50px;">
        <div style="padding-bottom:3px; ">{{goodsInfo.nickname}}</div>
        <div style="color: #ccc; ">{{goodsInfo.createTime}}</div>
      </div>

    </div>

    <div id="myshop">

      <div>
        <van-image fit="cover" :src='img_url+goodsInfo.photo' width="100%" height="100%"/>
      </div>
      <!--    商品信息-->
      <div id="shopinfo">
        <van-cell-group inset>
          <van-cell id="shopprice" :border="false">
            <template #default>
              <van-row>
                <!--            商品名-->
                <van-col span="24" class="shopname">{{ goodsInfo.name }}</van-col>
              </van-row>
              <van-row>
                <van-col span="12" class="left_val" style="padding-top: 10px">
                  <span style="">￥</span>
                  {{ goodsInfo.sellPrice }}
                  <!--            历史价格-->
            <span class="oldprice">￥{{ goodsInfo.buyPrice }}</span>
                </van-col>

                <van-col class="right_val" span="12" style="padding-top: 10px">
                  <div style="padding: 5px">
                    <van-icon name="eye" size="20" />
                    {{ goodsInfo.viewNumber }}
                  </div>
                  <div style=" font-size=400px">
                    <van-icon name="chat" size="19" />
                    <!-- {{ goodsInfo.commentNum }} -->
                    {{ commentNum }}
                  </div>
                </van-col>
              </van-row>
            </template>
          </van-cell>
          <van-cell>
            <template #default>
              {{ goodsInfo.goodsInfo }}
            </template>
          </van-cell>
        </van-cell-group>



        <van-cell-group inset>
          <van-cell title="详情" icon="volume-o" />
          <!-- <van-tag mark type="primary">详情</van-tag> -->
          <van-cell>
            <div>
              {{ goodsInfo.content }}
            </div>
          </van-cell>
        </van-cell-group>
        <van-cell-group inset>
          <van-cell style="width: 100%; padding: 5px 5px;">
        <!-- <van-tabs v-model="active" @click="onClickComment"> -->
          <van-tabs  @click="onClickComment">
          <van-tab>
            <template #title> <van-icon name="exchange" size="19"  /> 交易方式 </template>

            <div>
              <van-icon name="logistics" size="25" />
              交易地址：
              <van-tag type="primary">{{ goodsInfo.address }}</van-tag>
            </div>
            <div>
              <van-icon name="../../static/qq.png" size="30" color="#409EFF"  />
              <span>QQ：</span>
              <van-tag type="primary">{{ goodsInfo.qq }}</van-tag>
            </div>
            <div>
              <van-icon name="wechat" size="30" color="#67C23A" />
              WeChat：
              <van-tag type="success">{{ goodsInfo.wechat }}</van-tag>
            </div>
          </van-tab>




          <van-tab>
            <template #title> <van-icon name="smile-comment-o" size="19"   />
            <!-- <van-button @click="onClickComment(goodsInfo.id)" class="add"></van-button> -->
             留言
            </template>



            <div style="margin: 10px 0">
                  <div style="border-bottom: 1px solid #409EFF; padding: 10px 0; font-size: 20px">留言</div>
                  <div style="padding: 10px 0">
                    <!-- v-model="content" -->
                    <van-field
                      v-model="commentForm.content"
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
        <div >
          <span v-if="commentInfo.length === 0">暂时无留言~赶紧抢沙发！</span>
          <div v-for="item in commentInfo" :key="item.id" style="border-bottom: 1px solid #ccc; padding: 10px 0; ">
            <div style="display: flex">
              <!--  头像-->
              <div style="width: 40px; text-align: center; margin-left: 1px">
                <img :src="img_url+item.avatarUrl" style="width: 40px; height: 40px; border-radius: 50%;"/>
              </div>
              <div style="flex: 1; font-size: 14px; padding: 5px 0; line-height: 25px; margin-left: 10px">
                <b style="color: #409EFF">{{ item.nickname }}</b>
                <div>{{ item.content }}</div>

                <div style="display: flex; line-height: 20px; margin-top: 5px">
                  <div style="width: 180px;">
                    <van-icon name="clock-o"></van-icon><span style="margin-left: 5px; color: #ccc;">{{ item.createTime }}</span>
                  </div>
                  <div style="text-align: right; flex: 1">
                    <van-button type="info" size="mini" style="margin-left: 5px" @click="handleReply(item.id)">回复</van-button>
                    <van-button type="warning" size="mini"  @click="del(item.id)" v-if="user.id === item.studentId">删除</van-button>
                  </div>
                </div>
              </div>   <!--  内容-->
            </div>

            <div v-if="item.children.length"  >
              <div v-for="subItem in item.children" :key="subItem.id"  style="background-color: #f0f0f0; padding: 5px 5px; margin-left: 15px; ">
                <!--          回复列表-->
                <div style="font-size: 14px; padding: 5px 0; line-height: 25px">

                  <div style="padding-left: 5px">
                    <b style="color: #409EFF">{{ subItem.nickname }}</b> 回复
                    <b style="color: #409EFF" v-if="subItem.pnickname">{{ subItem.replyTo }}</b>
                    <span>：{{ subItem.content }}</span>
                  </div>


                  <div style="display: flex; line-height: 20px; margin-top: 5px; padding-left: 5px">
                    <div style="width: 180px;">
                      <van-icon name="clock-o"></van-icon><span style="margin-left: 5px; color: #ccc;">{{ subItem.createTime }}</span>
                    </div>
                    <div style="text-align: right; flex: 1;">
                      <van-button type="info" size="mini" style="margin-left: 5px"  @click="handleReply(subItem.id,subItem.nickname)">回复</van-button>
                      <van-button icon-position="left" type="warning" size="mini"  @click="del(subItem.id)" v-if="user.id === subItem.studentId">删除</van-button>
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




        <van-dialog title="留言回复" v-model="dialogFormVisible"  show-cancel-button
        confirm-button-text="确认回复"
        cancel-button-text="取消回复"
        @confirm="save"
        >
      <!-- <van-form @submit="onReplyToComment"> -->
      <!-- <van-form > -->
        <!-- v-model="replyToContent" -->
          <van-field
            v-model="commentForm.contentReply"
            rows="6"
            autosize
            type="textarea"
            placeholder="请输入回复的留言"
          />

      <!-- </van-form> -->
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
      <!-- <van-goods-action-icon icon="star-o" text="收藏" v-if="!userCollect" color="#ff5000" @click="cutover"/>
      <van-goods-action-icon icon="star" text="已收藏" v-if="userCollect" color="#ff5000" @click="cutover"/> -->
      <!-- <van-goods-action-button type="warning" text="加入购物车" @click="chooseSku=true"/> -->
      <!-- <van-goods-action-button type="danger" text="立即购买" @click="chooseSku=true"/> -->
    </van-goods-action>
    <!--    商品导航end-->

  </div>

</template>

<script>
import {getGoodsDetail, getCommentNum, IMG_URL, getGoodsComment,savaComment,delComment} from '../../api/api'


export default {
  name: "goodsDetails",
  data() {
    return {
      img_url: IMG_URL,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      goodsInfo: [], //商品信息
      commentInfo: [] ,//留言信息
      id: this.$route.query.goodsId,
      dialogFormVisible: false,
      commentNum:"",//留言总数

      commentForm:{},
      // content: "",
      // replyTo: "",
      // userCollect: false, //收藏状态

    };
  },

  created() {
    // this.onClickComment()
    // this.loadComment()
    this.goodsCommentNum()

  },

  methods: {

    //  loadComment(){
    //   getGoodsComment(this.id).then(res => {
    //   if (res.code !== '200') {
    //     this.$toast.fail('获取留言数据失败')
    //     return
    //   }if(res.data == null){
    //     this.$toast.fail('无留言数据')
    //     return
    //   }
    //   //留言的基本信息
    //   this.commentInfo = res.data
    // })
    // },

    save() {
      // if (!this.user.id) {
      //   this.$toast.warning("请登录后操作")
      //   return
      // }

      if (this.commentForm.contentReply !== null || this.commentForm.content !== null ) {
        this.commentForm.goodsId = this.id
        if (this.commentForm.contentReply) {
          this.commentForm.content = this.commentForm.contentReply
        }
        savaComment(this.commentForm).then(res => {
          if (res.code === '200') {
            this.$toast.success("留言成功")
            this.commentForm = {}  // 初始化评论对象内容
            this.dialogFormVisible = false
            // this.loadComment()
            this.onClickComment(1)
            this.goodsCommentNum()
          } else {
            this.$toast.fail(res.msg)
          }
        })
      }else{
        this.$toast.fail("请输入留言内容！")
      }


    },

    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push( '/home');
    },

    onClickComment(title){
      if(title === 1){
        let goodsId = this.id;
        getGoodsComment({goodsId}).then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取留言数据失败！\n' + res.msg)
        return
      }
      // if(res.data == null){
      //   this.$toast.fail('无留言数据\n' + res.msg)
      //   return
      // }
      //留言的基本信息
      this.commentInfo = res.data

    })}
    },


    handleReply(pid,nickname) {
      this.commentForm = { pid: pid,replyTo: nickname}
      this.dialogFormVisible = true
    },

    del(id) {
      delComment(id).then(res => {
        if (res.code === '200') {
          this.$toast.success("删除成功")
          this.onClickComment(1)
        } else {
          this.$toast.fail("删除失败")
        }
      })
    },


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



    goodsCommentNum(){
    let goodsId = this.id
    getCommentNum({goodsId}).then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取留言总数失败！\n' + res.msg)
        return
      }
      //留言总数
      this.commentNum = res.data
    })}



  },
  mounted() {
    // this.goodsCommentNum()
    let id = this.$route.query.goodsId
    // this.productId = id
    if (id == null) {
      this.$toast.fail('参数有误')
      return
    }

    getGoodsDetail({id}).then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取商品数据失败！\n' + res.msg)
        return
      }
      //商品的基本信息
      this.goodsInfo = res.data

      //判断是否收藏
      // if (this.goodsInfo.userCollect) {
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
