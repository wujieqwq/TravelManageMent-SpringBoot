import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/login.vue";
import home from "@/views/home.vue";
import userList from "@/components/user/userList.vue";
import orderList from "@/components/order/orderList.vue";
import Content from "@/components/homeParts/Content.vue";
import orderDetail from "@/components/order/orderDetail.vue";
import roleList from "@/components/role/roleList.vue";
import userAdd from "@/components/user/userAdd.vue";
import userAddRole from "@/components/user/userAddRole.vue";
import sysLogList from "@/components/syslog/sysLogList.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path:'/home',
    component: home,
    children:[
      {path:'userList',component:userList},
      {path:'/',component:Content},
      {path:'content',component:Content},
      {path:'orderList',component:orderList},
      {path:'orderDetail/:id',component:orderDetail,props:true},
      {path:'userDetail/:id',component:orderDetail,props:true},
      {path:'userAddRole/:id',component:userAddRole,props:true},
      {path:'roleList',component:roleList},
      {path:'userAdd',component:userAdd},
      {path:'roleList',component:roleList},
      {path: 'sysLogList',component: sysLogList}
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
