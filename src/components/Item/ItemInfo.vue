<template>
    <div>
        <myHeader></myHeader>
        <!-- 头部 -->
        <div style="width:900px;height:1000px;margin:0 auto;text-align:center;">

            <br>
            <br>
            <div style="margin-top:10px;float:left;width:900px;height:30px;margin-bottom:8px">
                <div type="flex" class="row-bg goodsName" justify="space-between">
                    <div :title="name_Msg" class="grid-content bg-purple  goodsName omit" style="font-weight:bold;width:860px;">
                  {{myGood.name}}
                    </div>

                    <el-col :span="19" :title="purpose_Msg">
                        <div class="grid-content bg-purple-light2 goodsSummary omit">
                            {{purpose_Msg}}
                        </div>
                    </el-col>
                </div>
            </div>
            <div style="width:600px;border:1px dashed rgba(186, 192, 193, 0.6);padding:8px;float:left;height:350px">


                <el-carousel :interval="5000" arrow="always" height="330px" >
                    <el-carousel-item v-for="sin in photosList">
                            <img :src="sin" style="height:100%;width:100%">
                  </el-carousel-item>
                </el-carousel>

            </div>

            <!-- 价格信息 -->
            <div style="float:left">
                <el-card class="box-card" style="margin-left:10px">
                    <div class="block">
                        <span  class="attr" style="margin-top:-10px;float:left;">  一口价：</span>
                        <div class=" item shanshuo omit" style="width:150px;font-size:26px;text-align:right;margin-left:30px">
                            ¥ {{myGood.price}}
                        </div>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  大类别：</span>
                        <span class="text item shanshuo" style="font-size:16px;text-align:right;color:#677ab7;font-weight:bold">
                    {{myGood.btype}}
                      </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  小类别：</span>
                        <span class="text item shanshuo" style="font-size:16px;text-align:right;color:#677ab7;font-weight:bold">
                    {{myGood.stype}}
                      </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  剩余数量：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right">
                        {{myGood.remain}}
                    </span>
                    </div>
                    <div class="text item block" style="text-align:right;border-bottom:0px solid white">
                        <span class="attr">  月销量：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right;">
                        {{myGood.monthSale}} <span style="font-size:14px">件</span>
                    </span>
                    </div>
                </el-card>
            </div>
            <!-- 购买按钮 'status','patentName','patentSummary','seller','price','buyer','imgPath'-->
            <div style="padding-left:10px;width:230px;float:left;margin-bottom:10px">
                  <div style="margin:10px 0px 0px 30px">
                    <el-input-number size="small" v-model="count" @change="handleChange" :min="1" :max="myGood.remain"></el-input-number>
                  </div>
                   <!-- 立即购买 -->
                  <div style="margin-left:10px">
                    <el-button type="success"   @click="buyNow()">立即购买</el-button>
                    <el-button  type="warning" @click="addCar()">加入购物车</el-button>
                  </div>

            </div>
                <!-- 评论区开始 -->
                <div style="width:1210px;margin:0 auto;">
                  <div style="float:left;margin-top:10px">
                    <div class="clearfix"></div>
                      <div style="text-align:left">
                          <el-collapse v-model="activeNames" style="width:861px">
                            <el-collapse-item title="评论区" name="1">
                                <div v-for="esingle in reviewList" style="height:auto!important;min-height:50px;margin-bottom:5px;border-bottom:1px dotted #cccccc">
                                  <div style="width:600px;float:left;font-weight:bold;font-size:14px">{{esingle.username}}</div>
                                  <div style="float:right">发布于：{{esingle.time}}</div>
                                  <div class="clearfix" ></div>
                                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{esingle.text}}</div>

                                </div>
                            </el-collapse-item>
                          </el-collapse>
                      </div>
                  </div>
                <!-- 评论区结束 -->
                </div>
        </div>
    </div>
</template>
<script>


import axios from 'axios'
import config from './../../publicAPI/config'
import { Message } from 'element-ui';//信息提示框
import { Notification } from 'element-ui';
import myHeader from './../Public/Header/Header'

export default {
    components: {
        top,
        myHeader
    },
    data() {
        return {
            count:1,
            textarea3: '',
            inputContent: '',
            outputContent: '',
            uploadURL: '',
            item: '',
            rootURL: config.JXURL,
            xx: [
                require('./../../assets/img/buy.png'),
            ],
            photosList: [
      		  	 require('./../../assets/img/car7.jpg'),
      		  	 require('./../../assets/img/car8.jpg'),
      		  	 require('./../../assets/img/car9.jpg'),
             ],
            C: '',
            name_Msg: '',
            purpose_Msg: '',
            number_Msg: '',
            readNumber_Msg:0,

            paths_Msg: [],

            price_Msg: '正在拉取...',
            status_Msg: '正在拉取...',
            startTime_Msg: '正在拉取...',
            seller_Msg: '正在拉取...',

            activeNames: ['1', '2'],

            descrip_Msg: '正在拉取...',
            design_Msg: '正在拉取...',

            sho: false,

            sellerName_Msg: '',
            reviewList: [],
            myGood:{},
        }
    },
    methods: {
      ifGoToCart(){
        let that = this;
        const h = this.$createElement;
        this.$msgbox({
          title: '添加购物车成功！',
          message: h('p', null, [
            h('span', null, '恭喜你！这件商品已加入进了你的购物车，'),
            h('br', { style: 'color: teal' }, ''),
            h('B', { style: 'color: teal' }, '是否 现在'),
              h('span', null, ' 前往查看？ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '我们走吧！',
          cancelButtonText: '不，谢谢',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '购物车呈现中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  // instance.confirmButtonLoading = false;
                  that.$router.push({path:'/userIndex/ShoppingCart'})
                }, 300);
              }, 1500);
                instance.confirmButtonLoading = false;
            } else {
              done();
            }
          }
        }).then(action => {
          // this.$message({
          //   type: 'info',
          //   message: 'action: ' + action
          // });
        });
      },
        handleChange(value) {
          console.log(value);
        },
      buyNow(){
        let that = this ;
        var querystring = require('querystring');//Json数据查询器
        axios.post(that.rootURL +'/shopping.do',
           querystring.stringify({
             cid:that.C,
             csize:that.count,
           })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
          )
          .then(function(res){
          if(res.data.status){
            Notification.success({
                      title: '购买成功！',
                      message: '你直接购买成功了！',
                      offset: 65,
                        duration:2000
                    })
          } else {
            Notification.error({
                      title: '购买失败！',
                      message: res.data.msg,
                      offset: 65,
                      duration:2000
                    })
            // window.location = '#/tradeSystem/login'
          }
          })
          .catch(function(error){
            Message.error('请检查网络配置！');
          });
      },
        addCar(){
          let that = this ;
          var querystring = require('querystring');//Json数据查询器
          axios.post(that.rootURL +'/addCart.do',
             querystring.stringify({
               cid:that.C,
               csize:that.count,
             })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
            )
            .then(function(res){
            if(res.data.status){
              that.ifGoToCart();
              // Notification.success({
              //           title: '添加成功！',
              //           message: '加入购物车成功了',
              //           offset: 65,
              //             duration:2000
              //         })
            } else {
              Notification.error({
                        title: '购买失败！',
                        message: res.data.msg,
                        offset: 65,
                        duration:2000
                      })
              // window.location = '#/tradeSystem/login'
            }
            })
            .catch(function(error){
              Message.error('请检查网络配置！');
            });
        },
      getItemInfo(){
          let that = this;

          axios.get(that.rootURL+'/getGoodsByCid.do?cid=' + that.C)
          .then(function(res){
              that.idx = res.data
              if(that.idx.status){
                that.myGood = {
                };
                that.myGood.id = that.idx.cid;
                that.myGood.name = that.idx.cname;
                that.myGood.btype = that.idx.btype;
                that.myGood.stype = that.idx.stype;
                that.myGood.price = that.idx.cprice;
                that.myGood.remain = that.idx.cremain;
                that.myGood.monthSale = that.idx.monthSale;
              } else {
                that.$router.push({path:'/byCategory'})
                Notification.error({
                          title: '请检查是否存在该商品ID！',
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
      getReviewInfo(){
          let that = this;
          that.reviewList = [];

          axios.get(that.rootURL+'/queryReview.do?cid=' + that.C)
          .then(function(res){
            for( that.idx of res.data.list ){
              var myRev = {
              };
              myRev.id = that.idx.id;
              myRev.text = that.idx.text;
              myRev.time = that.idx.time;
              myRev.username = that.idx.username;

              that.reviewList.push(myRev)
            }
          })
          .catch(function(error){
            console.error(error)
          })
      },


      setLocalStorage(id){
          let that = this
          localStorage.setItem('catID',id)
          that.$router.push({path:'/tradeSystem/search/byCategory'})
      },

      hsytt(){
        let that = this ;
        that.C= that.$route.params.newID;
        this.getReviewInfo();
        this.getItemInfo();
      },

    },
    created() {
      let that = this ;
      that.C= that.$route.params.newID;
      that.hsytt();
    },
    watch:{
      '$route':'hsytt'
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigFrame {
    border-style: dashed;
    margin: 0 auto;
    width: 1140px;
    margin-top: 10px;
    border-color: rgb(160, 160, 160);
}

.biankuang tr td {
    text-align: right;
    padding-right: 18px
}

.buttons tr td button {
    width: 318px;
    height: 46px;
    border: 1px solid #377ab7;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #377ab7;
    padding: 3px 10px;
}

.buttons tr td button:hover {
    background: #276387;
    border: 1px solid #377ab7;
}

.buttons button {
    width: 318px;
    height: 46px;
    border: 1px solid #2E426C;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #2E426C;
    padding: 3px 10px;
}

.buttons button:hover {
    background: #215a78;
    border: 1px solid #377ab7;
}


/*goods_top的*/

.goodsName,
.goodsSummary,
.goodsNum {
    font-size: 24px;
    float: left;
    text-align: left;
    padding-left: 5px;
    font-family: "微软雅黑";
    color: rgb(70, 80, 93);
}

.goodsSummary {
    font-size: 14px;
    padding-top: 5px;
    margin-left: 15px;
    color: rgb(163, 163, 163);
}

.goodsNum {
    float: right !important;
    margin-left: 20px !important;
    width: 330px !important;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    color: rgb(163, 163, 163);
}

.el-col {
    border-radius: 4px;
}

.bg-purple {
    background: rgba(#87a6f7, 0.59);
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 5px 0;
    height: 65px;
    background-color: #f9fafc;
    border-radius: 6px;
}

.omit {
    width: 840px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*不换行*/
}


/*面包屑的*/

.guide {
    font-family: '宋体';
    width: 1110px;
    margin: 0 auto;
    margin-top: 5px;
}

.route {
    font-family: '微软雅黑';
    font-size: 16px
}


/*priceInfo的*/

.attr {
    float: left;
    line-height: 30px;
}

.block {
    text-align: right;
    border-bottom: 1px dashed gray
}

.infoTop {
    float: right;
    margin-top: -12px;
    margin-right: -10px
}

.text {
    font-size: 16px;
}

.item {
    padding: 10px 0;
    color: #63738b
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 250px;
    height: 270px
}

.shanshuo:hover {
    text-shadow: 0 0 10px #42a0dd;
    opacity: 1;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

.askerImg {
    float: left;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -2px;
}

/*购买按钮*/
.el-button--primary{
  width: 130px !important;
}
.el-button--success,.el-button--warning{
  padding: 0px;
  float:left;
  letter-spacing: 2px;
  font-size: 16px;
  width: 100px !important;
  height: 35px;
  margin-top:15px !important;
}
  .button {
    padding: 0;
    float: right;
  }

.nameText{
    margin-left: 30px !important;
    height:40px;
    /*background-color: rgba(145, 148, 156, 0.33);*/
    color:rgb(94, 109, 130);
    font-family: '微软雅黑';
    font-size: 24px;
    text-align: left;

  }
.purposeText{
    margin-top:5px;
    width:400px;
    height:40px;
    margin-left: 10px;
    /*background-color: rgba(145, 148, 156, 0.2);*/
    color:rgba(94, 109, 130, 0.72);
    font-family: '微软雅黑';
    font-size: 14px;
    text-align: left;

    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;/*不换行*/
  }

 .buyerName{
    text-align: left;
    padding:5px;
    float:right;
    margin-top:5px;
    margin-left: 9px !important;
    width:200px;
    height:60px;
    margin-right: 42px;

    border:1px solid #377ab7;
    color:rgb(46, 46, 52);
    font-family: '微软雅黑';
    font-size: 14px;
  }

   .account{
      text-align: left;
      padding:5px;
      float:right;
      margin-top:5px;
      width: 375px !important;
      height:80px;
      margin-right: 8px;
      border:1px solid #377ab7;
      color:rgb(46, 46, 52);
      font-family: '微软雅黑';
      font-size: 14px;
    }
    .image_ApplyBox {
      width: 100%;
      display: block;
    }
</style>
