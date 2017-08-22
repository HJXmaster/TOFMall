<template>
  <div>
    <el-form :model="Form_Login" :rules="rules" ref="Form_Login" label-width="100px" class="demo-Form_Login">
      <div class="login-box">
        <div style="margin-bottom:15px;width:295px;">
          <h4 style="margin:0 auto;float:left;">用户登录</h4>
          <a href="#/register">立即注册</a>
        </div>
        <div class="errorM" style="margin:0;color:#FF4949;"></div>

        <div style="width:300px;margin-left:-30px;">
          <div style="margin-left:0px;width:300px">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="Form_Login.username"></el-input>
                </el-form-item></div>
        </div>
        <div style="margin-left:0px;margin-left:-30px;margin-top:-10px;margin-bottom:30px">
          <div style="margin-left:0px;margin-bottom:-25px;width:300px">
                    <el-form-item label="密码" prop="password">
                    <el-input  type="password"  @keyup.enter.native="submitForm('Form_Login')"  v-model="Form_Login.password"></el-input>
                  </el-form-item></div>

        </div>
        <div class="clear"></div>
        <div style="font-size:12px;width:280px;margin:-10px 0 6px 20px;">
           <input type="checkbox" id="rememPass"/>
          <label style="margin-top: 2px;margin-left: 6px;float:left;line-height:15px">记住密码</label>
          <label style="margin-top: 2px;float:right;color:#20A0FF;cursor:pointer;">忘记密码?</label>
        </div>
        <div style="margin-top:16px;margin-left:15px">
          <el-button type="primary"@click="submitForm('Form_Login')" >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../../../publicAPI/config'

  import { Message } from 'element-ui';//信息提示框

  import { Notification } from 'element-ui';
  export default {
  components: {
  },
  data(){
    return{
        rootURL:config.JXURL,
        userAccount:'',
        Form_Login: {
            username :'',
            password:'',
          },
          rules: {
            username : [
              { required: true,message: '请输入账号', trigger: 'blur' },//blur为失去焦点时
              { trigger: 'blur' }
            ],
            password: [
              {  required: true,message: '请输入密码', trigger: 'blur' },
              { trigger: 'blur' }
            ],

          }
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this
            axios.get(that.rootURL+'/loginUser.do?unickname='+ that.Form_Login.username +'&upassword='+  that.Form_Login.password )

            .then(function(res){
              if(res.data.status){
                that.$router.push({path:'/'})
                Notification.success({
                          title: '登录成功！',
                          message: '开始你的TOF世界之旅吧！',
                          offset: 65,
                            duration:2000
                        })
              } else {
                Notification.error({
                          title: '登录失败！',
                          message: res.data.msg,
                          offset: 65,
                            duration:2000
                        })
              }
            })
            .catch(function(error){
              console.error(error)
            })
          } else {
            console.log('提交错误!请保存您的信息！');
            return false;
          }
        });
      },

      // getUserInfo(){
      //   axios.get(that.rootURL+'queryInfo.do')
      //   .then(function(res){
      //       localStorage.setItem('unickname',res.data.obj.unickname);
      //   })
      //   .catch(function(error){
      //     console.error(error)
      //   })
      // }
  },

  }


</script>

<style scoped>
 .login-box{
 	width: 370px;
 	height: 305px;
 	float: left;
 	border-radius: 4px;
 	background: #fff;
 	margin-top: 0px;
 	padding:30px;
 	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
 }

 .login-box>div{
 	margin: 12px 0;
 	float: left;
 }

 .login-box h4{
 	// color:#606B70;
 	color: #555;
 	font-weight: bold;
 }

 .login-box b{
 	width: 40px;
 	height: 40px;
 	display: inline-block;
 	float: left;
 	border: 1px solid #aaa;
 	border-right: none;
 	border-radius: 2px 0 0 2px;
 	text-align: center;
 }

 .login-box b span{
 	font-size: 20px;
 	color:  #20A0FF;
 }

 .login-box input[type="text"],
 .login-box input[type="password"]{
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

 .login-box input[type="text"]:focus,
 .login-box input[type="password"]:focus{
 	border: 1px solid #20A0FF;
 }

 .login-box input[type="checkbox"]{
 	width: 16px;
 	height: 16px;
 	float: left;
 	border: 1px solid #000;
 }

 .login-box label{
 	font-weight: normal;
 	color:#606B70;

 }

 .login-box button{
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

 .login-box button:hover{
 	background: #20A0FF;
 	border: 1px solid #20A0FF;
 }

 .login-box a{
 	color: #20A0FF;
 	font-size:12px;
 	margin-top: 2px;
 	float: right;
 }

</style>
