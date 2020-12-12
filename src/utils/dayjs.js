/* 
**初始化 dayjs 相关配置
*/
import vue from  'vue'
import dayjs  from 'dayjs'
import 'dayjs/locale/zh-cn'  //全局使用
import relativeTime from 'dayjs/plugin/relativeTime'

//配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')


// 把处理相对时间的代码包装为全局过滤器
// 然后就可以在任何组件的模板中使用了
// 所谓的过滤器其实就是一个可以在模板中 调用的函数 而已。
// 在组件的模板中使用过滤器：{{ xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中
// Vue自定义过滤器，第一个参数是该过滤器的名称（就是你给这个过滤器起的名字），
// 第二个参数就是你要执行的操作
// Vue.filter('relativeTime', value => dayjs(value).from(dayjs()))
vue.filter('relativeTime',value => {
    return dayjs(value).from(dayjs())
})
/* dayjs(value) 中的value 值 是谁调用了relativetime  后传过来的参数就是value的值  
也就是未经过处理的时间值 而from（dayjs）是经过from处理后的时间值 */

// console.log(dayjs().format('YYYY-MM-DD  HH:mm:ss'))//年月日时分秒
// console.log(dayjs('2020-12-7 19:52:42').from(dayjs()))