import Vue from 'vue'
import Vuex from 'vuex'
import {getItem ,setItem} from '@/utils/storage'
Vue.use(Vuex)

const USER_KEY ='toutiao-user'
export default new Vuex.Store({
  state: {
    //state 全局数据共享 
  //  user: JSON.parse(window.localStorage.getItem('user'))
      user: getItem(USER_KEY) 
    //当前登录用户的登录状态（里面有token等数据）
  },
  mutations: {
    //通过setUser方法 改变state中某一个数据 谁调用即可 改变后的数据在mutation中进行储存setitem
    setUser(state,data){
     state.user = data 
     //为了防止页面刷新数据丢失,我们需要把数据放到本地存储中，这里仅仅是为了数据持久化
    // 
    // window.localStorage.setItem('user',JSON.stringify(state.user))
    setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
