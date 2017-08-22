<template>
  <div class="css-top">
    <div style="width:1210px;margin:0 auto;">
      <div class="css-top-left">
        <router-link to="/">
          <img src="./../../../assets/img/logo.png" id="logo">
          <span class="css-top-left-title">TOF mall &nbsp;会说话的生活超市</span>
        </router-link>
      </div>
      <div class="css-top-center">
        <div class="line"></div>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0">
            <router-link to="/">首页</router-link>
          </el-menu-item>
              <el-menu-item index="2"><a @click="checkLog()" target="_blank">购物车</a></el-menu-item>

            <el-submenu index="1">
              <template slot="title">商品分类</template>
              <el-menu-item index="1-1">
                <router-link to="/byCategory">按标签</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/byType">按关键字</router-link></el-menu-item>
            </el-submenu>

        <el-submenu index="3">
            <template slot="title">联系客服</template>
            <el-menu-item index="2-1">帮助中心</el-menu-item>
            <el-menu-item index="2-2">售后服务</el-menu-item>
            <el-menu-item index="2-3">意见建议</el-menu-item>
          </el-submenu>
            </el-menu>
      </div>

      <div v-show="!login" class="css-top-right">
        <router-link to="/login">
          <el-button>登录</el-button>
        </router-link>
        <router-link to="/register">
        <el-button type="primary">注册</el-button>
        </router-link>
      </div>

      <div v-show="login" class="css-top-right">
        <router-link to="/userIndex">
          <!-- <el-button @click="getUserInfo()">个人中心</el-button> -->
          <img src="./../../../assets/img/TOF.png" id="pic">
          <div style="float:left;padding:0px 0px 0px 10px"><span class="css-top-right-username">你好！{{username}}</span></div>
        </router-link>
        <router-link to="/login">
          <div style="float:right"><el-button type="danger" @click="logout()">退出</el-button></div>
        </router-link>
      </div>
    </div>
  </div>


</template>

<script>

import axios from 'axios'

import config from './../../../publicAPI/config'
import { Notification } from 'element-ui';

export default {
  data () {
    return {
      rootURL: config.JXURL,
      activeIndex2:'1',
      login: true,
      username: '',
    }
  },

  methods: {
    checkLog(){
      let that = this ;
      // if(!that.login){
      //
      //     Notification.error({
      //               title: '进入购物车失败！',
      //               message: '请先登录~',
      //               offset: 65,
      //                 duration:2000
      //             })
      // } else {
        that.$router.push({path:'/userIndex/ShoppingCart'})
      // }
    },
    logout(){
      let that = this ;
      axios.get(that.rootURL+'/logoutUser.do' )
      .then(function(res){
        if(res.data.status){
          Notification.success({
                    title: '注销成功！',
                    message: res.data.msg,
                    offset: 65,
                      duration:2000
                  })
          // that.$router.push({path:'/login'})
        } else {
          Notification.error({
                    title: '注销失败！',
                    message: res.data.msg,
                    offset: 65,
                      duration:2000
                  })
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    getUserInfo(){
      let that = this
      axios.get(that.rootURL+'/queryInfo.do')
      .then(function(res){
          if(res.data.msg!=null){
            // console.log(res.data.msg);
            that.login = false;
          } else {
            that.login = true;
            that.username = res.data.unickname;
          }
      })
      .catch(function(error){
        console.error(error)
      })
    }


  },

  created(){
    let that = this ;
    that.getUserInfo();
  }

}


</script>

<style lang="scss">

.css-top {
  float: left;
	width: 100%;
  height:75px;
  padding: 5px 0px;
  background-color:rgb(239,242,247);
  border-bottom: 1px solid #cccccc;
  .css-top-left {
    float: left;
    width: 30%;
    .css-top-left-title {
      padding-left: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .css-top-center {
    padding-left: 100px;
    float: left;
    width: 50%;
  }
  .css-top-right {
    float: left;
    width: 20%;
    height:60px;
    padding-top: 10px;
    padding-right: 15px;
    .css-top-right-username {
      margin-right: 0px;
      font-weight: bold;
      margin-top: 10px;
      font-size: 16px;
      color:#fc7701;
      line-height: 40px;
    }
  }
}

#logo {
  width: 60px;
  vertical-align:middle;
  border-radius: 7px;
}

#pic {
  width: 40px;
  vertical-align:middle;
  border-radius: 7px;
}
.omit{
	width:500px;
	overflow: hidden;
	vertical-align: top;
	text-overflow:ellipsis;
	white-space: nowrap;/*不换行*/
}
</style>
