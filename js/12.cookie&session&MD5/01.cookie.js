/**

 * @author BY

 * @date 2019-07-21 11:01

 */
/*
cookie-parser可以设置和获取cookie

1.安装   cnpm install cookie-parser --save
2.引入var cookieParser = require('cookie-parser');
3.设置中间件 app.use(cookieParser());
4.设置cookie
        res.cookie("name",'BY',{maxAge: 900000, httpOnly: true});
                                                //HttpOnly 默认false不允许 客户端脚本访问
5.获取
    cookie req.cookies.name

 baidu.com  域名
    news.baidu.com
    www.baidu.com

aaa.com
    news.aaa.com
    www.aaa.com
 maxAge  过期时间
 domain:'.aaa.com' 多个二级域名共享cookie
 httpOnly:true 设置为true,表示只有在nodejs服务端可以操作cookie ，没法用js脚本语言操作cookie
 path  表示在哪个路由下面可以访问cookie
 signed属性设置成true 表示加密cookie信息

* */
var express = require('express');
var app = new express();
var cookieParser = require('cookie-parser');
// 设置中间件
app.use(cookieParser());

app.get('/', function (req, res) {
    console.log(req.cookies);
   res.send('我想带一人回云深不知处，带回去，藏起来！')
});

app.get('/news', function (req, res) {
    console.log(req.cookies);
    res.send('news路径');
});

app.get('/set', function (req, res) {
    //参数1：名字
    //参数2:cookie的值
    //参数3：cookie的配置信息
    // maxAge： 最大失效时间（毫秒），设置在多少后失效
    // res.cookie('username', 'BY', {maxAge: 900000, httpOnly: true});
    res.cookie('username', 'BY', {maxAge: 900000, httpOnly: true, path: '/news'});
    res.send('设置cookie成功');
});

app.listen(8001, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8001');