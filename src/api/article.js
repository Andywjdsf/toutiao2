//文章相关请求模块
import request from '@/utils/request'
  
//获取文章列表

export const getArticles = params =>{
    return request({
        method:'GET',
        url:'/app/v1_1/articles',
        params
        //形参具体看后端给的是什么就写什么
    })
}
/** 
 *
*/