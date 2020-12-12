<!--  -->
<template>
<div class="login-container">
<van-nav-bar 
 class="app-nav-bar"
  title=" 注册 / 登录 "
  left-arrow
  @click-left="$rotuer.back()" 
/>
 <!-- 使用vant的表单验证
 1.使用vant-form 组件包裹所有的表单项 van-field
 2.给vant-form绑定 @submit事件，提示：只有表单验证通过，他才会调用submit事件
 3.使用filed的rules属性定义校验规则
 -->
<van-form 
:show-error="false"
:show-error-message="false" validate-first
@submit="onLogin" 
@failed="onFailed" ref="login-form">
<!-- 登录表单 -->
  <van-field
    v-model="user.mobile"
    icon-prefix="iconfont iconshouji"
    left-icon="smile-o"
    placeholder="请输入手机号"
    center
    :rules="formRules.mobile"
    name="mobile"/>

<van-field
    v-model="user.code" icon-prefix="iconfont iconyanzhengma"
    left-icon="shouji"
    placeholder="请输入验证码"
    center
    :rules="formRules.code"
    name="code">  

<!-- 验证码-->
    <template #button>
         <!-- 因为此时发送验证码的按钮写在了form表单里，所以点击的时候回触发默认行为，所以才使用修饰符prevent阻止默认行为 -->
    <van-count-down :time="1000*60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
    <van-button v-else size="small" round class="send-btn" @click.prevent="onSendms" :loading="sendLoading">
        获取验证码</van-button>
    </template>

</van-field>
<div class="login-btn-wrap">
<van-button class="login-btn" type="info" block @click="onLogin">登录</van-button>
</div>
</van-form>
<!-- 登录表单 -->
</div>
</template>

<script>
import {login} from '@/api/user.js';
import{Toast} from 'vant'
//此时login 是api中的变量 要导入具体一个变量要用{}包起来
export default {
name:'Login',
data() {
return {
user:{
    mobile:'13911111111',
    code:'246810'
},
formRules: {
          mobile: [{
              required: true,
              message: '请填写手机号'
            },
            {
              pattern: /^1[35789]\d{9}$/,
              message: '手机号格式错误'
            }
          ],

          code: [{
              required: true,
              message: '请填写验证码'
            },
            {
              pattern: /^\d{6}$/,
              message: '验证码格式错误'
            }
          ]
        },
        sendLoading:false,
        isCountDownShow:false
}
},
//方法集合
methods: {
async onLogin(){
    this.$toast.loading({
    message: '登录中...',
    forbidClick: true,//是否禁止背景点击 默认值为false 在显示登陆中时其他按钮都不可点击
     duration: 0 //展示时长(ms)，值为 0 时，toast 不会消失
    });
    //1.找到数据接口
    //2.封装请求登录
    //3.请求调用登录


     try {
          const res = await login(this.user)
            console.log(res)
           //4.处理响应结果   
          this.$toast.success('登录成功')
          
          //登录成功之后将后端返回的（token等数据）放在vuex中
          this.$store.commit('setUser',res.data.data)
         
         //登录成功，跳转回 原来 的页面（）
         this.$router.back()//这种写法不太好，后面再改
        } catch (error) {
          console.log('登录失败', error)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
    //Async 和 await是代码标记，等于.then的用法  
},
 async onSendms(){
   //校验验证码
  //如果只验证表单的某一项就使用validate(),由于返回的是promise，所以要使用.then()拿结果,从而我们可以使用async await
      try {
          await this.$refs['login-form'].validate('mobile')
          //验证通过 请求发送验证码
         this.sendLoading = true //防止网络慢，用户多次发送验证码请求
         //短信发出去了，隐藏发送按钮，显示倒计时
         this.isCountDownShow = true
         //倒计时结束 隐藏倒计时，显示发送按钮（监视倒计时的finish事件处理）
      } catch (error) {
         this.$toast({
            message:error.message,
            position:'top'
      })
     }
       this.sendLoading = false //无论发送验证码成功还是失败都要关闭
        //验证码通过->请求发送验证码->用户接受短信（后端数据接口）->输入验证码->请求登录
   //请求发送验证码-》隐藏发送验证码，显示倒计时
   //倒计时结束-》隐藏倒计时，显示发送按钮
},
onFailed(error){
       if(error.errors[0]){
         this.$toast({
           message:error.errors[0].message,
           position:'top' //防止手机键盘太高，看不见提示
         })
       }
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
<style scoped lang="less">
//凡是用到scoped  此页面的css只在此页面起作用
//lang="less" 使我们采用less形式的css  css 有3种 形式的文件写入vue 
/* @import url(); 引入css类 */
.login-container {
 .login-btn-wrap{
     padding:26px 16px;
     .login-btn{
         background-color: #66bbdd;
         border: none;
     .van-button__text{
      font-size: 15px;
      
       }

 }
}
.send-btn{
width:86px;
height:23px;
background-color:#ededed;
}
}
</style>