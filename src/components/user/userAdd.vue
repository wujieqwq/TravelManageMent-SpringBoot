

<template>
  <div class="content-wrapper" id="addUserApp">

    <!-- 内容头部 -->
    <section class="content-header">
      <h1>
        用户管理
        <small>用户表单</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li><a href="#">用户管理</a></li>
        <li class="active">添加用户</li>
      </ol>
    </section>
    <!-- 内容头部 /-->
      <section class="content">
        <!--label显示的内容-->
        <div class="panel panel-default" id="tab-label">
          <div class="panel-heading">用户信息</div>
              <el-form ref="form" :model="user" :rules="rules" label-width="80px" style="margin-top: 10px">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="用户名称" prop="username">
                      <el-input v-model="user.username"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="用户密码" prop="password">
                      <el-input v-model="user.password"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="用户邮箱" prop="email">
                      <el-input v-model="user.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="用户电话" prop="phoneNum">
                      <el-input v-model="user.phoneNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="用户状态" prop="status">
                  <el-select v-model="user.status">
                    <el-option label="关闭" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <div class="box-tools text-center">
                  <el-form-item>
                    <el-button type="primary" class="btn bg-maroon" @click="addUser">保存</el-button>
                    <el-button class="btn bg-default" @click="history.back(-1);">返回</el-button>
                  </el-form-item>
                </div>
              </el-form>
        </div>
      </section>
<!--    <form action="#" method="post" >-->
<!--      &lt;!&ndash; 正文区域 &ndash;&gt;-->
<!--      <section class="content">-->
<!--        &lt;!&ndash;label显示的内容&ndash;&gt;-->
<!--        <div class="panel panel-default" id="tab-label">-->
<!--          <div class="panel-heading">用户信息</div>-->

<!--          <div class="row data-type">-->

<!--            <div class="col-md-2 title">用户名称</div>-->
<!--            <div class="col-md-4 data text">-->
<!--              <input type="text" class="form-control" placeholder="用户名称" v-model="user.username">-->
<!--            </div>-->
<!--            <div class="col-md-2 title">密码</div>-->
<!--            <div class="col-md-4 data text">-->
<!--              <input type="text" class="form-control" placeholder="密码" v-model="user.password">-->
<!--            </div>-->

<!--            <div class="col-md-2 title">邮箱</div>-->
<!--            <div class="col-md-4 data text">-->
<!--              <input type="email" class="form-control" placeholder="邮箱" v-model="user.email">-->
<!--            </div>-->

<!--            <div class="col-md-2 title">联系电话</div>-->
<!--            <div class="col-md-4 data">-->
<!--              <input type="text" class="form-control" placeholder="联系电话" v-model="user.phoneNum">-->
<!--            </div>-->

<!--            <div class="col-md-2 title">用户状态</div>-->
<!--            <div class="col-md-4 data">-->
<!--              <select class="form-control " style="width: 100%;" v-model="user.status">-->
<!--                <option selected="selected" value="0">关闭</option>-->
<!--                <option value="1">启用</option>-->
<!--              </select>-->
<!--            </div>-->

<!--          </div>-->

<!--        </div>-->
<!--        &lt;!&ndash;label显示的内容/&ndash;&gt;-->
<!--        <div class="box-tools text-center">-->
<!--          <button type="button" class="btn bg-maroon" @click="addUser">保存</button>-->
<!--          <button type="button" class="btn bg-default" onclick="history.back(-1);">返回</button>-->
<!--        </div>-->
<!--      </section>-->
<!--      &lt;!&ndash; 正文区域 /&ndash;&gt;-->
<!--    </form>-->
  </div>
</template>

<script>
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
  name:'userAdd',
  data:function (){
    return{
      user:{
        email:"",
        username:"",
        password:"",
        phoneNum:"",
        status:""
      },
      form:{
        name:''
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
        ],
        phoneNum: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入用户状态', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    addUser:function (){
      let _this = this;
      axios.post("http://localhost:8080/user/add",_this.user, {
        headers: {
          "contentType": "application/json"
        }
      }).then(function (response){
        _this.$router.push('/home/userList');
      })
    }
  }
}
</script>

<style scoped>

</style>