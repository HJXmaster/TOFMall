<template>
  <div class="updateInfo-box" v-show="showTable">
    <div style="width:300px;float:right;margin:0px 20px 5px 0px">
      <el-input placeholder="请输入要查询的订单ID..." v-model="myInput">
        <el-button slot="append" class="appBTN" icon="search" @click="tryToSearch()"> 搜 索 </el-button>
      </el-input>
    </div>
    <div class="clearfix"></div>
    <el-form  class="demo-ruleForm">
    </el-form>
    <div style="width:960px;margin:10px">
      <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="orderNum"  width="100px" label="订单ID">
              <template scope="scope">
                <div slot="reference" class="name-wrapper " >
                  <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.orderNum }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="infos" width="200px" label="商品内容">
              <template scope="scope">
                <div slot="reference" class="name-wrapper omit">
                  {{ scope.row.oname }}
                </div>
              </template>

            </el-table-column>
            <el-table-column prop="ostime"width="250px" label="创建时间">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.ostime }}
                </div>
              </template>

            </el-table-column>
            <el-table-column prop="totalPrice" label="总价">

              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.totalPrice }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ostate" label="状态">

              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.ostate }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label=""  width="200px">

              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <!-- <el-button type="danger" size="small" v-show="scope.row.iShow" @click="beforeDel(scope.$index, scope.row)">删除</el-button> -->
                  <el-button type="success" size="small" v-show="scope.row.iShow" @click="beforeConfirm(scope.$index, scope.row)">确认收货</el-button>
                  <el-button type="primary" size="small" v-show="!scope.row.iShow" @click="goToDetail(scope.$index, scope.row)">去评论</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../../../publicAPI/config'
  import { Notification } from 'element-ui';

  export default {
    components: {
    },
    data() {
    return {
      showTable: true,
      rootURL: config.JXURL,
      balance: '--',//数据由数据库返回
      activeName: 'first',
      tableData: [],
      myInput:'',
    };
  },
  methods: {
      tryToSearch(){
        let that = this ;
        that.$router.push({path:'/orderdetail/' + that.myInput})
      },
      beforeConfirm(index,row) {
        let that = this ;
        const h = this.$createElement;
        this.$msgbox({
          title: '订单确认',
          message: h('p', null, [
            h('span', null, '是否要确认订单号为： '),
            h('B', { style: 'color: teal' }, row.orderNum),
            h('span', null, ' 的订单 '),
            h('br', null, ' '),
            h('span', null, ' 确认后即可对该商品作出评论！ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '我要确认!',
          cancelButtonText: '不了，谢谢',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '确认订单中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
              that.confirmOrder(index,row);
            } else {
              done();
            }
          }
        }).then(action => {

        });
      },
    confirmOrder(index,row){
      console.log(row.orderNum)
      let that = this ;
      axios.get(that.rootURL +'/confirmReceipt.do?oid='+row.orderNum)
        .then(function(res){
        if(res.data.status){

          Notification.success({
                    title: '确认成功！',
                    message: res.data.msg,
                    offset: 65,
                      duration:2000
                  })
          that.getRecord();
        } else {
          Notification.error({
                    title: '确认失败！',
                    message: res.data.msg,
                    offset: 65,
                      duration:2000
                  })
          // window.location = '#/tradeSystem/login'
        }
        })
        .catch(function(error){
          // Message.error('订单确认不成功！');
        });
    },
    goToDetail(index,row){
      let that = this;
      that.$router.push({path:'/orderdetail/'+row.orderNum})

    },
    getRecord() {
        let that = this
        axios.get(that.rootURL+'/queryOrders.do')
          .then(function(res){
            that.tableData = []
            for( var item of res.data ) {
                var str = '';
                for( var ite of item.infos ) {
                  str  = str + ite.commodity.cname  + '、';
                }
                str = str.substr(0,str.length-1);
                var tempShow = (item.ostate=="已支付"?true:false);
              that.tableData.push({
                orderNum: item.oid,
                oaddress: item.oaddress,
                oname: str,
                totalPrice: item.ototalprice,
                ostime: item.ostime,
                ostate: item.ostate,
                iShow: tempShow
                  // infos:item.id,
              })
          }
          })
          .catch(function(error){
            console.error(error)
          })
      },
  },
  created(){
    this.getRecord()
  }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row{
    width: 800px;
  }
  .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
  }
  .bodyBG{
    background-size: 100% 508px;
    min-height: 508px;
    width:1080px
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
  big{
    color: #20a0ff;
  }
  .block{
    margin-top: 25px;
    text-align: right;
  }

  .omit {
      width: 190px;
      overflow: hidden;
      vertical-align: top;
      text-overflow: ellipsis;
      white-space: nowrap;
      /*不换行*/
  }

       .updateInfo-box{
       	float: left;
       	border-radius: 4px;
       	background:rgba(255, 255, 255,0.7);
         position:relative;
       	padding:10px 0px;
        margin-left:10px;
        margin-top:105px;
       	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
       }


       .appBTN {
         margin-left: -15px !important;
         background-color: #FC7500 !important;
           border: 0px solid #FC7500 !important;
         color:white !important;
       }
</style>
