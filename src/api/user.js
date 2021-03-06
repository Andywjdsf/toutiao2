//用户相关请求模块

import request from '@/utils/request'
//登录/注册


export const login = data =>{
    return request({
        method:'POST',
            url:'/app/v1_0/authorizations',
            data
    })
}
//

//获取登录用户信息
export const getCurrentUser = () =>{
  return request({
    method:'GET',
    url:'/app/v1_0/user',
    // headers: {
    //     Authorizations:'Bearer {store.state.user}'//Bearer获取登录信息的人
    // }
  })
}


//获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
