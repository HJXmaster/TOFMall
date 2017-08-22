<template>
    <div class="myBody">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询个人信息" name="first">
        <div class="myBox">
          <GetUserInfoBox></GetUserInfoBox>
        </div>
        </el-tab-pane>
        <el-tab-pane label="修改个人信息" name="second">
        <div class="myBox">
          <UpdateUserInfoBox></UpdateUserInfoBox>
        </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="third">
        <div class="myBox">
          <ChangePassword></ChangePassword>
        </div>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../../../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框
  import ChangePassword from './ChangePassword'
  import GetUserInfoBox from './GetUserInfoBox'
  import UpdateUserInfoBox from './UpdateUserInfoBox'


  export default {
    components: {
      ChangePassword,
      GetUserInfoBox,
      UpdateUserInfoBox,
    },
    data() {
      return {
        activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped lang="scss">
  .myBody {
    &.myBox {
      margin-left:-150px;
    }
  }
  .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
  }
  .bodyBG{
    min-height: 538px;
    width:1000px;
    margin:0 auto
  }
  .middle{
    padding-top:20px;
    min-height: 608px;
    width: 1000px;
    background-color: rgba(218,230,244,0.9);/*#dae6f4*/
  }
  .hint{
    width: 100%;
    height:50px;
  }
  .el-tab-pane{
    margin: 40px 300px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }

</style>
