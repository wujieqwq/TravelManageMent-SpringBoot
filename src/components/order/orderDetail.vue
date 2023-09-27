<template>
  <div class="hold-transition skin-purple sidebar-mini">
    <div class="wrapper">
      <div class="content-wrapper" id="detailApp">

        <!-- 内容头部 -->
        <section class="content-header">
          <h1>
            订单管理
            <small>订单详情</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
            <li><a href="#">订单管理</a></li>
            <li class="active">订单详情</li>
          </ol>
        </section>
        <!-- 内容头部 /-->

        <!-- 正文区域 -->
        <section class="content">
          <!--订单信息-->
          <div class="panel panel-default" id="tab-label">
            <div class="panel-heading">订单信息</div>

            <div class="row data-type">

              <div class="col-md-2 title">订单编号</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="order.orderNum" readonly="readonly">
              </div>

              <div class="col-md-2 title">下单时间</div>
              <div class="col-md-4 data text">
                <div class="input-group date">
                  <div class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </div>
                  <input type="datetime-local" class="form-control pull-right" id="dateTimePicker" v-model="order.orderTime">
                </div>
              </div>

              <div class="col-md-2 title">路线名称</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="product.productName" readonly="readonly">
              </div>

              <div class="col-md-2 title">出发城市</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" readonly="readonly" :value="product.cityName">
              </div>

              <div class="col-md-2 title">出发时间</div>
              <div class="col-md-4 data text">
                <div class="input-group date">
                  <div class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </div>
                  <input readonly type="text" class="form-control pull-right" id="datepicker" v-model="product.departureTime">
                </div>
              </div>
              <div class="col-md-2 title">出游人数</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="travellers.length" readonly="readonly">
              </div>

              <div class="col-md-2 title rowHeight2x">其他信息</div>
              <div class="col-md-10 data rowHeight2x">
                <textarea class="form-control" rows="3" v-model="order.orderDesc"></textarea>
              </div>

            </div>

          </div>
          <!--订单信息/-->

          <!--游客信息-->
          <div class="panel panel-default" id="tab-label">
            <div class="panel-heading">游客信息</div>
            <!--数据列表-->
            <table id="dataList" class="table table-bordered table-striped table-hover dataTable">
              <thead>
              <tr>
                <th class="">人群</th>
                <th class="">姓名</th>
                <th class="">性别</th>
                <th class="">手机号码</th>
                <th class="">证件类型</th>
                <th class="">证件号码</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="traveller in travellers">
                <td>{{traveller.travellerType===0?'成人':'儿童'}}</td>
                <td><input type="text" size="10" v-model="traveller.name"></td>
                <td>
                  <select class="form-control" style="height:32px" v-model="traveller.sex">
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </td>
                <td><input type="text" size="20" v-model="traveller.phoneNum"></td>
                <td>
                  <select v-model="traveller.credentialsType" class="form-control" style="height:32px">
                    <option value="0">身份证</option>
                    <option value="1">护照</option>
                    <option value="2">军官证</option>
                  </select>
                </td>
                <td><input type="text" size="28" v-model="traveller.credentialsNum"></td>
              </tr>

              </tbody>
            </table>
            <!--数据列表/-->
          </div>
          <!--游客信息/-->

          <!--联系人信息-->
          <div class="panel panel-default" id="tab-label">
            <div class="panel-heading">联系人信息</div>

            <div class="row data-type">

              <div class="col-md-2 title">会员</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="member.nickname" readonly>
              </div>

              <div class="col-md-2 title">联系人</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="member.name" readonly>
              </div>

              <div class="col-md-2 title">手机号</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="member.phoneNum" readonly>
              </div>

              <div class="col-md-2 title">邮箱</div>
              <div class="col-md-4 data">
                <input type="text" class="form-control" :value="member.email" readonly>
              </div>

            </div>

          </div>
          <!--联系人信息/-->

          <!--费用信息-->
          <div class="panel panel-default" id="tab-label">
            <div class="panel-heading">费用信息</div>

            <div class="row data-type">

              <div class="col-md-2 title">支付方式</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="payType" readonly>
              </div>

              <div class="col-md-2 title">金额</div>
              <div class="col-md-4 data text">
                <input type="text" class="form-control" :value="product.productPrice" readonly>
              </div>

            </div>

          </div>
          <!--费用信息/-->

          <div class="box-tools text-center">
            <button type="button" class="btn bg-default" onclick="history.back(-1);">返回</button>
            <button type="button" class="btn bg-danger" @click="save">保存</button>
          </div>

        </section>
        <!-- 正文区域 /-->

      </div>
    </div>
  </div>
</template>

<script>
function setSidebarActive(tagUri) {
  var liObj = $("#" + tagUri);
  if (liObj.length > 0) {
    liObj.parent().parent().addClass("active");
    liObj.addClass("active");
  }
}

$(document).ready(function() {
  $('#datepicker').datepicker({
    format:"yyyy-mm-dd",
    autoclose: true,
    language: 'zh-CN'
  });

  // datetime picker
  // $('#dateTimePicker').datetimepicker({
  //   format: "yyyy-mm-dd hh:ii",
  //   autoclose: true,
  //   todayBtn: true,
  //   language: 'zh-CN'
  // });
  // 激活导航位置
  setSidebarActive("order-manager");
});

import axios from "axios";
import moment from "moment";
export default {
  name:'orderDetail',
  data:function (){
    return{
      order:{},
      product:{
        cityName:'',
        departureTime:'',
        id:'',
        productDesc:'',
        productName:'',
        productNum:'',
        productPrice:0,
        productStatus:0
      },
      travellers:[],
      member:{
        email:'',
        id:'',
        name:'',
        nickname:'',
        phoneNum:''
      }
    }
  },
  computed:{
    payType(){
      if (this.order.payType === 0) {
        return "支付宝";
      } else if (this.order.payType === 1) {
        return "微信";
      } else
        return "其他"
    }
  },
  props:['id'],
  methods:{
    loadDetail:function (){
      let id = this.id;
      let _this = this;
      axios.get("http://localhost:8080/order/"+id).then(
          function (response){
            _this.order = response.data;
            _this.product = response.data.product;
            _this.travellers = response.data.travellers;
            _this.member = response.data.member;
          }
      )
    },
    save:function (){
      let _this = this;
      _this.order.orderTime = moment($("#dateTimePicker").val()).format("YYYY-MM-DD HH:mm");
      axios.put("http://localhost:8080/order/update",_this.order).then(function (response){
        _this.loadDetail();
      })
    },
  },
  created:function (){
    this.loadDetail();
  },
}
</script>

<style scoped>

</style>