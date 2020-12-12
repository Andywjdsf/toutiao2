import axios from "axios"
import store from '@/store/'
//在非组件模块中获取 store 必须通过这种方式
//在这里加载store 和在组建中 this.$store  一个东西
// import store  from '@/store/'

const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/'   //基本路径  
})
//axios 此时是实现前后端数据交互的作用，有get和post两种属性 get 获取  post提交
//在这里用request代替axios 数据共有的部分  是为项目后期编辑较少操作  “说要用谁请求


//请求拦截器
request.interceptors.request.use(function (config) {
    console.log(config)
    // 如果用户已登录，统一给接口设置token
    const {user} = store.state
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
        //`Bearer ${user.token}`是模板字符串 (`字符串$字符串`)
    }
    //处理完之后一定要config返回，不然的话请求就会停在这里
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//响应拦截器

//导出
export default request
//暴露自己的意思 