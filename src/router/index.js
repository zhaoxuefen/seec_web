import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect:"login",
  },
  {
    path:"/home",
    name:"home",
    redirect:"/home/index",
    children:[
      {
        path:"index",  //加/就必须写home 路径必须写完整 表示根目录
        name:"index",
        component:()=>import("../views/Index.vue")
      },
      {
        path:"document",
        name:"document",
        component:()=>import("../views/Document.vue")
      },
      {
        path:"lead",
        name:"lead",
        component:()=>import("../views/Lead.vue")
      },
    ],
    component:() =>import("../views/HomeView.vue")
  },
  {
    path:"/login",
    name:"login",
    component:() =>import("../views/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});


router.beforeEach((to,from,next)=>{
  // 路由守卫中不要使用 for 循环
  console.log(to,from);
  if(to.name==="login"){
    // 登陆界面不设权限
    next()
  }else{
    // 非登陆界面设置权限
    let token = localStorage.getItem("token")
    if(token){
      // 有权限的人
      next()
    }else{
      // 没有权限的人 要去登陆页面登陆
      next({name:"login"});
    }
  }
  // if(token){
  //   next({name:to.name})
  // }else{
  //   next({name:"login"});
  // }

})
export default router;
