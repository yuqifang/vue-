# vue-self
vue双向数据绑定原理，QQ：448919239，微信:448919239
# vue的双向数据绑定原理
vue双向数据绑定是通过Object.defineProperty的get(), set()方法对数据进行劫持，然后结合发布订阅模式，在数据发生变化的时候，去通知页面更新。

## 自己实现vue
1.提供 $el 实例属性， 来得到 dom 对象

2.提供 $data 实例属性， 来得到 data 数据

3.提供代理属性，比如实现 this.name === this.$data.name

4.解析dom结构，将插值表达式转换成数据

将

<div id="app">
    <h1>{{ name }}</h1>
    <h2>{{ age }}</h2>
</div>

转化为

<div id="app">
    <h1>张三</h1>
    <h2>18</h2>
</div>

5.实现，数据的变化要引起页面的更新

# 参考课程
https://www.bilibili.com/video/BV1p7411u7RJ/?p=62&vd_source=040ec9ea94b544430193c21cbeda4277