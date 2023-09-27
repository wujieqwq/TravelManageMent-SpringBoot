

<template>
  <div class="hold-transition skin-purple sidebar-mini">
    <div class="wrapper">
      <div class="content-wrapper" id="uList">
        <!-- 内容头部 -->
        <section class="content-header">
          <h1>
            用户管理
            <small>用户列表</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
            <li><a href="#">用户管理</a></li>
            <li class="active">用户列表</li>
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
                      <router-link type="button" class="btn btn-default" title="新建" to="/home/userAdd"><i
                          class="fa fa-file-o"></i> 新建</router-link>
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
                    <th class="sorting">用户名</th>
                    <th >邮箱</th>
                    <th >联系电话</th>
                    <th >状态</th>
                    <th class="text-center">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(user,index) in users">
                    <td><input name="ids" type="checkbox"></td>
                    <td>{{user.id}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phoneNum}}</td>
                    <td>{{user.status===0?'未激活':'已激活'}}</td>
                    <td class="text-center">
                      <router-link type="button" class="btn bg-olive btn-xs" :to="'/home/userDetail/'+user.id">详情</router-link>
                      <router-link type="button" class="btn bg-olive btn-xs" :to="'/home/userAddRole/'+user.id">管理角色</router-link>
                      <button type="button" class="btn bg-olive btn-xs" @click="open(user.id)">删除用户</button>
                    </td>
                  </tr>
                  </tbody>
                  <!--
                                    <tfoot>
                                    <tr>
                                    <th>Rendering engine</th>
                                    <th>Browser</th>
                                    <th>Platform(s)</th>
                                    <th>Engine version</th>
                                    <th>CSS grade</th>
                                    </tr>
                                    </tfoot>-->
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
                    <a href="#" aria-label="Previous" @click="loadUsers(pageInfo.navigateFirstPage)">首页</a>
                  </li>
                  <li><a href="#" @click="loadUsers(pageInfo.pageNum-1)">上一页</a></li>
                  <li v-for="index in pageInfo.pages"><a href="#" @click="loadUsers(index)">{{index}}</a></li>
                  <li><a href="#" @click="loadUsers(pageInfo.pageNum-1)">下一页</a></li>
                  <li>
                    <a href="#" aria-label="Next" @click="loadUsers(pageInfo.navigateLastPage)">尾页</a>
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
  setSidebarActive("user-manager");
});

import axios from "axios";
export default {
  name:'userList',
  data:function (){
    return{
      users:[],
      pageInfo:{}
    }
  },
  methods:{
    loadUsers:function (pageNum){
      let _this = this;
      axios.get("http://localhost:8080/user/findAll",{
        params:{
          pageNum:pageNum
        }
      }).then(function (response){
        _this.pageInfo = response.data;
        _this.users = response.data.list;
      })
    },
    deleteUser(uid){
      let _this = this;
      axios.get("http://localhost:8080/user/removeById",{
        params:{
          id:uid
        }
      }).then(function (response){
        _this.loadUsers();
      })
    },
    open(uid) {
      this.$alert('确认删除', '', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteUser(uid);
        }
      });
    }
  },
  created:function (){
    this.loadUsers();
  }
}
</script>

<style scoped>

</style>