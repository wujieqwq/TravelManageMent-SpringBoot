
<template>
  <div class="hold-transition skin-purple sidebar-mini">
    <div class="wrapper" id="orderApp">
      <div class="content-wrapper">
      <!-- 内容头部 -->
      <section class="content-header">
        <h1>
          订单管理
          <small>订单列表</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
          <li><a href="#">订单管理</a></li>
          <li class="active">订单列表</li>
        </ol>
      </section>
      <!-- 内容头部 /-->
      <!-- 正文区域 -->
      <section class="content">

        <!-- .box-body -->
        <div class="box box-primary">

          <div class="box-body">

            <!-- 数据表格 -->
            <div class="table-box">

              <!--工具栏-->
              <div class="pull-left">
                <div class="form-group form-inline">
                  <div class="btn-group">
                    <button type="button" class="btn btn-default" title="新建"><i
                        class="fa fa-file-o"></i> 新建</button>
                    <button type="button" class="btn btn-default" @click="deleteOrders" title="删除"><i
                        class="fa fa-trash-o"></i> 删除</button>
                    <button type="button" class="btn btn-default" title="开启"><i
                        class="fa fa-check"></i> 开启</button>
                    <button type="button" class="btn btn-default" title="屏蔽"><i
                        class="fa fa-ban"></i> 屏蔽</button>
                    <button type="button" class="btn btn-default" title="刷新"><i
                        class="fa fa-refresh"></i> 刷新</button>
                  </div>
                </div>
              </div>
              <div class="box-tools pull-right">
                <div class="has-feedback">
                  <input type="text" class="form-control input-sm" placeholder="搜索">
                  <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
              </div>
              <!--工具栏/-->

              <!--数据列表-->
              <table id="dataList" class="table table-bordered table-striped table-hover dataTable">
                <thead>
                <tr>
                  <th class="" style="padding-right:0px;">
                    <input id="selall" type="checkbox" class="icheckbox_square-blue" @click="checkAll">
                  </th>
                  <th class="sorting_asc">ID</th>
                  <th class="sorting">订单编号</th>
                  <th class="sorting">名称</th>
                  <th class="sorting">金额</th>
                  <th class="sorting">下单时间</th>
                  <th class="sorting">订单状态</th>
                  <th class="text-center">操作</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(order,index) in orderList">
                  <td><input name="ids" type="checkbox" :value="order.id" v-model="ids"></td>
                  <td>{{index+1}}</td>
                  <td>{{order.orderNum}}</td>
                  <td>{{order.product.productName}}</td>
                  <td>{{order.product.productPrice}}</td>
                  <td>{{order.orderTime}}</td>
                  <td>{{order.orderStatus===0?'未支付':'已支付'}}</td>
                  <td class="text-center">
                    <router-link type="button" class="btn bg-olive btn-xs" :to="'/home/orderDetail/'+order.id">详情</router-link>
                    <button type="button" class="btn bg-olive btn-xs" @click="open(order.id)">删除</button>
                  </td>
                </tr>

                </tbody>

              </table>
              <!--数据列表/-->

            </div>
            <!-- 数据表格 /-->


          </div>
          <!-- /.box-body -->

          <!-- .box-footer-->
          <div class="box-footer">
            <div class="pull-left">
              <div class="form-group form-inline">
                总共{{pageInfo.pages}}页，共{{pageInfo.total}}条数据。 每页
                <select class="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select> 条
              </div>
            </div>

            <div class="box-tools pull-right">
              <ul class="pagination">
                <li>
                  <a @click.prevent="getOrderList(pageInfo.navigateFirstPage)" aria-label="Previous">首页</a>
                </li>
                <li><a @click.prevent="getOrderList(pageInfo.pageNum-1)">上一页</a></li>
                <li v-for="index in pageInfo.pages" :class="{active:index===pageInfo.pageNum}"><a @click="getOrderList(index)">{{index}}</a></li>
                <li><a @click.prevent="getOrderList(pageInfo.pageNum+1)">下一页</a></li>
                <li>
                  <a @click.prevent="getOrderList(pageInfo.navigateLastPage)" aria-label="Next">尾页</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- /.box-footer-->

        </div>

      </section>
      <!-- 正文区域 /-->
    </div>
    </div>
  </div>
</template>

<script>
$(document).ready(function() {
  // 选择框
  $(".select2").select2();

  // WYSIHTML5编辑器
  $(".textarea").wysihtml5({
    locale: 'zh-CN'
  });

  // 全选操作
  // $("#selall").click(function() {
  // 	var clicks = $(this).is(':checked');
  // 	if (!clicks) {
  // 		$("#dataList td input[type='checkbox']").iCheck("uncheck");
  // 	} else {
  // 		$("#dataList td input[type='checkbox']").iCheck("check");
  // 	}
  // 	$(this).data("clicks", !clicks);
  // });
});
function setSidebarActive(tagUri) {
  var liObj = $("#" + tagUri);
  if (liObj.length > 0) {
    liObj.parent().parent().addClass("active");
    liObj.addClass("active");
  }
}


$(document).ready(function() {
  // 激活导航位置
  setSidebarActive("order-manager");
});

import axios from "axios";
export default {
  name:'orderList',
  data:function (){
    return{
      orderList:[],
      pageInfo:{
        pages:0,
        pageSize:0,
        pageNum:1,
        navigateFirstPage:0,
        navigateLastPage:0,
        list:[],
      },
      ids:[]
    }
  },
  computed:{

  },
  methods:{
    getOrderList:function (pageNum){
      let _this = this;
      axios.get("http://localhost:8080/order/list",{
        params:{
          pageNum:pageNum
        }
      }).then(
          function (response){
            _this.orderList = response.data.list;
            _this.pageInfo = response.data;
          }
      )
    },
    deleteOrder:function (id){
      let _this = this;
      if (_this.ids.length===0){
        axios.delete("http://localhost:8080/order/"+id).then(function (response){
          _this.getOrderList();
        })
      }else{
        _this.deleteOrders();
      }
    },
    deleteOrders:function (){
      let _this = this;
      axios.delete("http://localhost:8080/order/deleteOrders",{
        params: {
          orderIds: _this.id
        }
      }).then(function (response){
        _this.getOrderList();
      })
    },
    getChecked:function (){
      let boxs = $("input[name='ids']");
      let orderIds = [];
      for (var x in boxs) {
        if (boxs[x].checked) orderIds.push(boxs[x].value);
      }
      this.ids = orderIds;
    },
    checkAll:function (){
      let boxs = $("input[name='ids']");
      boxs.prop("checked",$("#selall").prop("checked"));
      this.getChecked();
    },
    open(id) {
      this.$alert('确认删除', '', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteOrder(id);
        }
      });
    }
  },
  created:function (){
    this.getOrderList();
  },
}
</script>

<style scoped>

</style>