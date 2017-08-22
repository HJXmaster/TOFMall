<template>
  <div class="updateInfo-box">
    <el-form  class="demo-ruleForm">
    </el-form>
    <div style="width:1000px;margin-left:10px;margin-top:40px">
      <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="orderNum"  width="100px" label="订单ID">
              <template scope="scope">
                <div slot="reference" class="name-wrapper " >
                  <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.orderNum }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="infos" width="350px" label="商品内容">
              <template scope="scope">
                <div slot="reference" class="name-wrapper omit">
                  哈哈哈是事实上事实上哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈事实上
                </div>
              </template>

            </el-table-column>
            <el-table-column prop="ostime" label="创建时间">

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
            <el-table-column prop="" label="">

              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-button type="danger" @click="beforeDel(scope.$index, scope.row)">取消</el-button>
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
  import { Message } from 'element-ui';//信息提示框

  export default {
    components: {
    },
    data() {
    return {
      rootURL: config.JXURL,
      balance: '--',//数据由数据库返回
      activeName: 'first',
      tableData: [],
    };
  },
  methods: {
      beforeDel(index,row) {
        let that = this ;
        const h = this.$createElement;
        this.$msgbox({
          title: '取消订单确认',
          message: h('p', null, [
            h('span', null, '你要取消的是订单号为： '),
            h('i', { style: 'color: teal' }, row.orderNum),
              h('span', null, ' 的订单，取消后就不能恢复了，请确认！ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '我要取消!',
          cancelButtonText: '返回',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '取消订单中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
              that.delOrder(index,row);
            } else {
              done();
            }
          }
        }).then(action => {

        });
      },
    delOrder(index,row){
      console.log(row.orderNum)
      let that = this ;
      var querystring = require('querystring');//Json数据查询器
      axios.post(that.rootURL +'/deleteOrders.do',
         querystring.stringify({
           oid:row.orderNum,
         })
        )
        .then(function(res){
        if(res.data.status){
          Notification.success({
                    title: '取消成功！',
                    message: res.data.msg,
                    offset: 65,
                      duration:2000
                  })
        } else {
          Notification.error({
                    title: '取消失败！',
                    message: res.data.msg,
                    offset: 65,
                      duration:2000
                  })
          // window.location = '#/tradeSystem/login'
        }
        })
        .catch(function(error){
          Message.error('订单取消不成功！');
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
                for( var ite of res.data ) {

                }
              that.tableData.push({
                orderNum: item.oid,
                oaddress: item.oaddress,
                oname: item.oname,
                totalPrice: item.ototalprice,
                ostime: item.ostime,
                ostate: item.ostate,

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
      width: 320px;
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
       	padding:50px;
        margin-left:-100px;
        margin-top:0px;
       	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
       }
</style>
