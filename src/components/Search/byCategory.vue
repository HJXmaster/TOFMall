<template>
  <div>
      <myHeader></myHeader>
    <div id="bigBlock">
      <div class="clearfix"></div>
      <div style="width:1100px;text-align:center;margin:0 auto;margin-top:20px;">
        <div style="float:left;margin-left:20px;">
          <div>
            <el-cascader
            expand-trigger="hover"
            width="900px"
              :options="types"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>
        </div>
        <div style="text-align:center;float:left;margin-left:10px;width:800px;">
          <div style="width:200px;margin-left:10px;float:left">
            <div style="float:left;width:100px;">
              <el-button type="primary" @click="handleCat"> 搜 索 </el-button>
            </div>
            <div>
              <el-button type="success" @click="goBack">按 关 键 字</el-button>
            </div>
          </div>
          <div style="float:right;margin-left:12px;width:550px;">
            <el-alert
              :title="Tip" type="info":closable="false">
            </el-alert>
          </div>
        </div>
        <div class="clearfix"  ></div>
        <div style="margin:10px;margin:0 auto">
          <div class="resultList"  style="margin-left:90px;padding:10px;padding-left:60px;width:960px;text-align:left" >
            <!-- 所有专利（模糊）开始 -->
            <div  v-if="true" style="width:200px;float:left;margin:10px">
              <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left" >
                <div v-for="esingle in SomeList" style="width:180px;float:left;margin:15px;margin-bottom:25px">
                  <router-link :to="'/ItemInfo/' + esingle.id">
                    <transition name="el-fade-in-linear">
                      <el-card  v-show="show2" class="box-card transition-box" :body-style="{ padding: '0px' }">
                        <img :src="esingle.img" class="image" style="width=100%">
                        <div style="padding:10px;">
                          <div style="float:left;width:180px;margin-top:-8px">
                            <el-tag type="primary" v-for="single in esingle.cat">{{single}}</el-tag>
                          </div>
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-count = "totalPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div> -->
          </div>
          <!-- 所有专利（模糊）结束 -->
          </div>
        </div>
      </div>
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

      idList:[],
      item:'',

      tableData:[],
      loading3: true,

      currentCatId: '',
      currentCatName: '',
      Tip:'请通过左侧下拉框，选择标签来查询商品',
      Some:false,
      SomeList:[],

      totalPage: 0,
      currentPage: 1,
      pageSize: 12,

      paths_Msg:[],
      paths_Tips:[],
      types: [],
      selectedOptions: [],//级联读取结果
      value: '',
      value2: '',
      value3: '',
      idx: '',
      idx2: '',
      btid: '',
    }
  },
  methods:{
    handleCat(){

    },
    getBigTypes(){
      let that = this;
      that.idx = '';
      that.types = [];

      axios.get(that.rootURL+'/queryBtype.do')
      .then(function(res){
        for( that.idx of res.data.btypeList ){
          var bt = {
            value : '',
            label : '',
            children : []
          };
          bt.value = that.idx.btid;
          bt.label = that.idx.btname;

          if(that.idx.stypes!=null){
            for( that.idx2 of that.idx.stypes){
              var st = {
              };
              st.value = that.idx2.stid;
              st.label = that.idx2.stname;
              bt.children.push(st);
            }
          }
          that.types.push(bt)
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    getSmallTypes(idx,btid){
      console.log(idx,btid)
      let that = this;
      that.index = '';



      axios.get(that.rootURL+'/queryStype.do?btid='+btid)
      .then(function(res){
        for( that.index of res.data.stypeList ){
          var st = {};
          st.value = that.index.stid;
          st.label = that.index.stname;
          console.log(that.types[idx])
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    handleChange(value) {
      let that = this;
      var bt = value[0];
      var st = value[1];
      that.show2 = false;
      setTimeout(() => {
        that.show2 = true;
      }, 100);
      var tmpList = {

      };
      that.SomeList = [];
      axios.get(that.rootURL+'/search.do?btid='+ bt + '&' +'stid=' + st)
      .then(function(res){
        for( that.idx of res.data ){
          tmpList = [];
          tmpList.img = require('./../../assets/img/car7.jpg'),
          tmpList.id = that.idx.cid;
          tmpList.name = that.idx.cname;
          tmpList.price = that.idx.cprice;
          tmpList.remain = that.idx.cremain;
          console.log(tmpList)
          that.SomeList.push(tmpList);
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },
    goBack(){
      let that = this
      that.$router.push({path:'/byType'})
    },

    handleSizeChange(val) {
      let that = this
      this.pageSize = val;
      this.SomeList = [];
      that.getSomeList();
    },
    handleCurrentPageChange(val) {
      let that = this
      this.currentPage = val;
      this.SomeList = [];
      that.getSomeList();
    },
  },
  created(){
    let that = this;
    that.getBigTypes();
  },
  watch:{
    // '$route':'loadFromLocalStorage'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  /*margin-top: 20px;*/
  margin-bottom: 50px;
  text-align: center;
  color:#444;
}
#topBlock{
  width: 100%;
}
h1{
  text-align: center;
  color: #475669;
  font-size: 28px;
}

.image {
  width: 200px;
  height:120px;
  display: block;
}

.purpose {
  font-size: 14px;
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
.block{
  float:left;
}

.transition-box {
margin-bottom: 10px;
border-radius: 4px;
box-sizing: border-box;
}
</style>
