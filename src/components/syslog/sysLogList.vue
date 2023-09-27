

<template>
  <div class="content-wrapper">
    <!-- 内容头部 -->
    <section class="content-header">
      <h1>
        日志管理
        <small>全部日志</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a href="#">日志管理</a></li>
        <li class="active">全部日志</li>
      </ol>
    </section>
    <!-- 内容头部 /-->
    <!-- 正文区域 -->
    <section class="content">

      <!-- .box-body -->
      <div id="logApp" class="box box-primary">

        <div class="box-body">

          <!-- 数据表格 -->
          <div class="table-box">

            <!--工具栏-->
            <div class="pull-left">
              <div class="form-group form-inline">
                <div class="btn-group">
                  <button type="button" class="btn btn-default" title="新建"><i
                      class="fa fa-file-o"></i> 新建</button>
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
                  <input id="selall" type="checkbox" class="icheckbox_square-blue">
                </th>
                <th class="sorting_asc">ID</th>
                <th class="sorting">访问时间</th>
                <th class="sorting">访问用户</th>
                <th class="sorting">访问IP</th>
                <th class="sorting">资源URL</th>
                <th class="sorting">执行时间</th>
                <th class="sorting">访问方法</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(item,index) in pageInfo.list">
                <td><input name="ids" type="checkbox"></td>
                <td>{{index+1}}</td>
                <td>{{formatDateTime(item.visitTime)}}</td>
                <td>{{item.username}}</td>
                <td>{{item.ip}}</td>
                <td>{{item.url}}</td>
                <td>{{item.executionTime}}</td>
                <td>{{item.method}}</td>
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
              <select class="form-control" :value="pageInfo.pageSize">
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
                <a @click="loadLog(pageInfo.navigateFirstPage)" aria-label="Previous">首页</a>
              </li>
              <li><a @click="loadLog(pageInfo.pageNum-1)">上一页</a></li>
              <li v-for="index in pageInfo.pages" :class="{active:pageInfo.pageNum===index}"><a @click="loadLog(index)">{{index}}</a></li>
              <li><a @click="loadLog(pageInfo.pageNum+1)">下一页</a></li>
              <li>
                <a @click="loadLog(pageInfo.navigateLastPage)" aria-label="Next">尾页</a>
              </li>
            </ul>
          </div>

        </div>
        <!-- /.box-footer-->
      </div>
    </section>
    <!-- 正文区域 /-->
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
  $("#selall").click(function() {
    var clicks = $(this).is(':checked');
    if (!clicks) {
      $("#dataList td input[type='checkbox']").iCheck("uncheck");
    } else {
      $("#dataList td input[type='checkbox']").iCheck("check");
    }
    $(this).data("clicks", !clicks);
  });
});


// 设置激活菜单
function setSidebarActive(tagUri) {
  var liObj = $("#" + tagUri);
  if (liObj.length > 0) {
    liObj.parent().parent().addClass("active");
    liObj.addClass("active");
  }
}


$(document).ready(function() {
  // 激活导航位置
  setSidebarActive("log-manager");
});

import axios from "axios";
import moment from "moment";
export default {
  name:'sysLogList',
  data:function (){
    return{
      pageInfo:{}
    }
  },
  methods:{
    loadLog:function (pageNum) {
      let _this = this;
      axios.get("http://localhost:8080/syslog/logList",{
        params:{
          pageNum:pageNum
        }
      }).then(function (response) {
        _this.pageInfo = response.data;
      })
    },
    formatDateTime:function(value){
      return moment(value).format("YYYY-MM-DD HH:mm:SS")
    }
  },
  created:function (){
    this.loadLog();
  }

}
</script>