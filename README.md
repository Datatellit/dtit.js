# dtit
dtit.js

## 1.安装
npm install dtitjs --save

## 2.使用
var dtit = require('dtitjs');  

<b>OR</b>  

import dtit from 'dtitjs';

## 3.Demo
```
    //获取参数
    console.log(_d.query("_ijt"));
    console.log(_d.query()); //获取所有参数，返回一个对象
    //格式化字符串
    console.log(_d.format("你好{0}", "waroom"));
    //格式化时间
    console.log(_d.dateFormat("2015/03/12", "yyyy-M-d"))
    console.log(_d.dateFormat("2015/03/02", "yyyy-M-d hh:mm:ss.S"))
    //生成guid
    console.log(_d.guid());
    //生成随机数
    console.log(_d.random(5000, 8000));
    console.log(_d.random(10));
    //替换字符串
    console.log(_d.replaceAll("你好殷猛，你好waroom", "你好", "hi"))
    //Cookie操作，见body中的button

    //循环字符串
    _d.each("你好我是Waroom", function (value, index) {
        console.log(value, index)
    })
    //循环数组对象
    _d.each([{name: "你好", age: 18}, {name: "hello", age: 10}], function (o, index) {
        console.log(o, index);
    })
    //循环对象
    _d.each({name: "你好", age: 18}, function (key, value) {
        console.log(key, value);
    })
    //跳出循环
    _d.each(["小1", "小2", "小3", "小4", "小5"], function (value, index) {
        if (index > 3) //只处理索引为0~3的
            return false; //跳出
        console.log(value, index);
    })
```
## 4.npm仓库
[foo]: https://www.npmjs.com/package/dtitjs "Click Me"
