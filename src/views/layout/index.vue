<!--  -->
<template>
<div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航栏 -->
  <van-tabbar v-model="active" route>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/rq">问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="user-o" to="/own">我的</van-tabbar-item>
</van-tabbar>
</div>


</template>

<script>
export default {
    name:'Layout',
data() {
return {
 active: 0
}
},
//方法集合
methods: {

},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>