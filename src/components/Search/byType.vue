<template>
  <div style="width:100%">
      <myHeader></myHeader>
    <div id="bigBlock">
      <!-- 内置搜索栏 开始 -->
      <div  id="searchBox" style="width:1210px;text-align:center;margin:0 auto;">
        <div style="margin-top:30px;width:960px;margin: 0 auto;">
          <div style="padding-top:10px;">
            <div style="float:left;margin-top:15px;margin-left:-5px;margin-right:5px"><el-button type="warning"  @click="goBack()"  >按 标 签</el-button></div>
            <div style="float:left;margin-top: 15px;width:750px">
              <el-input  @keyup.enter.native="tryToSearch()"  placeholder="请把要搜索的告诉我们..." v-model="myInput">
                <el-button slot="append" class="appBTN" icon="search" @click="tryToSearch()"> 搜 索 </el-button>
              </el-input>
              <div style="float:left;margin-left:0px;width:760px;margin-top:5px;margin-bottom:5px">
              <el-alert  :title="Tip" :type="tipType":closable="false">
              </el-alert>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 内置搜索栏 结束 -->
      <div class="clearfix"></div>

      <!-- 列表展示区 开始  -->
        <div  class="resultList "  style="margin-left:123px;padding:10px;padding-left:60px;width:860px;text-align:left" >
            <div style="text-align:center;margin:0 auto;">
              <div class="clearfix"></div>
              <div style="margin:10px;margin:0 auto">
                <div style="padding:10px;width:860px;text-align:left" >
                <!-- 一口价（模糊）开始 -->
                <div  style="padding: 0px 20px;width:180px;margin-left:10px;">
                  <div   style="height:900px;width:960px;ext-align:left;margin-left:-100px" >

                    <div v-for="esingle in SomeList" style="width:180px;float:left;margin:10px;">
                      <router-link :to="'/ItemInfo/' + esingle.id">
                        <transition name="el-fade-in-linear">
                          <el-card  v-show="show2" class="box-card" :body-style="{ padding: '0px' }">
                            <img :src="esingle.img" class="image" >
                            <div style="padding:10px;">
                              <div id="name" class="omit" style="font-size:16px;line-height:30px;width:120px;height:35px;float:left">{{esingle.name}}</div>
                              <div style="text-align:left;float:left;font-size:12px;font-weight:bold;color:rgb(230, 94, 64)" >￥
                                <div style="text-align:left;width:40px;font-size:14px;float:right;line-height:17px;" class="omit" >{{esingle.price}}</div>
                              </div>
                              <div class="clearfix"></div>
                            </div>
                          </el-card>
                          </transition>
                      </router-link>
                    </div>

                  </div>
                  <div class="clearfix"></div>
                  <!-- <div class="block"  style="float:left;margin-top:-10px;margin-left:650px;width:420px;">
                    <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentPageChange1"
                    :current-page="currentPage1"
                    :page-count = "totalPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize1"
                    layout="total, sizes, prev, pager, next, jumper">
                  </el-pagination>
                </div> -->
              </div>
                <!-- 一口价（模糊）结束 -->
              </div>
            </div>
            </div>

        </div>

      <!-- 列表展示区 结束 -->
    </div>
    <div class="clearfix"></div>
        <myFooter></myFooter>
  </div>
</template>

<script>
import config from './../../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'
import myHeader from './../Public/Header/Header'
import myFooter from './../Public/Footer/Footer'

export default {
  components:{
    myHeader,
    myFooter
  },
  data () {
    return {
      show2: true,
      rootURL: config.JXURL,	//请求的url
      tableData:[], 	//一口价表格的内容
      loading3: true, //一口价加载中

      myInput: '',
      select: '所有专利',

      Some:false,
      FixPriceSome:false,
      auctionSome:false,

      currentCatId: '',
      currentCatName: '',
      showTip: false,
      Tip:'请通过左侧下拉框，选择目录名来查询技术',
      tipType:'info',

      totalPage: 0,
      currentPage: 1,
      pageSize: 12,


      totalPage1: 0,  //一口价总页数
      currentPage1: 1,  //一口价当前页
      pageSize1: 12,  //一口价每页记录
      name_Msg:'',

      totalPage2: 0,
      currentPage2: 1,
      pageSize2: 12,

      SomeList:[],

      paths_Msg:[],
      FixPriceSomeTF:false,
      auctionSomeTF:false,
      SomeTF:false,


      value:'所有专利',
      transitionName: 'slide-left',

      SomeList:[{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      }],
      noClear:false,//不显示清除按钮
    }
  },
  methods:{
    getDates(date){//此函数用于从日期选择器获得input
      let that = this
      this.timeRange_Auc = date
      that.timeRange_Auc_Left  = that.timeRange_Auc.split(' - ')[0]
      that.timeRange_Auc_Right = that.timeRange_Auc.split(' - ')[1]
    },
    goBack(){
      let that = this
      that.$router.push({path:'/byCategory'})
    },
    searchAll(){
      this.tryToSearch()
    },

    getSomeList(){

    },

    handleSizeChange1(val) {
      let that = this
      this.pageSize1 = val;
    },
    handleCurrentPageChange1(val) {
      this.currentPage1 = val;
    },


    tryToSearch() {
        let that = this
        var url = '';
        if(localStorage.getItem('myInput')!=null){
          that.myInput = localStorage.getItem('myInput');
          url = that.rootURL+'/search.do?condition='+ that.myInput
        } else {
          url = that.rootURL+'/search.do?condition='
        }
        if(localStorage.getItem('myInput')==null && that.myInput!=''){
        url = that.rootURL+'/search.do?condition='+ that.myInput

        }
        that.show2 = false;
        setTimeout(() => {
          that.show2 = true;
        }, 100);
        that.Tip = '【 搜索结果 】 关键字：' + that.myInput

        var tmpList = {

        };
        that.SomeList = [];
        axios.get(url)
        .then(function(res){
          for( that.idx of res.data ){
            tmpList = [];
            tmpList.img = require('./../../assets/img/car7.jpg'),
            tmpList.id = that.idx.cid;
            tmpList.name = that.idx.cname;
            tmpList.price = that.idx.cprice;
            tmpList.remain = that.idx.cremain;
            that.SomeList.push(tmpList);
          }
          localStorage.removeItem('myInput')

        })
        .catch(function(error){
          console.error(error)
        })
    },
 },
watch:{
  myInput(val){
    let that = this
    that.myInput = val
  },
  someTF(val) {
    let that = this
    if(val == true){
      this.SomeT = true
      that.FixPriceSomeTF = false
      that.auctionSomeTF = false
      that.tipType = 'info'
      that.show_conditions_Fix=false
      that.show_conditions_Auc=false
      that.SomeList = [];
      that.aucSomeList = [];
      that.fixSomeList = [];
      //  that.tryToSearch()
      //  alert('someTF变化时执行的')
    }else{
      that.SomeTF = false
    }
  },
  select(val){
    let that = this
    that.select = val
    that.SomeList = [];
    that.aucSomeList = [];
    that.fixSomeList = [];
    that.tryToSearch()
    if(that.select == '所有专利'){
      that.show_conditions_Auc=false
      that.show_conditions_Fix=false
      that.tipType = 'info'

    }

  }
},
created(){
  let that = this

  if(localStorage.getItem('myInput')!='' ||localStorage.getItem('myInput')!=null){
    that.myInput = localStorage.getItem('myInput');
  } else{
    that.myInput = ''
  }

  that.tryToSearch();
},
watch:{
  '$route':'tryToSearch'
}
}
</script>

<style scoped>
#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  margin-top: -20px;
  margin-bottom: 50px;
  text-align: center;
  color:#444;
}
h1{
  text-align: center;
  color: #475669;
  font-size: 28px;
}
.el-card{
  float: left;
  margin: 5px 30px;
}

#searchBox{
  width: 1080px;
  margin-top: 20px !important;
  margin: 0 auto
}
#home-tb-div{
  width: 1080px;
  margin: 0 auto !important;
  margin-bottom: 60px;
}
/*分页*/
.block{
  margin-top: 24px;
}
.el-pagination{
  float: right;
}

/*一口价模糊*/

.purpose {
  font-size: 13px;
  color: #999;
}
.omit{
  line-height: 13px;
  width:200px;
  overflow: hidden;
  vertical-align: top;
  text-overflow:ellipsis;
  white-space: nowrap;/*不换行*/
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 180px;
  height:120px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
  }/*分页*/
  .block{
    float:left;
    margin-top: 24px;
    margin-left: 610px;
  }
  .el-pagination{
    float: right;
  }

  .condition_Fix .el-tag{
    background-color: white;
    border:1px solid  green;

    height:44px;
    padding:7px;
    padding-left:10px;
    width:1052px;
    margin-left: -45px
  }
  .el-button--warning{
    width:100px;
    height:77px;
    /*margin-top:50px*/
  }
  .condition_Auc .el-tag{
    background-color: white;
    border:1px solid  rgb(235, 5, 94);
    height:44px;
    padding:7px;
    padding-left:10px;
    width:1052px;
    margin-left: -45px
  }

  .smallCard .el-tag{
    background-color: transparent
  }

  .resultList{
    /*border: 1px solid gray;*/
    width: 960px;
    min-height: 600px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 30px 20px 50px 20px;
    background-color:rgba(247, 247, 247,0.2);
    -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
    -moz-box-shadow: -5px 0px 15px #D0D0D0,
    5px 0px 15px #D0D0D0;/* for firefox */
    -webkit-box-shadow: -5px 0px 15px #D0D0D0,
    5px 0px 15px #D0D0D0;/* for safari or chrome */
    box-shadow: -5px 0px 15px #D0D0D0,
    5px 0px 15px #D0D0D0;/* for opera or ie9 */
  }
  .transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  /*background-color: #20A0FF;*/
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.appBTN {
  margin-left: -15px !important;
  background-color: #FC7500 !important;
    border: 0px solid #FC7500 !important;
  color:white !important;
}
  </style>
