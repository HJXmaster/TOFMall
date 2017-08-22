<template>
  <div>
    <el-form :model="Form_Userinfo" :rules="rules" ref="Form_Userinfo" label-width="110px" class="demo-Form_Userinfo">

      <div class="updateInfo-box">

        <div style="margin-bottom:16px;width:100%">
          <h4 style="margin-left:-10px;float:left;">修改个人信息</h4>
        </div>
        <div class="errorM" style="margin:0;color:#FF4949;"></div>
        <!-- <div style="height:40px;margin-left:-15px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="Form_Userinfo.username"></el-input>
          </el-form-item>
        </div> -->
        <!-- <div style="height:40px;margin-left:-15px">
          <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="Form_Userinfo.password"></el-input>
          </el-form-item>
        </div> -->

        <div style="height:40px;margin-left:-15px ">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="Form_Userinfo.email"></el-input>
          </el-form-item>
        </div>

        <div style="height:40px;margin-left:-15px">
          <el-form-item label="邮编" prop="ecode">
            <el-input v-model="Form_Userinfo.ecode"></el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="收货地址" prop="address">
            <el-input v-model="Form_Userinfo.address"></el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="Form_Userinfo.phone"></el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="Form_Userinfo.realName"></el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="Form_Userinfo.idCard"></el-input>
          </el-form-item>
        </div>

        <div style="margin-left:80px;width:74.5%;">
          <div style="float:right">
            <el-form-item>
              <el-button type="primary" @click="submitForm('Form_Userinfo')">修改资料</el-button>
              <el-button @click="resetForm('Form_Userinfo')">重置</el-button>
            </el-form-item>
          </div>
        </div>

      </div>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios'
import config from './../../../publicAPI/config'

import { Notification } from 'element-ui';
export default {
  components: {
  },
  data(){
    return{
        rootURL:config.JXURL,
        Form_Userinfo: {
            isUpdate: false,
            email:'',
            address:'',
            realName:'',
            ecode:'',
            phone:'',
            idCard: '',
          },
          rules: {
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入收货地址', trigger: 'blur' },
              {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],
            realName: [
              { required: true, message: '请再次真实姓名', trigger: 'blur' },
              {  min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ],
            ecode: [
              { required: true, message: '请输入邮编', trigger: 'blur' },
              {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请再次输入联系电话', trigger: 'blur' },
              {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],
            idCard: [
              { required: true, message: '请再次输入身份证号', trigger: 'blur' },
              {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],

          },
    }
  },
  methods:{
      getMyInfo(){
        let that = this
        axios.get(that.rootURL+'/queryInfo.do')
        .then(function(res){
          let item = res.data ;
          if(item.uid!=null){
            that.Form_Userinfo.email = item.uemail;
            that.Form_Userinfo.ecode = item.upostcode;
            that.Form_Userinfo.address = item.uaddress;
            that.Form_Userinfo.phone = item.uphone;
            that.Form_Userinfo.realName = item.uname;
            that.Form_Userinfo.idCard = item.uidcard;
          } else {
            console.log(2)
          }
        })
        .catch(function(error){
          console.error(error)
        })
      },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(that.rootURL+'/modify.do',
                 querystring.stringify({
                    uemail:that.Form_Userinfo.email,
                    upostcode:that.Form_Userinfo.ecode,
                    uaddress:that.Form_Userinfo.address,
                   uphone:that.Form_Userinfo.phone,
                    uname:that.Form_Userinfo.realName,
                    uidcard:that.Form_Userinfo.idCard
                 })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                )
                .then(function(res){
                if(!res.data.status){
                  Notification.error({
                            title: res.data.msg,
                            message: res.data.msg,
                            offset: 65,
                              duration:2000
                          })
                }else{
                  Notification.success({
                            title: res.data.msg,
                            message: res.data.msg,
                            offset: 65,
                              duration:2000
                          })
                }
                    // localStorage.setItem('tokennum_test',res.data[1].obj.tokennum)
                })
                .catch(function(error){
                  console.error('注册不成功！');

                  Message.error('注册不成功！');

                });





            } else {
              console.log('提交错误!请保存您的信息！');
              return false;
            }
          });
        },
  },
  created(){
    let that = this ;
    that.getMyInfo();
  }
}

</script>

<style scoped>
 .updateInfo-box{
 	width: 700px;
 	height: 350px;
 	float: right;
 	border-radius: 4px;
 	background:rgba(255, 255, 255,0.5);
   position:relative;
   left:150px;
 	padding:50px;
  margin-left:10px;
 	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
 }

 .updateInfo-box>div{
 	margin: 12px 0;
  margin-left: 20px;
 	float: left;
 }

 .updateInfo-box h4{
 	color: #555;
 	font-weight: bold;
 }

 .updateInfo-box b{
 	width: 40px;
 	height: 40px;
 	display: inline-block;
 	float: left;
 	border: 1px solid #aaa;
 	border-right: none;
 	border-radius: 2px 0 0 2px;
 	text-align: center;
 }

 .updateInfo-box b span{
 	font-size: 20px;
 	color:  #377ab7;
 }

 .updateInfo-box input[type="text"],
 .updateInfo-box input[type="password"]{
 	width: 240px;
 	height: 40px;
 	float: left;
 	border: 1px solid #aaa;
 	outline: none;
 	border-radius: 0 2px 2px 0;
 	padding: 3px 10px;
 	// color:#606B70;
 	color: #555;
 }

 .updateInfo-box input[type="text"]:focus,
 .updateInfo-box input[type="password"]:focus{
 	border: 1px solid #20A0FF;
 }

 .updateInfo-box input[type="checkbox"]{
 	width: 16px;
 	height: 16px;
 	float: left;
 	border: 1px solid #000;
 }

 .updateInfo-box label{
 	font-weight: normal;
 	color:#606B70;
 }


div>span{
  font-size: 14px;
  color:rgba(76, 84, 85, 1);
}
</style>
