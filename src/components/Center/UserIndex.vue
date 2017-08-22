<template>
  <div>
    <myHeader></myHeader>

    <div id="whole" :style="{backgroundImage: 'url(' +bg + ')'}" style="background-size: cover;width:100%;background-repeat: no-repeat" >

   <div class="clearfix"></div>
   <div class="hint"></div>
    <div style="float:left;margin-top:-50px;width:200px;height:100px;padding:5px;">
      <div style="float:left;width:90px;height:90px;border:2px dashed black;padding:2px">
      <img :src="picPath_Msg" style="width:82px;height:82px">
      </div>
      <div class="omit" style="text-align:left;float:left;width:100px;height:50px;padding-top:10px;padding-left:10px">
        {{myName_Msg}}
      </div>
      <div style="float:left;text-align:right;font-size:12px;width:100px;height:10px;">
        {{isRealName_Msg}}
      </div>
      <div style="float:left;width:100px;height:30px;padding-left:10px;padding-top:10px;margin-bottom:10px">
        <el-upload
          action="//xiaogong.ftp29.scauidc.com/xiaogong/image/uploadImage"
          :default-file-list="fileList"

          :data="extraData"
          name="img"
          :on-success="ok"
          >
          <el-button size="small" type="text">更改头像</el-button>
        </el-upload>
        <!-- <el-button type="text">更改头像</el-button> -->
      </div>
      <div style="float:left;height:500px;width:200px">
        <el-row class="tac">
          <el-col :span="4">
            <el-menu router class="el-menu-vertical-demo lead" @select="handleClick" @open="handleOpen" @close="handleClose">
                      <el-menu-item index="0"  :route="{path:'/userIndex/account'}">账号管理</el-menu-item>
                      <el-menu-item index="1"  :route="{path:'/userIndex/ShoppingCart'}">我的购物车</el-menu-item>
                      <el-menu-item index="2"  :route="{path:'/userIndex/order'}">订单管理</el-menu-item>
                      <el-menu-item index="4"  :route="{path:'#'}">联系客服</el-menu-item>
            </el-menu>
            </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-top:50px;margin-left:200px;width:980px;height:550px;padding-right:40px;padding-bottom:50px">
            <div style="margin-top:-100px;float:left;width:1000px;height:550px">
              <transition name="slide-user" mode="out-in">
                <router-view class="child-view"></router-view>
              </transition>
            </div>
</div>
  </div>

  <div class="clearfix"></div>
<div style="margin-top:130px">
  <myFooter></myFooter>
</div>

</div>
</template>

<script>
  import myHeader from './../Public/Header/Header.vue'
  import myFooter  from './../Public/Footer/Footer.vue'
  import axios from 'axios'
  import config from './../../publicAPI/config'

  export default {
    components: {
      myHeader,
      myFooter,
    },
    data(){
      return{
        show0:true,
        show10:false,
        show11:false,
        show2:false,
        show3:false,
        bg:require('./../../assets/img/userBG.jpg'),

        fileList: [],
        extraData:{type:1,tokennum:''},
        showOn:true,
        picPath_Msg:require('./../../assets/img/myPic.jpg'),
      }
    },
    methods: {
      ok(response, file, fileList){

      },
      handleClick(key, keyPath) {
        if(key=='0'){

        }
        if(key=='1'){
        }
        if(key=='2'){
        }
        if(key=='2'){
        }
        if(key=='3'){
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created(){
      let that = this
      that.myName_Msg = localStorage.getItem('userName')
      that.isRealName_Msg = localStorage.getItem('isRealName') == '2' ? '':''
      that.extraData.tokennum = localStorage.getItem('tokennum')
      // that.picPath_Msg = localStorage.getItem('headPhoto')
    },
    watch:{
      picPath_Msg(val){
        let that = this
        that.picPath_Msg = val
      }
    }
  }
</script>

<style scoped>
  .bodyBG{
    background-size: 100% ;
    min-height: 508px;
  }
  .middle{
    padding-top:-20px;
    max-height: 22px;
    width: 1200px;
    background-color: rgba(218,230,244,0.9);/*#dae6f4*/
  }
  .hint{
    width: 100%;
    height:50px;
  }
  .el-row{
    width: 1200px;
    padding-bottom: 20px;
  }
  .content{
    background: rgba(255,255,255,0.6);
    /*border: 1px solid blue;*/
    border-radius: 5px;
    min-height: 568px;
    width: 920px;
    margin-left: 20px;
    float: left;
  }
  .information{
    border-bottom: 1px solid #5e6d82;
    padding: 25px 30px 15px 30px;
    height: 150px;
    width: inherit;
  }
  .text{
    display: inline-block;
    height: 110px;
    width: 750px;
    float: left;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #475669;
    line-height: 30px;
  }
  .patentList{
    width: inherit;
    padding: 0px 25px 20px 25px;
  }
  .patentList ul{
    padding: 15px;
  }
  .patentList ul li{
    padding: 10px;
    border-bottom: 1px dotted #cccccc;
  }
  .patentList ul li div{
    width: 180px;
    padding-left: 10px;
    display: inline-block;
  }
  .patentList ul li a:hover{
    color: #F08519;
  }
  .el-tabs__header{
    width:500px;
    margin-bottom: 40px
  }

  .bodyBG{
    /*background-image: url('./openIndexBG2.jpg');*/
    height:110px;
    width:500px;
  }
</style>
