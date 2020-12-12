<template>
<!-- <div class="article-item">文章列表项</div> -->
<van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l3">{{wj.title}}</div>
    <div slot="label">
        <!-- 1.下面的代码 是判断 图片是3张的时候将渲染下面的代码 -->
       <div class="cover-wrap" 
        v-if="wj.cover.type ===3">
        <div class="cover-wrap-item" 
           v-for="(img,index) in wj.cover.images" 
           :key="index">
           <van-image 
            width="116" 
            height="73"
            fit="cover"
            :src="img"/>
          </div>
        </div>   
        <div class="label-wrap">
        <span>{{wj.aut_name}}</span>
        <span>{{wj.comm_count}}评论</span>
        <span>{{wj.pubdate | relativeTime}}</span>
        </div>
    </div>
    <!-- 默认插槽叫 default 可以省略-->
       <van-image 
        v-if="wj.cover.type ===1"
        class="right-cover"
        width="116" 
        height="73"
        fit="cover"
        :src="wj.cover.images[0]"/>
        <!-- 只有1张图片 将渲染此代码 图片只有 0 1 3 张-->
</van-cell>

</template>

<script>
export default {
 name:'ArticleItem',
 components:'',
 props:{
     wj:{
         type:[Object,String,Number],
        required:true
     }
 },
data() {
return {

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
<style lang='less' scoped>
/* @import url(); 引入css类 */
.article-item{
    .title {
     font-size: 16px;
     color: #3a3a3a;
     text-align: justify;
 }
  .label-wrap{
   font-size:11px;
   color: #b4b4b4;
   text-align: justify;
    span {
     margin-right:12px;
  }
  }

 /deep/ .van-cell__vaule {
     flex: unset; 
    //  不设置flex
     width: 116px;
     height: 73px;
     margin-left: 12px;
 } 
 .right-cover {
     width: 116px;
     height: 73px;
 }
 .cover-wrap{
    padding: 15px 0;
    display: flex;
    .cover-wrap-item{
        flex: 1;
        /* 此时的flex为 1（flex取值为一个非负数 则flex-grow flex-shrink 取值 1 flex-basis取 0%）
        flex 有3个属性   flex-grow 子元素平分父元素多余的空间（子元素之和小于于父元素之和）
                        flex-shrink   子元素平分父元素不足的空间（子元素之和大于父元素之和）
                        flex-basis    子元素占父元素主轴的大小  basis会覆盖 初始化的宽度 */
        height: 73px;
          &:not(:last-child){
                padding-right: 4px;
            } 
            // 控制 图片之间的间距
         .cover-item{
             width: 100%;
             height: 73px;
         }               
    }
}

}

</style>