# dtit
dtit.js

## 1.安装
npm install dtitjs --save

## 2.使用
var dtit = require('dtitjs');  

<b>OR</b>  

import dtit from 'dtitjs';  

<b>OR</b>  

```
<script src="xxx/dtit.js"></script>
_d.xxxx
```  

## 3.Demo
```
      //获取参数
     console.log(_d.query("_ijt"));
     console.log(_d.query()); //获取所有参数，返回一个对象
     //格式化字符串
     console.log(_d.format("你好{0}", "waroom"));
     //格式化时间 代码： 年->yyyy 月->M、MM 日->d、dd 时->h、hh 分->m、mm 秒->s、ss 毫秒:S
     console.log(_d.dateFormat("2015/03/12", "yyyy-M-d"))
     console.log(_d.dateFormat("2015/03/02", "yyyy-M-d hh:mm:ss.S"))
     console.log(_d.dateFormat("2015/3/2", "yyyy-MM-dd hh:mm:ss.S"))
     //使用时间常量进行指定格式的格式化 类型：DATE_TIME_F->yyyy-MM-dd hh:mm:ss  TIME_F->hh:mm:ss TIME_H_M_F->hh:mm  DATE_F-> "yyyy-MM-dd"
     console.log(_d.dateFormat("2015/1/2 9:03:2", _d.CONST.DATE_TIME_F));
     //生成guid
     console.log(_d.guid());
     //生成指定长度的随机字符串，不传长度，默认返回guid
     console.log(_d.randomStr(10));
     //生成随机数
     console.log(_d.random(5000, 8000));
     console.log(_d.random(10));
     //替换字符串
     console.log(_d.replaceAll("你好殷猛，你好waroom", "你好", "hi"))
     //Cookie操作，见body中的button
     _d.setCookie('test', 'test', 1);
     _d.getCookie('test');

     //循环字符串
     _d.each("你好我是Waroom", function (value, index) {
         console.log(value, index)
     })
     //循环数组对象
     _d.each([{name: "你好", age: 18}, {name: "hello", age: 10}], function (o, index) {
         console.log(o, index);
     })
     //循环对象
     _d.each({name: "你好", age: 18}, function (value, key) {
         console.log(key, value);
     })
     //跳出循环
     _d.each(["小1", "小2", "小3", "小4", "小5"], function (value, index) {
         if (index > 3) //只处理索引为0~3的
             return false; //跳出
         console.log(value, index);
     })
     //颜色转换，支持hsl,hex,rgb任意转换
     var color = _d.tinycolor("#fed001"); //参数支持 1、string型的hex,hsl,rgb  2、object型的{h:x,s:x,l:x},{r:x,g:x,b:x}
     console.log(color.toHex()); //得到16进制颜色  返回 "#fed001"
     console.log(color.toHsl());//得到hsl颜色对象  返回 {h: 0.13636363636363635, s: 0.9921568627450981, l: 0.5}
     console.log(color.toRgb());//得到rgb颜色对象  返回 {r: 254, g: 208, b: 1}
     //设置禁用console功能（当前仅支持log,warn,info,error,debug）
     _d.setConsole(false); //禁用console功能，应用程序启动时调用
     console.log("我现在不会被显示在Console控制台哦，并且只要设置后，只要不重启浏览器，设置一直生效，直到接收到true！")
     _d.setConsole(true);
     console.log("我又回来了，哈哈哈")
```
## 4.npm仓库
https://www.npmjs.com/package/dtitjs
## 5.TODO  
- [] 添加开发者模式  
- [] 记录函数使用频率  
- [] ...
