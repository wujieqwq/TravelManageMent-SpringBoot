

<template>
      <aside class="main-sidebar">
        <div>
          <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
              <div class="pull-left image">
                <img src="@/assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
              </div>
              <div class="pull-left info">
                <p>张猿猿</p>
                <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
              </div>
            </div>
            <!-- search form -->
            <!-- <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="搜索...">
                    <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i
                                class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form> -->
            <!-- /.search form -->


            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
              <li class="header">菜单</li>

              <li id="admin-index"><router-link to="/home"><i class="fa fa-dashboard"></i>
                <span>首页</span></router-link></li>

              <!-- 菜单 -->

              <li class="treeview">
                <a href="#">
                  <i class="fa fa-gears"></i> <span>系统管理</span>
                  <span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
                </a>
                <ul class="treeview-menu">

                  <li id="user-manager">
                    <router-link to="/home/userList">
                      <i class="fa fa-circle-o"></i> 用户管理
                    </router-link>
                  </li>

                  <li id="role-manager">
                    <router-link to="/home/roleList">
                      <i class="fa fa-circle-o"></i> 角色管理
                    </router-link>
                  </li>

                  <li id="permission-manager">
                    <a href="/home/pages/role-add-permission.html">
                      <i class="fa fa-circle-o"></i> 资源权限管理
                    </a>
                  </li>

                  <li id="log-manager">
                    <router-link to="/home/sysLogList">
                      <i class="fa fa-circle-o"></i> 访问日志
                    </router-link>
                  </li>

                </ul>
              </li>

              <li class="treeview">
                <a href="#">
                  <i class="fa fa-cube"></i> <span>基础数据</span>
                  <span class="pull-right-container">
									<i class="fa fa-angle-left pull-right"></i>
								</span>
                </a>
                <ul class="treeview-menu">

                  <li id="product-manager">
                    <router-link to="/home/orderList">
                      <i class="fa fa-circle-o"></i> 产品管理
                    </router-link>
                  </li>

                  <li id="order-manager">
                    <router-link to="/home/orderList">
                      <i class="fa fa-circle-o"></i> 订单管理
                    </router-link>
                  </li>

                </ul>
              </li>

              <!-- 菜单 /-->
            </ul>
          </section>
        </div>
      </aside>
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
  setSidebarActive("admin-index");
});

export default {
  name:'Aside',
  data:function (){
    return{

    }
  }
}

</script>
<style scoped>

</style>