<template>
<div class="article-list">
    <!-- 
        List 组件通过 loading 和 finished 两个变量控制加载状态，
        当组件滚动到 底部 时，会触发 load 事件并将 loading 设置成 true。
        此时可以发起 异步操作 并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
        若数据已全部加载完毕，则直接将 finished 设置成 true 即可

        load 事件：
        list 初始化会触发一次load事件 用于加载第一屏的数据  
        如果一次请求加载的数据较少，导致列表内容无法铺满当前屏幕，list会继续触发 load事件
        直到内容铺满全屏幕或者数据全部加载完成

        2. loading 属性：控制加载中loading状态 
        在没有加载中，loading为false 此时会根据列表滚动位置判断是否触发load事件
        （列表屏幕内容不足一屏幕时，会直接触发加载中 此时loading值为ture 表示正在发送异步请求，此时不会触发load事件）
        3.finished 属性 ：控制加载结束状态
        在每次请求完成后，需要手动将loading设置为 false 表示本次加载结束
        所有数据加载完成，finished 为true 此时不会触发 load 事件

     -->
<van-pull-refresh 
v-model="isRefreshLoading"
 @refresh="onRefresh"
  :success-text="refreshSuccessText"
   :success-duration="1500">
   <!-- //刷新成功提示展示时长(ms) -->
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<ArticleItem
 v-for="(article,index) in articles"
 :key="index"
 :wj="article"
 />
 <!-- article 是 articles 里面item （元素）也是父组件要传data的值 -->
   <!-- <van-cell 
  v-for="(article,index) in articles"
   :key="index" 
   :title="article.title" />  -->
</van-list>  
</van-pull-refresh>  
</div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from './article-item' //父子组件建立
export default {
 name: 'Articlelist',
 components: {
   ArticleItem
 },
 props: {
     father:{
         type:Object,// 此时props接收值的类型 是对象形式（父组件传过来的值是什么类型就写什么类型）
         required:true,//
     }
 },
data() {
return {
   articles: [],//数据列表
      loading: false,//控制加载中的loading状态
      finished: false, //控制加载结束的状态,当加载结束时 不再触发加载更多
      timestamp:null , //获取下一页数据的时间戳
      isRefreshLoading:false,//下拉刷新的loading状态
      refreshSuccessText:'',//下拉刷新成功提示
      scrollTop: 0 // 列表滚动到顶部的距离
}
},
// components:{
//   ArticleItem
// },
//方法集合
methods: {
  async onLoad() {
       console.log('onLoad')//list 初始化会触发一次load事件 用于加载第一屏的数据
       //1.请求数据
       const {data} = await getArticles({
         channel_id:this.father.id,
         timestamp:this.timestamp || Date.now(), //时间戳,请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
         //timestamp 相当于页码 请求最新的数据使用最新的时间戳 ，下一页数据使用上一次但回的数据中时间戳
         with_top: 1, //是否包含置顶 进入页面第一次请求是时要包含指定文章 1.包含置顶 0.不包含
       })
      //  console.log(data)
      //2.把数据放到数据 list数组中
       const { results } = data.data
      this.articles.push(...results) 
      // console.log(results)//...扩展运算符号 es6 合并数组到push里面去遍历出来
      // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则会一直停留在这里 
       this.loading = false
      // 4.数据全部加载完成
      if(results.length){
         //更新过去下一页数据的页码 利用数组results.length长度！=0，就会请求加载字啊一页数据
      this.timestamp = data.data.pre_timestamp //pre_timestamp 是后端给的 请求下一页数据点时间戳
      } else {
           // 没有数据了，把加载状态设置结束，不再触发加载更多
       this.finished = true
      }
    },
  async onRefresh() {
    // console.log('onRefresh')
    //下拉刷新 组件自己就会展示loading状态
    //1.请求获取数据
     const {data} = await getArticles({
         channel_id:this.father.id,
         timestamp:Date.now(), //为了方便大家学习只要你传递不同的时间戳就一定给你返回不一样的数据。而且数据不为空
         with_top: 1,
       })
    //2.把数据放到数据列表中（往顶部追加）
    this.articles.unshift(...data.data.re)
    //3.关闭刷新的状态
     this.isRefreshLoading = false
     this.refreshSuccessText='更新了${results.length}条数据'
  }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.article-list{
   position: fixed;//将列表固定定位 fixed    
// fixed 生成绝对定位的元素，相对于浏览器窗口进行定位。
// 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto; //设置这个，不然没有滚动条 
}
</style>