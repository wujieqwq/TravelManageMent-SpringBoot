

<template>
  <div class="content-wrapper">
    <!-- 内容头部 -->
    <section class="content-header">
      <h1>
        用户管理
        <small>用户详情</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a href="#">用户管理</a></li>
        <li class="active">用户详情</li>
      </ol>
    </section>
    <!-- 内容头部 /-->
    <!-- 正文区域 -->
    <section class="content">
      <div class="box">
        <div class="tab-pane" id="tab-treetable">
          <ul>
            {{userInfo.username}}
            <li v-for="role in userInfo.roles">
              {{role.roleName}} ---- {{role.roleDesc}}
              <ul>
                <li v-for="permission in role.permissions">
                  {{permission.permissionName}} --- {{permission.url}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!--树表格/-->
      </div>
      <div class="box-tools text-center">
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

  /*table tree*/
  $("#collapse-table").treetable({
    expandable: true
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
  name:'userDetail',
  data:function (){
    return{
      userInfo:{}
    }
  },
  methods:{
    loadUserDetails:function (){
      let id = getParameter("id");
      let _this = this;
      axios.get("http://localhost:8080/user/"+id).then(function (response){
        _this.userInfo = response.data;
      })
    }
  },
  created:function (){
    this.loadUserDetails();
  }

}
</script>

<style scoped>

</style>