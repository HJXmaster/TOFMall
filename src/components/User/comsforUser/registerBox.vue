<template>
  <div>
    <el-form :model="Form_Register" :rules="rules" ref="Form_Register" label-width="110px" class="demo-Form_Register">

      <div class="register-box">
        <div style="margin-bottom:16px;width:280px;">
          <h4 style="margin-left:-10px;float:left;">新用户注册</h4>
        </div>
        <div class="errorM" style="margin:0;color:#FF4949;"></div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="用户名" prop="username">
            <el-input @change="checkAccount(Form_Register.username)" v-model="Form_Register.username"></el-input>
            <div v-show="account" style="position:absolute;color:red;font-size:12px;margin-top:5px"><i class="el-icon-circle-close">该账号已被注册，请更换！</i></div>
            <div v-show="account2" style="position:absolute;color:green;font-size:12px;margin-top:5px"><i class="el-icon-check">该账号未被使用</i></div>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="Form_Register.password"></el-input>
          </el-form-item>
        </div>


        <div style="height:40px;margin-left:-15px">
          <el-form-item label="确认密码" prop="passConf">
            <el-input  type="password" v-model="Form_Register.passConf"></el-input>
          </el-form-item>
        </div>

        <div style="width:302px;height:40px;margin-left:-15px">
          <el-form-item label="密码提示问题" prop="passAsk">
            <el-input v-model="Form_Register.passAsk"></el-input>

          </el-form-item>
        </div>

        <div style="height:40px;margin-left:-15px">
          <el-form-item label="密码提示答案" prop="passAnswer">
            <el-input v-model="Form_Register.passAnswer"></el-input>
          </el-form-item>
        </div>

        <!-- <div style="height:40px;margin-left:-15px">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="Form_Register.phone"></el-input>
          </el-form-item>
        </div> -->
        <div class="clear"></div>
        <div style="width:350px;margin-left:-25px;margin-top:-05px">
          <div style="margin-left:-40px;">
            <el-form-item label="" prop="agreement">
              <el-checkbox-group v-model="Form_Register.agreement">
                <el-checkbox label="" name="agreement"></el-checkbox>
                <span>我已阅读并同意《TOF商城协议》</span>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>

        <div style="margin-left:-35px;margin-top:-10px">
          <div style="margin-top:-10px;margin-left:62px">
            <el-button type="primary" @click="submitForm('Form_Register')">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
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
      var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.Form_Register.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
    return{
        rootURL:config.JXURL,
        Form_Register: {
            username:'',
            password:'',
            passConf:'',
            passAsk:'',
            passAnswer:'',
            agreement:[],
          },
          rules: {
            username: [
              { required: true, message: '请输入账号', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],
            passConf: [
              { required: true, message: '请再次输入密码', trigger: 'blur' },
              { validator: validatePass2, trigger: 'blur' }
            ],
            passAsk: [
              { required: true, message: '请再次输入密码提示问题', trigger: 'blur' },
              {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
            ],
            passAnswer: [
              { required: true, message: '请再次输入密码提示答案', trigger: 'blur' },
              {  min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            agreement: [
               {type: 'array', required: true, message: '注册前请详细阅读！', trigger: 'change' }
             ],

          },
          options: [{
           value: '我父亲的姓名是',
           label: '我父亲的姓名是'
         }, {
           value: '我母亲的姓名是',
           label: '我母亲的姓名是'
         }],
         account: false,
         account2: false,
    }
  },
  methods:{
     checkAccount(myInput){
       setTimeout(() => {
         let that = this
         axios.get(that.rootURL+'/checkUserName.do?unickname= ' + myInput)
         .then(function(res){
           that.account = res.data.status;
           that.account2 = !res.data.status;
             if(that.myInput==''){
               that.account2 = false;
             }
         })
         .catch(function(error){
           console.error(error)
         })
       }, 100);


     },

      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(that.rootURL +'/signUp.do',
                 querystring.stringify({
                   unickname:this.Form_Register.username,
                   upassword:this.Form_Register.password,
                   uconfirmPassword:this.Form_Register.passConf,
                   uquestion:this.Form_Register.passAsk,
                   uanswer:this.Form_Register.passAnswer,
                 })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                )
                .then(function(res){
                if(res.data.status){
                  Notification.success({
                            title: '注册成功！',
                            message: res.data.msg,
                            offset: 65,
                              duration:2000
                          })
                  that.$router.push({path:'/login'})
                } else {
                  Notification.error({
                            title: '注册失败！',
                            message: res.data.msg,
                            offset: 65,
                              duration:2000
                          })
                  // window.location = '#/tradeSystem/login'
                }
                })
                .catch(function(error){
                  Message.error('注册不成功！');
                });





            } else {
              console.log('提交错误!请保存您的信息！');
              return false;
            }
          });
        },
  }
}

</script>

<style scoped>
 .register-box{
 	width: 370px;
 	height: 505px;
 	float: left;
 	border-radius: 4px;
 	background: #fff;
 	padding:20px;
  padding-left: 30px;
  margin-right:10px;
 	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
 }

 .register-box>div{
 	margin: 12px 0;
  margin-left: 20px;
 	float: left;
 }

 .register-box h4{
 	// color:#606B70;
 	color: #555;
 	font-weight: bold;
 }

 .register-box b{
 	width: 40px;
 	height: 40px;
 	display: inline-block;
 	float: left;
 	border: 1px solid #aaa;
 	border-right: none;
 	border-radius: 2px 0 0 2px;
 	text-align: center;
 }

 .register-box b span{
 	font-size: 20px;
 	color:  #20A0FF;
 }

 .register-box input[type="text"],
 .register-box input[type="password"]{
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

 .register-box input[type="text"]:focus,
 .register-box input[type="password"]:focus{
 	border: 1px solid #20A0FF;
 }

 .register-box input[type="checkbox"]{
 	width: 16px;
 	height: 16px;
 	float: left;
 	border: 1px solid #000;
 }

 .register-box label{
 	font-weight: normal;
 	color:#606B70;

 }

 .register-box button{
 	width: 280px;
 	height: 40px;
 	border: 1px solid #20A0FF;
 	outline: none;
 	border-radius: 2px;
 	font-size: 16px;
 	color: #fff;
 	background: #20A0FF;
 	padding: 3px 10px;


 }

 .register-box button:hover{
 	background: #20A0FF;
 	border: 1px solid #20A0FF;
 }

 .register-box a{
 	color: #20A0FF;
 	font-size:12px;
 	margin-top: 2px;
 	float: right;
 }
div>span{
  font-size: 14px;
  color:rgba(76, 84, 85, 1);
}
</style>
