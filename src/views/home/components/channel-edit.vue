<template>
<div class="channel-edit">
    <van-cell center  :border="false">
        <div slot="title" 
        class="channel-title"
        style="float:left"
        >我的频道</div>
        <van-button
        type="danger"
        plain
        round
        size="mini"
       @click="isEdit = !isEdit"
        >{{isEdit ? '完成':'编辑'}}</van-button>
    </van-cell>
    <!-- 编辑状态显示 完成    非编辑状态显示编辑 -->
    <!--  :class="{active: index ===激活的频道 }"动态绑定 -->
    <van-grid :gutter="10">
    <van-grid-item
     class="grid-item"
     :class="{active: index === active }"
    :icon="(isEdit && index !==0) ? 'clear' : ''"
     v-for="(channel,index) in userChannels" 
     :key="index" 
     :text="channel.name" 
     @click="onUserChannelClick(channel, index)"/>
    </van-grid>


    <van-cell center  :border="false">
        <div slot="title"
         class="channel-title" 
         style="float:left"
         >频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
</div>
</template>

<script>
import { 
  getAllChannels,
  addUserChannel,
  } from '@/api/channel'
import {mapState} from 'vuex'

export default {
 name:'ChannelEdit',
 computed: {
     //计算属性会观测内部依赖数据的变化而重新求职
     //推荐度频道列表
     recommendChannels () {
//思路：所有的频道 -我的频道 =剩下的推荐频道
//filter 方法：过滤数据。根据方法返回的布尔值true 来收集数据
// filter 方法 查找满足该条件的所有元素
  return this.allChannels.filter(channel => {
      //判断 channel 是否属于用户频道
      //find 方法 查找满足条件的单个元素
      return !this.userChannels.find(userChannel =>{
          //找到满足该条件的元素
          return userChannel.id ===channel.id
    })
  })


//   //同理  数组写法
//   const arr = []
//   //遍历所有的频道
//  this.allChannels.forEach(channel => {
//      let flag = false
//      for (let i = 0;i< this.userChannels.length;i++){
//         if(this.userChannels[i].id === channel.id){
//          //所有频道中的频道项属于用户频道
//          flag = true
//          break 
//          // 跳出本次if循环 它只能跳出一层循环，如果你的循环是嵌套循环，那么你需要按照你嵌套的层次，逐步使用break来跳出。
//          //有一点需要注意的是：break语句不能直接作用于if语句，除非这个if语句是被嵌套在循环语句里面的。 
//          //continue: 结束本次循环(不是终止整个循环)，即跳过循环体中continue语句后面的语句，开始下一次循环。
//      }
//      }
//      if(!flag) {
//          arr.push(channel)
//      }
//  })
//    return arr
 }
 },

 props: {
     userChannels:{
     type:Array,
     required:true,
   },
   active:{
     type:Number,
     required:true
   }
 },
data() {
return {
 allChannels:[],//所有频道数据列表
 isEdit: false,// 控制编辑的显示状态
}
},
//方法集合
methods: {
 async loadAllChannels() {
   const {data} = await getAllChannels()
//    console.log(data)
    this.allChannels = data.data.channels
 },
 onAdd(channel){
 this.userChannels.push(channel)

 //todo 数据持久化
 if(this.user){
//登陆了 数据储存到线上
 }else{
   //没有登录 数据储存到本地
   setItem('user-channels',this.userChannels)
 }
 },

 onUserChannelClick(channel,index){
   if(this.isEdit && index !==0){
  //编辑状态 删除频道  在控制台看channeledit的值为true
  // 索引位 index !==0 是推荐频道 永远不被删除 
  this.deleteChannel(index)
   }else {
     this.switchChannel(index)
 // 非编辑状态  切换频道  channeledit的值为false
   }
 },


  deleteChannel(index) {
    // 如果删除的是当前激活的频道之前的频道 
    //index 是删除频道的索引 this.active 是当前频道的索引
     if(index <= this.active){
  //更新激活频道的索引 
     this.$emit('update-active', this.active - 1)
     }
    // console.log('删除频道')
    this.userChannels.splice(index,1)
  },//这里是 删除的操作  删除功能，第一个参数为第一项位置，第二个参数为要删除几个  返回的是删除的内容 arr是结果值
  //splice方法可以用来对js的数组进行 删除，添加，替换等操作


  switchChannel(index) {
    // console.log('切换频道')
    //切换频道
   this.$emit('update-active', index)

    //关闭弹出层
    this.$emit('close') //父子组件通信传值
  }
},


//生命周期 - 创建完成（访问当前this实例）
created() {
 this.loadAllChannels()

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.channel-edit {
    padding-top:54px;

    .channel-title {
    font-size: 16px;
    color: #333333;
    }
    .grid-item{
        width: 88px;
        height: 43px;
        /deep/ .van-grid-item__content {
            background-color: #f5f6f7;
         .van-grid-item__text{
             font-size: 14px;
             color: #222;
             margin-top: 0;
         }
     }
     /deep/.van-grid-item__icon {
    position: absolute;
    font-size: 20px;
    top: -5px;
    right: -5px;
    color: #cccccc;
    }
   }
      .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
   }
  }
</style>