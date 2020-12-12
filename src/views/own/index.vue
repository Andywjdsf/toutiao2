<!--  -->
<template>
<div class="my-container">
    <!-- v-if 是登录时所显示单页面 -->
<van-cell-group v-if="user" class="my-info">

   
     <van-cell  class="base-info" 
     center :border="false">
         <!-- 使用cell单元格 插槽slot  -->
     <van-image class="avatar" slot="icon" round fit="cover" :src="currentUser.photo"/>
     <!-- fit cover 使图片短边漏出来，剪裁长边 -->
     <div  class="name" slot="title">{{currentUser.name}}</div>
     <van-button  class="update-btn" size="small" round>编辑资料</van-button>
     </van-cell>

<van-grid class="data-info" :border="false">
    <!--border 默认值true 有框线 grid 单元格属性  -->
    <van-grid-item class="data-info-item">
    <div slot="text" class="text-wrap">
      <div class="count">{{currentUser.art_count}}</div>
      <div class="text">头条</div>
    </div>
    </van-grid-item>
    <van-grid-item class="data-info-item">
      <div slot="text" class="text-wrap">
      <div class="count">{{ currentUser.follow_count }}</div>
      <div class="text">关注</div>
      </div>
    </van-grid-item>
    <van-grid-item class="data-info-item">
      <div slot="text" class="text-wrap">
      <div class="count">{{ currentUser.fans_count }}</div>
      <div class="text">粉丝</div>
      </div>
    </van-grid-item>
    <van-grid-item class="data-info-item">
      <div slot="text" class="text-wrap">
      <div class="count">{{ currentUser.like_count }}</div>
      <div class="text">获赞</div>
      </div>
    </van-grid-item>
</van-grid>
</van-cell-group>

 <!-- v-else 没有登录所显示的页面 和表头的v-if 呼应 -->
 <!-- $router.push()代表从 未登录页面 跳转 login页面-->
    <div v-else class="not-login">
        <div @click="$router.push('/login')">
         <img  class="moblie" src="./手机.png">
        </div>
        <div class="text">登录 / 注册</div>
   
    </div>


 <van-grid class="nav-grid mb4" :column-num="2">
     <!-- column-num 自定义列数2列 -->
  <van-grid-item class="nav-grid-item"
  icon-prefix="iconfont iconshoucang_huaban" icon="shoucang_huaban" text="收藏"/>
  <van-grid-item class="nav-grid-item"
  icon-prefix="iconfont iconlishi" icon="iconlishi" text="历史" />
</van-grid>

<!-- 可以通过 url 属性进行 URL 跳转，或通过 to 属性进行路由跳转。 -->
<van-cell title="消息通知" is-link to=""  align="left"/>
<van-cell class="mb4" title="小智同学" is-link to=""  align="left"/>
<!-- 此步v-if判断是否登录 -->
<van-cell
 v-if="user"
 class="logout-cell" 
 title="退出登录" 
 @click="onLogout"/>
</div>
</template>

<script>

import {mapState} from 'vuex'
import {getCurrentUser} from '@/api/user'

export default {
  name:'MYIndex',
data() {
  return {
    currentUser: {}  //当前登录用户信息
    }
},

//方法集合
methods: {
 async locadCurrentUser(){
      //es6中的结构赋值 const {a} = b 等价于 const a = b.a
      const {data} = await getCurrentUser()
      console.log(data)
      this.currentUser = data.data
  },
 onLogout() {
     //提示用户退出登录
     //确认退出-->处理退出
    this.$dialog.confirm({
    title: '退出提示',
    message: '确认退出吗？',
    })
    .then(() => {//确认执行这里 
       //清除用户登录状态
        // on confirm
        this.$store.commit('setUser',null)//清除用户登录状态
        //此步是提交 mutation 中我们所要用到那个函数 而此时null是将登录状态token值变为null
    })
    .catch(() => {//退出就执行这里
        // on cancel
    });
    },
     
},
//生命周期 - 创建完成（访问当前this实例）
created() {
 this.locadCurrentUser()//此部加载调用方法   注意是这里的user和compute的user不要重名 否则报错程序
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
 
},
computed: {
       ...mapState(['user']) 
}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.my-container{
    .my-info{
      background: url("./banner.png") no-repeat;
      background-size: cover;
     .base-info{
         height: 115px;
         padding-top:38px;
         padding-bottom: 11px;
         box-sizing: border-box;
         background: unset; //取消背景
        
         .avatar{
             box-sizing: border-box;
             width: 66px;
             height: 66px;
             border: 1px solid #fff;
             margin-right: 11px;
         }
         .name{
             font-size: 18px;
             color: #fff;
         }
         .update-btn{
             height: 20px;
             font-size: 10px;
             color: #666;
        
         } 
     }
    .data-info{
        .data-info-item{
             height: 80px;
             color: #666;
            .text-wrap{
                display: flex;
                flex-direction: column;//上下对齐
                justify-content: center;
                align-content: center;
                // flex 布局 水平方向和纵轴方向居中
                .count{
                    font-size: 18px;
                    color: #fff;
                }
                .text{
                    font-size: 15px;
                    color:#fff;
                }   
             }
         }
    }
  } 
    /deep/ .van-grid-item__content{
        //深层作用操作符  /deep/是因为在vant 框架中有许多底层样式是我们看不见的，如果不想层层嵌套查找就使用/deep/
          background-color: unset;
      }
    .nav-grid{
        background: #fff;
      .nav-grid-item{
          height: 70px; 
           .van-grid-item__text{
                 font-size: 2px;
                 color: #333;
            } 
        }
     
    }
  .logout-cell{
      text-align:center;
      color: #d86262;
  }
  .mb4{
      margin-bottom: 4px;
  }
.not-login{
    height: 180px;
    background:url("./banner.png") no-repeat;//no-repeat 背景图片不重叠
    background-size: cover;//背景大小自适应覆盖屏幕大小
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-content: center;
}
  .moblie{
      width: 66px;
      height: 66px;
  }
  .text{
      font-size:14px;
      color:#fff;

    
  }
  
//   .no-login{
//       height: 180px;
//       background: url('./banner.png');
//       background-size: cover;
//       display: flex;
//       flex-direction: column; //文字垂直排列
//       justify-content: center;
//       align-items: center;
//       .moblie{
//           width: 66px;
//           height: 66px;
//       }
//       .text{
//           font-size: 14px;
//           color: #fff;
//       }
//   }
//  /deep/ .nav{
//          .nav-item{
//              height: 70px;
//              .van-grid-item__text{
//                  font-size: 14px;
//                  color: #333;
//              }
//          }
//      }
//      .logout{
//          color: #d86262;
//      }
//     .mb4{
//         margin-bottom: 4px;
//     }
}
</style>