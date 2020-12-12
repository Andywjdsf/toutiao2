<!--  -->
<template>
<div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
       slot="title"
       class="search-btn"
       icon="search"
       type="info"
       round
       size="small"
       >搜索</van-button> 
    </van-nav-bar>
 <!-- /导航栏 -->
<van-tabs class="channel-tabs" v-model="active">
  <van-tab class="tab-item" :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- {{channel.name}}的内容  代替如下 <article-list/> -->
        <!-- 文章列表 -->
        <Articlelist :father="channel"/>
        <!--3.使用     父子组件传值 1.两个组件都是vue类型 1.加载，2.注册。3.使用传值（传的是父组件中data的值） 4接收传值.）
         channel 是属性名  
        channel是属性值 
        如果没有v-bind（简写 ：）那值里面任何内容都是字符串 如果需要动态绑定数据，则使用v-bind把channel数组的对象 
        用abc做属性名去传值2那articlelist文章列表接收abc传的值  -->
        <!-- 文章列表 -->
  </van-tab>
    <!-- // 1. 在写v-for的时候，都需要给元素加上一个key属性(v-for=指定的变量 in 数组)
    2. key的主要作用就是用来提高渲染性能的！
    3.key属性可以避免数据混乱的情况出现 （如果元素中包含了有临时数据的元素，如果不用key就会产生数据混乱） -->
 
  <!-- 汉堡按钮 定位 把列表最后的位置给挡住了 解决办法 是在这里添加一个占位元素为了防止小图标把其他标签挡住，这里再加一个插槽 -->
<div slot="nav-right" class="warp-holder"></div>
 <div slot="nav-right"  class="icon-tabs" @click="show=true">
  <van-icon name="wap-nav" />
 </div>
 <!-- 上面 顶部右侧导航栏 三 -->
</van-tabs>
 <!-- 文章频道列表 -->
 <van-popup 
 v-model="show" 
  position="bottom" 
  class="channel-edit-popup" 
  closeable
  close-icon-position="top-left"
  style="height:100%"
  >
  <!-- 模板中的$event 表示事件参数 -->
  <ChannelEdit 
  :user-channels="channels"
  :active="active"
  @close="show=false"
  @update-active=" active = $event" />
  </van-popup>
  <!--上面是频道底部切换层  get-container="body" 渲染到body的节点上
   @close="isChannelEditShow = false"  子传父 子自定义事件  close-->
</div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import Articlelist from './components/article-list'
import ChannelEdit from  './components/channel-edit.vue'
// 1.让子组件加载到父组件中
export default {
name:'homeIndex',
components: {
  Articlelist ,//2.让子组件注册父组件中
  //父子组件传值 components 是让 aritcle 页面在home页面显示建立父子关系 并且在此页面html中渲染出子组件的内容来——（例如：<Articlelist :abc="channel"/>）
//而props是子组件接收父组件传过来的值 并且父组件所传的值是父组件中data的值
  ChannelEdit
},

data() {
return {
 active: 0, //控制被激活的标签（指的是索引位从0开始）
 channels: [], // 频道列表
 show:false //控制编辑频道的状态
}
},
//方法集合
methods: {
 async loadChannels(){
     //请求获取文章数据
    const { data } = await getUserChannels()
    this.channels=data.data.channels
 },
  // onUpdateActive (index){
  // this.active = index
  // }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
 this.loadChannels() 
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.home-container{
    //根据控制台给的类名 
    /deep/ .van-nav-bar__title {
    max-width: none;
    //为了右侧输入框不被覆盖
  } 
  .search-btn{
     width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
}
.channel-tabs{
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line{
      bottom:20px;
      width: 15px !important;
      height: 3px;
      background:#3296fa;
    }
 .warp-holder{
              width: 30px;
              flex-shrink: 0; //我是固定大小，不参与平分父级大小
  }
      .icon-tabs{
      position: fixed;
      right: 0px;
      width: 33px;
      height: 43px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity:0.9;//透明度0.9
      &:before{
        content:'';
        width: 1px;
        height: 29px;
        background: url("./line.png") no-repeat;
        background-size:cover;
        //  position: absolute;
        //  left: 0;
        //  top: 0;
        //  bottom: 0;
      } 
//  :before 是伪元素 在某元素之前插什么内容 需结合content使用，可以像设置普通bai标签一样设置该元素的css样式 。
}
}
}
</style>