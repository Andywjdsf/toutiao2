import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// 路由表
const routes = [
 {
   path:"/login",
   name:"Login",
   component:()=> import('@/views/login/')
 },
 {
  path:"/",
  component:()=> import('@/views/layout/'),
  children:[
    {
      path:"",
      name:"Home",//默认子路由
      component:()=> import('@/views/home/')
    },
    {
      path:"/rq",
      name:"Rq",
      component:()=> import('@/views/rq/')
    },
    {
      path:"/video",
      name:"Video",
      component:()=> import('@/views/video/')
    },{
      path:"/own",
      name:"Own",
      component:()=> import('@/views/own/')
    },
    
  ]
}

 

]

const router = new VueRouter({
  routes
})

export default router
