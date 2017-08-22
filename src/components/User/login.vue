<template>
  <div style="width:100%">
   	<myHeader></myHeader>
    <div class="clearfix"></div>
    <div :style="{backgroundImage: 'url(' +bg + ')'}" class="css-bg">
    <div style="margin:0 auto;height:760px;padding-bottom:50px">


      <!-- 登录框 开始 -->
      <div style="width:300px;height:500px;float:right;margin-top:155px;margin-right:130px">
        <loginBox></loginBox>
      </div>
      <!-- 登录框 结束 -->

    </div>
  </div>

      <div class="clearfix"></div>
</div>
  </div>
</template>

<script>
import myHeader from './../Public/Header/Header'
import loginBox from './comsforUser/loginBox'

export default {
  components:{
    myHeader,
    loginBox,
  },
  data () {
    return {
      imgSource:[	//轮播图
		  	 require('./../../assets/img/car7.jpg'),
		  	 require('./../../assets/img/car9.jpg'),
		  	 require('./../../assets/img/car8.jpg'),
		  ],
      bg:require('./../../assets/img/loginBG.jpg'),
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.css-bg {
  background-size:cover;
  height:100%;
}
</style>
