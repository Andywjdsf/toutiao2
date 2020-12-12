/* 
   本地存储封装模块
   key-value 键值对
*/
 export const getItem = name =>{
     const data = window.localStorage.getItem(name)
    // 为什么把 JSON.parse 放到 try-catch 中？
  // 因为 data 可能不是 JSON 格式字符串
  try {
      // 尝试把 data 转为 JavaScript 对象
      return JSON.parse(data)
  } catch (error) {
      //data 不是json 格式字符串 直接原样返回
      return data
  }
 }
//对于浏览器的中数据 有3种方法分别进行 储存set（是利用键值对 key—value 形式钥匙和箱子储存） 获取get（获取数据是用key就可以 ） 删除remove
 export const setItem = (name,value) =>{
     // 如果 value 是对象，就把 value 转为 JSON 格式字符串再存储
     if(typeof value==='object'){
         value = JSON.stringify(value)
     }
     window.localStorage.setItem(name,value)
 }

 export const removeItem = name =>{
    window.localStorage.removeItem(name)
 }