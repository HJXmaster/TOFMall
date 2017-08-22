<template>
  <div>
    <myHeader></myHeader>
    <div class="clearfix"></div>
    <div style="width:860px;margin:0 auto;">
    <div style="margin-top:30px;">
      <el-steps :space="100" :active="active" finish-status="success">
        <el-step title="加入购物车"></el-step>
        <el-step title="生成订单"></el-step>
        <el-step title="提交订单"></el-step>
        <el-step title="确认订单"></el-step>
        <el-step title="评论"></el-step>
      </el-steps>
    </div>
    <div class="css-address">收货地址
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="详细地址" prop="address">
          <el-col :span="12">
            <el-autocomplete
              class="css-address-input"
              v-model="form.address"
              :fetch-suggestions="querySearch"
              placeholder="请输入详细地址"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-form-item>

        <el-form-item label="邮编" prop="ecode">
          <el-input class="css-address-input" v-model="form.ecode"></el-input>
        </el-form-item>

        <el-form-item label="收货人" prop="name">
          <el-input class="css-address-input" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="phone">
          <el-input class="css-address-input" v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="css-payMethod">支付方式
      <div class="css-payMethod-body">
        <el-radio-group v-model="myPayMethod">
          <el-row class="css-payMethod-body-methods"><el-radio :label="1">货到付款</el-radio></el-row>
          <el-row class="css-payMethod-body-methods"><el-radio :label="2">支付宝</el-radio></el-row>
          <el-row class="css-payMethod-body-methods"><el-radio :label="3">微信支付</el-radio></el-row>
          <el-row class="css-payMethod-body-methods"><el-radio :label="4">银行卡支付</el-radio></el-row>
          <el-row class="css-payMethod-body-methods"><el-radio :label="5">银联支付</el-radio></el-row>
        </el-radio-group>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="css-top">确认订单信息</div>
    <div class="clearfix"></div>
    <hr>
    <section>
      <div class="css-title">
        <div class="css-title-name">商品信息</div>
        <div class="css-title-price">单价</div>
        <div class="css-title-count">数量</div>
        <div class="css-title-sum">小计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    </section>
    <div class="clearfix"></div>
      <section v-for="esingle in goods">
        <div class="css-body">
          <div class="css-body-item">
            <div class="css-body-item-select">
            </div>
            <div class="css-body-item-img" style="">
              <img src="./../../assets/img/car9.jpg" />
            </div>
            <div class="css-body-item-name ">{{esingle.cname}}</div>
            <div class="css-body-item-price">{{esingle.cprice}}</div>
            <div class="css-body-item-count">
              {{esingle.csize}}
            </div>
            <div class="css-body-item-sum">¥ {{esingle.sum}}</div>
          </div>
        </div>
      </section>
    <section>
      <div class="css-footer">
        <div class="css-footer-back">

            <router-link to="/userIndex/ShoppingCart">
            <el-button type="primary" icon="arrow-left" >返回购物车</el-button>
          </router-link>
        </div>
        <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ {{total}}</span></div>
        <div class="css-footer-btn"><el-button type="primary" @click="pushOrder()">提交订单</el-button></div>
      </div>
    </section>
  </div>

    <div class="clearfix"></div>
    <div style="margin-top:0px">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
// const cityOptions = ;

import axios from 'axios'
import config from './../../publicAPI/config'
import { Notification } from 'element-ui';
import myHeader from './../Public/Header/Header'
import myFooter from './../Public/Footer/Footer'

export default {
  components:{
    myHeader,
    myFooter
  },
  data () {
    return {
      active: 2,
      rootURL: config.JXURL,
      myPayMethod: 1,//支付方式按钮当前选取
      goods:[],
      count: 2,
      count2: 3,
      total : 0,
      form: {
        address: '',
        ecode: '',
        name: '',
        phone: '',
      },
      restaurants: [],
      rules: {
        address: [
          { required: false, message: '请输入详细地址', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        ecode: [
          { required: false, message: '请输入详细地址', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' }
        ],
        name: [
          { required: false, message: '请输入收货人', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: '请输入联系电话', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    getOrderInfo(){
      console.log(localStorage.getItem('myUrl'));
      var myUrl=localStorage.getItem('myUrl');
      let that=this;
      that.idx='';
      that.goods = [];
      axios.get(myUrl)
      .then(function(res){
      that.form.address=res.data.address;
      that.form.ecode=res.data.postcode;
      that.form.phone=res.data.phone;
      that.form.name=res.data.name;
      that.total=res.data.total;
      for(that.idx of res.data.infos){
        var bt = {

          cname : '',
          csize : '',
          cprice : '',
          sum : 0,
        };
        bt.cname = that.idx.cname;
        bt.cprice = that.idx.cprice;
        bt.csize = that.idx.csize;
        bt.sum = that.idx.sum;

        that.goods.push(bt);
      }

      })
      .catch(function(error){
        console.error(error)
      })

    },
    pushOrder(){
      let that=this;
      var myUrl=localStorage.getItem('myUrl');
      console.log(url);
      var url=myUrl.replace('account','pushOrder');
      url=url+'&oaddress='+that.form.address+'&ophone='+that.form.phone+'&oname='+that.form.name+'&opostcode='+that.form.ecode;
      console.log(url);
      axios.get(url)
      .then(function(res){
        if(res.data.status){
          // alert("下单成功");
          localStorage.removeItem('myUrl');
          Notification.success({
                    title: '下单成功！',
                    message: '请查看你的订单详情！',
                    offset: 65,
                      duration:2000
                  })
          that.$router.push({path:'/userIndex/order'})
        } else {
          alert("下单成功失败"+res.data.msg);
          localStorage.removeItem('myUrl');
        }
      })
      .catch(function(error){
        console.error(error)
        localStorage.removeItem('myUrl');
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
       return [
         { "value": "广东省广州市天河区五山路华南农业大学泰山区24栋", "address": "广东省广州市天河区五山路华南农业大学泰山区24栋" },
         { "value": "广东省清远市连山县吉田镇市场路个体街36号", "address": "广东省清远市连山县吉田镇市场路个体街36号" },
         { "value": "广东省广州市荔湾区花海大道", "address": "广东省广州市荔湾区花海大道" },
         { "value": "湖南省张家界永定区张家界学院北400米", "address": "湖南省张家界永定区张家界学院北400米" },
       ];
     },
    handleChange(value) {
      console.log(value);
    }
  },
  created(){
    this.getOrderInfo();
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
}
</script>

<style scoped lang="scss">

  .css-top {
    float:left;
    font-size:20px;
    font-weight: bold;
    // height:40px;
    padding-left: 15px;
  }
  .css-title {
    width:100%;
    text-align: right;
    margin-top: 5px;
    .css-title-select {
      padding-right: 15px;
      float:left;
      width:5%;
    }

    .css-title-name {
      padding-right: 5px;
      float:left;
      width:30%;
    }
    .css-title-price {
      padding-right: 5px;
      float:left;
      width:20%;
    }
    .css-title-count {
      float:left;
      width:20%;
    }
    .css-title-sum {
      padding-right: 90px;
      float:left;
      width:30%;
    }
  }

  .css-body {
    .css-body-item {
      margin-top: 5px;
      border-bottom: 1px solid black;
      width:860px;
      height:100px;
      padding: 10px 30px 10px 20px;
      text-align: right;
      // .css-body-item-select {
      //   float: left;
      //   width:5%;
      //   height:70px;
      //   padding: 20px 30px 0px 0px;
      // }
      .css-body-item-img {
        width: 100px;
        height: 70px;
        float: left;
        img {
          width: 100px;
          height: 70px;
        }
      }
      .css-body-item-name {
        float: left;
        width:24.7%;
        height:70px;
        text-align: center;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-price {
        float: left;
        width:21.6%;
        height:70px;
        text-align: center;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-count {
        float: left;
        text-align: center;
        width:21.7%;
        height:70px;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-sum {
        overflow:hidden;
        line-height: 70px;
        float: left;
        width:15%;
        height:70px;
        color: red;
        text-align: center;
        font-weight: bold;
      }
    }
  }

    .css-footer {
      margin-top: 10px;
      width: 100%;
      float: right;
      .css-footer-back {
        float: left;
        padding-top: 0px;
        width: 55%;
        .css-footer-back-div {
          float: left;
          margin-left: 5px;
          line-height: 15px;
        }
      }
      .css-footer-sum {
        padding-top: 5px;
        width: 200px;
        height:35px;
        font-size: 22px;
        margin-right: 20px;
        float:left;
        .css-footer-sum-num {
          margin-left: 10px;
          font-weight: bold;
          color: red;
        }
      }
      .css-footer-btn {
        float:left;
      }
    }


      .css-address,.css-payMethod{

        float: left;
        width:74%;
        font-size:20px;
        font-weight: bold;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
        padding: 10px 20px;
        margin: 10px 0px;
        .css-address-input {
          width:500px;
        }
      }

      .css-payMethod {
          width:25%;
          float: right;
          .css-payMethod-body {
            margin: 10px;
            padding: 30px 0px;
            .css-payMethod-body-methods {
              margin-bottom: 10px;
            }
          }
      }

        .omit {
            width: 100px;
            overflow: hidden;
            vertical-align: top;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*不换行*/
        }

</style>
