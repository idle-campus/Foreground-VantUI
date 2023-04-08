<template>
  <div>
    <div class="icon-back" @click="toBack">
      <van-icon size="25" name="arrow-left"/>
    </div>
    <div id="Person_title">
      <p>个人中心</p>
    </div>

  <van-cell-group style="margin: 10px 7px;" inset >
    <div style="display: inline-block; float: left; margin-top: 5%; padding-left: 5px; ">
      <van-uploader
      :max-count="1"
      :after-read="afterRead"

      >
        <van-image
          v-if="personInfo.avatarUrl"
          fit="cover"
          height="6rem"
          round
          :src="img_url+personInfo.avatarUrl"
          width="6rem"
        />
      </van-uploader>
    </div>
    <div style="float: left; width: 70%">
      <van-cell class="cell-title" title="学号" >{{user.username}}</van-cell>
      <van-cell class="cell-title" title="邮箱" >{{personInfo.email}}</van-cell>
      <van-cell class="cell-title" title="注册时间" >{{personInfo.createTime}}</van-cell>
    </div>
  </van-cell-group>

  <van-form @submit="onSave">
    <van-field
      v-model="personInfo.nickname"
      label="昵称"
      placeholder="输入昵称"
      :rules="[{ required: true, message: '请填写昵称' }]"
    />
    <van-field
      v-model="personInfo.phone"
      label="手机号"
      placeholder="输入手机号"
      :rules="[{ required: true, message: '请填写手机号' },
      { validator: phoneValidator, message: '输入手机号格式有误！' }]"
    />
    <van-field
      v-model="personInfo.qq"
      label="QQ账号"
      placeholder="输入QQ账号"
      :rules="[{ required: true, message: '请填写QQ账号' },
      { validator: qqValidator, message: '输入QQ号格式有误！ ' }]"
    />
    <van-field
      v-model="personInfo.wechat"
      label="微信账号"
      placeholder="输入微信账号"
      :rules="[{ required: true, message: '请填写微信账号' },
      { validator: weChatValidator, message: '输入微信号格式有误！' }]"
    />

    <van-field
      readonly
      clickable
      :value="personInfo.school"
      label="学校"
      placeholder="点击选择学校-学院"
      @click="showSchoolAndAcademy = true"
    />
    <van-popup v-model="showSchoolAndAcademy" position="bottom">
    <van-picker
      title="学校-学院"
      show-toolbar
      :columns="schoolAndAcademyColumns"
      @confirm="onSchoolAndAcademy"
      @cancel="showSchoolAndAcademy = false"
    />
    </van-popup>
    <van-field
      v-model="personInfo.academy"
      label="学院"
      readonly
    />

    <van-field
      readonly
      clickable
      :value="personInfo.grade"
      label="年级"
      placeholder="点击选择年级"
      @click="showGrade = true"
    />
    <van-popup v-model="showGrade" position="bottom">
      <van-picker
        show-toolbar
        :columns="gradeColumns"
        @confirm="onGrade"
        @cancel="showGrade = false"
      />
    </van-popup>

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>





  </div>


</template>



<script>
import {IMG_URL, getPerson, revisePerson, changeStuPic, getNewData} from "../../api/api";

const cities = {
  广应科: ['经济与管理学院','体育科技学院','文学与传媒学院','外国语学院',
    '人工智能与电气工程学院','智能制造学院','计算机学院','建筑与设计学院',
    '美术创意学院','马克思主义学院','继续教育学院'],
  松田: ['财经与管理学院','商贸学院','信息工程学院','艺术与建筑学院','智能工程学院',
        '体育与健康学院','马克思主义学院','继续教育学院','创新创业学院'],
};

export default {
  name: 'Person',
  data() {
    return {
      img_url: IMG_URL,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      personInfo: {},
      schoolColumns: ['广应科', '松田'],
      schoolAndAcademyColumns: [{ values: Object.keys(cities) }, { values: cities['广应科'] }],
      showSchoolAndAcademy: false,
      gradeColumns:[],
      showGrade: false,
      // token: (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).token

    };
  },

  created() {
    this.send()

  },

  methods: {

    toBack() {
      //回退上一级
      this.$router.go(-1);
    },

    onSchoolAndAcademy(values){
      this.personInfo.school = values[0];
      this.personInfo.academy = values[1];
      this.showSchoolAndAcademy = false;
    },
    onGrade(value) {
      this.personInfo.grade = value;
      this.showGrade = false;
    },


    phoneValidator(val) {
      //手机号验证
      return new Promise((resolve) => {
        this.$toast.loading('验证中...');
        setTimeout(() => {
          this.$toast.clear();
          let isphone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(val)
          if (isphone) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 100);
      });
    },
    qqValidator(val) {
      //QQ验证
      return new Promise((resolve) => {
        this.$toast.loading('验证中...');
        setTimeout(() => {
          this.$toast.clear();
          let isQQ = /^[1-9][0-9]{4,10}$/.test(val)
          if (isQQ) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 100);
      });
    },
    weChatValidator(val) {
      //微信号验证
      return new Promise((resolve) => {
        this.$toast.loading('验证中...');
        setTimeout(() => {
          this.$toast.clear();
          let isWeChat = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(val)
          if (isWeChat) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 100);
      });
    },
    gradeValidator(val) {
      //年级验证
      return new Promise((resolve) => {
        this.$toast.loading('验证中...');
        setTimeout(() => {
          this.$toast.clear();
          let isGrade = /^(19|20)\d{2}$/.test(val)
          if (isGrade) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 100);
      });
    },


    // getPerson获取个人信息
    send(){
      getPerson().then(res => {
      if (res.code !== '200') {
        this.$toast.fail('获取个人信息失败！\n' + res.msg)
        return
      }
      this.personInfo = res.data
      })
    },

    //revisePerson保存个人信息
    // async getUser() {
    //   return (await getNewData(this.user.username)).data
    // },
    onSave(){
      revisePerson(this.personInfo).then(res => {
      if (res.code == '200') {
        this.$toast.success('更新个人信息成功！\n')

        // 触发父级更新User的方法
        // this.$emit("refreshUser")

        // 更新浏览器存储的学生信息
        // this.getUser().then(res => {
        //   res.token = JSON.parse(localStorage.getItem("user")).token
        //   localStorage.setItem("user", JSON.stringify(res))
        // })

        this.$router.push('/mine')
      }else{
        this.$toast.fail('更新个人信息失败！\n' + res.msg)
      }

      })
    },

    //修改头像
    afterRead(file){
      const forms = new FormData();
      forms.append("file",file.file);
      changeStuPic(forms).then(res => {
        if(res.code !== '200'){
        this.$toast.fail(res.msg)
      }
        this.personInfo.avatarUrl = res.data
      })
    },

  },

  mounted(){
    this.send()

    let year = new Date().getFullYear() + 1
      for(var i = 0; i <= 9; i++){
        year = year-1
        this.gradeColumns.push(year)
      }






  }


}



</script>





<style lang="less" scoped>

.icon-back {
  position: absolute;
  left: 2px;
  top: 15px
}

#Person_title {
  text-align: center;
}

// .van-cell-group--inset {
//     margin: 10px 7px;
//     overflow: hidden;
//     border-radius: 8px;
// }
/deep/ .van-cell__title{
    flex: 0.5;

}
// .van-cell__value {
//     width: 100%;
// }

// .van-tag {
//   width: 200px;
// }
.cell-title{
  width: 100%;
}


</style>
