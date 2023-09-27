<template>
  <div class="login-box" id="loginApp">
    <div class="login-logo">

      <a href=""><b>旅游</b>后台管理系统</a>

    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">登录系统</p>

      <form>
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="用户名" v-model="user.username">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="密码" v-model="user.password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="text-danger">{{errorMessage}}</div>
        <div class="row">
          <div class="col-xs-8">
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button class="btn btn-primary btn-block btn-flat" @click.prevent="loginIn">登录</button>
          </div>
          <!-- /.col -->
        </div>
      </form>


      <!-- /.social-auth-links -->

      <a href="#">忘记密码</a><br>

    </div>
    <!-- /.login-box-body -->
  </div>
</template>
<script>
import Qs from "@/assets/js/qs.min";

$(function() {
  $('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue',
    increaseArea: '20%' // optional
  });
});

import axios from "axios";
export default {
  name:'login',
  data:function (){
    return{
      user:{
        username:"",
        password:""
      },
      errorMessage: ""
    }
  },
  methods:{
    loginIn:function (){
      let _this = this;
      // username=zhangsan&password=123456
      // let param = JSON.stringify(this.user);
      // let param = Qs.stringify(this.user);
      axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: "http://localhost:8080/user/login",
        data: _this.user
      }).then(function (response){
        let resultInfo = response.data;
        if (resultInfo.flag) { // 登录成功
          _this.$router.push('/home')
        } else {
          _this.errorMessage = resultInfo.msg;
        }
      })
    }

  }
}
</script>