

<template>
  <div class="content-wrapper" id="userRole">
    <!-- 内容头部 -->
    <section class="content-header">
      <h1>
        用户管理
        <small>添加角色</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a href="#">用户管理</a></li>
        <li class="active">管理用户角色</li>
      </ol>
    </section>
    <!-- 内容头部 /-->
    <!-- 正文区域 -->
    <section class="content">
      <div class="box">
        <div class="box-body">
          <table id="dataList" class="table table-bordered table-hover table-striped dataTable">
            <thead>
            <tr>
              <th><input id="selall" type="checkbox" class="icheckbox_square-blue" @click="checkAll"></th>
              <th>ID</th>
              <th>角色名称</th>
              <th>角色描述</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>已有角色</td>
            </tr>
            <tr v-for="(role,index) in hasRoles">
              <td><input name="ids" type="checkbox" v-model="roleIds" :value="role.id" @click="getChecked"></td>
              <td>{{index}}</td>
              <td>{{role.roleName}}</td>
              <td>{{role.roleDesc}}</td>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td>可添加角色</td>
            </tr>
            <tr v-for="(role,index) in NoRoles">
              <td><input name="ids" type="checkbox" v-model="roleIds" :value="role.id" @click="getChecked"></td>
              <td>{{index}}</td>
              <td>{{role.roleName}}</td>
              <td>{{role.roleDesc}}</td>
            </tr>
            </tBody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
      <div class="box-tools text-center">
        <button type="button" class="btn bg-maroon" @click="updateUserRoles">保存</button>
        <button type="button" class="btn bg-default" onclick="history.back(-1);">返回</button>
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
  setSidebarActive("user-manager");
});

import axios from "axios";

export default {
  name:'userAddRole',
  data:function (){
    return{
      hasRoles:[],
      NoRoles:[],
      roleIds:[],
    }
  },
  props:['id'],
  methods:{
    loadUserRole:function (){
      let id = this.id;
      let _this = this;
      axios.get("http://localhost:8080/user/"+id).then(function (response){
        _this.hasRoles = response.data.roles;
        for (let x in _this.hasRoles){
          _this.roleIds.push(_this.hasRoles[x].id);
        }
      })
    },
    loadUserNoRole:function (){
      let id = this.id;
      let _this = this;
      axios.get("http://localhost:8080/user/findNoRole",{
        params:{
          id:id
        }
      }).then(function (response){
        _this.NoRoles=response.data
      })
    },
    getChecked:function (){
      let boxs = $("input[name='ids']");
      let ids = [];
      for (var x in boxs) {
        if (boxs[x].checked) ids.push(boxs[x].value);
      }
      this.roleIds = ids;
    },
    checkAll:function (){
      let boxs = $("input[name='ids']");
      boxs.prop("checked",$("#selall").prop("checked"));
      this.getChecked();
    },
    updateUserRoles:function(){
      let id = this.id;
      let _this = this;
      axios.put("http://localhost:8080/user/updateRoles",{
        id:id,
        roleIds:_this.roleIds
      }).then(function (response){
        _this.loadUserRole();
        _this.loadUserNoRole();
      })
    }

  },
  created:function (){
    this.loadUserRole();
    this.loadUserNoRole();
  }
}
</script>

<style scoped>

</style>